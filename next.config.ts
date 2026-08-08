import type { NextConfig } from "next";

// Baseline security headers. script-src/style-src keep 'unsafe-inline' since
// Next.js's App Router injects inline hydration scripts/styles without a
// nonce by default — a nonce-based CSP would be a stricter follow-up, not a
// blocker for launch. connect-src allows geo.api.gouv.fr for the address
// autocomplete (CityPostalFields) client-side fetch calls.
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "media-src 'self'",
      "font-src 'self' data:",
      "connect-src 'self' https://geo.api.gouv.fr",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
