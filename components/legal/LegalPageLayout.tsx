import Link from 'next/link'
import type { ReactNode } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { SiteFooter } from '@/components/layout/SiteFooter'
import type { LegalSection } from '@/lib/legal/types'
import { PRIVACY_PATH, TERMS_PATH } from '@/lib/site'

interface LegalPageLayoutProps {
  title: string
  lastUpdated: string
  intro: ReactNode
  sections: LegalSection[]
  relatedPage: 'privacy' | 'terms'
}

export function LegalPageLayout({
  title,
  lastUpdated,
  intro,
  sections,
  relatedPage,
}: LegalPageLayoutProps) {
  const relatedHref = relatedPage === 'privacy' ? TERMS_PATH : PRIVACY_PATH
  const relatedLabel =
    relatedPage === 'privacy' ? 'Terms & Conditions' : 'Privacy Policy'

  return (
    <main className="relative min-h-screen bg-black">
      <Navbar theme="dark" position="static" />

      <article className="mx-auto max-w-3xl px-6 pb-8 pt-10 md:px-12 md:pt-14 lg:px-16">
        <Link
          href="/"
          className="font-body text-sm text-zinc-500 transition-opacity hover:opacity-60"
        >
          ← Back to home
        </Link>

        <header className="mt-8 space-y-3 md:mt-10">
          <h1 className="font-body text-3xl font-normal tracking-[-0.03em] text-white md:text-4xl">
            {title}
          </h1>
          <p className="font-body text-sm text-zinc-500">Last updated: {lastUpdated}</p>
        </header>

        <div className="mt-10 space-y-10 font-body text-sm leading-relaxed text-zinc-400 md:mt-12">
          <p>{intro}</p>

          {sections.map((section) => (
            <section key={section.title} className="space-y-3">
              <h2 className="font-heading text-xs uppercase tracking-[0.2em] text-zinc-500">
                {section.title}
              </h2>
              <div className="space-y-3">{section.body}</div>
            </section>
          ))}

          <nav
            aria-label="Related legal page"
            className="border-t border-white/10 pt-10"
          >
            <p className="font-body text-sm text-zinc-500">
              See also:{' '}
              <Link
                href={relatedHref}
                className="text-zinc-300 transition-opacity hover:opacity-60"
              >
                {relatedLabel}
              </Link>
            </p>
          </nav>
        </div>
      </article>

      <SiteFooter compact />
    </main>
  )
}
