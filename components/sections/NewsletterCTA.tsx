'use client'

import { Button, Input } from '@/components/ui'
import { PixelKun, DataChan } from '@/components/mascots'
import { useState } from 'react'

export function NewsletterCTA() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setStatus('success')
    setEmail('')
    setTimeout(() => setStatus('idle'), 3000)
  }

  return (
    <section id="newsletter" className="py-20 bg-white">
      <div className="max-w-xl mx-auto px-6 text-center">
        {/* Mascots */}
        <div className="flex justify-center items-end gap-2 mb-6">
          <PixelKun size={70} />
          <DataChan size={70} expression="excited" />
      </div>

          {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
          Stay in the loop
          </h2>

        <p className="text-medium mb-8">
          Get weekly AI tutorials delivered to your inbox. No spam, just valuable content.
          </p>

          {/* Form */}
        {status === 'success' ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 animate-fade-in">
            <p className="text-green-700 font-medium">
              🎉 You're in! Check your inbox to confirm.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input
                  type="email"
                placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading'}
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
              disabled={status === 'loading'}
                className="whitespace-nowrap"
              >
              {status === 'loading' ? 'Joining...' : 'Subscribe free'}
              </Button>
          </form>
        )}

        <p className="mt-4 text-sm text-muted">
            Join 10,000+ AI learners · Unsubscribe anytime
          </p>
      </div>
    </section>
  )
}
