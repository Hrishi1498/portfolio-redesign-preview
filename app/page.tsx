import { Navbar } from '@/components/layout'
import { Hero } from '@/components/sections'

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-900">
      <Navbar />
      <Hero />
    </main>
  )
}
