export interface Founder {
  id: string
  name: string
  initials: string
  role: string
  bio: string
  linkedIn: string
}

export const founders: Founder[] = [
  {
    id: 'shubham',
    name: 'Shubham Gupta',
    initials: 'SG',
    role: 'Business, Product & Go-to-Market',
    bio: 'Worked across SaaS products, AI systems, and business software execution with direct exposure to scaling product workflows and solving operational inefficiencies.',
    linkedIn: 'https://www.linkedin.com/in/gshubham',
  },
  {
    id: 'shlok',
    name: 'Shlok Sawant',
    initials: 'SS',
    role: 'Technology & Product Architecture',
    bio: 'Leads technical development and product systems, with strong hands-on experience building production-grade software and AI implementations.',
    linkedIn: 'https://www.linkedin.com/in/shlok-sawant',
  },
]
