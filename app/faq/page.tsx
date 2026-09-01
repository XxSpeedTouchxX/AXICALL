import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { FAQS } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "FAQ | Estimer Mon Auto",
  description: "Toutes les réponses à vos questions sur l'estimation et la vente de votre véhicule.",
  alternates: { canonical: "/faq" },
};

export default function FAQPage() {
  return (
    <main>
      <PageHeader eyebrow="Questions" title="Questions fréquentes" />
      <div className="px-4 py-16">
        <FAQAccordion />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </main>
  );
}
