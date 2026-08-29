import { Reveal } from "@/components/ui/Reveal";

const BADGES = [
  { n: "01", title: "Estimation gratuite", desc: "Aucun frais, aucun engagement." },
  { n: "02", title: "Réponse rapide", desc: "Un expert vous recontacte sous 24h." },
  { n: "03", title: "Accompagnement personnalisé", desc: "Un interlocuteur dédié à votre projet." },
  { n: "04", title: "Réseau de professionnels", desc: "Des acheteurs qualifiés partout en France." },
];

export function TrustBadges() {
  return (
    <div className="relative z-10 -mt-16 px-4">
      <Reveal>
        <div className="mx-auto grid max-w-6xl gap-px bg-[var(--line)] shadow-lg sm:grid-cols-2 lg:grid-cols-4">
          {BADGES.map((b) => (
            <div key={b.title} className="border-l-[3px] border-[var(--accent)] bg-white p-6">
              <p className="eyebrow mb-3">{b.n}</p>
              <h3 className="mb-2 font-bold tracking-tight text-[var(--ink)]">{b.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--muted)]">{b.desc}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
