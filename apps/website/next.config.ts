import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TODO: Change later
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
