import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function CTASection() {
  return (
    <section className="bg-white px-4 py-16">
      <Reveal>
        <div className="relative mx-auto grid max-w-4xl items-center gap-6 overflow-hidden bg-[var(--black)] px-6 py-10 text-[var(--bone)] sm:grid-cols-[1fr_auto] sm:px-10">
          <div
            className="pointer-events-none absolute -right-[10%] -top-[40%] h-[220%] w-[45%]"
            style={{ background: "radial-gradient(circle, rgba(255,74,28,0.2) 0%, transparent 60%)" }}
            aria-hidden="true"
          />
          <h2 className="relative text-2xl font-bold tracking-tight md:text-3xl">
            Prêt à connaître la valeur de votre véhicule ?
          </h2>
          <Link href="/estimation" className="relative">
            <Button className="w-full sm:w-auto">Estimer gratuitement</Button>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
