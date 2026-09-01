"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
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

/** Editorial pillar pages, grouped behind a dropdown so the bar stays short. */
const GUIDE_LINKS = [
  { href: "/vendre-sa-voiture", label: "Vendre sa voiture" },
  { href: "/combien-vaut-ma-voiture", label: "Combien vaut ma voiture" },
  { href: "/depot-vente", label: "Le dépôt-vente" },
  { href: "/reprise-ou-depot-vente", label: "Reprise ou dépôt-vente" },
  { href: "/notre-methode", label: "Notre méthode" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [guidesOpen, setGuidesOpen] = useState(false);
  const guidesRef = useRef<HTMLDivElement>(null);
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
    setGuidesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen && !guidesOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setGuidesOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen, guidesOpen]);

  // Close the dropdown when clicking anywhere outside it.
  useEffect(() => {
    if (!guidesOpen) return;
    function handlePointerDown(e: MouseEvent) {
      if (guidesRef.current && !guidesRef.current.contains(e.target as Node)) {
        setGuidesOpen(false);
      }
    }
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [guidesOpen]);

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
          Estimer Mon Auto
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--color-navy)] transition-colors hover:text-[var(--color-orange)]"
            >
              {link.label}
            </Link>
          ))}

          <div className="relative" ref={guidesRef}>
            <button
              type="button"
              onClick={() => setGuidesOpen((open) => !open)}
              aria-expanded={guidesOpen}
              aria-haspopup="true"
              className="flex items-center gap-1 text-sm font-medium text-[var(--color-navy)] transition-colors hover:text-[var(--color-orange)]"
            >
              Guides
              <ChevronDown
                className={`h-4 w-4 transition-transform ${guidesOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>

            <AnimatePresence>
              {guidesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute right-0 top-full mt-3 w-64 border border-[var(--line)] bg-white py-2 shadow-xl"
                >
                  {GUIDE_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2.5 text-sm text-[var(--ink)] transition-colors hover:bg-[var(--accent)]/10"
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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

              <p className="mt-3 px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                Guides
              </p>
              {GUIDE_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2.5 text-sm text-[var(--muted)] hover:bg-[var(--color-gray-50)]"
                >
                  {link.label}
                </Link>
              ))}

              <Link href="/estimation" className="pt-3">
                <Button className="w-full">Estimer mon véhicule gratuitement</Button>
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
