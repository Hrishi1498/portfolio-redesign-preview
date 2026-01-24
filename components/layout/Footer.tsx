'use client'

import { navLinks, socialLinks } from '@/lib/data'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-cream border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-accent-purple rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="font-bold text-dark text-lg">AI Weekly</span>
            </div>
            <p className="text-medium text-sm max-w-xs">
              Learn AI through fun visual comics. Master transformers, LLMs, and more in just 5 min per week.
          </p>
        </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-dark mb-4">Navigation</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-medium hover:text-dark transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-dark mb-4">Connect</h4>
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-medium hover:text-dark transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-muted">
            © 2026 AI Weekly. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
