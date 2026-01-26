import type { StorySlide } from './data'

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
  slides?: StorySlide[]
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
  {
    id: '7',
    slug: 'digipropass',
    title: 'DigiProPass',
    tagline: 'EU-compliant Digital Product Passports for fashion',
    description: 'A SaaS platform that helps fashion brands create EU-compliant Digital Product Passports, track product lifecycle data, and transform compliance into brand storytelling opportunities.',
    role: 'Full Stack Developer',
    duration: '6 months',
    year: '2024',
    category: 'web',
    tech: ['Django', 'Django REST Framework', 'PostgreSQL', 'AWS', 'Docker', 'JWT', 'OAuth'],
    highlights: [
      'EU Digital Product Passport compliance for 2027 regulations',
      'QR-powered digital identities for every product',
      'Complete lifecycle tracking from raw materials to end-of-life',
      'API-first architecture for ERP and PLM integrations',
    ],
    metrics: [
      { label: 'Products Tracked', value: '10K+' },
      { label: 'Compliance Rate', value: '100%' },
      { label: 'Brand Partners', value: '50+' },
    ],
    images: {
      thumbnail: '/dpplogo.svg',
    },
    links: {
      live: 'https://digipropass.com/',
    },
    color: '#6366F1',
    featured: true,
    slides: [
      {
        id: 1,
        type: 'intro',
        title: 'The Story Behind DigiProPass',
        content: 'In 2024, while the European Union was finalizing one of the most ambitious sustainability regulations for the fashion industry — the Digital Product Passport mandate — a quiet but massive shift was underway. Fashion brands weren\'t just being asked to sell products anymore. They were being asked to prove their story — from raw material to end-of-life.',
        image: '/digipropass-meeting.png',
      },
      {
        id: 2,
        type: 'scene',
        title: 'Meeting Keshika Mahesh',
        content: 'That\'s when Keshika Mahesh, a sustainability-driven entrepreneur and the Founder & CEO of DigiProPass, reached out. Keshika works at the intersection of fashion, technology, and environmental compliance, helping brands prepare for a future where transparency isn\'t optional — it\'s the standard.',
        highlight: 'Her mission: Build a platform that doesn\'t just help brands comply with regulations — but helps them turn sustainability into a competitive advantage.',
        image: '/dpp_founder.png',
      },
      {
        id: 3,
        type: 'problem',
        title: 'The Core Challenge',
        content: 'She connected with us on LinkedIn with a simple but powerful problem statement: "How do we make complex product lifecycle data usable, compliant, and meaningful — for both regulators and customers?" That conversation became the foundation of DigiProPass.',
        highlight: 'Complex data needs to be simple, compliant, and meaningful — for both regulators and customers',
      },
      {
        id: 4,
        type: 'solution',
        title: 'From Problem to Platform',
        content: 'What started as a regulatory challenge quickly evolved into something bigger — a Digital Identity System for Fashion Products. Together, we designed and built a SaaS platform that allows brands to create EU-compliant Digital Product Passports, track materials and sustainability impact, generate QR-powered digital identities, and transform compliance data into brand storytelling tools.',
        highlight: 'DigiProPass isn\'t just about meeting 2027 regulations. It\'s about preparing fashion brands for a future where every product tells a verified, transparent, and trusted story.',
      },
      {
        id: 5,
        type: 'insight',
        title: 'How We Built It',
        content: 'DigiProPass is powered by a secure, scalable, and compliance-ready backend architecture designed to handle high-volume product data, regulatory workflows, and real-time QR interactions.',
        code: 'Backend Framework: Django\nAPI Layer: Django REST Framework\nDatabase: PostgreSQL\nCloud Infrastructure: AWS\nAuthentication: JWT + OAuth\nDevOps: Docker + CI/CD\nProduct Identity: QR code generation engine\nIntegrations: API-first architecture',
      },
      {
        id: 6,
        type: 'conclusion',
        title: 'Preparing for the Future',
        content: 'The platform enables brands to turn regulatory compliance into a competitive advantage while building consumer trust through transparency. Every product now tells a verified, transparent, and trusted story — from raw material to end-of-life.',
        highlight: 'Compliance becomes competitive advantage',
        image: '/step4-dashboard.png',
      },
      {
        id: 7,
        type: 'testimonial',
        title: 'What Our Client Says',
        content: 'Hear directly from Keshika Mahesh, Founder & CEO of DigiProPass, about her experience working with us.',
        testimonialImages: ['/digi1.png', '/digi2.png'],
      },
      {
        id: 8,
        type: 'gallery',
        title: 'Project Gallery',
        content: 'Explore the DigiProPass platform through these screenshots showcasing the dashboard, product management, digital passports, and customer-facing interfaces.',
        galleryImages: ['/gallery-a.png', '/gallery-b.png', '/gallery-c.png', '/gallery-d.png'],
      },
    ],
  },
]
