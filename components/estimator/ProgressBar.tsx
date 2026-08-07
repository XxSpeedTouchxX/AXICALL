export function ProgressBar({ step, total }: { step: number; total: number }) {
  const percent = (step / total) * 100;
  return (
    <div className="w-full">
      <div className="mb-2 text-sm text-[var(--color-gray-600)]">
        Étape {step} sur {total}
      </div>
      <div className="h-2 w-full rounded-full bg-[var(--color-gray-200)]">
        <div
          className="h-2 rounded-full bg-[var(--color-orange)] transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
