import type { NextConfig } from 'next'
import { BASE_PATH as basePath } from './lib/site'

// Served from https://juan-ramirez-dev.github.io/portfolio/ (GitHub Pages, static export)
const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  assetPrefix: `${basePath}/`,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
}

export default nextConfig
