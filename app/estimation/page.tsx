import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { StepForm } from "@/components/estimator/StepForm";

export const metadata: Metadata = {
  title: "Estimation gratuite de véhicule | MonEstimationAuto",
  description:
    "Estimez gratuitement la valeur de votre véhicule en quelques minutes et recevez le rappel d'un expert.",
};

export default function EstimationPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Estimation gratuite"
        title="Estimez votre véhicule"
        subtitle="Quelques minutes suffisent. Un expert vous rappelle sous 24h avec une estimation personnalisée."
      />
      <div className="bg-[var(--paper)] px-4 py-14">
        <StepForm />
      </div>
    </main>
  );
}
