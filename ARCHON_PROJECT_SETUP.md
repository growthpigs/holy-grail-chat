# Holy Grail Chat - Archon Project Setup

**Use this file to create the project and all tasks in Archon manually or via MCP tools.**

---

## Project Details

**Project Name:** Holy Grail Chat

**Description:**
Omniscient AI brain system with three-layer architecture. Brain (LangChain SQL Agent + OpenAI AgentKit reasoning engine), Heart (Mem0 memory), Integration (Vercel AI SDK). Installable as NPM package for integration across multiple projects. Non-negotiable: AgentKit (thinking engine), LangChain (database reasoning), Mem0 (memory).

**Status:** active

**Repository:** https://github.com/[YOUR_ORG]/holy-grail-chat (to be created)

**Tech Stack:**
- Next.js 14 with App Router
- TypeScript (strict mode)
- Vercel AI SDK (chat streaming)
- OpenAI GPT-4 (LLM)
- OpenAI AgentKit (workflow orchestration)
- LangChain (SQL Agent for database queries)
- Mem0 (conversation memory - Session 2)
- Supabase + PGVector (database + vectors)

---

## Session 1 Tasks (COMPLETED ✅)

### Task 1: Initialize Holy Grail Chat Repository
**Status:** done
**Story Points:** 5
**Assignee:** CC1

**Description:**
Set up Next.js 14 with TypeScript and App Router. Install all core dependencies: Vercel AI SDK, OpenAI, LangChain, AgentKit, Supabase. Create project structure with proper configs (tsconfig, eslint, next.config). Initialize git repository with .gitignore and README.

**Acceptance Criteria:**
- ✅ Next.js 14 project initialized
- ✅ All dependencies installed (ai, @ai-sdk/openai, @openai/agents, langchain, @langchain/openai)
- ✅ TypeScript configured with strict mode
- ✅ ESLint configured
- ✅ Git repository initialized
- ✅ README.md with project overview
- ✅ .env.example with required variables
- ✅ npm run build passes
- ✅ npm run typecheck passes

**Completed:** 2025-11-07

---

### Task 2: Build LangChain SQL Agent (Specialized Brain)
**Status:** done
**Story Points:** 3
**Assignee:** CC1

**Description:**
Create LangChain SQL Agent wrapper for text-to-SQL conversion with automatic schema discovery. Use temperature=0 for deterministic query generation. Implement lazy initialization to prevent database connections during build time. Handle errors gracefully with retry logic.

**Acceptance Criteria:**
- ✅ lib/sql-agent.ts created
- ✅ SQL Agent wrapper with lazy initialization
- ✅ Temperature=0 for deterministic SQL
- ✅ Schema auto-discovery via information_schema
- ✅ Error handling and recovery
- ✅ queryDatabase() function working
- ✅ No connections during build

**Files Created:**
- `lib/sql-agent.ts` - SQL Agent implementation

**Completed:** 2025-11-07

---

### Task 3: Implement AgentKit Workflow Foundation (Thinking Engine)
**Status:** done
**Story Points:** 5
**Assignee:** CC1

**Description:**
Install @openai/agents dependency. Create workflow orchestration foundation with 4 example workflows: create lead from DM, generate viral post, launch campaign, qualify lead. Implement workflow intent detection that recognizes when user is asking for a workflow vs. data query.

**Acceptance Criteria:**
- ✅ @openai/agents installed
- ✅ lib/agentkit-agent.ts created
- ✅ 4 example workflows defined (CREATE_LEAD_FROM_DM, GENERATE_VIRAL_POST, LAUNCH_CAMPAIGN, QUALIFY_LEAD)
- ✅ detectWorkflowIntent() function working
- ✅ executeAgentWorkflow() foundation ready
- ✅ getAvailableWorkflows() returns workflow list
- ✅ Workflow detection integrated into chat

**Files Created:**
- `lib/agentkit-agent.ts` - AgentKit workflow orchestration

**Workflows Defined:**
1. CREATE_LEAD_FROM_DM - Extract lead info, create record, send response
2. GENERATE_VIRAL_POST - Generate expert copywriting with voice cartridge
3. LAUNCH_CAMPAIGN - Multi-channel campaign deployment
4. QUALIFY_LEAD - Lead scoring and routing

**Completed:** 2025-11-07

---

### Task 4: Build Chat API with Three-Layer Routing
**Status:** done
**Story Points:** 3
**Assignee:** CC1

**Description:**
Create chat API endpoint (`/api/chat`) that intelligently routes between Layer 1 (SQL Agent for data queries) and Layer 3 (AgentKit for workflows). Implement intent detection that checks for workflow requests first, then data queries, then default responses. Integrate both LangChain and AgentKit.

**Acceptance Criteria:**
- ✅ app/api/chat/route.ts created
- ✅ POST /api/chat endpoint working
- ✅ Layer routing: AgentKit → SQL Agent → Default
- ✅ detectWorkflowIntent() checked first
- ✅ isDataQuestion() checked second
- ✅ Appropriate responses for each layer
- ✅ Error handling for both layers
- ✅ Build passes without errors

**Files Created:**
- `app/api/chat/route.ts` - Chat endpoint with intelligent routing
- `app/page.tsx` - Chat UI
- `app/layout.tsx` - Root layout
- `app/globals.css` - Global styles

**Routing Logic:**
1. Check if user wants a workflow → Route to AgentKit
2. Check if user asking about data → Route to SQL Agent
3. Otherwise → Provide helpful default response

**Completed:** 2025-11-07

---

## Session 2 Tasks (UPCOMING 📋)

### Task 5: Integrate Mem0 Memory System (Heart)
**Status:** todo
**Story Points:** 8
**Assignee:** TBD

**Description:**
Add persistent conversation memory with Mem0 and PGVector integration. Configure Mem0 to use Supabase as the vector store backend. Implement semantic search over past conversations. Create Supabase schema for memories table with vector embeddings. Enable memory persistence across sessions.

**Acceptance Criteria:**
- [ ] Install mem0ai package
- [ ] Configure Mem0 with Supabase PGVector
- [ ] Create memories table in Supabase with vector column
- [ ] Implement memory storage on conversation completion
- [ ] Add semantic search over memories
- [ ] Test memory retrieval across sessions
- [ ] Document memory schema and configuration

**Technical Details:**
```typescript
// lib/memory.ts
import { Memory } from 'mem0ai';

export const memory = new Memory({
  vectorStore: {
    provider: 'supabase',
    config: {
      collectionName: 'memories',
      embeddingModelDims: 1536,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    }
  }
});
```

**Database Schema:**
```sql
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE memories (
  id TEXT PRIMARY KEY,
  embedding vector(1536),
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX memories_embedding_idx
  ON memories USING hnsw (embedding vector_cosine_ops);
```

---

### Task 6: Add Conversation Persistence and Context Retrieval
**Status:** todo
**Story Points:** 5
**Assignee:** TBD

**Description:**
Store all conversations in Mem0 with user context. Implement memory search at the beginning of each conversation to retrieve relevant context. Integrate retrieved memories into chat system prompt for personalized responses. Test that preferences and context persist across multiple sessions.

**Acceptance Criteria:**
- [ ] Store conversations in Mem0 on chat completion
- [ ] Retrieve relevant memories at conversation start
- [ ] Integrate memory context into system prompt
- [ ] Test personalization across sessions
- [ ] User preferences remembered (e.g., "I prefer short posts")
- [ ] Context-aware responses working
- [ ] Memory search performance optimized

**Integration Pattern:**
```typescript
// In /api/chat route
const memories = await memory.search({
  query: userQuery,
  userId: user.id,
  limit: 5
});

const systemPrompt = `You are Holy Grail Chat with full context:
User preferences: ${memories.map(m => m.memory).join('\n')}
...`;
```

---

## Session 3 Tasks (UPCOMING 🚀)

### Task 7: Full OpenAI AgentKit Integration (Complete Brain)
**Status:** todo
**Story Points:** 13
**Assignee:** TBD

**Description:**
Complete OpenAI AgentKit workflow implementation with actual execution. Integrate AgentKit tool registry with Vercel AI SDK. Implement multi-step orchestration with chain-of-thought reasoning. Execute all 4 example workflows end-to-end: create lead from DM, generate viral post, launch campaign, qualify lead. Add workflow execution logging and error recovery.

**Acceptance Criteria:**
- [ ] Full @openai/agents integration complete
- [ ] All 4 workflows execute successfully
- [ ] Tool registry integrated with chat API
- [ ] Chain-of-thought reasoning visible in logs
- [ ] Multi-step orchestration working
- [ ] Workflows adapt based on intermediate results
- [ ] Error recovery and retry logic
- [ ] Workflow execution time <5 seconds

**Technical Implementation:**
```typescript
import { Agent, run } from '@openai/agents';
import { aisdk } from '@openai/agents-extensions';

const agent = new Agent({
  name: 'Copywriter',
  model: aisdk(openai('gpt-4')),
  instructions: 'Expert direct response copywriter...',
});

const result = await run(agent, userRequest);
```

---

### Task 8: Build Advanced Workflow Patterns
**Status:** todo
**Story Points:** 8
**Assignee:** TBD

**Description:**
Implement complex multi-step workflows with dependencies. Add adaptive execution that pivots based on intermediate results. Implement error recovery with automatic retry and fallback strategies. Support workflow composition (one workflow calling another). Add workflow monitoring and observability.

**Acceptance Criteria:**
- [ ] Complex workflows with 5+ steps working
- [ ] Adaptive execution based on results
- [ ] Error recovery with retry logic
- [ ] Workflow composition (nested workflows)
- [ ] Workflow execution tracing
- [ ] Performance monitoring
- [ ] Workflow templates for common patterns

**Example Complex Workflow:**
```
Launch Multi-Channel Campaign:
1. Validate audience segment (if fails → stop)
2. Create campaign in database
3. Generate 3 LinkedIn posts
4. Set up email sequence (if fails → retry 3x)
5. Configure SMS follow-ups
6. Monitor initial performance (first 24h)
7. Auto-adjust based on engagement
```

---

## Session 4 Tasks (PRODUCTION 🏭)

### Task 9: Security Hardening and Multi-Tenant Support
**Status:** todo
**Story Points:** 8
**Assignee:** TBD

**Description:**
Implement enterprise-grade security for production deployment. Create read-only database role for AI queries. Add Supabase RLS policies for multi-tenant isolation. Implement optional validation LLM that checks queries before execution. Add rate limiting per user/tenant. Ensure no SQL injection vectors exist.

**Acceptance Criteria:**
- [ ] Read-only database role created
- [ ] RLS policies for multi-tenant isolation
- [ ] Optional validation LLM for query safety
- [ ] Rate limiting per user implemented
- [ ] SQL injection protection verified
- [ ] Security audit completed
- [ ] Penetration testing passed

**Security Layers:**
```sql
-- Read-only role
CREATE ROLE ai_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO ai_readonly;
REVOKE INSERT, UPDATE, DELETE ON ALL TABLES FROM ai_readonly;

-- RLS policies
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own leads"
  ON leads FOR SELECT
  USING (user_id = auth.uid());
```

---

### Task 10: Production Readiness and Observability
**Status:** todo
**Story Points:** 8
**Assignee:** TBD

**Description:**
Prepare system for production deployment. Implement rate limiting and caching strategies. Add semantic cache for repeated queries. Set up monitoring with error tracking (Sentry integration). Add performance optimization (query caching, connection pooling). Create comprehensive test suite. Document deployment procedures and runbooks.

**Acceptance Criteria:**
- [ ] Rate limiting implemented (per user, per endpoint)
- [ ] Semantic cache for query results
- [ ] Sentry error tracking integrated
- [ ] Performance monitoring (latency, throughput)
- [ ] Connection pooling optimized
- [ ] Comprehensive test suite (unit + integration)
- [ ] Deployment documentation complete
- [ ] Runbooks for common issues

**Caching Strategy:**
```sql
CREATE TABLE query_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  query TEXT,
  query_embedding vector(1536),
  response JSONB,
  user_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '5 minutes'
);

CREATE INDEX query_cache_embedding_idx
  ON query_cache USING hnsw (query_embedding vector_cosine_ops);
```

---

## GitHub Repository Setup

**Repository Name:** holy-grail-chat

**Organization:** [TBD - Your GitHub organization]

**Repository URL:** https://github.com/[YOUR_ORG]/holy-grail-chat

### Steps to Create and Push:

```bash
# 1. Create GitHub repository (via GitHub UI or gh CLI)
gh repo create holy-grail-chat --public --description "Omniscient AI brain system"

# 2. Add remote to local repository
cd /Users/rodericandrews/Obsidian/Master/_projects/holy-grail-chat
git remote add origin https://github.com/[YOUR_ORG]/holy-grail-chat.git

# 3. Push code
git push -u origin main

# 4. Verify repository
git remote -v
```

---

## Archon Integration

Once GitHub repository is created:

1. **Go to Archon UI:** https://statesman-ai.netlify.app/projects/
2. **Create New Project** with details above
3. **Link GitHub Repository** to the Archon project
4. **Create all 10 tasks** (4 done, 6 todo) using the descriptions above
5. **Set up project board** with columns: Todo, Doing, Review, Done
6. **Move Session 1 tasks** (1-4) to "Done" column
7. **Add project documentation** (README.md, ARCHITECTURE.md)

---

## Project Stats (Current)

**Total Story Points:** 73
- Session 1 (Completed): 16 points ✅
- Session 2 (Upcoming): 13 points
- Session 3 (Upcoming): 21 points
- Session 4 (Upcoming): 16 points

**Completion:** 22% (16/73 points)

**Estimated Time:**
- Session 2: ~8-13 hours
- Session 3: ~13-21 hours
- Session 4: ~13-16 hours
- **Total Remaining:** ~34-50 hours

---

## Quick Commands

```bash
# Navigate to project
cd /Users/rodericandrews/Obsidian/Master/_projects/holy-grail-chat

# Install dependencies
npm install --legacy-peer-deps

# Run dev server
npm run dev

# Run type check
npm run typecheck

# Run linter
npm run lint

# Build for production
npm run build

# View git log
git log --oneline

# Check git status
git status
```

---

## Contact

**Project Lead:** Roderick Andrews
**Primary Development:** CC1 (Claude Code)
**Architecture Documentation:** Complete (docs/ARCHITECTURE.md)
**Repository Status:** Ready for GitHub push
**Archon Status:** Awaiting manual project creation
