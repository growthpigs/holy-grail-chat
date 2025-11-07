# Holy Grail Chat

**Status: Clean Slate - Starting Fresh**

## What This Is

An omniscient AI brain system that understands everything about your application through three integrated layers:

- **Brain**: LangChain SQL Agent (database reasoning) + OpenAI AgentKit (general reasoning/workflows)
- **Heart**: Mem0 (conversation memory)
- **Arms/Legs**: Vercel AI SDK (integration layer)

## Current State

**Implementation deleted - starting fresh with proper Archon workflow**

Previous implementation was rushed without proper planning and didn't work. We're starting over the right way:

1. Create Archon project first
2. Define all tasks in Archon
3. Plan UI/UX before coding
4. Implement with validation at each step

## What's Preserved

- **Configuration**: `.env.local` with OpenRouter API key and Supabase credentials
- **Conceptual Architecture**: `docs/ARCHITECTURE.md` - the three-layer vision
- **Dependencies**: Next.js 14, TypeScript, LangChain, OpenAI SDK
- **Clean repo structure**: Ready for proper implementation

## Non-Negotiables

- OpenAI AgentKit (reasoning engine + workflow orchestrator)
- LangChain SQL Agent (text-to-SQL with schema discovery)
- Mem0 (conversation memory)
- Vercel AI SDK (chat streaming + tool calling)

## Next Steps

1. Get Archon MCP connected
2. Create Holy Grail Chat project in Archon
3. Define all tasks before writing code
4. Plan the actual UX with user input
5. Implement properly with validation

## Credentials

- **OpenRouter API Key**: Configured in `.env.local`
- **Database**: Bravo RevOS Supabase (for testing)
- **Password**: aQWG5K5uZjam3pXk (reset 2025-11-07)

## Repository

- **GitHub**: https://github.com/growthpigs/holy-grail-chat
- **Branch**: main
