import fs from "node:fs";
import path from "node:path";
import type { ContactLead, EstimationLead, Lead } from "@/types/lead";

type NewLead =
  | Omit<EstimationLead, "id" | "createdAt" | "statut">
  | Omit<ContactLead, "id" | "createdAt" | "statut">;

const DATA_FILE = path.join(process.cwd(), "data", "leads.json");

function ensureDataFile(): void {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]", "utf-8");
}

function readLeads(): Lead[] {
  ensureDataFile();
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw) as Lead[];
}

function writeLeads(leads: Lead[]): void {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(leads, null, 2), "utf-8");
}

/**
 * Single seam for lead persistence. Swap the body of this function for a
 * Supabase insert (or any other backend) without changing any caller.
 */
export async function saveLead(lead: NewLead): Promise<Lead> {
  const fullLead = {
    ...lead,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    statut: "nouveau",
  } as Lead;

  const leads = readLeads();
  leads.push(fullLead);
  writeLeads(leads);

  return fullLead;
}

export async function getAllLeads(): Promise<Lead[]> {
  return readLeads();
}
