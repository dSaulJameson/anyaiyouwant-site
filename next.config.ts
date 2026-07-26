import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/services/modernization-automation",
        destination: "/services/growth-marketing-media",
        permanent: true,
      },
      {
        source: "/services/growth-systems-automation",
        destination: "/services/growth-marketing-media",
        permanent: true,
      },
      {
        source: "/services/technical-leadership",
        destination: "/services/business-strategy-execution",
        permanent: true,
      },
    ];
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
