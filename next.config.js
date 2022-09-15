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
    domains: ['cdn.pixabay.com', 'ureca.s3.ap-northeast-2.amazonaws.com'],
  },
}

module.exports = nextConfig
