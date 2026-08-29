import { Reveal } from "@/components/ui/Reveal";

const STEPS = [
  { n: "01", title: "Demande d'estimation", desc: "Complétez le formulaire en moins d'une minute — plaque d'immatriculation ou saisie manuelle.", meta: "30 sec" },
  { n: "02", title: "Appel gratuit", desc: "Un conseiller vous recontacte et vous met en relation avec une agence proche de chez vous.", meta: "Sous 24h" },
  { n: "03", title: "Rendez-vous en agence", desc: "Estimation du prix, accompagnement et conseils par un professionnel local.", meta: "Sur place" },
];

export function LandingMethod() {
  return (
    <section className="relative overflow-hidden bg-white px-4 pb-16 pt-24">
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full blur-3xl"
        style={{ background: "var(--accent)", opacity: 0.06 }}
        aria-hidden="true"
      />
      <div className="relative mx-auto mb-12 max-w-3xl">
        <p className="eyebrow mb-3">— La méthode</p>
        <h2 className="text-2xl font-bold tracking-tight text-[var(--ink)] md:text-3xl">
          Un processus simple en <span className="text-[var(--accent)]">3 étapes.</span>
        </h2>
      </div>
      <div className="relative mx-auto max-w-3xl">
        {STEPS.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08}>
            <div
              className={`grid grid-cols-[52px_1fr] items-center gap-5 border-t border-[var(--line)] py-7 sm:grid-cols-[64px_1fr_auto] ${
                i === STEPS.length - 1 ? "border-b" : ""
              }`}
            >
              <span className="text-3xl font-bold leading-none tracking-tight text-[var(--accent)]">{s.n}</span>
              <div>
                <h3 className="mb-1 font-bold tracking-tight text-[var(--ink)]">{s.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--muted)]">{s.desc}</p>
              </div>
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] sm:text-right">
                {s.meta}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
