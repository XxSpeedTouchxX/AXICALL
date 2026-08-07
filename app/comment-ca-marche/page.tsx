import type { Metadata } from "next";
import { HowItWorks } from "@/components/sections/HowItWorks";

export const metadata: Metadata = {
  title: "Comment ça marche | MonEstimationAuto",
  description: "Découvrez les 4 étapes pour estimer et vendre votre véhicule rapidement.",
};

export default function CommentCaMarchePage() {
  return (
    <main>
      <h1 className="pt-12 text-center text-3xl font-bold text-[var(--color-navy)]">
        Comment ça marche
      </h1>
      <HowItWorks />
    </main>
  );
}
