/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],
  images: {
    domains: ['images.unsplash.com'],
  },
  async redirects() {
    return [
      {
        source: '/projects',
        destination: '/work',
        permanent: true,
      },
      {
        source: '/projects/:slug',
        destination: '/work/:slug',
        permanent: true,
      },
      {
        source: '/case-studies',
        destination: '/work',
        permanent: true,
      },
      {
        source: '/case-studies/:slug',
        destination: '/work',
        permanent: true,
      },
      {
        source: '/brain-stuff',
        destination: '/',
        permanent: true,
      },
      {
        source: '/side-quests',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
