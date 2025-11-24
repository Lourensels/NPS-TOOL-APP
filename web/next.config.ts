import type { NextConfig } from "next"
import path from "path"

const nextConfig: NextConfig = {
  output: "export",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
}

export default nextConfig
