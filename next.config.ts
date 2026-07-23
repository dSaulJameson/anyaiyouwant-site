import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/services/modernization-automation",
        destination: "/services/growth-systems-automation",
        permanent: true,
      },
    ];
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
