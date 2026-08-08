/**
 * Single source of truth for the site's z-index scale — matches the
 * --z-header/--z-overlay custom properties in app/globals.css. Import these
 * instead of hardcoding z-40/z-50 class strings in individual components.
 */
export const Z_INDEX = {
  header: "z-[var(--z-header)]",
  overlay: "z-[var(--z-overlay)]",
} as const;
