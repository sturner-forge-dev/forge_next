import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    reactCompiler: true
  },
  images: {
    domains: ['lh3.googleusercontent.com']
  }
}

export default nextConfig
