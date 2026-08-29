import type { ReactNode } from "react";
import { PageHeader } from "./PageHeader";

interface LegalPageProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

/**
 * Shared shell for the legal pages (mentions légales, confidentialité, CGU).
 * Wraps their <section>/<h2>/<p> content in a card and applies consistent
 * typography, so each page only has to supply its text.
 */
export function LegalPage({ eyebrow, title, subtitle, children }: LegalPageProps) {
  return (
    <main>
      <PageHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <div className="bg-[var(--paper)] px-4 py-14">
        <div className="mx-auto max-w-3xl border border-[var(--line)] bg-white px-6 py-10 shadow-lg sm:px-10">
          <div className="legal-prose">{children}</div>
        </div>
      </div>
    </main>
  );
}
