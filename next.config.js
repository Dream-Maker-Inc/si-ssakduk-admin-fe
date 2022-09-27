/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/main',
        permanent: true,
      },
    ]
  },
  images: {
    loader: 'akamai',
    path: '/',
  },
  assetPrefix: '/',
}

module.exports = nextConfig
