import type { Metadata } from "next";
import { FAQAccordion } from "@/components/sections/FAQAccordion";

export const metadata: Metadata = {
  title: "FAQ | MonEstimationAuto",
  description: "Toutes les réponses à vos questions sur l'estimation et la vente de votre véhicule.",
};

export default function FAQPage() {
  return (
    <main className="px-4 py-12">
      <h1 className="mb-10 text-center text-3xl font-bold text-[var(--color-navy)]">
        Questions fréquentes
      </h1>
      <FAQAccordion />
    </main>
  );
}
