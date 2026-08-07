const TESTIMONIALS = [
  { name: "Sophie L.", city: "Nantes", text: "Estimation reçue en 2 minutes et rappelée le jour même. Vente conclue en une semaine." },
  { name: "Karim B.", city: "Toulouse", text: "Process simple, pas de mauvaise surprise sur le prix annoncé." },
  { name: "Amélie R.", city: "Lille", text: "J'ai comparé plusieurs offres, celle-ci était la plus rapide et la plus claire." },
];

export function Testimonials({ preview = false }: { preview?: boolean }) {
  const items = preview ? TESTIMONIALS.slice(0, 2) : TESTIMONIALS;
  return (
    <section className="bg-white px-4 py-16">
      <h2 className="mb-10 text-center text-2xl font-bold text-[var(--color-navy)]">Avis clients</h2>
      <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t) => (
          <blockquote key={t.name} className="rounded-lg border border-[var(--color-gray-200)] p-6">
            <p className="mb-4 text-[var(--color-gray-600)]">&ldquo;{t.text}&rdquo;</p>
            <footer className="text-sm font-semibold text-[var(--color-navy)]">
              {t.name} — {t.city}
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
