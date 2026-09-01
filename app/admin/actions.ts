"use server";

import { revalidatePath } from "next/cache";
import { updateLeadStatus } from "@/lib/leads";
import type { LeadStatus } from "@/types/lead";

const ALLOWED: LeadStatus[] = [
  "nouveau",
  "a_rappeler",
  "contacte",
  "rendez_vous_pris",
  "vendu",
  "perdu",
];

export async function setLeadStatus(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const statut = String(formData.get("statut") ?? "") as LeadStatus;

  // The form is behind Basic auth, but validate anyway rather than trusting
  // whatever arrives in the request body.
  if (!id || !ALLOWED.includes(statut)) return;

  await updateLeadStatus(id, statut);
  revalidatePath("/admin");
}
