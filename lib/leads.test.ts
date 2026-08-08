// @vitest-environment node
// lib/leads.test.ts
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { saveLead, getAllLeads } from "./leads";
import type { EstimationLead } from "@/types/lead";

const DATA_FILE = path.join(process.cwd(), "data", "leads.json");

function sampleLead(): Omit<EstimationLead, "id" | "createdAt" | "statut"> {
  return {
    type: "estimation",
    vehicule: {
      marque: "Renault",
      modele: "Clio",
      annee: 2020,
      kilometrage: 40000,
      carburant: "diesel",
    },
    prospect: {
      nom: "Dupont",
      prenom: "Marie",
      telephone: "0612345678",
      email: "marie@example.com",
      ville: "Lyon",
    },
    score: 75,
    urgence: "chaud",
    // dateExpiration is a placeholder here — saveLead() overwrites it with a
    // real value computed from its own createdAt at save time.
    consentement: { texte: "J'accepte d'être contacté.", dateExpiration: "" },
  };
}

beforeEach(() => {
  if (fs.existsSync(DATA_FILE)) fs.unlinkSync(DATA_FILE);
});

afterEach(() => {
  if (fs.existsSync(DATA_FILE)) fs.unlinkSync(DATA_FILE);
});

describe("saveLead", () => {
  it("assigns an id, createdAt and default statut", async () => {
    const lead = await saveLead(sampleLead());
    expect(lead.id).toBeTruthy();
    expect(lead.createdAt).toBeTruthy();
    expect(lead.statut).toBe("nouveau");
  });

  it("persists the lead so it can be retrieved", async () => {
    const lead = await saveLead(sampleLead());
    const all = await getAllLeads();
    expect(all.find((l) => l.id === lead.id)).toBeDefined();
  });

  it("appends multiple leads without overwriting previous ones", async () => {
    await saveLead(sampleLead());
    await saveLead(sampleLead());
    const all = await getAllLeads();
    expect(all.length).toBe(2);
  });

  it("stores the consent text and computes a 12-month expiration for estimation leads", async () => {
    const lead = await saveLead(sampleLead());
    if (lead.type !== "estimation") throw new Error("expected an estimation lead");
    expect(lead.consentement.texte).toBe("J'accepte d'être contacté.");
    const created = new Date(lead.createdAt).getTime();
    const expires = new Date(lead.consentement.dateExpiration).getTime();
    const daysBetween = Math.round((expires - created) / (1000 * 60 * 60 * 24));
    expect(daysBetween).toBe(365);
  });
});
