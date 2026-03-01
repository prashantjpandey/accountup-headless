import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/design-your-finops-stack",
        destination: "/finstack",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
