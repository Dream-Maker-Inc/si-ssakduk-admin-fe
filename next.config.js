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
    domains: ['ssakduk-admin-fe.s3.ap-northeast-2.amazonaws.com'],
    loader: 'akamai',
    path: '',
  },
  assetPrefix: '/',
  trailingSlash: true,
}

module.exports = nextConfig
