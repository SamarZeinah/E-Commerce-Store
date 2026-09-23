
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://e-commerce-app-saf.vercel.app/:path*",
      },
    ];
  },
};

export default nextConfig;
