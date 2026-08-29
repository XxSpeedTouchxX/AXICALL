import { Reveal } from "@/components/ui/Reveal";

const POINTS = [
  "L'estimation et le rendez-vous ne vous coûtent rien, que vous décidiez de vendre ou non.",
  "Aucun engagement — seule l'agence attend que vous honoriez le créneau réservé, ou que vous la préveniez en cas d'empêchement.",
];

export function GuaranteeSection() {
  return (
    <section className="bg-[var(--paper)] px-4 py-20 text-center">
      <p className="eyebrow mb-4">— La garantie</p>
      <h2 className="mx-auto max-w-xl text-2xl font-bold leading-tight tracking-tight text-[var(--ink)] md:text-3xl">
        Le rendez-vous est gratuit. <span className="italic font-normal text-[var(--accent)]">Quoi qu&apos;il arrive.</span>
      </h2>

      <Reveal>
        <div className="relative mx-auto mt-9 max-w-2xl">
          <div className="pointer-events-none absolute -inset-2.5 border border-[var(--accent)]" aria-hidden="true" />
          <div className="relative bg-[var(--black)] px-8 py-10 text-left text-[var(--bone)] sm:px-10">
            {POINTS.map((p) => (
              <p key={p} className="relative mb-4 pl-6 text-[15px] leading-relaxed text-[var(--bone)]/90 last:mb-0">
                <span className="absolute left-0 font-bold text-[var(--accent)]">→</span>
                {p}
              </p>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
