import localFont from 'next/font/local'
import { Space_Grotesk, Syne } from 'next/font/google'

/** Google Sans Flex — open-source brand sans (SIL OFL). */
export const googleSansFlex = localFont({
  src: [
    {
      path: '../node_modules/@fontsource-variable/google-sans-flex/files/google-sans-flex-latin-wght-normal.woff2',
      style: 'normal',
    },
    {
      path: '../node_modules/@fontsource-variable/google-sans-flex/files/google-sans-flex-latin-ext-wght-normal.woff2',
      style: 'normal',
    },
  ],
  variable: '--font-google-sans-flex',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
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
