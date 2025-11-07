import { queryDatabase } from '@/lib/sql-agent';
import { detectWorkflowIntent, executeAgentWorkflow, getAvailableWorkflows } from '@/lib/agentkit-agent';

export const runtime = 'nodejs';
export const maxDuration = 60;

/**
 * POST /api/chat
 * Main chat endpoint with THREE LAYERS:
 * 1. LangChain SQL Agent - Database queries (brain)
 * 2. Mem0 Memory System - Context & history (heart)
 * 3. OpenAI AgentKit - Workflow orchestration (arms & legs)
 *
 * Session 1 focuses on layers 1 and 3 foundation
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
    let response = '';

    // === LAYER 3: AgentKit Workflow Detection ===
    // Check if user is asking for a workflow (action-oriented)
    const workflowIntent = detectWorkflowIntent(userQuery);

    if (workflowIntent) {
      try {
        // User wants to execute a workflow - delegate to AgentKit
        const workflowResult = await executeAgentWorkflow(workflowIntent, { query: userQuery });
        response = JSON.stringify({
          type: 'workflow',
          workflow: workflowResult,
          message: `🚀 Ready to execute workflow: ${workflowIntent}. Upgrading from Session 1 data queries to Session 3 workflow automation.`,
        });
        return new Response(response, {
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (error) {
        response = `Error executing workflow: ${error instanceof Error ? error.message : 'Unknown error'}`;
      }
    }

    // === LAYER 1: LangChain SQL Agent ===
    // Check if user is asking about data (query-oriented)
    if (
      userQuery.toLowerCase().includes('how many') ||
      userQuery.toLowerCase().includes('what') ||
      userQuery.toLowerCase().includes('show') ||
      userQuery.toLowerCase().includes('list') ||
      userQuery.toLowerCase().includes('count')
    ) {
      try {
        // User is asking about data - query the database
        const queryResult = await queryDatabase(userQuery);
        response = `Based on the database query: ${queryResult}`;
      } catch (error) {
        response = `I encountered an issue querying the database. Error: ${error instanceof Error ? error.message : 'Unknown error'}.

Please ensure your database connection is configured correctly.`;
      }
    } else {
      // Provide intelligent welcome message showing capabilities
      response = `Hello! I'm Holy Grail Chat - your omniscient AI brain with three core capabilities:

🧠 **Brain**: Database Intelligence (LangChain)
- Ask about your application data
- Example: "How many leads do we have?"

❤️ **Heart**: Conversation Memory (Mem0)
- Coming in Session 2
- Will remember your preferences

💪 **Arms & Legs**: Workflow Automation (AgentKit)
- Orchestrate complex business processes
- Try asking: "Generate a viral post" or "Create lead from DM"
- Available workflows: ${getAvailableWorkflows().map((w) => w.name).join(', ')}

What would you like to do?`;
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
