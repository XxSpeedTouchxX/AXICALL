import { Reveal } from "@/components/ui/Reveal";
import { COMPANY } from "@/lib/company";

const PLANS = [
  {
    title: "Reprise classique",
    points: ["Vente simple et rapide", "Prix souvent inférieur à la valeur réelle", "Reprise conditionnée à un nouvel achat"],
    highlighted: false,
  },
  {
    title: "Vente entre particuliers",
    points: ["Vous gérez seul toute la vente", "Appels à toute heure, négociations à gérer", "Transaction non sécurisée"],
    highlighted: false,
  },
  {
    title: `Avec ${COMPANY.publicName}`,
    points: ["Prix optimisé selon le marché", "Acheteurs et rendez-vous pris en charge", "Vous gardez la main jusqu'à la vente"],
    highlighted: true,
  },
];

export function ComparisonPlans() {
  return (
    <section className="bg-white px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <p className="eyebrow mb-4">— Nos avantages</p>
        <h2 className="max-w-lg text-2xl font-bold leading-tight tracking-tight text-[var(--ink)] md:text-3xl">
          Pourquoi passer par <span className="text-[var(--accent)]">{COMPANY.publicName} ?</span>
        </h2>
        <div className="mt-10 grid items-stretch gap-4 md:grid-cols-3">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.title} delay={i * 0.08} className="h-full">
              <div
                className={`flex h-full flex-col border-t-[3px] p-7 transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 ${
                  plan.highlighted
                    ? "relative border-[var(--accent)] bg-[var(--black)] text-[var(--bone)] shadow-lg hover:shadow-xl"
                    : "border-[var(--ink)] bg-[var(--paper)] text-[var(--ink)] hover:shadow-lg"
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 right-5 bg-[var(--accent)] px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-[var(--black)]">
                    Recommandé
                  </span>
                )}
                <h3 className="mb-4 font-bold tracking-tight">{plan.title}</h3>
                <ul className="flex flex-col gap-2.5">
                  {plan.points.map((point) => (
                    <li
                      key={point}
                      className={`flex gap-2 text-sm leading-relaxed ${
                        plan.highlighted ? "text-[var(--bone)]/80" : "text-[var(--muted)]"
                      }`}
                    >
                      <span className={`shrink-0 font-bold ${plan.highlighted ? "text-[var(--accent)]" : "text-[var(--muted)]"}`}>
                        {plan.highlighted ? "+" : "–"}
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
