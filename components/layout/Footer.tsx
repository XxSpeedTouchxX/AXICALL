export function Footer() {
  return (
    <footer className="bg-[var(--color-navy)] px-4 py-10 text-sm text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:justify-between">
        <div>
          <p className="font-semibold">MonEstimationAuto</p>
          <p className="text-white/70">Un service Axicall</p>
        </div>
        <div className="flex flex-col gap-1 text-white/70">
          <span>01 23 45 67 89 (placeholder)</span>
          <span>contact@monestimationauto.fr (placeholder)</span>
          <span>Lun-Ven 9h-18h (placeholder)</span>
        </div>
      </div>
    </footer>
  );
}
