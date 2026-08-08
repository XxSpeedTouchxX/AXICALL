import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind class strings, resolving conflicts deterministically
 * (last conflicting class wins) instead of relying on Tailwind's internal
 * CSS generation order — plain string concatenation silently picked the
 * wrong class once already (see the hero CTA contrast fix).
 */
export function cn(...classes: Array<string | undefined | false>): string {
  return twMerge(classes.filter(Boolean).join(" "));
}
