const BADGES = [
  { title: "Estimation gratuite", desc: "Aucun frais, aucun engagement." },
  { title: "Réponse rapide", desc: "Un expert vous recontacte sous 24h." },
  { title: "Accompagnement personnalisé", desc: "Un interlocuteur dédié à votre projet." },
  { title: "Réseau de professionnels", desc: "Des acheteurs qualifiés partout en France." },
];

export function TrustBadges() {
  return (
    <section className="bg-white px-4 py-16">
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {BADGES.map((b) => (
          <div key={b.title} className="rounded-lg border border-[var(--color-gray-200)] p-6">
            <h3 className="mb-2 font-semibold text-[var(--color-navy)]">{b.title}</h3>
            <p className="text-sm text-[var(--color-gray-600)]">{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
