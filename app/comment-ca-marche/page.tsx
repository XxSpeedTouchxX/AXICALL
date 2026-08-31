import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { HowItWorks } from "@/components/sections/HowItWorks";

export const metadata: Metadata = {
  alternates: { canonical: "/comment-ca-marche" },
  title: "Comment ça marche | MonEstimationAuto",
  description: "Découvrez les 4 étapes pour estimer et vendre votre véhicule rapidement.",
};

export default function CommentCaMarchePage() {
  return (
    <main>
      <PageHeader
        eyebrow="Le processus"
        title="Comment ça marche"
        subtitle="De l'estimation à la vente, un parcours simple en 4 étapes."
      />
      <HowItWorks hideHeading />
    </main>
  );
}
