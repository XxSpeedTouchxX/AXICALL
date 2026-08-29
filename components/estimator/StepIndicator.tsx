import { Check } from "lucide-react";

interface StepIndicatorProps {
  step: number;
  labels: string[];
}

/**
 * Numbered, labelled step tracker. Replaces the bare "Étape 1 sur 4" text so
 * the visitor can see the whole journey — what is done, where they are, and
 * what is left — which is the main reason multi-step forms feel confusing.
 */
export function StepIndicator({ step, labels }: StepIndicatorProps) {
  return (
    <ol className="flex items-center gap-2 sm:gap-3">
      {labels.map((label, i) => {
        const index = i + 1;
        const isDone = index < step;
        const isCurrent = index === step;
        return (
          <li key={label} className="flex flex-1 items-center gap-2 sm:gap-3">
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className={`flex h-7 w-7 shrink-0 items-center justify-center text-xs font-bold transition-colors ${
                    isDone
                      ? "bg-accent text-black"
                      : isCurrent
                        ? "bg-black text-bone"
                        : "border border-line text-muted"
                  }`}
                >
                  {isDone ? <Check className="h-4 w-4" strokeWidth={3} /> : String(index).padStart(2, "0")}
                </span>
                <span
                  className={`hidden truncate text-xs font-bold uppercase tracking-wider sm:block ${
                    isCurrent ? "text-ink" : "text-muted"
                  }`}
                >
                  {label}
                </span>
              </div>
              <div className="h-[3px] w-full bg-line">
                <div
                  className={`h-full bg-accent transition-all duration-500 ${
                    isDone || isCurrent ? "w-full" : "w-0"
                  }`}
                />
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
