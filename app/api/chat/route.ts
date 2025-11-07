import { queryDatabase } from '@/lib/sql-agent';

export const runtime = 'nodejs';
export const maxDuration = 60;

/**
 * POST /api/chat
 * Main chat endpoint that returns responses from GPT-4
 * Includes the database query tool for accessing application data
 */
export async function POST(request: Request) {
  const { messages } = await request.json();

  if (!messages || !Array.isArray(messages)) {
    return new Response(JSON.stringify({ error: 'Invalid request: messages array required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!process.env.OPENAI_API_KEY) {
    return new Response(JSON.stringify({ error: 'OpenAI API key not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {

    // Get the last user message
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || lastMessage.role !== 'user') {
      return new Response(
        JSON.stringify({ response: 'Please provide a user message' }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const userQuery = lastMessage.content;

    // For database queries, use the SQL agent directly
    // In Session 1, we check if the user is asking about data
    let response = '';

    if (
      userQuery.toLowerCase().includes('how many') ||
      userQuery.toLowerCase().includes('what') ||
      userQuery.toLowerCase().includes('show') ||
      userQuery.toLowerCase().includes('list') ||
      userQuery.toLowerCase().includes('count')
    ) {
      try {
        // User is likely asking about data - try to query the database
        const queryResult = await queryDatabase(userQuery);
        response = `Based on the database query: ${queryResult}`;
      } catch (error) {
        // If query fails, provide a helpful message
        response = `I encountered an issue querying the database. Error: ${error instanceof Error ? error.message : 'Unknown error'}.

Please ensure your database connection is configured correctly.`;
      }
    } else {
      // For non-data queries, provide a helpful response
      response = `Hello! I'm Holy Grail Chat. I can answer questions about your application's data. Try asking me things like:
- "How many leads do we have?"
- "Show me the top performing campaigns"
- "What voice cartridges exist in the database?"

For now, I'm in Session 1 and can help with basic database queries. In future sessions, I'll understand even more about your application!`;
    }

    return new Response(
      JSON.stringify({ response }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Chat error:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
