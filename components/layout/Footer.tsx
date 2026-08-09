import Link from "next/link";
import Image from "next/image";
import { COMPANY } from "@/lib/company";

export function Footer() {
  return (
    <footer className="bg-[var(--color-navy)] px-4 py-10 text-sm text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Image src="/logo-icon.png" alt="" width={36} height={24} className="h-8 w-auto" />
            <p className="font-semibold">{COMPANY.publicName}</p>
          </div>
          <p className="text-white/70">Un service {COMPANY.legalName}</p>
        </div>
        <div className="flex flex-col gap-1 text-white/70">
          <span>{COMPANY.phone}</span>
          <span>{COMPANY.email}</span>
          <span>{COMPANY.hours}</span>
        </div>
        <div className="flex flex-col gap-1 text-white/70">
          <Link href="/mentions-legales" className="hover:text-white">
            Mentions légales
          </Link>
          <Link href="/politique-de-confidentialite" className="hover:text-white">
            Politique de confidentialité
          </Link>
          <Link href="/cgu" className="hover:text-white">
            CGU
          </Link>
        </div>
      </div>
    </footer>
  );
}
