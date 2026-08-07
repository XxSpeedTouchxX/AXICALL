import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { TrustBadges } from "@/components/home/TrustBadges";
import { CTASection } from "@/components/home/CTASection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";

export const metadata: Metadata = {
  title: "Estimation voiture gratuite et rachat rapide | MonEstimationAuto",
  description:
    "Estimez gratuitement votre véhicule, recevez le rappel d'un expert et vendez votre voiture rapidement grâce à notre réseau de professionnels automobiles.",
  openGraph: {
    title: "MonEstimationAuto — Estimation voiture gratuite",
    description: "Découvrez la valeur réelle de votre véhicule en quelques minutes.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustBadges />
      <HowItWorks preview />
      <Testimonials preview />
      <CTASection />
    </main>
  );
}
