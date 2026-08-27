import type { NextConfig } from "next";

// The only third-party runtime resource this site loads is the X/Twitter
// embedded-timeline widget (see src/components/x-feed.tsx) — everything
// else (fonts, images, scripts) is self-hosted via next/font and the Next.js
// build output, so the policy stays tight around that one exception.
//
// 'unsafe-eval' is dev-only: React uses eval() in development to reconstruct
// server-side error stacks in the browser. It's never used in production —
// see https://nextjs.org/docs/app/guides/content-security-policy.
const isDev = process.env.NODE_ENV === "development";
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://platform.twitter.com https://*.twimg.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.twimg.com https://platform.twitter.com",
  "font-src 'self' data:",
  "connect-src 'self' https://platform.twitter.com https://*.twitter.com https://*.x.com https://*.twimg.com",
  "frame-src https://platform.twitter.com https://syndication.twitter.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  devIndicators: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-DNS-Prefetch-Control", value: "off" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
