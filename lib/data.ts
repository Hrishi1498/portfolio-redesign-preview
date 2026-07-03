import type { StorySlide } from './story-slide'

export interface CaseStudy {
  id: string
  slug: string
  title: string
  description: string
  category: string
  readTime: string
  thumbnail: string
  color: string
  featured?: boolean
  subtitle?: string
  author?: string
  date?: string
  slides?: StorySlide[]
  takeaways?: string[]
  nextSlug?: string
  prevSlug?: string
}

export const caseStudies: CaseStudy[] = [
  {
    id: '1',
    slug: 'genai-high-volume-hiring',
    title: 'How Generative AI Is Transforming High-Volume Hiring',
    description: 'A deep dive into how GenAI is reshaping recruitment at scale, from resume screening to structured interviews.',
    subtitle: 'Industry Education: The shift from manual hiring to AI-augmented recruitment',
    category: 'recruitment',
    readTime: '12 min',
    thumbnail: '',
    color: '#3B82F6',
    featured: true,
    author: 'BitB Labs',
    date: 'Jan 29, 2026',
    slides: [
      {
        id: 1,
        type: 'intro',
        title: 'The Reality of High-Volume Hiring',
        content: 'High-volume hiring is where traditional recruitment systems start to crack. Companies hiring hundreds or thousands of candidates per year face a familiar set of challenges that technology alone has not solved.',
        highlight: 'Despite modern ATS tools, much of the process still relies on manual effort, human endurance, and heuristic judgment.',
      },
      {
        id: 2,
        type: 'problem',
        title: 'The Scale Problem',
        content: 'Thousands of applications per role. Recruiters juggling speed with quality. Business teams demanding fast closures. Candidates dropping off due to delays. Interviewers stretched thin.',
        highlight: 'Hiring teams work harder, but outcomes do not improve proportionally.',
      },
      {
        id: 3,
        type: 'process',
        title: 'Traditional High-Volume Workflow',
        content: 'To understand the impact of GenAI, it is important to first look at how high-volume hiring typically works.',
        steps: [
          { number: 1, title: 'Job Description Creation', description: 'Recruiters manually draft or reuse JDs with vague skill descriptions' },
          { number: 2, title: 'Resume Screening', description: 'Hundreds of resumes filtered by keywords under time pressure' },
          { number: 3, title: 'Interview Scheduling', description: 'Back-and-forth emails leading to candidate drop-offs' },
          { number: 4, title: 'Interviews & Feedback', description: 'Inconsistent questions, varying standards, delayed decisions' },
        ],
      },
      {
        id: 4,
        type: 'problem',
        title: 'The Hidden Cost',
        content: 'Recruiters were not just hiring, they were processing noise. Speed came at the cost of fairness. Fairness came at the cost of speed. This trade-off became the defining constraint of high-volume recruitment.',
        highlight: 'Traditional automation reduced effort but did not improve hiring quality.',
      },
      {
        id: 5,
        type: 'solution',
        title: 'Why Traditional Automation Hit a Ceiling',
        content: 'Most recruitment teams already use automation: ATS filters, email templates, scheduling tools. But these systems are rule-based. They struggle with understanding context in resumes, interpreting transferable skills, evaluating open-ended responses, and scaling human judgment.',
        highlight: 'At high volumes, automation reduced effort but did not improve hiring quality.',
      },
      {
        id: 6,
        type: 'scene',
        title: 'Enter Generative AI as Co-Pilot',
        content: 'Instead of replacing recruiters, the hiring team introduced GenAI as a co-pilot, inserted only at points where human judgment was being overloaded. The key principle: AI supports decisions. Humans make them.',
        highlight: 'AI supports decisions. Humans make them.',
      },
      {
        id: 7,
        type: 'features',
        title: 'Where GenAI Was Introduced',
        content: 'GenAI was selectively deployed at high-impact bottlenecks in the hiring workflow.',
        features: [
          { icon: '📄', title: 'Resume Understanding', description: 'Parse and extract skills, experience patterns, project depth' },
          { icon: '🎯', title: 'Skill Mapping', description: 'Compare extracted skills against role expectations' },
          { icon: '🎤', title: 'Structured Screening', description: 'AI-led role-specific and behavioral interviews' },
          { icon: '📊', title: 'Response Analysis', description: 'Generate structured summaries and skill indicators' },
          { icon: '🧠', title: 'Decision Support', description: 'Comparison views highlighting strengths and risks' },
          { icon: '✅', title: 'Human Final Call', description: 'No final recommendations, only insights for recruiters' },
        ],
      },
      {
        id: 8,
        type: 'scene',
        title: 'Resume Understanding, Not Rejection',
        content: 'GenAI parsed resumes to extract skills, experience patterns, and project depth. It normalized different resume formats into structured candidate profiles. Recruiters reviewed summarized skill profiles, not raw resumes.',
        highlight: 'Shortlisting shifted from keywords to capability signals.',
      },
      {
        id: 9,
        type: 'scene',
        title: 'AI-Led Structured Screening',
        content: 'Candidates received automated interview links. GenAI conducted role-specific questions, scenario-based assessments, and behavioral prompts. Interviews happened asynchronously, scaling interview capacity without interviewer burnout.',
        highlight: 'Interview capacity scaled without interviewer burnout.',
      },
      {
        id: 10,
        type: 'scene',
        title: 'Candidate Comparison Dashboard',
        content: 'AI provided comparison views across candidates, highlighting strengths, risks, and role fit. GenAI analyzed candidate responses and generated structured summaries with skill indicators and communication signals.',
        highlight: 'Recruiters reviewed insights, not raw recordings or transcripts.',
      },
      {
        id: 11,
        type: 'architecture',
        title: 'The After State: GenAI-Augmented Workflow',
        content: 'With GenAI integrated, the workflow transformed while keeping humans at the center.',
        layers: [
          { name: 'AI-Powered', description: 'Resume screening, interview standardization, feedback structuring', icon: '🤖', color: '#3B82F6' },
          { name: 'Human-Driven', description: 'Final shortlisting, cultural judgment, offer decisions, candidate conversations', icon: '👨‍💼', color: '#10B981' },
        ],
        highlight: 'The system did not remove humans. It removed chaos.',
      },
      {
        id: 12,
        type: 'stats',
        title: 'Measurable Impact',
        content: 'While this case study focuses on awareness, the outcomes were clear and measurable across multiple high-volume roles.',
        stats: [
          { value: '60-70%', label: 'Resume Screening Time Reduced', icon: '⏱️' },
          { value: '2-3x', label: 'Recruiter Capacity Increase', icon: '📈' },
          { value: 'Minutes', label: 'Feedback Turnaround (vs Days)', icon: '⚡' },
          { value: 'Improved', label: 'Interview Consistency', icon: '✅' },
        ],
        highlight: 'Quality did not decline. It improved.',
      },
      {
        id: 13,
        type: 'features',
        title: 'Key Learnings for Recruitment',
        content: 'Several patterns emerged that are relevant beyond this case.',
        features: [
          { icon: '🎯', title: 'Structured Hiring', description: 'GenAI works best with clear roles and skill definitions' },
          { icon: '💡', title: 'Skills Over Pedigree', description: 'Capability signals matter more than resume branding' },
          { icon: '🔄', title: 'Recruiters Evolve', description: 'From screeners to evaluators to decision-makers' },
          { icon: '⚖️', title: 'Speed + Fairness', description: 'AI removes bottlenecks that forced trade-offs' },
          { icon: '🧩', title: 'Workflow First', description: 'Where you place AI matters more than which model' },
          { icon: '📊', title: 'Data-Informed', description: 'Decisions based on signals, not gut instinct' },
        ],
      },
      {
        id: 14,
        type: 'solution',
        title: 'The Future of High-Volume Hiring',
        content: 'High-volume hiring is moving toward a new default: skills-first evaluation, structured interviews at scale, faster hiring cycles without burnout, and data-informed decisions instead of gut instinct.',
        highlight: 'Companies that delay this shift will not just hire slower. They will hire worse.',
      },
      {
        id: 15,
        type: 'conclusion',
        title: 'The Real Competitive Advantage',
        content: 'Generative AI did not replace recruiters. It absorbed the noise so recruiters could focus on judgment. And in high-volume hiring, judgment, not speed, is the real competitive advantage.',
        highlight: 'Judgment, not speed, is the real competitive advantage.',
      },
    ],
    takeaways: [
      'GenAI works best as a co-pilot, not a replacement for recruiters',
      'Skills-first evaluation outperforms keyword-based screening',
      'Structured AI interviews scale capacity without burnout',
      'Speed and fairness can coexist with the right AI placement',
      'Where you deploy AI matters more than which model you use',
      'Human judgment remains the ultimate differentiator',
    ],
  },
]
