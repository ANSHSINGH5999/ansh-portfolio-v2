"use client";

import Script from "next/script";
import { XLogoIcon } from "@/components/icons/brand-icons";

const HANDLE = process.env.NEXT_PUBLIC_X_HANDLE?.replace(/^@/, "");

/**
 * Uses X's official embedded-timeline widget (platform.twitter.com/widgets.js)
 * — free, no API key, no rate limits, and it's the one path that still works
 * reliably now that most public Nitter mirrors are dead. Requires
 * NEXT_PUBLIC_X_HANDLE to be set; renders a plain CTA otherwise.
 */
export function XFeed() {
  // No handle configured — omit the block rather than showing a visitor a
  // setup instruction. Set NEXT_PUBLIC_X_HANDLE in .env.local to enable it.
  if (!HANDLE) return null;

  return (
    <div className="overflow-hidden rounded-md border border-line bg-paper">
      <p className="flex items-center gap-2 border-b border-line px-4 py-2 font-mono text-xs uppercase tracking-wide text-muted">
        <XLogoIcon className="h-3.5 w-3.5" aria-hidden="true" /> @{HANDLE} on X
      </p>
      <div className="max-h-[420px] overflow-y-auto p-2">
        <a
          className="twitter-timeline"
          data-height="400"
          data-theme="dark"
          data-chrome="noheader nofooter noborders transparent"
          href={`https://twitter.com/${HANDLE}?ref_src=twsrc%5Etfw`}
        >
          Tweets by @{HANDLE}
        </a>
      </div>
      <Script src="https://platform.twitter.com/widgets.js" strategy="afterInteractive" />
    </div>
  );
}
