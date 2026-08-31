import type { ReactNode } from "react";
import { Info } from "lucide-react";

interface CalloutProps {
  title: string;
  children: ReactNode;
}

/** Highlighted aside — "Ce qu'il faut comprendre", "Ce chiffre est un exemple", etc. */
export function Callout({ title, children }: CalloutProps) {
  return (
    <aside className="my-8 border-l-[3px] border-accent bg-paper/70 px-5 py-4">
      <p className="mb-1.5 flex items-center gap-2 font-bold tracking-tight text-ink">
        <Info className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
        {title}
      </p>
      <div className="text-[0.95rem] leading-relaxed text-muted">{children}</div>
    </aside>
  );
}

/** The "L'essentiel à retenir" summary block that closes each pillar page. */
export function KeyPoints({ points }: { points: string[] }) {
  return (
    <div className="my-10 border border-line bg-white p-6 sm:p-7">
      <p className="eyebrow mb-4">— L&apos;essentiel à retenir</p>
      <ul className="flex list-none flex-col gap-3 p-0">
        {points.map((p) => (
          <li key={p} className="relative pl-6 text-[0.95rem] leading-relaxed text-muted">
            <span className="absolute left-0 font-bold text-accent" aria-hidden="true">
              +
            </span>
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}
