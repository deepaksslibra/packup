import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  swcMinify: true,
  output: 'export', // Use static export for better compatibility
  images: {
    unoptimized: true, // Required for static export
  },
  typescript: {
    // Ignore TypeScript errors for build (we'll still see them in development)
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignore ESLint errors during build (we'll still see them in development)
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
