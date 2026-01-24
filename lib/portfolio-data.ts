export interface PortfolioProject {
  id: string
  slug: string
  title: string
  tagline: string
  description: string
  role: string
  duration: string
  year: string
  category: 'ai' | 'web' | 'mobile' | 'data' | 'other'
  tech: string[]
  highlights: string[]
  metrics?: {
    label: string
    value: string
  }[]
  images: {
    thumbnail: string
    gallery?: string[]
  }
  links: {
    live?: string
    github?: string
    case_study?: string
  }
  color: string
  featured?: boolean
}

export const portfolioCategories = [
  { id: 'all', label: 'All Work' },
  { id: 'ai', label: 'AI / ML' },
  { id: 'web', label: 'Web Apps' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'data', label: 'Data' },
]

export const portfolioProjects: PortfolioProject[] = [
  {
    id: '1',
    slug: 'ai-code-assistant',
    title: 'AI Code Assistant',
    tagline: 'VS Code extension powered by GPT-4',
    description: 'Built a powerful VS Code extension that integrates with OpenAI APIs to provide intelligent code assistance. The extension understands project context, explains complex code, suggests refactoring improvements, and generates new code based on natural language descriptions.',
    role: 'Full Stack Developer',
    duration: '3 months',
    year: '2025',
    category: 'ai',
    tech: ['TypeScript', 'OpenAI API', 'VS Code API', 'Node.js', 'React'],
    highlights: [
      'Context-aware code generation using AST parsing',
      'Real-time code explanation with streaming responses',
      'Custom fine-tuned model for code refactoring',
      'Integrated with GitHub Copilot-style completions',
    ],
    metrics: [
      { label: 'Active Users', value: '2,500+' },
      { label: 'VS Code Rating', value: '4.8★' },
      { label: 'Code Generated', value: '50K+ lines' },
    ],
    images: {
      thumbnail: '/projects/code-assistant.png',
    },
    links: {
      live: 'https://marketplace.visualstudio.com',
      github: 'https://github.com',
    },
    color: '#8B5CF6',
    featured: true,
  },
  {
    id: '2',
    slug: 'enterprise-rag-platform',
    title: 'Enterprise RAG Platform',
    tagline: 'Document intelligence for Fortune 500',
    description: 'Designed and built an enterprise-grade RAG (Retrieval-Augmented Generation) platform that enables employees to query thousands of internal documents using natural language. The system handles PDFs, Confluence pages, Slack threads, and more.',
    role: 'AI Engineer',
    duration: '6 months',
    year: '2025',
    category: 'ai',
    tech: ['Python', 'LangChain', 'Pinecone', 'FastAPI', 'React', 'PostgreSQL'],
    highlights: [
      'Processes 100K+ documents with semantic chunking',
      'Multi-modal support for text, tables, and images',
      'Role-based access control for sensitive data',
      'Deployed on AWS with 99.9% uptime SLA',
    ],
    metrics: [
      { label: 'Documents Indexed', value: '100K+' },
      { label: 'Query Accuracy', value: '94%' },
      { label: 'Avg Response Time', value: '1.2s' },
    ],
    images: {
      thumbnail: '/projects/rag-platform.png',
    },
    links: {
      case_study: '/case-studies/rag-explained-visually',
    },
    color: '#10B981',
    featured: true,
  },
  {
    id: '3',
    slug: 'realtime-dashboard',
    title: 'Real-time Analytics Dashboard',
    tagline: 'Live metrics for SaaS companies',
    description: 'A beautiful, real-time analytics dashboard that visualizes key business metrics. Built with WebSockets for live updates, featuring customizable widgets, alerting, and team collaboration features.',
    role: 'Frontend Lead',
    duration: '4 months',
    year: '2024',
    category: 'web',
    tech: ['Next.js', 'TypeScript', 'D3.js', 'WebSockets', 'Tailwind CSS', 'Prisma'],
    highlights: [
      'Real-time data updates via WebSocket connections',
      'Drag-and-drop dashboard customization',
      'Export to PDF/CSV with scheduled reports',
      'Dark/light mode with custom themes',
    ],
    metrics: [
      { label: 'Daily Active Users', value: '5,000+' },
      { label: 'Widgets Created', value: '25K+' },
      { label: 'Data Points/Day', value: '10M+' },
    ],
    images: {
      thumbnail: '/projects/dashboard.png',
    },
    links: {
      live: 'https://example.com',
      github: 'https://github.com',
    },
    color: '#3B82F6',
  },
  {
    id: '4',
    slug: 'ai-writing-platform',
    title: 'AI Writing Platform',
    tagline: 'Content creation powered by Claude',
    description: 'A comprehensive AI writing platform that helps content creators produce high-quality blog posts, social media content, and marketing copy. Features include tone adjustment, SEO optimization, and plagiarism detection.',
    role: 'Full Stack Developer',
    duration: '5 months',
    year: '2025',
    category: 'ai',
    tech: ['Next.js', 'Claude API', 'Vercel AI SDK', 'Supabase', 'Stripe'],
    highlights: [
      'Multi-model support (GPT-4, Claude, Gemini)',
      'Built-in SEO analyzer and keyword suggestions',
      'Team collaboration with real-time editing',
      'Integrated payments with Stripe subscriptions',
    ],
    metrics: [
      { label: 'Articles Generated', value: '150K+' },
      { label: 'Paying Customers', value: '500+' },
      { label: 'MRR', value: '$8K' },
    ],
    images: {
      thumbnail: '/projects/writing-platform.png',
    },
    links: {
      live: 'https://example.com',
    },
    color: '#EC4899',
  },
  {
    id: '5',
    slug: 'mobile-fitness-app',
    title: 'AI Fitness Coach',
    tagline: 'Personalized workouts with computer vision',
    description: 'A mobile fitness app that uses computer vision to track exercise form and provide real-time feedback. The AI coach creates personalized workout plans based on user goals, equipment availability, and fitness level.',
    role: 'Mobile Developer',
    duration: '4 months',
    year: '2024',
    category: 'mobile',
    tech: ['React Native', 'TensorFlow Lite', 'Firebase', 'Node.js', 'MediaPipe'],
    highlights: [
      'Real-time pose estimation for form correction',
      'Personalized workout generation with AI',
      'Progress tracking with detailed analytics',
      'Social features with friend challenges',
    ],
    metrics: [
      { label: 'App Downloads', value: '25K+' },
      { label: 'App Store Rating', value: '4.7★' },
      { label: 'Workouts Completed', value: '200K+' },
    ],
    images: {
      thumbnail: '/projects/fitness-app.png',
    },
    links: {
      live: 'https://apps.apple.com',
    },
    color: '#F59E0B',
  },
  {
    id: '6',
    slug: 'data-pipeline',
    title: 'ML Data Pipeline',
    tagline: 'End-to-end MLOps infrastructure',
    description: 'Built a robust data pipeline for machine learning workflows, handling data ingestion, transformation, feature engineering, model training, and deployment. Supports both batch and streaming data processing.',
    role: 'Data Engineer',
    duration: '3 months',
    year: '2024',
    category: 'data',
    tech: ['Python', 'Apache Airflow', 'Spark', 'Kubernetes', 'MLflow', 'dbt'],
    highlights: [
      'Automated feature engineering pipelines',
      'Model versioning and experiment tracking',
      'A/B testing framework for model deployments',
      'Cost optimization reduced cloud spend by 40%',
    ],
    metrics: [
      { label: 'Models Deployed', value: '50+' },
      { label: 'Daily Pipeline Runs', value: '1,000+' },
      { label: 'Cost Savings', value: '40%' },
    ],
    images: {
      thumbnail: '/projects/data-pipeline.png',
    },
    links: {
      github: 'https://github.com',
    },
    color: '#14B8A6',
  },
]
