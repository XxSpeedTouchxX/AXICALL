import type { Metadata } from "next";
import { Testimonials } from "@/components/sections/Testimonials";

export const metadata: Metadata = {
  title: "Avis clients | MonEstimationAuto",
  description: "Découvrez les témoignages de nos clients ayant estimé et vendu leur véhicule.",
};

export default function AvisClientsPage() {
  return (
    <main>
      <h1 className="pt-12 text-center text-3xl font-bold text-[var(--color-navy)]">Avis clients</h1>
      <Testimonials />
    </main>
  );
}
