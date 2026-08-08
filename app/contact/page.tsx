import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Contact | MonEstimationAuto",
  description: "Contactez notre équipe pour toute question sur l'estimation ou la vente de votre véhicule.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto grid max-w-5xl gap-10 px-4 py-12 md:grid-cols-2">
      <div>
        <h1 className="mb-6 text-3xl font-bold text-[var(--color-navy)]">Contact</h1>
        <ContactForm />
      </div>
      <div className="flex flex-col gap-3 text-[var(--color-gray-600)]">
        <p>Téléphone : {COMPANY.phone}</p>
        <p>Email : {COMPANY.email}</p>
        <p>Horaires : {COMPANY.hours}</p>
      </div>
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
