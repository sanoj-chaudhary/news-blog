/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imagedelivery.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
  env: {
    API_URL: 'https://express.digitemtech.com/api',
    SECRETKEY:'Shz85ugerK267DR1',
  },
  i18n: {
  locales: ['en'],
  defaultLocale: 'en',
},
}

module.exports = nextConfig
