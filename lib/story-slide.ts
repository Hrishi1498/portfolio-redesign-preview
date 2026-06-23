export interface StorySlide {
  id: number
  type: 'intro' | 'scene' | 'insight' | 'problem' | 'solution' | 'conclusion' | 'testimonial' | 'gallery' | 'features' | 'stats' | 'process' | 'architecture'
  character?: 'happy' | 'thinking' | 'surprised' | 'excited' | 'confused' | 'pointing'
  characterPosition?: 'left' | 'right' | 'center'
  title?: string
  dialogue?: string
  content: string
  highlight?: string
  code?: string
  emoji?: string
  image?: string
  testimonialImages?: string[]
  galleryImages?: string[]
  features?: { icon: string; title: string; description: string }[]
  stats?: { value: string; label: string; icon?: string }[]
  steps?: { number: number; title: string; description: string }[]
  layers?: { name: string; description: string; icon: string; color: string }[]
}
