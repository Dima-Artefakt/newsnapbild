// next.config.ts
import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  output: isDev ? undefined : 'export',
  basePath: isDev ? '' : '/newsnapbild',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: isDev ? '' : '/newsnapbild',
  },
};

export default nextConfig;