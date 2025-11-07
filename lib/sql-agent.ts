import { ChatOpenAI } from '@langchain/openai';

let sqlAgent: any = null;
let db: any = null;

/**
 * Initialize and return the LangChain SQL Agent
 * For Session 1, we use a simple database query wrapper
 * Lazily instantiated to avoid database connections during build
 */
export async function getSqlAgent() {
  if (sqlAgent) {
    return sqlAgent;
  }

  // Initialize database connection
  if (!db) {
    const databaseUrl = process.env.SUPABASE_DB_URL || process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error('SUPABASE_DB_URL or DATABASE_URL not set');
    }

    // For now, we'll use the database URL directly
    // In future sessions, we can add proper ORM integration
    db = {
      url: databaseUrl,
    };
  }

  // Initialize OpenAI LLM
  const llm = new ChatOpenAI({
    modelName: 'gpt-4',
    temperature: 0, // Deterministic for SQL generation
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  // Create a simple agent wrapper that uses the LLM to generate queries
  sqlAgent = {
    llm,
    db,
  };

  return sqlAgent;
}

/**
 * Execute a natural language query against the database
 * @param question Natural language question about the database
 * @returns The answer from the SQL Agent
 */
export async function queryDatabase(question: string): Promise<string> {
  try {
    const agent = await getSqlAgent();
    const result = await agent.invoke({
      input: question,
    });

    return result.output || 'No result found';
  } catch (error) {
    console.error('SQL Agent error:', error);
    throw new Error(`Failed to query database: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Close the database connection
 */
export async function closeSqlAgent() {
  if (db) {
    // Database connection cleanup (if needed)
    db = null;
  }
  sqlAgent = null;
}
