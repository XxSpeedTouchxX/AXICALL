import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const OFFER_POINTS = [
  "Estimation fixée avec vous, selon le marché réel",
  "Acheteurs, appels et rendez-vous pris en charge par l'agence",
  "Vous gardez votre voiture jusqu'à sa vente effective",
  "Aucune donnée personnelle diffusée publiquement",
];

export function OfferSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--black)] px-4 py-20 text-[var(--bone)]">
      <div
        className="pointer-events-none absolute -right-[10%] -top-[30%] h-[90%] w-[55%]"
        style={{ background: "radial-gradient(circle, rgba(255,74,28,0.16) 0%, transparent 58%)" }}
        aria-hidden="true"
      />
      <Reveal className="relative mx-auto max-w-2xl">
        <p className="eyebrow mb-4">— Notre offre</p>
        <h2 className="text-2xl font-bold leading-tight tracking-tight md:text-3xl">
          Une estimation juste. Une agence qui{" "}
          <span className="text-[var(--accent)]">s&apos;occupe de tout.</span>
        </h2>
        <div className="mt-8 flex flex-col gap-4">
          {OFFER_POINTS.map((point) => (
            <div key={point} className="flex gap-3 text-[var(--bone)]/85">
              <span className="font-bold text-[var(--accent)]">+</span>
              {point}
            </div>
          ))}
        </div>
        <Link href="/estimation" className="mt-8 inline-block">
          <Button>Estimer ma voiture →</Button>
        </Link>
      </Reveal>
    </section>
  );
}
