import type { Metadata } from 'next'
import './globals.css'
import { googleSansFlex } from '@/lib/fonts'

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
    <html lang="en" className={googleSansFlex.variable}>
      <body className={`${googleSansFlex.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
