const STEPS = [
  { title: "Remplissez votre estimation", desc: "Renseignez les informations de votre véhicule en quelques minutes." },
  { title: "Recevez une analyse", desc: "Notre outil calcule une première estimation personnalisée." },
  { title: "Un expert vous rappelle", desc: "Un conseiller Axicall affine l'estimation avec vous." },
  { title: "Finalisez votre vente", desc: "Vous choisissez de vendre au meilleur prix, en toute simplicité." },
];

export function HowItWorks({ preview = false }: { preview?: boolean }) {
  const steps = preview ? STEPS.slice(0, 4) : STEPS;
  return (
    <section className="px-4 py-16">
      <h2 className="mb-10 text-center text-2xl font-bold text-[var(--color-navy)]">
        Comment ça marche
      </h2>
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <div key={s.title} className="text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-orange)] font-bold text-white">
              {i + 1}
            </div>
            <h3 className="mb-2 font-semibold text-[var(--color-navy)]">{s.title}</h3>
            <p className="text-sm text-[var(--color-gray-600)]">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
