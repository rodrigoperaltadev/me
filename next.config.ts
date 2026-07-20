import { execSync } from "node:child_process";
import type { NextConfig } from "next";

function gitShort(): string {
  try { return execSync("git rev-parse --short HEAD").toString().trim(); } catch { return "local"; }
}
function buildDate(): string {
  return new Date().toISOString().slice(0, 10);
}

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_GIT_SHA: gitShort(),
    NEXT_PUBLIC_BUILD_DATE: buildDate(),
    NEXT_PUBLIC_SITE_VERSION: "1.0.0",
  },
  experimental: {
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
    ],
  },
};

export default nextConfig;
