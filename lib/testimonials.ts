export interface Testimonial {
  id: string
  quote: string
  name: string
  role: string
  company: string
  projectSlug: string
}

export const testimonials: Testimonial[] = [
  {
    id: 'digipropass',
    quote:
      'They turned EU Digital Product Passport requirements into a real platform: QR passports, sustainability scoring, and separate admin, brand, and consumer layers. We went from LinkedIn intro to MVP ready for pilot onboarding.',
    name: 'Keishika Mahesh',
    role: 'Founder & CEO',
    company: 'DigiProPass',
    projectSlug: 'digipropass',
  },
  {
    id: 'healthy-fasal',
    quote:
      'Our zero-inventory model needed software that could keep up: vendor wallets, collection centers, sales onboarding, all in sync. The platform now runs real volume across cities with over a crore in monthly turnover.',
    name: 'Mr. Kamlesh',
    role: 'Founder',
    company: 'Healthy Fasal',
    projectSlug: 'healthy-fasal',
  },
  {
    id: 'natvoiz',
    quote:
      'Recruitment follow-ups were burning out our team. BitBLabs built a voice platform our ops staff could configure themselves, with latency down to around 300ms, and manual follow-ups dropped by 35 to 45 percent.',
    name: 'Natsoft Leadership',
    role: 'Enterprise Operations',
    company: 'Natsoft',
    projectSlug: 'natvoiz-ai',
  },
  {
    id: 'setoo',
    quote:
      'We needed backend voice APIs that plugged into our stack, not a black-box demo. The same modular system went live for us, then BU Bhandari, then Vani Connect, without rebuilding from scratch.',
    name: 'Harish Boke',
    role: 'Founder',
    company: 'Setoo',
    projectSlug: 'setoo-voice-ai',
  },
  {
    id: 'axion-plan',
    quote:
      'My forecasting lived in Excel and worked, but it could not scale. They translated years of financial logic into a SaaS product with OCR ingestion and AI insights executives can actually query in plain English.',
    name: 'Dr. Steven',
    role: 'Founder',
    company: 'Axion Plan',
    projectSlug: 'axion-plan',
  },
  {
    id: 'course-companion',
    quote:
      'Universities will not adopt generic AI tools. We needed professor-controlled companions with strict privacy, no student data training, and no lock-in. BitBLabs understood that from day one and built the architecture around it.',
    name: 'Zoheb',
    role: 'Founder',
    company: 'Course Companion',
    projectSlug: 'course-companion',
  },
]
