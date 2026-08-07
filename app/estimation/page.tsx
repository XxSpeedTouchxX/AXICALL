import type { Metadata } from "next";
import { StepForm } from "@/components/estimator/StepForm";

export const metadata: Metadata = {
  title: "Estimation gratuite de véhicule | MonEstimationAuto",
  description:
    "Estimez gratuitement la valeur de votre véhicule en quelques minutes et recevez le rappel d'un expert.",
};

export default function EstimationPage() {
  return (
    <main className="bg-[var(--color-gray-50)] px-4 py-12">
      <h1 className="mb-8 text-center text-3xl font-bold text-[var(--color-navy)]">
        Estimez votre véhicule gratuitement
      </h1>
      <StepForm />
    </main>
  );
}
