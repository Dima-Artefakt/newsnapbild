import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production'
const repoName = 'newsnapbild'

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}` : '',
  trailingSlash: true,
  reactStrictMode: true,
  skipTrailingSlashRedirect: true,
  experimental: {
    optimizeCss: false,
  },
}

export default nextConfig