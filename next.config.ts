import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // swcMinify is not recognized in new Next.js versions
  // swcMinify: true,
  
  // Instead of static export, use a regular server build
  // output: 'export', 
  
  images: {
    domains: ['localhost'], // Add any other image domains you need
    // Remove unoptimized since we're not using static export
    // unoptimized: true,
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
