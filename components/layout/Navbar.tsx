'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const navLinks = [
  { href: '/projects', label: 'Projects' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/side-quests', label: 'Side Quests' },
  { href: '/brain-stuff', label: 'Brain Stuff' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'transition-all duration-500',
        scrolled 
          ? 'bg-dark-900/70 backdrop-blur-2xl border-b border-white/[0.08] shadow-2xl shadow-black/20' 
          : 'bg-transparent'
      )}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              {/* Fun Gen Z style logo box */}
              <div className="w-11 h-11 bg-gradient-to-br from-lime-400 via-emerald-400 to-cyan-400 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(163,230,53,0.4)] group-hover:shadow-[0_0_30px_rgba(163,230,53,0.6)] transition-all duration-300 group-hover:scale-105 group-hover:rotate-3">
                {/* BIB text logo */}
                <span className="font-display font-black text-sm text-zinc-900 tracking-tighter">BIB</span>
              </div>
              {/* Animated glow ring */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-lime-400 via-emerald-400 to-cyan-400 opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-300" />
              {/* Fun decorative dot */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.6)] group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-white text-lg tracking-tight">
                bib labs<span className="text-lime-400">.</span>
              </span>
              <span className="text-[10px] text-zinc-500 font-medium tracking-wider hidden sm:block">
                best in the business
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 rounded-lg",
                    "font-heading text-sm font-medium text-zinc-400",
                    "hover:text-white hover:bg-white/[0.05]",
                    "transition-all duration-200"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Link 
              href="#"
              className="font-heading text-sm font-medium text-zinc-400 hover:text-white transition-colors px-3 py-2"
            >
              Log in
            </Link>
            <Link
              href="#"
              className={cn(
                "px-5 py-2.5 rounded-xl",
                "font-heading text-sm font-semibold text-zinc-900",
                "bg-gradient-to-r from-lime-400 via-emerald-400 to-cyan-400",
                "hover:from-lime-300 hover:via-emerald-300 hover:to-cyan-300",
                "shadow-[0_0_20px_rgba(163,230,53,0.4)]",
                "hover:shadow-[0_0_30px_rgba(163,230,53,0.6)]",
                "transition-all duration-300"
              )}
            >
              let's go
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom line when scrolled */}
      <div 
        className={cn(
          "absolute bottom-0 left-0 right-0 h-px",
          "bg-lime-500/30",
          "transition-opacity duration-500",
          scrolled ? "opacity-100" : "opacity-0"
        )}
      />
    </nav>
  )
}
