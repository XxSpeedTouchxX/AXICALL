import { Reveal } from "@/components/ui/Reveal";

const STEPS = [
  { n: "01", title: "Remplissez votre estimation", desc: "Renseignez les informations de votre véhicule en quelques minutes." },
  { n: "02", title: "Recevez une analyse", desc: "Notre outil calcule une première estimation personnalisée." },
  { n: "03", title: "Un expert vous rappelle", desc: "Un conseiller Axicall affine l'estimation avec vous." },
  { n: "04", title: "Finalisez votre vente", desc: "Vous choisissez de vendre au meilleur prix, en toute simplicité." },
];

export function HowItWorks({ preview = false, hideHeading = false }: { preview?: boolean; hideHeading?: boolean }) {
  const steps = preview ? STEPS.slice(0, 3) : STEPS;

  return (
    <section className="relative overflow-hidden bg-white px-4 pb-16 pt-24">
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full blur-3xl"
        style={{ background: "var(--accent)", opacity: 0.06 }}
        aria-hidden="true"
      />
      {!hideHeading && (
        <div className="relative mx-auto mb-12 max-w-6xl text-center">
          <p className="eyebrow mb-3">— Le processus</p>
          <h2 className="text-2xl font-bold tracking-tight text-[var(--ink)] md:text-3xl">
            Comment ça marche
          </h2>
        </div>
      )}
      <div className="relative mx-auto max-w-3xl">
        {steps.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08}>
            <div
              className={`grid grid-cols-[52px_1fr] items-start gap-5 border-t border-[var(--line)] py-6 sm:grid-cols-[64px_1fr] ${
                i === steps.length - 1 ? "border-b" : ""
              }`}
            >
              <span className="text-3xl font-bold leading-none tracking-tight text-[var(--accent)]">
                {s.n}
              </span>
              <div>
                <h3 className="mb-1 font-bold tracking-tight text-[var(--ink)]">{s.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--muted)]">{s.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
