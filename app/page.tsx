import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { TrustBadges } from "@/components/home/TrustBadges";
import { CTASection } from "@/components/home/CTASection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "MonEstimationAuto",
            description: "Estimation gratuite et rachat de véhicules d'occasion.",
            areaServed: "FR",
            telephone: COMPANY.phone,
            email: COMPANY.email,
            address: {
              "@type": "PostalAddress",
              streetAddress: COMPANY.address,
              addressCountry: "FR",
            },
          }),
        }}
      />
    </main>
  );
}
