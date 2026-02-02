export interface Principle {
  id: string
  emoji: string
  title: string
  description: string
  content?: string
  comingSoon?: boolean
}

export interface Category {
  id: string
  emoji: string
  title: string
  description: string
  principles: Principle[]
}

export const psychologyCategories: Category[] = [
  {
    id: 'prompting',
    emoji: '💬',
    title: 'Prompting',
    description: 'How you communicate with AI dramatically affects the quality of responses you get.',
    principles: [
      {
        id: 'chain-of-thought',
        emoji: '🔗',
        title: 'Chain of Thought',
        description: 'Breaking down complex problems into steps improves AI reasoning',
        content: 'When you ask an AI to "think step by step," it activates more deliberate reasoning patterns. This technique can improve accuracy on math, logic, and multi-step problems by up to 40%.',
      },
      {
        id: 'role-prompting',
        emoji: '🎭',
        title: 'Role Prompting',
        description: 'Assigning a persona to AI changes its behavior and expertise',
        content: 'Telling an AI "You are an expert Python developer" primes it to respond with more technical accuracy and adopt relevant communication patterns.',
      },
      {
        id: 'few-shot-learning',
        emoji: '📝',
        title: 'Few-Shot Learning',
        description: 'Examples in prompts dramatically improve output quality',
        content: 'Providing 2-3 examples of your desired output format helps the AI understand exactly what you want, reducing back-and-forth iterations.',
      },
      {
        id: 'context-window',
        emoji: '🪟',
        title: 'Context Window Effect',
        description: 'Information at the start and end of prompts gets more attention',
        content: 'Like human memory, AI models pay more attention to the beginning and end of conversations. Put your most important instructions there.',
      },
      {
        id: 'specificity-principle',
        emoji: '🎯',
        title: 'Specificity Principle',
        description: 'Vague prompts lead to vague answers',
        content: 'The more specific your request, the more useful the response. "Write a 500-word blog post about React hooks for beginners" beats "Write about React."',
      },
      {
        id: 'negative-prompting',
        emoji: '🚫',
        title: 'Negative Prompting',
        description: 'Telling AI what NOT to do can be as important as what to do',
        content: 'Adding constraints like "Don\'t use technical jargon" or "Avoid clichés" helps narrow down the output space to what you actually want.',
      },
      {
        id: 'temperature-intuition',
        emoji: '🌡️',
        title: 'Temperature Intuition',
        description: 'Creativity vs. consistency is a sliding scale',
        comingSoon: true,
      },
      {
        id: 'prompt-injection',
        emoji: '💉',
        title: 'Prompt Injection Awareness',
        description: 'Understanding how prompts can be manipulated',
        comingSoon: true,
      },
    ],
  },
  {
    id: 'understanding',
    emoji: '🧠',
    title: 'Understanding',
    description: 'Mental models for how AI actually works under the hood.',
    principles: [
      {
        id: 'hallucination-detection',
        emoji: '👻',
        title: 'Hallucination Detection',
        description: 'AI confidently makes things up -learn to spot it',
        content: 'AI models don\'t "know" facts -they predict likely text. This means they can confidently state false information. Always verify critical facts from authoritative sources.',
      },
      {
        id: 'token-thinking',
        emoji: '🧩',
        title: 'Token Thinking',
        description: 'AI sees text as chunks, not characters or words',
        content: 'Understanding tokenization helps explain why AI struggles with character counting, spelling tasks, and why some prompts work better than others.',
      },
      {
        id: 'attention-mechanism',
        emoji: '👁️',
        title: 'Attention Mechanism',
        description: 'How AI decides what parts of your input matter most',
        content: 'Transformers use "attention" to weigh different parts of input. This is why clear structure and formatting in prompts leads to better results.',
      },
      {
        id: 'emergent-abilities',
        emoji: '✨',
        title: 'Emergent Abilities',
        description: 'Some capabilities only appear at scale',
        content: 'Larger models suddenly gain abilities that smaller ones lack entirely -like multi-step reasoning or code generation. It\'s not linear improvement.',
      },
      {
        id: 'training-cutoff',
        emoji: '📅',
        title: 'Training Cutoff Awareness',
        description: 'AI knowledge has an expiration date',
        content: 'Every AI model has a knowledge cutoff date. For recent events, news, or rapidly changing fields, AI may have outdated or no information.',
      },
      {
        id: 'stochastic-nature',
        emoji: '🎲',
        title: 'Stochastic Nature',
        description: 'The same prompt can give different answers',
        content: 'AI outputs are probabilistic, not deterministic. Running the same prompt twice may yield different results -this is a feature, not a bug.',
      },
      {
        id: 'reasoning-limits',
        emoji: '🧮',
        title: 'Reasoning Limits',
        description: 'AI struggles with certain types of logic',
        comingSoon: true,
      },
      {
        id: 'multimodal-fusion',
        emoji: '🖼️',
        title: 'Multimodal Fusion',
        description: 'How AI combines text, images, and audio understanding',
        comingSoon: true,
      },
    ],
  },
  {
    id: 'building',
    emoji: '🔧',
    title: 'Building',
    description: 'Principles for creating AI-powered applications that actually work.',
    principles: [
      {
        id: 'rag-pattern',
        emoji: '📚',
        title: 'RAG Pattern',
        description: 'Retrieval-Augmented Generation grounds AI in your data',
        content: 'Instead of fine-tuning, you can give AI access to a knowledge base. It retrieves relevant context before generating, dramatically reducing hallucinations.',
      },
      {
        id: 'agent-loops',
        emoji: '🔄',
        title: 'Agent Loops',
        description: 'AI that can plan, act, and learn from results',
        content: 'AI agents use a loop: Think → Act → Observe → Repeat. This pattern enables complex multi-step tasks that single prompts can\'t handle.',
      },
      {
        id: 'tool-use',
        emoji: '🛠️',
        title: 'Tool Use Pattern',
        description: 'Giving AI access to external capabilities',
        content: 'AI becomes far more powerful when it can call APIs, run code, or search the web. The key is defining clear tool interfaces and handling errors gracefully.',
      },
      {
        id: 'guardrails',
        emoji: '🛡️',
        title: 'Guardrails Pattern',
        description: 'Constraining AI outputs for safety and quality',
        content: 'Output validation, content filtering, and structured output schemas help ensure AI behaves predictably in production environments.',
      },
      {
        id: 'human-in-loop',
        emoji: '🤝',
        title: 'Human-in-the-Loop',
        description: 'When to keep humans involved in AI workflows',
        content: 'For high-stakes decisions, design systems where AI assists but humans approve. This builds trust and catches errors before they cause harm.',
      },
      {
        id: 'evaluation-mindset',
        emoji: '📊',
        title: 'Evaluation Mindset',
        description: 'You can\'t improve what you don\'t measure',
        content: 'Before optimizing prompts or models, define clear success metrics. A/B test changes systematically rather than relying on intuition.',
      },
      {
        id: 'fine-tuning-decision',
        emoji: '🎛️',
        title: 'Fine-Tuning Decision',
        description: 'When to customize a model vs. better prompting',
        comingSoon: true,
      },
      {
        id: 'latency-tradeoffs',
        emoji: '⚡',
        title: 'Latency Tradeoffs',
        description: 'Balancing speed, cost, and quality in AI systems',
        comingSoon: true,
      },
    ],
  },
  {
    id: 'ethics',
    emoji: '⚖️',
    title: 'Ethics',
    description: 'Responsible AI use and the biases we need to watch for.',
    principles: [
      {
        id: 'bias-awareness',
        emoji: '🎭',
        title: 'Bias Awareness',
        description: 'AI inherits biases from its training data',
        content: 'AI models can perpetuate stereotypes, discrimination, and unfairness present in their training data. Critical evaluation is essential, especially for high-stakes decisions.',
      },
      {
        id: 'transparency-principle',
        emoji: '🔍',
        title: 'Transparency Principle',
        description: 'Users should know when they\'re interacting with AI',
        content: 'Hiding AI involvement erodes trust. Clear disclosure helps users calibrate their expectations and verify important information.',
      },
      {
        id: 'automation-bias',
        emoji: '🤖',
        title: 'Automation Bias',
        description: 'Over-trusting AI because it seems authoritative',
        content: 'Humans tend to defer to AI suggestions even when wrong. Combat this by encouraging critical thinking and making AI uncertainty visible.',
      },
      {
        id: 'environmental-cost',
        emoji: '🌍',
        title: 'Environmental Cost',
        description: 'AI training and inference have real energy costs',
        content: 'Large model training can emit tons of CO2. Consider whether you need the biggest model, or if a smaller, efficient one suffices for your use case.',
      },
      {
        id: 'privacy-first',
        emoji: '🔒',
        title: 'Privacy-First Design',
        description: 'AI shouldn\'t require unnecessary personal data',
        content: 'Minimize data collection, anonymize when possible, and be transparent about what data is used for training or improving models.',
      },
      {
        id: 'job-displacement',
        emoji: '💼',
        title: 'Job Displacement Awareness',
        description: 'AI changes work -prepare for transitions',
        content: 'Rather than replacement, focus on augmentation. Identify which tasks AI can handle so humans can focus on higher-value work.',
      },
      {
        id: 'consent-data',
        emoji: '✋',
        title: 'Data Consent',
        description: 'Training data should be ethically sourced',
        comingSoon: true,
      },
      {
        id: 'deepfake-literacy',
        emoji: '🎬',
        title: 'Deepfake Literacy',
        description: 'Understanding AI-generated media risks',
        comingSoon: true,
      },
    ],
  },
]
