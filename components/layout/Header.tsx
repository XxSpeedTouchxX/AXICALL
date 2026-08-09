import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Z_INDEX } from "@/lib/zIndex";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/estimation", label: "Estimation véhicule" },
  { href: "/comment-ca-marche", label: "Comment ça marche" },
  { href: "/avis-clients", label: "Avis clients" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className={`sticky top-0 ${Z_INDEX.header} border-b border-[var(--color-gray-200)] bg-white`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-[var(--color-navy)]">
          <Image src="/logo-icon.png" alt="" width={36} height={24} className="h-9 w-auto" priority />
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
