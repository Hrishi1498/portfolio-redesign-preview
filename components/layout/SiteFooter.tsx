'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { FooterWatermark } from '@/components/layout/FooterWatermark'

const TIDYCAL_URL = 'https://tidycal.com/bitblabs/project-discussion'

function SocialIcon({ name }: { name: 'instagram' | 'x' | 'linkedin' | 'github' }) {
  const paths: Record<typeof name, ReactNode> = {
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </>
    ),
    x: <path d="m4 4 16 16M20 4 4 20" />,
    linkedin: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M8 11v5M8 8.5v.01M12 16v-3c0-1.5 1-2.5 2.5-2.5S17 11.5 17 13v3" />
      </>
    ),
    github: (
      <path d="M9 19c-4 1.5-4-2.5-6-3m12 5v-3.5c0-1 .3-1.7 1-2.5-2.5-.3-5-1.3-5-5.5 0-1.1.4-2 1.1-2.7-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 1.1.9-.2 1.8-.3 2.7-.3s1.8.1 2.7.3c2.1-1.4 3-1.1 3-1.1.6 1.5.2 2.6.1 2.9.7.7 1.1 1.6 1.1 2.7 0 4.2-2.5 5.2-5 5.5.8.7 1 1.7 1 2.8V21" />
    ),
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-[18px] w-[18px]">
      {paths[name]}
    </svg>
  )
}

const socialLinks = [
  { href: '#', label: 'Instagram', icon: 'instagram' as const },
  { href: '#', label: 'Twitter / X', icon: 'x' as const },
  { href: '#', label: 'LinkedIn', icon: 'linkedin' as const },
  { href: '#', label: 'GitHub', icon: 'github' as const },
]

const linkColumns = [
  {
    title: 'Menu',
    links: [
      { href: '/work', label: 'Work' },
      { href: '/#process', label: 'Process' },
      { href: '/#contact', label: 'Contact' },
    ],
  },
  {
    title: 'Studio',
    links: [
      { href: '/case-studies', label: 'Case Studies' },
      { href: '/projects', label: 'Projects' },
      { href: '/brain-stuff', label: 'Brain Stuff' },
    ],
  },
  {
    title: 'More',
    links: [
      { href: '/side-quests', label: 'Side Quests' },
      { href: '#', label: 'Terms' },
      { href: '#', label: 'Privacy' },
    ],
  },
]

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-black px-6 pb-6 pt-16 sm:px-10 sm:pb-8 md:px-12 lg:px-16 lg:pt-20">
      <div className="relative z-10 mx-auto max-w-[1400px]">
        {/* Top — social, contact & link columns */}
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-20">
          <div>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-white hover:bg-white/5"
                >
                  <SocialIcon name={icon} />
                </a>
              ))}
            </div>

            <div className="mt-8 space-y-1.5 font-body text-sm leading-relaxed text-white">
              <p>Digital Product Studio</p>
              <p>Remote · Worldwide</p>
              <a
                href={TIDYCAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block pt-1 text-white transition-opacity hover:opacity-70"
              >
                Book a project discussion
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-3 sm:gap-x-14">
            {linkColumns.map((column) => (
              <div key={column.title}>
                <p className="font-heading text-xs uppercase tracking-[0.2em] text-white">
                  {column.title}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="font-body text-sm text-white transition-opacity hover:opacity-60"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider + CTA */}
        <div className="relative mt-16 sm:mt-20">
          <div className="h-px w-full bg-white/20" />
          <a
            href={TIDYCAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white px-7 py-3 font-heading text-sm font-medium text-black transition-opacity hover:opacity-85 sm:px-8"
          >
            Get Started
          </a>
        </div>

        {/* Description & legal */}
        <div className="mt-10 flex flex-col gap-8 lg:mt-12 lg:flex-row lg:items-start lg:justify-between">
          <p className="max-w-sm font-body text-sm leading-relaxed text-zinc-500">
            From product strategy to launch-ready builds. Our studio designs and engineers digital
            products that connect brands with their audience.
          </p>

          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <Link
              href="#"
              className="font-heading text-xs uppercase tracking-[0.16em] text-white transition-opacity hover:opacity-60"
            >
              Terms &amp; Conditions
            </Link>
            <Link
              href="#"
              className="font-heading text-xs uppercase tracking-[0.16em] text-white transition-opacity hover:opacity-60"
            >
              Privacy Policy
            </Link>
          </div>
        </div>

        <p className="sr-only">© {year} BitBLabs. Digital Product Studio.</p>
      </div>

      {/* Watermark */}
      <div className="relative mx-auto mt-10 max-w-[1400px] sm:mt-12">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              'radial-gradient(ellipse 90% 70% at 50% 50%, rgba(255, 170, 50, 0.06) 0%, transparent 65%)',
          }}
        />
        <FooterWatermark />
      </div>
    </footer>
  )
}
