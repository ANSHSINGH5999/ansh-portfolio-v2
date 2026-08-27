"use client";

import { useSyncExternalStore } from "react";

/** SSR-safe media query hook via useSyncExternalStore — avoids the
 * effect+setState-on-mount pattern for a value only known in the browser. */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onStoreChange);
      return () => mql.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}
