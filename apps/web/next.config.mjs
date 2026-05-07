/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  transpilePackages: [
    '@speakwise/types',
    '@speakwise/schemas',
    '@speakwise/db',
    '@speakwise/ai',
    '@speakwise/events',
  ],
  serverExternalPackages: ['@prisma/client'],
};

export default nextConfig;
