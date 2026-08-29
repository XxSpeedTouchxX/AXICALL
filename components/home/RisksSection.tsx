import { Reveal } from "@/components/ui/Reveal";

const RISKS = [
  { n: "01", title: "Paiements non sécurisés", text: "Faux chèques, virements non garantis : vous découvrez le problème après coup, quand l'acheteur a déjà le véhicule." },
  { n: "02", title: "Rendez-vous risqués", text: "Essais avec des inconnus, rendez-vous fixés sans aucune vérification préalable de l'acheteur." },
  { n: "03", title: "Négociation abusive", text: "Sans expertise du marché, il est difficile de savoir si le prix proposé est juste ou si vous êtes en train de le brader." },
  { n: "04", title: "Temps perdu", text: "Appels et messages à toute heure, visites qui n'aboutissent pas, annonce qui traîne pendant des semaines." },
];

export function RisksSection() {
  return (
    <section className="bg-[var(--bone)] px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <p className="eyebrow mb-4">— Le constat</p>
        <h2 className="max-w-xl text-2xl font-bold leading-tight tracking-tight text-[var(--ink)] md:text-3xl">
          Vendre seul, c&apos;est prendre tous les <span className="text-[var(--accent)]">risques</span> pour
          vous-même.
        </h2>
        <p className="mt-4 max-w-lg text-[var(--muted)]">
          La vente entre particuliers rapporte plus sur le papier — mais elle vous expose seul à des
          acheteurs que vous ne connaissez pas, à toute heure du jour.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {RISKS.map((r, i) => (
            <Reveal key={r.n} delay={i * 0.08}>
              <div className="h-full border-l-[3px] border-[var(--accent)] bg-white p-6 transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-lg">
                <p className="eyebrow mb-3">Risque {r.n}</p>
                <h3 className="mb-2 font-bold tracking-tight text-[var(--ink)]">{r.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--muted)]">{r.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
