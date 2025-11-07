# Holy Grail Chat

An omniscient AI brain system that understands everything about applications it's plugged into. Designed to be installed as an NPM package for seamless integration across multiple projects.

## 🎯 Vision

Holy Grail Chat is the central intelligence layer for applications with three core components:

🧠 **Brain** - Database Intelligence (LangChain SQL Agent)
- Understands everything about your application
- Converts natural language to SQL queries
- Auto-discovers database schema
- Answers complex questions about data

❤️ **Heart** - Conversation Memory (Mem0)
- Remembers everything across conversations
- Stores user preferences and context
- Semantic search over conversations
- Understands application history

💪 **Arms & Legs** - Workflow Automation (OpenAI AgentKit) **[NON-NEGOTIABLE]**
- Orchestrates complex business processes WITHOUT hardcoding logic
- Multi-step workflows (create lead → send email → log activity)
- Tool-based automation (n8n-like but AI-native)
- Executes actions autonomously

**Scales across projects** - install once as NPM package, use everywhere

## 🛠 Tech Stack

### Session 1 (Current) - Brain + Arms & Legs Foundation
**NON-NEGOTIABLE CORE:**
- **OpenAI AgentKit** `@openai/agents` - Workflow orchestration engine (arms & legs)
- **LangChain SQL Agent** - Text-to-SQL conversion with schema auto-discovery (brain)

**Infrastructure:**
- **Vercel AI SDK** (`ai`) - Chat streaming framework
- **OpenAI GPT-4** - Primary language model
- **Vercel AI Gateway** - Multi-provider routing (extensible to DeepSeek, Kimi K2, etc.)
- **Supabase + PGVector** - Database + vector embeddings
- **Next.js 14** - Production framework with App Router

### Session 2 - Heart Integration
- **Mem0** - Persistent conversation memory (vector + graph + key-value)
- **PGVector** - Unified vector storage (Mem0 + semantic cache + LangChain)
- Full memory persistence across sessions

### Session 3 - Full AgentKit Integration
- Complete OpenAI AgentKit workflow implementation
- Complex multi-step business process automation
- Tool registry and orchestration
- Advanced workflow patterns

### Session 4 - Production Ready
- Security hardening (RLS policies)
- Rate limiting and caching strategies
- Observability and monitoring
- Comprehensive test suite
- Performance optimization

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- OpenAI API key
- Supabase project with database URL

### Quick Start

```bash
# 1. Clone and install
git clone <repo>
cd holy-grail-chat
npm install

# 2. Configure environment
cp .env.example .env.local
# Edit .env.local with your credentials:
#   - OPENAI_API_KEY
#   - NEXT_PUBLIC_SUPABASE_URL
#   - SUPABASE_SERVICE_ROLE_KEY

# 3. Start dev server
npm run dev

# 4. Open http://localhost:3000 and start chatting!
```

## 🚀 Current Capabilities (Session 1)

### Layer 1: Brain - Database Intelligence
Ask questions about your application data:
- "How many leads were created last week?"
- "What are the top performing campaigns?"
- "Show me all voice cartridges with more than 100 uses"

The chat automatically converts natural language to SQL queries via LangChain SQL Agent.

### Layer 3: Arms & Legs - Workflow Automation (AgentKit Foundation)
Ready to orchestrate business processes:
- "Generate a viral post" → triggers post generation workflow
- "Create lead from DM" → multi-step lead creation workflow
- "Launch campaign" → multi-channel campaign deployment workflow
- "Qualify lead" → lead scoring and routing workflow

Available workflows are ready to execute in full form during Session 3.

### Key Features
- ✅ Three-layer architecture (Brain + Heart + Arms/Legs)
- ✅ LangChain SQL Agent for database queries
- ✅ AgentKit workflow detection and orchestration foundation
- ✅ Schema auto-discovery (no manual configuration)
- ✅ Error handling and recovery
- ✅ Development logging
- ✅ Workflow intent detection
- ✅ Multi-step process orchestration ready

## 📋 Development Commands

```bash
npm run dev         # Start dev server on port 3000
npm run build       # Production build
npm run start       # Start production server
npm run lint        # Run ESLint
npm run typecheck   # TypeScript validation
```

## 🏗 Project Structure

```
holy-grail-chat/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts         # Chat endpoint with tools
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Chat UI
│   └── globals.css               # Global styles
├── lib/
│   └── sql-agent.ts              # LangChain SQL Agent wrapper
├── package.json
├── tsconfig.json
├── next.config.js
├── .eslintrc.js
└── README.md
```

## 🔧 Configuration

### Environment Variables

```env
# Required
OPENAI_API_KEY=your_openai_api_key

# Database (choose one)
SUPABASE_DB_URL=postgresql://...  # Direct PostgreSQL URL
DATABASE_URL=postgresql://...      # Alternative

# Supabase (for future Sessions)
NEXT_PUBLIC_SUPABASE_URL=https://...
SUPABASE_SERVICE_ROLE_KEY=...

# Optional
NODE_ENV=development               # Set to production for build
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 🧪 Testing

### Manual Testing

1. **Start the server:**
   ```bash
   npm run dev
   ```

2. **Test database queries:**
   - Open http://localhost:3000
   - Try: "How many total leads do we have?"
   - Chat should use query_database tool and return actual data

3. **Check logs:**
   - Dev logs show SQL Agent activity
   - Watch for successful tool execution

### Validation Checklist
- [ ] Server starts without errors
- [ ] Chat UI loads and is responsive
- [ ] Can send messages
- [ ] Database query tool is called
- [ ] Receives real responses from database
- [ ] No TypeScript errors: `npm run typecheck`
- [ ] No ESLint errors: `npm run lint`

## 📚 Architecture Notes

### THREE-LAYER ARCHITECTURE

#### Layer 1: Brain (LangChain SQL Agent)
- **Purpose**: Convert natural language to SQL queries
- **Auto-discovery**: Automatically introspects database schema
- **Error recovery**: Fixes invalid SQL and retries
- **Location**: `lib/sql-agent.ts`
- **Status**: ✅ IMPLEMENTED in Session 1

#### Layer 2: Heart (Mem0 Memory System)
- **Purpose**: Persistent conversation memory and context
- **Integration**: Uses PGVector for semantic search
- **Status**: Coming in Session 2

#### Layer 3: Arms & Legs (OpenAI AgentKit) **[CRITICAL]**
- **Purpose**: Orchestrate complex workflows WITHOUT hardcoding business logic
- **Workflows**: Create leads, generate posts, launch campaigns, qualify leads
- **Tool-based**: Uses tool registry for multi-step automation
- **Location**: `lib/agentkit-agent.ts`
- **Status**: ✅ FOUNDATION IMPLEMENTED in Session 1, Full integration in Session 3

### Vercel AI SDK (The Orchestrator)
- **Purpose**: Stream responses from GPT-4 to client
- **Integration**: Routes between all three layers
- **Chat routing**: Detects user intent (query vs. workflow)
- **Location**: `app/api/chat/route.ts`
- **Status**: ✅ IMPLEMENTED with layer routing

### Single Instance Pattern
- Database connection is lazily initialized
- Shared across all chat requests
- Prevents Redis/connection spam during build
- Applied to both SQL Agent and AgentKit workflows

## 🚦 Future Sessions

### Session 2: Mem0 Integration
- Add conversation memory system
- Semantic search over past conversations
- Store user preferences and context

### Session 3: AgentKit Workflows
- Complex multi-step workflows
- Write posts with voice cartridge styling
- Orchestrate business processes without code

### Session 4: Production Ready
- Multi-tenant security with RLS
- Observability and monitoring
- Rate limiting and caching
- Comprehensive test suite

## 🤝 Integration with Applications

Once complete, Holy Grail Chat will be installed as an NPM package:

```bash
npm install @yourcompany/holy-grail-chat
```

Applications will use it like:

```tsx
import { HolyGrailChat } from '@yourcompany/holy-grail-chat';

export default function App() {
  return (
    <YourApp>
      <HolyGrailChat
        databaseUrl={process.env.DATABASE_URL}
        apiKey={process.env.OPENAI_API_KEY}
      />
    </YourApp>
  );
}
```

## 📞 Support

For issues or questions:
1. Check the research documents in `docs/research/`
2. Review LangChain documentation: https://js.langchain.com/
3. Vercel AI SDK docs: https://sdk.vercel.ai/

## 📄 License

Private - Internal use only
