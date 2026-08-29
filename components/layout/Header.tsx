"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
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
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 ${Z_INDEX.header} border-b transition-[background-color,box-shadow,border-color,backdrop-filter] duration-200 ${
        scrolled
          ? "border-[var(--line)] bg-[var(--bone)]/90 shadow-sm backdrop-blur-md"
          : "border-transparent bg-[var(--bone)]"
      }`}
    >
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
              className="text-sm font-medium text-[var(--color-navy)] transition-colors hover:text-[var(--color-orange)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/estimation">
            <Button className="hidden sm:inline-flex">Estimer mon véhicule gratuitement</Button>
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-panel"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            className="p-2 text-[var(--color-navy)] md:hidden"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-nav-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden border-t border-[var(--color-gray-200)] md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2.5 text-sm font-medium text-[var(--color-navy)] hover:bg-[var(--color-gray-50)]"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/estimation" className="pt-2">
                <Button className="w-full">Estimer mon véhicule gratuitement</Button>
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
