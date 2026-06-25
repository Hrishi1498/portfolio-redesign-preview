import { Noto_Sans_Display, Space_Grotesk, Syne } from 'next/font/google'

export const notoSansDisplay = Noto_Sans_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-noto-sans-display',
})

export const syne = Syne({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-syne',
})

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-space-grotesk',
})
