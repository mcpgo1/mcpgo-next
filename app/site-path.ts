/** Prefix public-folder URLs when deployed as a GitHub Pages project site.
 * Next.js automatically prefixes next/link routes and built CSS/JS assets.
 * It does not prefix URLs referencing files in public/.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH === "/" ? "" : process.env.NEXT_PUBLIC_BASE_PATH || "";

export function publicPath(path: `/${string}`): string {
  return `${basePath}${path}`;
}
