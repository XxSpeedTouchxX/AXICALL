import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="bg-[var(--color-navy)] px-4 py-20 text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
        <div>
          <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
            Obtenez une estimation gratuite de votre véhicule en quelques minutes
          </h1>
          <p className="mb-8 text-lg text-white/80">
            Recevez une estimation personnalisée et découvrez combien vaut réellement votre
            voiture.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/estimation">
              <Button>Estimer mon véhicule</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline-inverse">Être rappelé</Button>
            </Link>
          </div>
        </div>
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image
            src="/hero-car.jpg"
            alt="Véhicule d'occasion premium"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
