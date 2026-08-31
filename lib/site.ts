/**
 * Canonical public origin of the site, used for metadata, canonical URLs,
 * the sitemap and robots.txt. Override with NEXT_PUBLIC_SITE_URL (set it in
 * the cPanel "Setup Node.js App" environment variables) — handy for a staging
 * subdomain. No trailing slash.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://estimer-mon-auto.fr"
).replace(/\/$/, "");
