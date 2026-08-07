import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section className="bg-[var(--color-gray-50)] px-4 py-16 text-center">
      <h2 className="mb-4 text-2xl font-bold text-[var(--color-navy)]">
        Prêt à connaître la valeur de votre véhicule ?
      </h2>
      <Link href="/estimation">
        <Button>Estimer mon véhicule gratuitement</Button>
      </Link>
    </section>
  );
}
