import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Testimonials } from "@/components/sections/Testimonials";

export const metadata: Metadata = {
  alternates: { canonical: "/avis-clients" },
  title: "Avis clients | Estimer Mon Auto",
  description: "Découvrez les témoignages de nos clients ayant estimé et vendu leur véhicule.",
};

export default function AvisClientsPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Témoignages"
        title="Avis clients"
        subtitle="Ce que nos clients disent de leur expérience."
      />
      <Testimonials hideHeading />
    </main>
  );
}
