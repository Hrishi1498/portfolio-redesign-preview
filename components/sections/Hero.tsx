'use client'

import { Button } from '@/components/ui'
import Image from 'next/image'
import Link from 'next/link'
import { portfolioProjects } from '@/lib/portfolio-data'

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

            {/* Navigation Links */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10">
              <Link href="/projects">
                <Button variant="secondary" size="lg">
                  Projects
                </Button>
              </Link>
              <Link href="/case-studies">
                <Button variant="secondary" size="lg">
                  Case Studies
                </Button>
              </Link>
              <Link href="/side-quests">
                <Button variant="secondary" size="lg">
                  Side Quests
                </Button>
              </Link>
              <Link href="/brain-stuff">
                <Button variant="secondary" size="lg">
                  Brain Stuff
                </Button>
              </Link>
            </div>

            {/* Social proof */}
            <div>
              <p className="font-body text-sm text-zinc-500 mb-4">
                Explore projects like:
              </p>
              
              {/* Project names */}
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-x-6 gap-y-2">
                {portfolioProjects.slice(0, 6).map((project) => (
                  <span
                    key={project.id}
                    className="font-heading text-sm font-medium text-zinc-600 tracking-wide"
                  >
                    {project.title}
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
