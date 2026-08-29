import type { Metadata } from "next";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingMethod } from "@/components/landing/LandingMethod";
import { LandingTestimonials } from "@/components/landing/LandingTestimonials";
import { TrustBadges } from "@/components/home/TrustBadges";
import { RisksSection } from "@/components/home/RisksSection";
import { OfferSection } from "@/components/home/OfferSection";
import { GuaranteeSection } from "@/components/home/GuaranteeSection";
import { ComparisonPlans } from "@/components/home/ComparisonPlans";
import { CTASection } from "@/components/home/CTASection";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { COMPANY } from "@/lib/company";

// Dedicated landing page for paid traffic — not linked from the main site
// navigation. Uncomment to keep it out of search results if traffic is 100%
// paid: export const metadata: Metadata = { robots: { index: false, follow: false }, ... }
export const metadata: Metadata = {
  title: "Vendez votre voiture au juste prix, sans rien gérer | MonEstimationAuto",
  description:
    "Estimation en 30 secondes, rappel sous 24h. MonEstimationAuto vous met en relation avec une agence dépôt-vente sélectionnée près de chez vous.",
};

export default function LandingEstimationPage() {
  return (
    <main>
      <LandingHero />
      <TrustBadges />
      <RisksSection />
      <OfferSection />
      <LandingMethod />
      <GuaranteeSection />
      <ComparisonPlans />
      <LandingTestimonials />

      <section className="bg-[var(--bone)] px-4 py-20">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow mb-4">— FAQ &amp; Contact</p>
          <h2 className="mb-10 text-2xl font-bold tracking-tight text-[var(--ink)] md:text-3xl">
            Questions <span className="text-[var(--accent)]">fréquentes.</span>
          </h2>
          <FAQAccordion />
        </div>
      </section>

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
          }),
        }}
      />
    </main>
  );
}
