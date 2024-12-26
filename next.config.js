/** @type {import('next').NextConfig} */
const { createProxyMiddleware } = require('http-proxy-middleware');
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/rss/:path*',
        destination: 'https://www.ntv.com.tr/:path*',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/posts/anasayfa',
        permanent: false,
      },
      {
        source: '/not-found',
        destination: '/not-found',
        permanent: false,
      },
    ];
  },

  images: {
    domains: ['cdn1.ntv.com.tr'], // Buraya görsel kaynağını ekleyin
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