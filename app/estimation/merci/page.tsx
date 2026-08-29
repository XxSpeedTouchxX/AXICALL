import type { Metadata } from "next";
import { ResultView } from "./ResultView";

export const metadata: Metadata = {
  title: "Estimation reçue | MonEstimationAuto",
  robots: { index: false, follow: false },
};

export default function MerciPage() {
  return (
    <main className="bg-[var(--paper)] px-4 py-16">
      <ResultView />
    </main>
  );
}
