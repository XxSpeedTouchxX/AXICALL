import { Reveal } from "@/components/ui/Reveal";

const TESTIMONIALS = [
  { headline: "Réactivité et sérieux", name: "Sophie L.", city: "Nantes", text: "Estimation reçue en 2 minutes et rappelée le jour même. Vente conclue en une semaine." },
  { headline: "Aucune mauvaise surprise", name: "Karim B.", city: "Toulouse", text: "Process simple, pas de mauvaise surprise sur le prix annoncé." },
  { headline: "Estimation juste", name: "Amélie R.", city: "Lille", text: "J'ai comparé plusieurs offres, celle-ci était la plus rapide et la plus claire." },
];

const ZONES = ["Dunkerque", "Littoral Nord", "Métropole Lilloise", "Lille", "Perpignan", "Fos-sur-Mer", "Istres", "Marseille", "+ nouvelles zones chaque mois"];

export function LandingTestimonials() {
  return (
    <section className="bg-white px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <p className="eyebrow mb-4">— Résultats</p>
        <h2 className="text-2xl font-bold tracking-tight text-[var(--ink)] md:text-3xl">
          Ce que disent <span className="text-[var(--accent)]">nos vendeurs.</span>
        </h2>
        <p className="mt-5 mb-9 font-mono text-xs tracking-wide text-[var(--muted)]">
          Exemples illustratifs — en attente de vrais témoignages clients.
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <div className="h-full border-l-[3px] border-[var(--accent)] bg-white p-6 shadow-sm transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-2.5 tracking-[2px] text-[var(--accent)]">★★★★★</div>
                <h3 className="mb-1.5 font-bold tracking-tight text-[var(--ink)]">{t.headline}</h3>
                <p className="mb-3 text-sm leading-relaxed text-[var(--muted)]">&ldquo;{t.text}&rdquo;</p>
                <span className="font-mono text-xs font-medium text-[var(--muted)]">— {t.name}, {t.city}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {ZONES.map((zone) => (
            <span
              key={zone}
              className="border border-[var(--line)] bg-[var(--paper)] px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-wider text-[var(--muted)]"
            >
              {zone}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
