import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, Clock, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { COMPANY } from "@/lib/company";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/estimation", label: "Estimation véhicule" },
  { href: "/comment-ca-marche", label: "Comment ça marche" },
  { href: "/avis-clients", label: "Avis clients" },
  { href: "/contact", label: "Contact" },
];

const LEGAL_LINKS = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/politique-de-confidentialite", label: "Confidentialité" },
  { href: "/cgu", label: "CGU" },
  { href: "/retrait-consentement", label: "Retrait consentement" },
];

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="relative overflow-hidden text-[var(--bone)]">
      <div className="absolute inset-0 bg-[var(--black)]" />
      <div
        className="pointer-events-none absolute -right-[10%] -top-[30%] h-[90%] w-[55%]"
        style={{ background: "radial-gradient(circle, rgba(255,74,28,0.16) 0%, transparent 58%)" }}
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/60 to-transparent" />

      <Reveal className="relative px-4 pt-16 pb-8">
        <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Image src="/logo-icon.png" alt="" width={36} height={24} className="h-8 w-auto" />
              <p className="text-lg font-bold tracking-tight">{COMPANY.publicName}</p>
            </div>
            <p className="eyebrow mb-2">Estimez. Comparez. Vendez.</p>
            <p className="max-w-xs text-sm text-[var(--bone)]/60">Un service {COMPANY.legalName}</p>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[var(--bone)]/40">Navigation</p>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-sm text-[var(--bone)]/70 transition-colors hover:text-[var(--bone)]"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[var(--bone)]/40">Contact</p>
            <ul className="flex flex-col gap-3">
              <li>
                <a href={COMPANY.phoneHref} className="flex items-center gap-2 text-sm text-[var(--bone)]/70 transition-colors hover:text-[var(--bone)]">
                  <Phone className="h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                  {COMPANY.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 text-sm text-[var(--bone)]/70 transition-colors hover:text-[var(--bone)]">
                  <Mail className="h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                  {COMPANY.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-[var(--bone)]/70">
                <Clock className="h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                {COMPANY.hours}
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[var(--bone)]/40">Légal</p>
            <ul className="flex flex-col gap-2.5">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[var(--bone)]/70 transition-colors hover:text-[var(--bone)]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-2 border-t border-[var(--bone)]/10 pt-6 text-xs text-[var(--bone)]/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {COMPANY.legalName}. Tous droits réservés.</p>
          <p>{COMPANY.legalForm} — SIRET {COMPANY.siret}</p>
        </div>
      </Reveal>
    </footer>
  );
}
