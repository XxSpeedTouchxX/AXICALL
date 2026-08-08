import { COMPANY } from "@/lib/company";

export function CallBar() {
  return (
    <a
      href={COMPANY.phoneHref}
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-[var(--color-orange)] py-3 text-center font-semibold text-white md:hidden"
    >
      Appeler maintenant — {COMPANY.phone}
    </a>
  );
}
