import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["recharged-assets.s3.us-east-1.amazonaws.com", "example.com"],
  },
};

export default nextConfig;
