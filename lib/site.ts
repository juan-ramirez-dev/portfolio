// The public address, in one place. When the custom domain arrives, change SITE_URL
// and set BASE_PATH to '' — canonical URLs, hreflang and the sitemap all follow.
export const SITE_URL = 'https://juan-ramirez-dev.github.io'
export const BASE_PATH = '/portfolio'

/** a path inside the site, as a full URL for search engines */
export const absolute = (path: string) => `${SITE_URL}${BASE_PATH}${path}`
