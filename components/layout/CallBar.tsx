import { COMPANY } from "@/lib/company";
import { Z_INDEX } from "@/lib/zIndex";

export function CallBar() {
  return (
    <a
      href={COMPANY.phoneHref}
      className={`fixed bottom-0 left-0 right-0 ${Z_INDEX.overlay} flex items-center justify-center bg-[var(--color-orange)] py-3 text-center font-semibold text-[var(--color-navy)] md:hidden`}
    >
      Appeler maintenant — {COMPANY.phone}
    </a>
  );
}
