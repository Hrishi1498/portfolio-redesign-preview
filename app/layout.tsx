import type { Metadata } from 'next'
import './globals.css'
import { notoSansDisplay, spaceGrotesk, syne } from '@/lib/fonts'
import { SmoothScroll } from '@/components/providers/SmoothScroll'

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
    <html lang="en" className={`${notoSansDisplay.variable} ${syne.variable} ${spaceGrotesk.variable}`}>
      <body className={notoSansDisplay.className}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
