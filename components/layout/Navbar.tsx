'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const TIDYCAL_URL = 'https://tidycal.com/bitblabs/project-discussion'

const navLinks = [
  { href: '/projects', label: 'Projects' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/side-quests', label: 'Side Quests' },
  { href: '/brain-stuff', label: 'Brain Stuff' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [bookingModalOpen, setBookingModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  // Close booking modal on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setBookingModalOpen(false)
    }
    if (bookingModalOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      if (bookingModalOpen) document.body.style.overflow = 'unset'
    }
  }, [bookingModalOpen])

  const openBooking = () => {
    setMobileMenuOpen(false)
    setBookingModalOpen(true)
  }

  const closeBooking = () => {
    setBookingModalOpen(false)
    document.body.style.overflow = 'unset'
  }

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-500',
          scrolled || mobileMenuOpen
            ? 'bg-dark-900/70 backdrop-blur-2xl border-b border-white/[0.08] shadow-2xl shadow-black/20' 
            : 'bg-transparent'
        )}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-0 group" onClick={() => setMobileMenuOpen(false)}>
              <div className="relative">
                <Image
                  src="/logos/bitblabs-logo.svg"
                  alt="BitBLabs logo"
                  width={44}
                  height={44}
                  priority
                  className={cn(
                    "w-9 h-9 sm:w-11 sm:h-11 object-contain",
                    "drop-shadow-[0_0_12px_rgba(139,92,246,0.5)]",
                    "transition-all duration-300",
                    "group-hover:scale-105 group-hover:rotate-3"
                  )}
                />
                {/* Animated glow ring */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400 opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-white text-base sm:text-lg tracking-tight">
                  BitBLabs<span className="text-purple-500">.</span>
                </span>
                <span className="text-[10px] text-zinc-500 font-medium tracking-wider hidden sm:block">
                  Best in the Business
                </span>
              </div>
            </Link>

            {/* Navigation Links - Desktop */}
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
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Desktop CTA */}
              <button
                type="button"
                onClick={() => setBookingModalOpen(true)}
                className={cn(
                  "hidden sm:block px-5 py-2.5 rounded-xl",
                  "font-heading text-sm font-semibold text-white",
                  "bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400",
                  "hover:from-purple-400 hover:via-blue-400 hover:to-cyan-300",
                  "shadow-[0_0_20px_rgba(139,92,246,0.4)]",
                  "hover:shadow-[0_0_30px_rgba(34,211,238,0.6)]",
                  "transition-all duration-300"
                )}
              >
                Let's talk
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={cn(
                  "md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg",
                  "hover:bg-white/[0.05] transition-colors",
                  "focus:outline-none"
                )}
                aria-label="Toggle menu"
              >
                <span className={cn(
                  "block w-5 h-0.5 bg-white rounded-full transition-all duration-300",
                  mobileMenuOpen ? "rotate-45 translate-y-1" : ""
                )} />
                <span className={cn(
                  "block w-5 h-0.5 bg-white rounded-full my-1 transition-all duration-300",
                  mobileMenuOpen ? "opacity-0" : ""
                )} />
                <span className={cn(
                  "block w-5 h-0.5 bg-white rounded-full transition-all duration-300",
                  mobileMenuOpen ? "-rotate-45 -translate-y-1" : ""
                )} />
              </button>
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

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden",
          "bg-dark-900/95 backdrop-blur-xl",
          "transition-all duration-300",
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        <div className="flex flex-col items-center justify-center h-full pt-16">
          <ul className="flex flex-col items-center gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block px-8 py-4 rounded-xl",
                    "font-heading text-xl font-medium text-zinc-300",
                    "hover:text-white hover:bg-white/[0.05]",
                    "transition-all duration-200",
                    "active:scale-95"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Mobile CTA */}
          <div className="flex flex-col items-center gap-4 mt-8">
            <button
              type="button"
              onClick={openBooking}
              className={cn(
                "px-8 py-3 rounded-xl",
                "font-heading text-base font-semibold text-white",
                "bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400",
                "shadow-[0_0_20px_rgba(139,92,246,0.4)]",
                "transition-all duration-300",
                "active:scale-95"
              )}
            >
              Let's talk
            </button>
          </div>
        </div>
      </div>

      {/* Booking modal */}
      {bookingModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={closeBooking}
          role="dialog"
          aria-modal="true"
          aria-label="Book a project discussion"
        >
          <div
            className="relative w-full max-w-2xl h-[80vh] max-h-[700px] bg-dark-900 rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3 bg-dark-900/95 border-b border-white/10 z-10">
              <span className="font-heading text-sm font-medium text-white">Project Discussion – Book a call</span>
              <button
                type="button"
                onClick={closeBooking}
                className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <iframe
              src={TIDYCAL_URL}
              title="Book a project discussion with BitB Labs"
              className="absolute top-12 left-0 right-0 bottom-0 w-full h-[calc(100%-3rem)] border-0"
            />
          </div>
        </div>
      )}
    </>
  )
}
