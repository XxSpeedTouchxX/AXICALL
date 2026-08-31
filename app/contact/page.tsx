import type { Metadata } from "next";
import { Phone, Mail, Clock } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact | MonEstimationAuto",
  description: "Contactez notre équipe pour toute question sur l'estimation ou la vente de votre véhicule.",
};

const INFO_ROWS = [
  { icon: Phone, label: "Téléphone", value: COMPANY.phone, href: COMPANY.phoneHref },
  { icon: Mail, label: "Email", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
  { icon: Clock, label: "Horaires", value: COMPANY.hours },
];

export default function ContactPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Nous écrire"
        title="Contact"
        subtitle="Une question sur votre estimation ou votre vente ? Notre équipe vous répond rapidement."
      />

      <div className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid gap-8 md:grid-cols-5">
          <Reveal className="md:col-span-3">
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-2">
            <div className="relative flex h-full flex-col justify-center gap-6 overflow-hidden bg-[var(--black)] px-6 py-8 text-[var(--bone)] shadow-sm">
              <div
                className="pointer-events-none absolute -right-[20%] -top-[30%] h-[90%] w-[80%]"
                style={{ background: "radial-gradient(circle, rgba(255,74,28,0.16) 0%, transparent 58%)" }}
                aria-hidden="true"
              />
              {INFO_ROWS.map((row) => {
                const content = (
                  <div className="relative flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--bone)]/10">
                      <row.icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-[var(--bone)]/50">{row.label}</p>
                      <p className="font-medium">{row.value}</p>
                    </div>
                  </div>
                );
                return row.href ? (
                  <a key={row.label} href={row.href} className="transition-opacity hover:opacity-80">
                    {content}
                  </a>
                ) : (
                  <div key={row.label}>{content}</div>
                );
              })}
            </div>
          </Reveal>
        </div>
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
