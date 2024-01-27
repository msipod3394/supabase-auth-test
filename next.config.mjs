/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['fpgicblhwyqwgpsefmdy.supabase.co'],
  }
};

export default nextConfig;
