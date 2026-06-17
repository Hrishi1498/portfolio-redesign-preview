'use client'

import { cn } from '@/lib/utils'
import { BOOKING_URL } from '@/lib/site'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const navLinks = [{ href: BOOKING_URL, label: 'Contact', external: true }] as const

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  return (
    <>
      <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <div className="w-full px-6 md:px-12 lg:px-16">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link href="/" className="flex items-center gap-3 group" onClick={() => setMobileMenuOpen(false)}>
              <Image
                src="/logos/bitblabs-logo.svg"
                alt="BitBLabs"
                width={32}
                height={32}
                className="w-8 h-8 object-contain opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <span className="font-display text-sm font-bold tracking-tight text-white">
                BitBLabs
              </span>
            </Link>

            <ul className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  {'external' in link && link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-heading text-sm text-zinc-500 hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="font-heading text-sm text-zinc-500 hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              aria-label="Toggle menu"
            >
              <span className={cn('block w-5 h-px bg-white transition-all', mobileMenuOpen && 'rotate-45 translate-y-[3.5px]')} />
              <span className={cn('block w-5 h-px bg-white transition-all', mobileMenuOpen && 'opacity-0')} />
              <span className={cn('block w-5 h-px bg-white transition-all', mobileMenuOpen && '-rotate-45 -translate-y-[3.5px]')} />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={cn(
          'fixed inset-0 z-40 md:hidden bg-base/98 backdrop-blur-xl transition-all duration-300',
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        )}
      >
        <ul className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              {'external' in link && link.external ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-display text-3xl font-bold text-white hover:text-zinc-400 transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-display text-3xl font-bold text-white hover:text-zinc-400 transition-colors"
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
