import type { NextConfig } from 'next'

// Served from https://juan-ramirez-dev.github.io/portfolio/ (GitHub Pages, static export)
const basePath = '/portfolio'

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  assetPrefix: `${basePath}/`,
  trailingSlash: true,
  images: { unoptimized: true },
}

export default nextConfig
