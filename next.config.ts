import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'hifzulquaranacademy.com',
          },
        ],
        destination: 'https://www.pinnaclehifzulquranacademy.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.hifzulquaranacademy.com',
          },
        ],
        destination: 'https://www.pinnaclehifzulquranacademy.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'pinnaclehifzulquaranacademy.com',
          },
        ],
        destination: 'https://www.pinnaclehifzulquranacademy.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.pinnaclehifzulquaranacademy.com',
          },
        ],
        destination: 'https://www.pinnaclehifzulquranacademy.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.pinnacleacademy.com',
          },
        ],
        destination: 'https://www.pinnaclehifzulquranacademy.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'pinnacleacademy.com',
          },
        ],
        destination: 'https://www.pinnaclehifzulquranacademy.com/:path*',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
