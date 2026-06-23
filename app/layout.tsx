import type { Metadata } from 'next'
import './globals.css'
import { SmoothScroll } from '@/components/providers/SmoothScroll'
import { interBlack } from '@/lib/fonts'

export const metadata: Metadata = {
  title: {
    default: 'BitBLabs | Digital Product Studio',
    template: '%s | BitBLabs',
  },
  description:
    'BitBLabs designs and builds exceptional digital products: AI platforms, web applications, and premium user experiences.',
  icons: {
    icon: '/logos/bitblabs-logo.svg',
    apple: '/logos/bitblabs-logo.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={interBlack.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&family=Space+Grotesk:wght@400;500;600&family=Syne:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
