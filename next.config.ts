import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: process.env.GITHUB_ACTIONS ? "/HelloEra-Onboarding" : "",
  assetPrefix: process.env.GITHUB_ACTIONS ? "/HelloEra-Onboarding/" : undefined,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
