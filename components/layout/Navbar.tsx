'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
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
          <Link href="/" className="flex items-center gap-0 group">
            <div className="relative">
              <Image
                src="/logos/bitblabs-logo.svg"
                alt="BitBLabs logo"
                width={44}
                height={44}
                priority
                className={cn(
                  "w-11 h-11 object-contain",
                  "drop-shadow-[0_0_12px_rgba(139,92,246,0.5)]",
                  "transition-all duration-300",
                  "group-hover:scale-105 group-hover:rotate-3"
                )}
              />
              {/* Animated glow ring */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400 opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-white text-lg tracking-tight">
                BitBLabs<span className="text-purple-500">.</span>
              </span>
              <span className="text-[10px] text-zinc-500 font-medium tracking-wider hidden sm:block">
                Best in the Business
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
                "font-heading text-sm font-semibold text-white",
                "bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400",
                "hover:from-purple-400 hover:via-blue-400 hover:to-cyan-300",
                "shadow-[0_0_20px_rgba(139,92,246,0.4)]",
                "hover:shadow-[0_0_30px_rgba(34,211,238,0.6)]",
                "transition-all duration-300"
              )}
            >
              Let's go
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom line when scrolled */}
      <div 
        className={cn(
          "absolute bottom-0 left-0 right-0 h-px",
          "bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-cyan-400/30",
          "transition-opacity duration-500",
          scrolled ? "opacity-100" : "opacity-0"
        )}
      />
    </nav>
  )
}
