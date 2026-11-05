import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The camp page moved; links already shared to the old address keep working.
  async redirects() {
    return [{ source: "/camp", destination: "/camp-Mayiladuthurai", permanent: false }];
  },
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
