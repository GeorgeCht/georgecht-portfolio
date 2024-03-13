/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/cloud/assets/:path*',
        destination: `https://res.cloudinary.com/:path*`,
      },
    ]
  },
}

export default nextConfig
