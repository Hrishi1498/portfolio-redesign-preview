'use client'

import { Button } from '@/components/ui'
import Image from 'next/image'

const companies = [
  'Google',
  'Meta', 
  'Apple',
  'Stripe',
  'Shopify',
  'Netflix',
]

export function Hero() {
  return (
    <section className="min-h-screen flex items-center px-6 pt-20 pb-12 bg-dark-900">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left side - Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Main Headline */}
            <h1 className="font-display text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] leading-[1.1] font-bold text-white mb-6 tracking-tight">
              we make{' '}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">cool stuff</span>
                {/* Glow background */}
                <span className="absolute inset-0 bg-purple-500/20 blur-2xl -z-10" />
                {/* Underline */}
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 rounded-full" />
              </span>
              {' '}that slaps.
            </h1>

            {/* Subheadline */}
            <p className="font-body text-lg md:text-xl text-zinc-400 mb-10 mx-auto lg:mx-0 leading-relaxed">
              learn AI through visual stories that actually slap.<br />
              no boring lectures, just 5 min/week of pure brain food.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6">
              <Button variant="google" size="lg">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign up with Google (Free)
              </Button>
              <Button variant="secondary" size="lg">
                Sign up with Email (Free)
              </Button>
            </div>

            {/* Privacy note */}
            <p className="font-body text-sm text-zinc-500 mb-10">
              By signing up, you agree with our{' '}
              <a href="#" className="text-zinc-400 hover:text-white underline underline-offset-2 transition-colors">
                Privacy Policy
              </a>.
            </p>

            {/* Social proof */}
            <div>
              <p className="font-body text-sm text-zinc-500 mb-4">
                Join <span className="text-white font-semibold">132,793</span> people from companies like:
              </p>
              
              {/* Company logos */}
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-x-6 gap-y-2">
                {companies.map((company) => (
                  <span
                    key={company}
                    className="font-heading text-sm font-medium text-zinc-600 tracking-wide"
                  >
                    {company}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Character Image */}
          <div className="flex-shrink-0 lg:-ml-8">
            <Image
              src="/landing.png"
              alt="Dan and LX"
              width={450}
              height={400}
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>

        </div>
      </div>
    </section>
  )
}
