/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flowbite.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'flowbite.com',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.externals = {
        'node-fetch': "require('node-fetch')"
      }
    }
    return config
  }
}

module.exports = nextConfig