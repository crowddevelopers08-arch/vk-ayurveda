import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Site images are served from Cloudinary
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/lb2my6df/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
