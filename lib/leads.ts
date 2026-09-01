import fs from "node:fs";
import path from "node:path";
import type { ContactLead, EstimationLead, Lead, LeadStatus } from "@/types/lead";

export type NewEstimationLead = Omit<
  EstimationLead,
  "id" | "createdAt" | "statut" | "consentement"
> & {
  // dateExpiration and horodatage are derived at save time, not supplied.
  consentement: { texte: string; adresseIp: string | null; cguAcceptees: boolean };
};

type NewLead = NewEstimationLead | Omit<ContactLead, "id" | "createdAt" | "statut">;

const CONSENT_DURATION_DAYS = 365;

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
  const createdAt = new Date();

  const fullLead = {
    ...lead,
    id: crypto.randomUUID(),
    createdAt: createdAt.toISOString(),
    statut: "nouveau",
  } as Lead;

  if (fullLead.type === "estimation") {
    const dateExpiration = new Date(createdAt);
    dateExpiration.setDate(dateExpiration.getDate() + CONSENT_DURATION_DAYS);
    fullLead.consentement = {
      texte: fullLead.consentement.texte,
      dateExpiration: dateExpiration.toISOString(),
      horodatage: createdAt.toISOString(),
      adresseIp: fullLead.consentement.adresseIp,
      cguAcceptees: fullLead.consentement.cguAcceptees,
    };
  }

  const leads = readLeads();
  leads.push(fullLead);
  writeLeads(leads);

  return fullLead;
}

export async function getAllLeads(): Promise<Lead[]> {
  return readLeads();
}

/** Updates one lead's pipeline status. Returns false when the id is unknown. */
export async function updateLeadStatus(id: string, statut: LeadStatus): Promise<boolean> {
  const leads = readLeads();
  const lead = leads.find((l) => l.id === id);
  if (!lead) return false;
  lead.statut = statut;
  writeLeads(leads);
  return true;
}
