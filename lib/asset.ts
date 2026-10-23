// Static export under a basePath: files in /public need the prefix by hand.
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export const asset = (path: string) => `${base}${path}`
