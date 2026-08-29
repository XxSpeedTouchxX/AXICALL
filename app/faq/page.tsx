import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { FAQAccordion } from "@/components/sections/FAQAccordion";

export const metadata: Metadata = {
  title: "FAQ | MonEstimationAuto",
  description: "Toutes les réponses à vos questions sur l'estimation et la vente de votre véhicule.",
};

export default function FAQPage() {
  return (
    <main>
      <PageHeader eyebrow="Questions" title="Questions fréquentes" />
      <div className="px-4 py-16">
        <FAQAccordion />
      </div>
    </main>
  );
}
