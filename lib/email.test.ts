// @vitest-environment node
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { notifyAgencyOfNewLead, confirmEstimationToProspect } from "./email";
import type { EstimationLead, ContactLead } from "@/types/lead";

const estimationLead: EstimationLead = {
  id: "1",
  createdAt: new Date().toISOString(),
  statut: "nouveau",
  type: "estimation",
  vehicule: { marque: "Renault", modele: "Clio", annee: 2020, kilometrage: 40000, carburant: "diesel" },
  prospect: { nom: "Dupont", prenom: "Marie", telephone: "0612345678", email: "marie@example.com", ville: "Lyon" },
  score: 85,
  urgence: "chaud",
  consentement: { texte: "...", dateExpiration: new Date().toISOString() },
};

const contactLead: ContactLead = {
  id: "2",
  createdAt: new Date().toISOString(),
  statut: "nouveau",
  type: "contact",
  prospect: { nom: "Martin", email: "martin@example.com", telephone: "0612345678", message: "Bonjour" },
};

beforeEach(() => {
  vi.stubEnv("RESEND_API_KEY", "");
  vi.stubGlobal("fetch", vi.fn());
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("email (no RESEND_API_KEY configured)", () => {
  it("does not call fetch when notifying the agency of an estimation lead", async () => {
    await notifyAgencyOfNewLead(estimationLead);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("does not call fetch when notifying the agency of a contact lead", async () => {
    await notifyAgencyOfNewLead(contactLead);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("does not call fetch when confirming to the prospect", async () => {
    await confirmEstimationToProspect(estimationLead);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("does not send a confirmation for a contact lead (no such flow)", async () => {
    await confirmEstimationToProspect(contactLead);
    expect(fetch).not.toHaveBeenCalled();
  });
});

describe("email (RESEND_API_KEY configured)", () => {
  beforeEach(() => {
    vi.stubEnv("RESEND_API_KEY", "test-key");
    vi.mocked(fetch).mockResolvedValue({ ok: true } as Response);
  });

  it("calls the Resend API with the agency address for an estimation lead", async () => {
    await notifyAgencyOfNewLead(estimationLead);
    expect(fetch).toHaveBeenCalledWith(
      "https://api.resend.com/emails",
      expect.objectContaining({ method: "POST" })
    );
    const call = vi.mocked(fetch).mock.calls[0];
    const body = JSON.parse((call[1] as RequestInit).body as string);
    expect(body.to).toBe("contact@axicall.fr");
    expect(body.subject).toContain("chaud");
  });

  it("calls the Resend API with the prospect's email for the confirmation", async () => {
    await confirmEstimationToProspect(estimationLead);
    const call = vi.mocked(fetch).mock.calls[0];
    const body = JSON.parse((call[1] as RequestInit).body as string);
    expect(body.to).toBe("marie@example.com");
  });
});
