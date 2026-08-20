import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/newsnapbild',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: '/newsnapbild',
  },
};

export default nextConfig;