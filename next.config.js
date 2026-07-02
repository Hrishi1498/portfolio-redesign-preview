/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],
  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1024, 1080, 1200, 1920, 2048],
  },
  async redirects() {
    return [
      {
        source: '/work',
        destination: '/projects',
        permanent: true,
      },
      {
        source: '/work/:slug',
        destination: '/projects/:slug',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
