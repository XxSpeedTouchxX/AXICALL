// @vitest-environment node
// app/api/leads/route.test.ts
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { POST } from "./route";

const DATA_FILE = path.join(process.cwd(), "data", "leads.json");

function validEstimationPayload() {
  return {
    formType: "estimation",
    vehicle: {
      marque: "Renault",
      modele: "Clio",
      annee: 2020,
      version: "Zen",
      kilometrage: 40000,
      carburant: "diesel",
      boite: "manuelle",
      puissanceFiscale: 5,
      nombrePortes: 5,
    },
    condition: {
      etatGeneral: "tres_bon",
      accident: false,
      controleTechnique: "valide",
      nombreProprietaires: 1,
      carnetEntretien: true,
    },
    situation: { motifVente: "changement_vehicule", delaiVente: "urgent" },
    contact: {
      nom: "Dupont",
      prenom: "Marie",
      telephone: "0612345678",
      email: "marie@example.com",
      ville: "Lyon",
      codePostal: "69000",
      consentement: true,
      cguAcceptees: true,
    },
  };
}

beforeEach(() => {
  if (fs.existsSync(DATA_FILE)) fs.unlinkSync(DATA_FILE);
});

afterEach(() => {
  if (fs.existsSync(DATA_FILE)) fs.unlinkSync(DATA_FILE);
});

describe("POST /api/leads", () => {
  it("returns 200 with id, score and urgence for a valid estimation payload", async () => {
    const req = new Request("http://localhost/api/leads", {
      method: "POST",
      body: JSON.stringify(validEstimationPayload()),
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.id).toBeTruthy();
    expect(typeof body.score).toBe("number");
    expect(["chaud", "tiede", "froid"]).toContain(body.urgence);
  });

  it("returns 400 for an invalid payload", async () => {
    const req = new Request("http://localhost/api/leads", {
      method: "POST",
      body: JSON.stringify({ formType: "estimation", vehicle: {} }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("accepts a contact payload without vehicle data", async () => {
    const req = new Request("http://localhost/api/leads", {
      method: "POST",
      body: JSON.stringify({
        formType: "contact",
        nom: "Martin",
        email: "martin@example.com",
        telephone: "0612345678",
        message: "Bonjour, j'ai une question.",
      }),
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.id).toBeTruthy();
  });

  it("returns 400 for a malformed JSON body", async () => {
    const req = new Request("http://localhost/api/leads", {
      method: "POST",
      body: "{",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBeTruthy();
  });
});
