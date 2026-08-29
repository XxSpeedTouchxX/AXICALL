import { Reveal } from "@/components/ui/Reveal";

const TESTIMONIALS = [
  { name: "Sophie L.", city: "Nantes", text: "Estimation reçue en 2 minutes et rappelée le jour même. Vente conclue en une semaine." },
  { name: "Karim B.", city: "Toulouse", text: "Process simple, pas de mauvaise surprise sur le prix annoncé." },
  { name: "Amélie R.", city: "Lille", text: "J'ai comparé plusieurs offres, celle-ci était la plus rapide et la plus claire." },
];

export function Testimonials({ preview = false, hideHeading = false }: { preview?: boolean; hideHeading?: boolean }) {
  const items = preview ? TESTIMONIALS.slice(0, 2) : TESTIMONIALS;
  return (
    <section className="bg-[var(--paper)] px-4 py-16">
      {!hideHeading && (
        <div className="mb-2 text-center">
          <p className="eyebrow mb-3">— Témoignages</p>
          <h2 className="text-2xl font-bold tracking-tight text-[var(--ink)] md:text-3xl">Avis clients</h2>
        </div>
      )}
      <p className="mb-10 text-center text-xs text-[var(--muted)]">
        Exemples illustratifs — en attente de vrais témoignages clients.
      </p>
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.1} className="relative pt-3">
            <div
              className="pointer-events-none absolute inset-0 top-3 border border-[var(--accent)]"
              aria-hidden="true"
            />
            <blockquote className="relative h-full bg-[var(--black)] p-7 text-[var(--bone)]">
              <p className="relative mb-5 pl-5 text-sm leading-relaxed text-[var(--bone)]/85">
                <span className="absolute left-0 font-bold text-[var(--accent)]">→</span>
                {t.text}
              </p>
              <footer className="text-sm font-bold tracking-tight">
                {t.name} <span className="font-normal text-[var(--bone)]/50">— {t.city}</span>
              </footer>
            </blockquote>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
