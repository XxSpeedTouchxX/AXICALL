import Link from "next/link";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/estimation", label: "Estimation véhicule" },
  { href: "/comment-ca-marche", label: "Comment ça marche" },
  { href: "/avis-clients", label: "Avis clients" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-gray-200)] bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-[var(--color-navy)]">
          MonEstimationAuto
        </Link>
        <nav className="hidden gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--color-navy)] hover:text-[var(--color-orange)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/estimation">
          <Button className="hidden sm:inline-flex">Estimer mon véhicule gratuitement</Button>
        </Link>
      </div>
    </header>
  );
}
