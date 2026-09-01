"use client";

import { useRef } from "react";
import type { LeadStatus } from "@/types/lead";
import { setLeadStatus } from "./actions";

interface LeadStatusSelectProps {
  id: string;
  statut: LeadStatus;
  labels: Record<LeadStatus, string>;
}

/** Status dropdown that saves on change, with no separate submit button. */
export function LeadStatusSelect({ id, statut, labels }: LeadStatusSelectProps) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form ref={formRef} action={setLeadStatus}>
      <input type="hidden" name="id" value={id} />
      <select
        name="statut"
        defaultValue={statut}
        onChange={() => formRef.current?.requestSubmit()}
        aria-label="Statut du lead"
        className="border border-line bg-white px-2 py-1.5 text-sm text-ink focus:border-accent focus:outline-none"
      >
        {(Object.keys(labels) as LeadStatus[]).map((value) => (
          <option key={value} value={value}>
            {labels[value]}
          </option>
        ))}
      </select>
      <noscript>
        <button type="submit" className="ml-2 text-xs underline">
          Enregistrer
        </button>
      </noscript>
    </form>
  );
}
