export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  tech: string[]
  status: 'completed' | 'in-progress' | 'legendary'
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'legendary'
  xp: number
  color: string
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'AI Code Assistant',
    description: 'VS Code extension that uses GPT-4 to explain, refactor, and generate code with context awareness.',
    longDescription: 'Built a powerful VS Code extension that integrates with OpenAI APIs to provide intelligent code assistance. Features include code explanation, automatic refactoring suggestions, and context-aware code generation.',
    tech: ['TypeScript', 'OpenAI API', 'VS Code API', 'Node.js'],
    status: 'completed',
    difficulty: 'advanced',
    xp: 500,
    color: '#8B5CF6',
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: '2',
    title: 'RAG Knowledge Base',
    description: 'Document Q&A system using embeddings and vector search for accurate retrieval.',
    tech: ['Python', 'LangChain', 'Pinecone', 'FastAPI'],
    status: 'completed',
    difficulty: 'advanced',
    xp: 450,
    color: '#10B981',
    githubUrl: '#',
  },
  {
    id: '3',
    title: 'Multi-Agent Orchestrator',
    description: 'Framework for coordinating multiple AI agents to solve complex tasks collaboratively.',
    tech: ['Python', 'CrewAI', 'GPT-4', 'Redis'],
    status: 'in-progress',
    difficulty: 'legendary',
    xp: 750,
    color: '#F59E0B',
    githubUrl: '#',
  },
  {
    id: '4',
    title: 'Voice-to-Code',
    description: 'Speak your ideas, get working code. Natural language to functional components.',
    tech: ['React', 'Whisper API', 'GPT-4', 'Tailwind'],
    status: 'completed',
    difficulty: 'intermediate',
    xp: 300,
    color: '#EC4899',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: '5',
    title: 'AI Image Generator',
    description: 'Custom DALL-E interface with prompt enhancement and style presets.',
    tech: ['Next.js', 'DALL-E 3', 'Prisma', 'PostgreSQL'],
    status: 'completed',
    difficulty: 'intermediate',
    xp: 350,
    color: '#3B82F6',
    liveUrl: '#',
  },
  {
    id: '6',
    title: 'Semantic Search Engine',
    description: 'Search through documents by meaning, not just keywords.',
    tech: ['Python', 'Sentence Transformers', 'Elasticsearch', 'React'],
    status: 'completed',
    difficulty: 'advanced',
    xp: 400,
    color: '#14B8A6',
    githubUrl: '#',
  },
  {
    id: '7',
    title: 'AI Writing Companion',
    description: 'Blog post generator with tone control, SEO optimization, and fact-checking.',
    tech: ['Next.js', 'Claude API', 'Vercel AI SDK', 'MDX'],
    status: 'in-progress',
    difficulty: 'intermediate',
    xp: 300,
    color: '#A855F7',
    liveUrl: '#',
  },
  {
    id: '8',
    title: 'Neural Network Visualizer',
    description: 'Interactive 3D visualization of neural network architectures and training.',
    tech: ['Three.js', 'React', 'TensorFlow.js', 'WebGL'],
    status: 'legendary',
    difficulty: 'legendary',
    xp: 1000,
    color: '#EF4444',
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
]

export const difficultyConfig = {
  beginner: { label: 'Beginner', color: '#10B981', icon: '🌱' },
  intermediate: { label: 'Intermediate', color: '#F59E0B', icon: '⚔️' },
  advanced: { label: 'Advanced', color: '#8B5CF6', icon: '🔮' },
  legendary: { label: 'Legendary', color: '#EF4444', icon: '👑' },
}

export const statusConfig = {
  'completed': { label: 'Completed', color: '#10B981', icon: '✅' },
  'in-progress': { label: 'In Progress', color: '#F59E0B', icon: '🚧' },
  'legendary': { label: 'Legendary', color: '#EF4444', icon: '⭐' },
}
