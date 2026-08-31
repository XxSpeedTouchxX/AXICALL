import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

const SUGGESTIONS = [
  { href: "/estimation", label: "Estimer mon véhicule" },
  { href: "/vendre-sa-voiture", label: "Les 5 façons de vendre sa voiture" },
  { href: "/combien-vaut-ma-voiture", label: "Combien vaut ma voiture" },
  { href: "/contact", label: "Nous contacter" },
];

export default function NotFound() {
  return (
    <main className="relative overflow-hidden bg-black px-4 py-24 text-bone">
      <div
        className="pointer-events-none absolute -right-[10%] -top-[30%] h-[140%] w-[55%]"
        style={{ background: "radial-gradient(circle, rgba(255,74,28,0.18) 0%, transparent 58%)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-xl text-center">
        <p className="eyebrow mb-4">— Erreur 404</p>
        <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
          Cette page n&apos;existe pas.
        </h1>
        <p className="mb-9 text-bone/70">
          Le lien est peut-être erroné ou la page a été déplacée. Voici par où continuer.
        </p>

        <Link href="/estimation" className="inline-block">
          <Button>
            Estimer mon véhicule gratuitement
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </Link>

        <ul className="mt-10 flex flex-col gap-2.5 border-t border-bone/10 pt-8 text-sm">
          {SUGGESTIONS.map((s) => (
            <li key={s.href}>
              <Link href={s.href} className="text-bone/70 underline transition-colors hover:text-bone">
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
