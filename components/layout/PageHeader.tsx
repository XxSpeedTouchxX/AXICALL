import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
}

/** Shared black + top-right-glow banner used at the top of standalone marketing pages. */
export function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-[var(--black)] px-4 py-16 text-center text-[var(--bone)] md:py-20">
      <div
        className="pointer-events-none absolute -right-[10%] -top-[40%] h-[180%] w-[55%]"
        style={{ background: "radial-gradient(circle, rgba(255,74,28,0.18) 0%, transparent 58%)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-2xl">
        {eyebrow && <p className="eyebrow mb-3">— {eyebrow}</p>}
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
        {subtitle && <p className="mt-4 text-[var(--bone)]/70">{subtitle}</p>}
      </div>
    </section>
  );
}
