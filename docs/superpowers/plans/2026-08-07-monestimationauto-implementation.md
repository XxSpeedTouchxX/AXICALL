# Estimer Mon Auto Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Next.js 16 (App Router) lead-generation website for Axicall/Estimer Mon Auto, centered on a multi-step vehicle estimation simulator that captures and scores leads.

**Architecture:** App Router pages for marketing content + a client-driven multi-step form (`useEstimationForm`) that posts to a single `/api/leads` route. Pure, unit-tested functions in `lib/` (validation, scoring, storage) sit behind a `saveLead()` seam so storage can be swapped for Supabase later without touching callers. UI primitives in `components/ui/` are built once and reused everywhere.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS, React, Zod, Vitest + React Testing Library, deployed via GitHub → Vercel.

**Spec:** `docs/superpowers/specs/2026-08-07-monestimationauto-design.md`

---

## Task 1: Project scaffold

**Files:**
- Create: entire Next.js project at repo root (`C:\Users\vinde\Desktop\axicall-web`)
- Create: `.gitignore`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`, `next.config.ts`
- Modify: `package.json` (add `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`, `zod`)

- [ ] **Step 1: Scaffold the app**

Run (from `C:\Users\vinde\Desktop\axicall-web`, which already has `.git` and `docs/`):

```bash
npx create-next-app@latest . --typescript --tailwind --app --eslint --src-dir=false --import-alias "@/*" --use-npm
```

When prompted about the non-empty directory (it contains `docs/` and `.git`), confirm to proceed in the existing directory.

- [ ] **Step 2: Install test dependencies**

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @vitejs/plugin-react
```

(`zod` is installed with a pinned version in Task 3, not here — see the note in that task.)

- [ ] **Step 3: Add Vitest config**

Create `vitest.config.ts`:

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, ".") },
  },
});
```

Create `vitest.setup.ts`:

```typescript
import "@testing-library/jest-dom/vitest";
```

The global environment is `jsdom` (needed for component tests). Tests that touch Node-only APIs or Next.js server-only globals (`Request`/`Response` in route handlers, `node:fs`) override this per-file with a `// @vitest-environment node` comment on the first line, as used in Tasks 5 and 6.

Add to `package.json` scripts:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 4: Verify the scaffold builds and tests run**

Run: `npm run build`
Expected: build succeeds with the default Next.js starter page.

Run: `npm test`
Expected: passes with "No test files found" (or exits 0) — confirms Vitest is wired up.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Scaffold Next.js 16 project with Tailwind, TypeScript, Vitest"
```

---

## Task 2: Domain types

**Files:**
- Create: `types/vehicle.ts`
- Create: `types/lead.ts`

- [ ] **Step 1: Write `types/vehicle.ts`**

```typescript
export type Carburant = "essence" | "diesel" | "hybride" | "electrique";
export type Boite = "manuelle" | "automatique";
export type EtatGeneral = "excellent" | "tres_bon" | "correct" | "a_prevoir";
export type ControleTechnique = "valide" | "expire" | "non_effectue";
export type MotifVente =
  | "nouveau_vehicule"
  | "besoin_argent"
  | "changement_vehicule"
  | "succession"
  | "autre";
export type DelaiVente = "urgent" | "sous_1_mois" | "plus_tard";

export interface VehicleInfo {
  marque: string;
  modele: string;
  annee: number;
  version: string;
  kilometrage: number;
  carburant: Carburant;
  boite: Boite;
  puissanceFiscale: number;
  nombrePortes: number;
}

export interface VehicleCondition {
  etatGeneral: EtatGeneral;
  accident: boolean;
  controleTechnique: ControleTechnique;
  nombreProprietaires: number;
  carnetEntretien: boolean;
}

export interface SellerSituation {
  motifVente: MotifVente;
  delaiVente: DelaiVente;
}

export interface ContactInfo {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  ville: string;
  codePostal: string;
  consentement: boolean;
}

export interface EstimationFormData {
  vehicle: VehicleInfo;
  condition: VehicleCondition;
  situation: SellerSituation;
  contact: ContactInfo;
}
```

- [ ] **Step 2: Write `types/lead.ts`**

```typescript
import type { VehicleInfo } from "./vehicle";

export type LeadStatus =
  | "nouveau"
  | "a_rappeler"
  | "contacte"
  | "rendez_vous_pris"
  | "vendu"
  | "perdu";

export type Urgence = "chaud" | "tiede" | "froid";

interface LeadBase {
  id: string;
  createdAt: string;
  statut: LeadStatus;
}

export interface EstimationLead extends LeadBase {
  type: "estimation";
  vehicule: Pick<VehicleInfo, "marque" | "modele" | "annee" | "kilometrage" | "carburant">;
  prospect: {
    nom: string;
    prenom: string;
    telephone: string;
    email: string;
    ville: string;
  };
  score: number;
  urgence: Urgence;
}

export interface ContactLead extends LeadBase {
  type: "contact";
  prospect: {
    nom: string;
    email: string;
    telephone: string;
    message: string;
  };
}

export type Lead = EstimationLead | ContactLead;
```

- [ ] **Step 3: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add types/
git commit -m "Add vehicle and lead domain types"
```

---

## Task 3: Phone helper and validation schemas (Zod)

**Files:**
- Create: `lib/phone.ts`
- Test: `lib/phone.test.ts`
- Create: `lib/validation.ts`
- Test: `lib/validation.test.ts`

**Note on Zod version:** pin the dependency (`npm install zod@^3.23.8`) instead of installing `latest`. The schemas below use the Zod v3 API (`z.literal(true, { errorMap })`); Zod v4 changed that API, so an unpinned install could break Task 1's install step.

- [ ] **Step 1: Write failing test for the shared phone validator**

```typescript
// lib/phone.test.ts
import { describe, it, expect } from "vitest";
import { isValidFrenchPhone, normalizePhone } from "./phone";

describe("normalizePhone", () => {
  it("strips all whitespace", () => {
    expect(normalizePhone("06 12 34 56 78")).toBe("0612345678");
    expect(normalizePhone("06 123 45678")).toBe("0612345678");
  });
});

describe("isValidFrenchPhone", () => {
  it("accepts a 10-digit number starting with 0 regardless of spacing", () => {
    expect(isValidFrenchPhone("0612345678")).toBe(true);
    expect(isValidFrenchPhone("06 12 34 56 78")).toBe(true);
    expect(isValidFrenchPhone("06 123 45678")).toBe(true);
  });

  it("rejects numbers that are too short or don't start with 0", () => {
    expect(isValidFrenchPhone("123")).toBe(false);
    expect(isValidFrenchPhone("1612345678")).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- lib/phone.test.ts`
Expected: FAIL — `lib/phone.ts` does not exist.

- [ ] **Step 3: Implement `lib/phone.ts`**

```typescript
export function normalizePhone(raw: string): string {
  return raw.replace(/\s+/g, "");
}

export function isValidFrenchPhone(raw: string): boolean {
  return /^0[1-9]\d{8}$/.test(normalizePhone(raw));
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- lib/phone.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/phone.ts lib/phone.test.ts
git commit -m "Add shared French phone number validator"
```

- [ ] **Step 6: Write failing tests for form validation schemas**

```typescript
// lib/validation.test.ts
import { describe, it, expect } from "vitest";
import {
  vehicleInfoSchema,
  vehicleConditionSchema,
  sellerSituationSchema,
  contactInfoSchema,
  estimationFormSchema,
  contactFormSchema,
} from "./validation";

describe("vehicleInfoSchema", () => {
  it("accepts a valid vehicle", () => {
    const result = vehicleInfoSchema.safeParse({
      marque: "Renault",
      modele: "Clio",
      annee: 2019,
      version: "Zen",
      kilometrage: 45000,
      carburant: "diesel",
      boite: "manuelle",
      puissanceFiscale: 5,
      nombrePortes: 5,
    });
    expect(result.success).toBe(true);
  });

  it("rejects a future year", () => {
    const result = vehicleInfoSchema.safeParse({
      marque: "Renault",
      modele: "Clio",
      annee: 2099,
      version: "Zen",
      kilometrage: 45000,
      carburant: "diesel",
      boite: "manuelle",
      puissanceFiscale: 5,
      nombrePortes: 5,
    });
    expect(result.success).toBe(false);
  });

  it("rejects negative kilometrage", () => {
    const result = vehicleInfoSchema.safeParse({
      marque: "Renault",
      modele: "Clio",
      annee: 2019,
      version: "Zen",
      kilometrage: -10,
      carburant: "diesel",
      boite: "manuelle",
      puissanceFiscale: 5,
      nombrePortes: 5,
    });
    expect(result.success).toBe(false);
  });
});

describe("contactInfoSchema", () => {
  it("accepts a valid French phone number", () => {
    const result = contactInfoSchema.safeParse({
      nom: "Dupont",
      prenom: "Marie",
      telephone: "06 12 34 56 78",
      email: "marie@example.com",
      ville: "Lyon",
      codePostal: "69000",
      consentement: true,
    });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid phone number", () => {
    const result = contactInfoSchema.safeParse({
      nom: "Dupont",
      prenom: "Marie",
      telephone: "123",
      email: "marie@example.com",
      ville: "Lyon",
      codePostal: "69000",
      consentement: true,
    });
    expect(result.success).toBe(false);
  });

  it("accepts a phone number with irregular spacing", () => {
    const result = contactInfoSchema.safeParse({
      nom: "Dupont",
      prenom: "Marie",
      telephone: "06 123 45678",
      email: "marie@example.com",
      ville: "Lyon",
      codePostal: "69000",
      consentement: true,
    });
    expect(result.success).toBe(true);
  });

  it("rejects when consentement is false", () => {
    const result = contactInfoSchema.safeParse({
      nom: "Dupont",
      prenom: "Marie",
      telephone: "0612345678",
      email: "marie@example.com",
      ville: "Lyon",
      codePostal: "69000",
      consentement: false,
    });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const result = contactInfoSchema.safeParse({
      nom: "Dupont",
      prenom: "Marie",
      telephone: "0612345678",
      email: "not-an-email",
      ville: "Lyon",
      codePostal: "69000",
      consentement: true,
    });
    expect(result.success).toBe(false);
  });
});

describe("estimationFormSchema", () => {
  it("composes all four step schemas", () => {
    const result = estimationFormSchema.safeParse({
      vehicle: {
        marque: "Renault",
        modele: "Clio",
        annee: 2019,
        version: "Zen",
        kilometrage: 45000,
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
      situation: {
        motifVente: "changement_vehicule",
        delaiVente: "sous_1_mois",
      },
      contact: {
        nom: "Dupont",
        prenom: "Marie",
        telephone: "0612345678",
        email: "marie@example.com",
        ville: "Lyon",
        codePostal: "69000",
        consentement: true,
      },
    });
    expect(result.success).toBe(true);
  });
});

describe("contactFormSchema", () => {
  it("accepts a valid contact message", () => {
    const result = contactFormSchema.safeParse({
      nom: "Martin",
      email: "martin@example.com",
      telephone: "0612345678",
      message: "J'ai une question sur l'estimation.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects an empty message", () => {
    const result = contactFormSchema.safeParse({
      nom: "Martin",
      email: "martin@example.com",
      telephone: "0612345678",
      message: "",
    });
    expect(result.success).toBe(false);
  });
});
```

- [ ] **Step 7: Run tests to verify they fail**

Run: `npm test -- lib/validation.test.ts`
Expected: FAIL — `lib/validation.ts` does not exist.

- [ ] **Step 8: Implement `lib/validation.ts`**

```typescript
import { z } from "zod";
import { isValidFrenchPhone } from "./phone";

const currentYear = new Date().getFullYear();

export const vehicleInfoSchema = z.object({
  marque: z.string().min(1, "Marque requise"),
  modele: z.string().min(1, "Modèle requis"),
  annee: z
    .number()
    .int()
    .min(1980, "Année invalide")
    .max(currentYear, "L'année ne peut pas être dans le futur"),
  version: z.string().min(1, "Version requise"),
  kilometrage: z.number().int().min(0, "Le kilométrage ne peut pas être négatif"),
  carburant: z.enum(["essence", "diesel", "hybride", "electrique"]),
  boite: z.enum(["manuelle", "automatique"]),
  puissanceFiscale: z.number().int().min(1),
  nombrePortes: z.number().int().min(2).max(5),
});

export const vehicleConditionSchema = z.object({
  etatGeneral: z.enum(["excellent", "tres_bon", "correct", "a_prevoir"]),
  accident: z.boolean(),
  controleTechnique: z.enum(["valide", "expire", "non_effectue"]),
  nombreProprietaires: z.number().int().min(1),
  carnetEntretien: z.boolean(),
});

export const sellerSituationSchema = z.object({
  motifVente: z.enum([
    "nouveau_vehicule",
    "besoin_argent",
    "changement_vehicule",
    "succession",
    "autre",
  ]),
  delaiVente: z.enum(["urgent", "sous_1_mois", "plus_tard"]),
});

export const contactInfoSchema = z.object({
  nom: z.string().min(1, "Nom requis"),
  prenom: z.string().min(1, "Prénom requis"),
  telephone: z
    .string()
    .refine(isValidFrenchPhone, "Numéro de téléphone français invalide"),
  email: z.string().email("Email invalide"),
  ville: z.string().min(1, "Ville requise"),
  codePostal: z.string().regex(/^\d{5}$/, "Code postal invalide"),
  consentement: z.literal(true, {
    errorMap: () => ({ message: "Le consentement est obligatoire" }),
  }),
});

export const estimationFormSchema = z.object({
  vehicle: vehicleInfoSchema,
  condition: vehicleConditionSchema,
  situation: sellerSituationSchema,
  contact: contactInfoSchema,
});

export const contactFormSchema = z.object({
  nom: z.string().min(1, "Nom requis"),
  email: z.string().email("Email invalide"),
  telephone: z
    .string()
    .refine(isValidFrenchPhone, "Numéro de téléphone français invalide"),
  message: z.string().min(1, "Message requis"),
});

export type EstimationFormInput = z.infer<typeof estimationFormSchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
```

- [ ] **Step 9: Run tests to verify they pass**

Run: `npm test -- lib/validation.test.ts`
Expected: PASS, all tests green.

- [ ] **Step 10: Commit**

```bash
git add lib/validation.ts lib/validation.test.ts
git commit -m "Add Zod validation schemas for estimation and contact forms"
```

---

## Task 4: Lead scoring

**Files:**
- Create: `lib/scoring.ts`
- Test: `lib/scoring.test.ts`

- [ ] **Step 1: Write failing tests**

```typescript
// lib/scoring.test.ts
import { describe, it, expect } from "vitest";
import { scoreLead } from "./scoring";
import type { EstimationFormData } from "@/types/vehicle";

const currentYear = new Date().getFullYear();

function buildForm(overrides: Partial<EstimationFormData> = {}): EstimationFormData {
  return {
    vehicle: {
      marque: "Renault",
      modele: "Clio",
      annee: currentYear - 3,
      version: "Zen",
      kilometrage: 50000,
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
    situation: {
      motifVente: "changement_vehicule",
      delaiVente: "urgent",
    },
    contact: {
      nom: "Dupont",
      prenom: "Marie",
      telephone: "0612345678",
      email: "marie@example.com",
      ville: "Lyon",
      codePostal: "69000",
      consentement: true,
    },
    ...overrides,
  };
}

describe("scoreLead", () => {
  it("scores a strong lead as chaud", () => {
    const result = scoreLead(buildForm());
    expect(result.urgence).toBe("chaud");
    expect(result.score).toBeGreaterThanOrEqual(60);
  });

  it("scores a weak lead as froid", () => {
    const form = buildForm({
      vehicle: {
        marque: "Renault",
        modele: "Clio",
        annee: currentYear - 15,
        version: "Zen",
        kilometrage: 220000,
        carburant: "diesel",
        boite: "manuelle",
        puissanceFiscale: 5,
        nombrePortes: 5,
      },
      condition: {
        etatGeneral: "a_prevoir",
        accident: true,
        controleTechnique: "expire",
        nombreProprietaires: 4,
        carnetEntretien: false,
      },
      situation: {
        motifVente: "autre",
        delaiVente: "plus_tard",
      },
    });
    const result = scoreLead(form);
    expect(result.urgence).toBe("froid");
    expect(result.score).toBeLessThan(30);
  });

  it("gives partial credit when only one of year/mileage qualifies", () => {
    const recentButHighMileage = buildForm({
      vehicle: {
        marque: "Renault",
        modele: "Clio",
        annee: currentYear - 2,
        version: "Zen",
        kilometrage: 200000,
        carburant: "diesel",
        boite: "manuelle",
        puissanceFiscale: 5,
        nombrePortes: 5,
      },
      situation: { motifVente: "autre", delaiVente: "plus_tard" },
    });
    const result = scoreLead(recentButHighMileage);
    expect(result.score).toBeGreaterThan(0);
    expect(result.score).toBeLessThan(60);
  });

  it("caps score at 100", () => {
    const result = scoreLead(buildForm());
    expect(result.score).toBeLessThanOrEqual(100);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- lib/scoring.test.ts`
Expected: FAIL — `lib/scoring.ts` does not exist.

- [ ] **Step 3: Implement `lib/scoring.ts`**

```typescript
import type { EstimationFormData } from "@/types/vehicle";
import type { Urgence } from "@/types/lead";
import { isValidFrenchPhone } from "./phone";

export interface ScoreResult {
  score: number;
  urgence: Urgence;
}

export function scoreLead(form: EstimationFormData): ScoreResult {
  let score = 0;
  const currentYear = new Date().getFullYear();

  if (form.situation.delaiVente === "urgent") {
    score += 30;
  } else if (form.situation.delaiVente === "sous_1_mois") {
    score += 15;
  }

  const isRecent = form.vehicle.annee >= currentYear - 8;
  const isLowMileage = form.vehicle.kilometrage < 120000;
  if (isRecent && isLowMileage) {
    score += 20;
  } else if (isRecent || isLowMileage) {
    score += 10;
  }

  if (isValidFrenchPhone(form.contact.telephone)) {
    score += 15;
  }

  const goodCondition =
    (form.condition.etatGeneral === "excellent" || form.condition.etatGeneral === "tres_bon") &&
    form.condition.controleTechnique === "valide";
  if (goodCondition) {
    score += 15;
  }

  if (!form.condition.accident) {
    score += 5;
  }

  score = Math.min(score, 100);

  const urgence: Urgence = score >= 60 ? "chaud" : score >= 30 ? "tiede" : "froid";

  return { score, urgence };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- lib/scoring.test.ts`
Expected: PASS, all tests green.

- [ ] **Step 5: Commit**

```bash
git add lib/scoring.ts lib/scoring.test.ts
git commit -m "Add lead scoring function with unit tests"
```

---

## Task 5: Lead storage abstraction

**Files:**
- Create: `lib/leads.ts`
- Test: `lib/leads.test.ts`
- Create: `data/.gitkeep`
- Modify: `.gitignore` (add `data/leads.json`)

- [ ] **Step 1: Write failing tests**

```typescript
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
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- lib/leads.test.ts`
Expected: FAIL — `lib/leads.ts` does not exist.

- [ ] **Step 3: Implement `lib/leads.ts`**

```typescript
import fs from "node:fs";
import path from "node:path";
import type { Lead } from "@/types/lead";

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
export async function saveLead(lead: Omit<Lead, "id" | "createdAt" | "statut">): Promise<Lead> {
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
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- lib/leads.test.ts`
Expected: PASS, all tests green.

- [ ] **Step 5: Ignore local lead data, keep folder tracked**

Create `data/.gitkeep` (empty file).

Add to `.gitignore`:
```
data/leads.json
```

- [ ] **Step 6: Commit**

```bash
git add lib/leads.ts lib/leads.test.ts data/.gitkeep .gitignore
git commit -m "Add file-backed lead storage behind saveLead() seam"
```

---

## Task 6: API route `/api/leads`

**Files:**
- Create: `app/api/leads/route.ts`
- Test: `app/api/leads/route.test.ts`

- [ ] **Step 1: Write failing tests**

```typescript
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
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- app/api/leads/route.test.ts`
Expected: FAIL — `app/api/leads/route.ts` does not exist.

- [ ] **Step 3: Implement `app/api/leads/route.ts`**

```typescript
import { NextResponse } from "next/server";
import { estimationFormSchema, contactFormSchema } from "@/lib/validation";
import { scoreLead } from "@/lib/scoring";
import { saveLead } from "@/lib/leads";

export async function POST(request: Request) {
  const body = await request.json();

  if (body.formType === "contact") {
    const parsed = contactFormSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const lead = await saveLead({
      type: "contact",
      prospect: {
        nom: parsed.data.nom,
        email: parsed.data.email,
        telephone: parsed.data.telephone,
        message: parsed.data.message,
      },
    });
    return NextResponse.json({ id: lead.id });
  }

  const parsed = estimationFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { score, urgence } = scoreLead(parsed.data);

  const lead = await saveLead({
    type: "estimation",
    vehicule: {
      marque: parsed.data.vehicle.marque,
      modele: parsed.data.vehicle.modele,
      annee: parsed.data.vehicle.annee,
      kilometrage: parsed.data.vehicle.kilometrage,
      carburant: parsed.data.vehicle.carburant,
    },
    prospect: {
      nom: parsed.data.contact.nom,
      prenom: parsed.data.contact.prenom,
      telephone: parsed.data.contact.telephone,
      email: parsed.data.contact.email,
      ville: parsed.data.contact.ville,
    },
    score,
    urgence,
  });

  return NextResponse.json({ id: lead.id, score, urgence });
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- app/api/leads/route.test.ts`
Expected: PASS, all tests green.

- [ ] **Step 5: Commit**

```bash
git add app/api/leads/
git commit -m "Add /api/leads route validating, scoring and persisting leads"
```

---

## Task 7: UI primitives

**Files:**
- Create: `components/ui/Button.tsx`
- Create: `components/ui/Input.tsx`
- Create: `components/ui/Select.tsx`
- Create: `components/ui/RadioCard.tsx`
- Test: `components/ui/Button.test.tsx`
- Modify: `app/globals.css` (design tokens: navy/white/gray/orange)

- [ ] **Step 1: Define color tokens in `app/globals.css`**

Add CSS custom properties (append to the existing `@theme`/`:root` block created by `create-next-app`):

```css
:root {
  --color-navy: #0a1a35;
  --color-navy-light: #12274d;
  --color-orange: #ff6a1a;
  --color-orange-dark: #e05a10;
  --color-gray-50: #f7f8fa;
  --color-gray-200: #e2e5eb;
  --color-gray-600: #5b6270;
}
```

- [ ] **Step 2: Write a failing test for `Button`**

```typescript
// components/ui/Button.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Estimer mon véhicule</Button>);
    expect(screen.getByRole("button", { name: "Estimer mon véhicule" })).toBeInTheDocument();
  });

  it("applies the orange variant class by default", () => {
    render(<Button>CTA</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-[var(--color-orange)]");
  });

  it("applies the outline variant class when specified", () => {
    render(<Button variant="outline">Secondaire</Button>);
    expect(screen.getByRole("button")).not.toHaveClass("bg-[var(--color-orange)]");
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npm test -- components/ui/Button.test.tsx`
Expected: FAIL — `components/ui/Button.tsx` does not exist.

- [ ] **Step 4: Implement `components/ui/Button.tsx`**

```typescript
import type { ButtonHTMLAttributes } from "react";

type Variant = "orange" | "navy" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variantClasses: Record<Variant, string> = {
  orange: "bg-[var(--color-orange)] hover:bg-[var(--color-orange-dark)] text-white",
  navy: "bg-[var(--color-navy)] hover:bg-[var(--color-navy-light)] text-white",
  outline: "border border-[var(--color-navy)] text-[var(--color-navy)] hover:bg-[var(--color-gray-50)]",
};

export function Button({ variant = "orange", className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md px-6 py-3 font-semibold transition-colors ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test -- components/ui/Button.test.tsx`
Expected: PASS.

- [ ] **Step 6: Implement `components/ui/Input.tsx`** (no dedicated test — thin wrapper, covered indirectly by step-form tests in Task 8)

```typescript
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, id, className = "", ...props }: InputProps) {
  const inputId = id ?? props.name;
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputId} className="text-sm font-medium text-[var(--color-navy)]">
        {label}
      </label>
      <input
        id={inputId}
        className={`rounded-md border border-[var(--color-gray-200)] px-3 py-2 focus:border-[var(--color-orange)] focus:outline-none ${className}`}
        {...props}
      />
      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  );
}
```

- [ ] **Step 7: Implement `components/ui/Select.tsx`**

```typescript
import type { SelectHTMLAttributes } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: string;
}

export function Select({ label, options, error, id, name, className = "", ...props }: SelectProps) {
  const selectId = id ?? name;
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={selectId} className="text-sm font-medium text-[var(--color-navy)]">
        {label}
      </label>
      <select
        id={selectId}
        name={name}
        className={`rounded-md border border-[var(--color-gray-200)] px-3 py-2 focus:border-[var(--color-orange)] focus:outline-none ${className}`}
        {...props}
      >
        <option value="">Sélectionner...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  );
}
```

- [ ] **Step 8: Implement `components/ui/RadioCard.tsx`**

```typescript
interface RadioCardProps {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: (value: string) => void;
}

export function RadioCard({ name, value, label, checked, onChange }: RadioCardProps) {
  return (
    <label
      className={`cursor-pointer rounded-lg border px-4 py-3 text-center transition-colors ${
        checked
          ? "border-[var(--color-orange)] bg-orange-50 font-semibold text-[var(--color-navy)]"
          : "border-[var(--color-gray-200)] text-[var(--color-gray-600)] hover:border-[var(--color-navy)]"
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      {label}
    </label>
  );
}
```

- [ ] **Step 9: Run full test suite and build**

Run: `npm test`
Expected: all tests pass.

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 10: Commit**

```bash
git add components/ui/ app/globals.css
git commit -m "Add reusable UI primitives (Button, Input, Select, RadioCard)"
```

---

## Task 8: Estimation form state hook

**Files:**
- Create: `lib/useEstimationForm.ts`
- Test: `lib/useEstimationForm.test.ts`

- [ ] **Step 1: Write failing tests**

```typescript
// lib/useEstimationForm.test.ts
import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useEstimationForm } from "./useEstimationForm";

beforeEach(() => {
  sessionStorage.clear();
});

describe("useEstimationForm", () => {
  it("starts at step 1 with empty data", () => {
    const { result } = renderHook(() => useEstimationForm());
    expect(result.current.step).toBe(1);
  });

  it("updates vehicle data and advances to step 2", () => {
    const { result } = renderHook(() => useEstimationForm());
    act(() => {
      result.current.updateVehicle({ marque: "Renault" } as never);
      result.current.goNext();
    });
    expect(result.current.step).toBe(2);
    expect(result.current.data.vehicle.marque).toBe("Renault");
  });

  it("goBack moves to the previous step without clearing data", () => {
    const { result } = renderHook(() => useEstimationForm());
    act(() => {
      result.current.updateVehicle({ marque: "Renault" } as never);
      result.current.goNext();
      result.current.goBack();
    });
    expect(result.current.step).toBe(1);
    expect(result.current.data.vehicle.marque).toBe("Renault");
  });

  it("persists data to sessionStorage on update", () => {
    const { result } = renderHook(() => useEstimationForm());
    act(() => {
      result.current.updateVehicle({ marque: "Peugeot" } as never);
    });
    const stored = JSON.parse(sessionStorage.getItem("estimation-form")!);
    expect(stored.vehicle.marque).toBe("Peugeot");
  });

  it("restores state from sessionStorage on mount", () => {
    sessionStorage.setItem(
      "estimation-form",
      JSON.stringify({ vehicle: { marque: "Citroën" }, condition: {}, situation: {}, contact: {} })
    );
    const { result } = renderHook(() => useEstimationForm());
    expect(result.current.data.vehicle.marque).toBe("Citroën");
  });

  it("reset clears sessionStorage and returns to step 1", () => {
    const { result } = renderHook(() => useEstimationForm());
    act(() => {
      result.current.updateVehicle({ marque: "Renault" } as never);
      result.current.goNext();
      result.current.reset();
    });
    expect(result.current.step).toBe(1);
    expect(sessionStorage.getItem("estimation-form")).toBeNull();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- lib/useEstimationForm.test.ts`
Expected: FAIL — hook does not exist.

- [ ] **Step 3: Implement `lib/useEstimationForm.ts`**

```typescript
"use client";

import { useEffect, useState } from "react";
import type {
  VehicleInfo,
  VehicleCondition,
  SellerSituation,
  ContactInfo,
} from "@/types/vehicle";

const STORAGE_KEY = "estimation-form";

interface PartialEstimationData {
  vehicle: Partial<VehicleInfo>;
  condition: Partial<VehicleCondition>;
  situation: Partial<SellerSituation>;
  contact: Partial<ContactInfo>;
}

const emptyData: PartialEstimationData = {
  vehicle: {},
  condition: {},
  situation: {},
  contact: {},
};

function loadFromStorage(): PartialEstimationData {
  if (typeof window === "undefined") return emptyData;
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return emptyData;
  try {
    return JSON.parse(raw) as PartialEstimationData;
  } catch {
    return emptyData;
  }
}

export function useEstimationForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<PartialEstimationData>(emptyData);

  useEffect(() => {
    setData(loadFromStorage());
  }, []);

  function persist(next: PartialEstimationData) {
    setData(next);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function updateVehicle(patch: Partial<VehicleInfo>) {
    persist({ ...data, vehicle: { ...data.vehicle, ...patch } });
  }

  function updateCondition(patch: Partial<VehicleCondition>) {
    persist({ ...data, condition: { ...data.condition, ...patch } });
  }

  function updateSituation(patch: Partial<SellerSituation>) {
    persist({ ...data, situation: { ...data.situation, ...patch } });
  }

  function updateContact(patch: Partial<ContactInfo>) {
    persist({ ...data, contact: { ...data.contact, ...patch } });
  }

  function goNext() {
    setStep((s) => Math.min(s + 1, 4));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 1));
  }

  function reset() {
    sessionStorage.removeItem(STORAGE_KEY);
    setData(emptyData);
    setStep(1);
  }

  return {
    step,
    data,
    updateVehicle,
    updateCondition,
    updateSituation,
    updateContact,
    goNext,
    goBack,
    reset,
  };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- lib/useEstimationForm.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/useEstimationForm.ts lib/useEstimationForm.test.ts
git commit -m "Add useEstimationForm hook with sessionStorage persistence"
```

---

## Task 9: Estimator step components

**Files:**
- Create: `components/estimator/ProgressBar.tsx`
- Create: `components/estimator/Step1Vehicle.tsx`
- Create: `components/estimator/Step2Condition.tsx`
- Create: `components/estimator/Step3Situation.tsx`
- Create: `components/estimator/Step4Contact.tsx`
- Create: `components/estimator/StepForm.tsx`
- Test: `components/estimator/Step1Vehicle.test.tsx`
- Test: `components/estimator/StepForm.test.tsx`

- [ ] **Step 1: Implement `components/estimator/ProgressBar.tsx`** (presentational, no dedicated test)

```typescript
export function ProgressBar({ step, total }: { step: number; total: number }) {
  const percent = (step / total) * 100;
  return (
    <div className="w-full">
      <div className="mb-2 text-sm text-[var(--color-gray-600)]">
        Étape {step} sur {total}
      </div>
      <div className="h-2 w-full rounded-full bg-[var(--color-gray-200)]">
        <div
          className="h-2 rounded-full bg-[var(--color-orange)] transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Write failing test for `Step1Vehicle`**

```typescript
// components/estimator/Step1Vehicle.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Step1Vehicle } from "./Step1Vehicle";

describe("Step1Vehicle", () => {
  it("calls onChange with the entered marque", async () => {
    const onChange = vi.fn();
    render(<Step1Vehicle value={{}} onChange={onChange} />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText("Marque"), "Renault");
    expect(onChange).toHaveBeenCalled();
  });

  it("renders fuel type options as radio cards", () => {
    render(<Step1Vehicle value={{}} onChange={vi.fn()} />);
    expect(screen.getByText("Essence")).toBeInTheDocument();
    expect(screen.getByText("Diesel")).toBeInTheDocument();
    expect(screen.getByText("Hybride")).toBeInTheDocument();
    expect(screen.getByText("Electrique")).toBeInTheDocument();
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npm test -- components/estimator/Step1Vehicle.test.tsx`
Expected: FAIL — component does not exist.

- [ ] **Step 4: Implement `components/estimator/Step1Vehicle.tsx`**

```typescript
"use client";

import type { VehicleInfo, Carburant, Boite } from "@/types/vehicle";
import { Input } from "@/components/ui/Input";
import { RadioCard } from "@/components/ui/RadioCard";

const CARBURANTS: { value: Carburant; label: string }[] = [
  { value: "essence", label: "Essence" },
  { value: "diesel", label: "Diesel" },
  { value: "hybride", label: "Hybride" },
  { value: "electrique", label: "Electrique" },
];

const BOITES: { value: Boite; label: string }[] = [
  { value: "manuelle", label: "Manuelle" },
  { value: "automatique", label: "Automatique" },
];

interface Step1Props {
  value: Partial<VehicleInfo>;
  onChange: (patch: Partial<VehicleInfo>) => void;
}

export function Step1Vehicle({ value, onChange }: Step1Props) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Marque"
          name="marque"
          value={value.marque ?? ""}
          onChange={(e) => onChange({ marque: e.target.value })}
        />
        <Input
          label="Modèle"
          name="modele"
          value={value.modele ?? ""}
          onChange={(e) => onChange({ modele: e.target.value })}
        />
        <Input
          label="Année"
          name="annee"
          type="number"
          value={value.annee ?? ""}
          onChange={(e) => onChange({ annee: Number(e.target.value) })}
        />
        <Input
          label="Version / finition"
          name="version"
          value={value.version ?? ""}
          onChange={(e) => onChange({ version: e.target.value })}
        />
        <Input
          label="Kilométrage"
          name="kilometrage"
          type="number"
          value={value.kilometrage ?? ""}
          onChange={(e) => onChange({ kilometrage: Number(e.target.value) })}
        />
        <Input
          label="Puissance fiscale"
          name="puissanceFiscale"
          type="number"
          value={value.puissanceFiscale ?? ""}
          onChange={(e) => onChange({ puissanceFiscale: Number(e.target.value) })}
        />
        <Input
          label="Nombre de portes"
          name="nombrePortes"
          type="number"
          value={value.nombrePortes ?? ""}
          onChange={(e) => onChange({ nombrePortes: Number(e.target.value) })}
        />
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-[var(--color-navy)]">Carburant</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {CARBURANTS.map((c) => (
            <RadioCard
              key={c.value}
              name="carburant"
              value={c.value}
              label={c.label}
              checked={value.carburant === c.value}
              onChange={(v) => onChange({ carburant: v as Carburant })}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-[var(--color-navy)]">Boîte</p>
        <div className="grid grid-cols-2 gap-3">
          {BOITES.map((b) => (
            <RadioCard
              key={b.value}
              name="boite"
              value={b.value}
              label={b.label}
              checked={value.boite === b.value}
              onChange={(v) => onChange({ boite: v as Boite })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test -- components/estimator/Step1Vehicle.test.tsx`
Expected: PASS.

- [ ] **Step 6: Implement `components/estimator/Step2Condition.tsx`, `Step3Situation.tsx`, `Step4Contact.tsx`**

These follow the same controlled `value`/`onChange` pattern as `Step1Vehicle`. `RadioCard.onChange` only carries a `string`, so boolean fields (`accident`, `carnetEntretien`) are modeled as two RadioCards with values `"oui"`/`"non"`, converted explicitly at the call site — never passed through as raw strings. No dedicated per-step test for 2–3 (same shape as `Step1Vehicle`, already proven); `Step4Contact`'s consent checkbox is exercised by the `StepForm` integration test in Step 8 below.

`components/estimator/Step2Condition.tsx`:

```typescript
"use client";

import type { VehicleCondition, EtatGeneral, ControleTechnique } from "@/types/vehicle";
import { Input } from "@/components/ui/Input";
import { RadioCard } from "@/components/ui/RadioCard";

const ETATS: { value: EtatGeneral; label: string }[] = [
  { value: "excellent", label: "Excellent" },
  { value: "tres_bon", label: "Très bon" },
  { value: "correct", label: "Correct" },
  { value: "a_prevoir", label: "À prévoir" },
];

const CONTROLES: { value: ControleTechnique; label: string }[] = [
  { value: "valide", label: "Valide" },
  { value: "expire", label: "Expiré" },
  { value: "non_effectue", label: "Non effectué" },
];

interface Step2Props {
  value: Partial<VehicleCondition>;
  onChange: (patch: Partial<VehicleCondition>) => void;
}

export function Step2Condition({ value, onChange }: Step2Props) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-2 text-sm font-medium text-[var(--color-navy)]">État général</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {ETATS.map((e) => (
            <RadioCard
              key={e.value}
              name="etatGeneral"
              value={e.value}
              label={e.label}
              checked={value.etatGeneral === e.value}
              onChange={(v) => onChange({ etatGeneral: v as EtatGeneral })}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-[var(--color-navy)]">Accident</p>
        <div className="grid grid-cols-2 gap-3">
          <RadioCard
            name="accident"
            value="oui"
            label="Oui"
            checked={value.accident === true}
            onChange={() => onChange({ accident: true })}
          />
          <RadioCard
            name="accident"
            value="non"
            label="Non"
            checked={value.accident === false}
            onChange={() => onChange({ accident: false })}
          />
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-[var(--color-navy)]">Contrôle technique</p>
        <div className="grid grid-cols-3 gap-3">
          {CONTROLES.map((c) => (
            <RadioCard
              key={c.value}
              name="controleTechnique"
              value={c.value}
              label={c.label}
              checked={value.controleTechnique === c.value}
              onChange={(v) => onChange({ controleTechnique: v as ControleTechnique })}
            />
          ))}
        </div>
      </div>

      <Input
        label="Nombre de propriétaires"
        name="nombreProprietaires"
        type="number"
        value={value.nombreProprietaires ?? ""}
        onChange={(e) => onChange({ nombreProprietaires: Number(e.target.value) })}
      />

      <div>
        <p className="mb-2 text-sm font-medium text-[var(--color-navy)]">
          Carnet d&apos;entretien disponible
        </p>
        <div className="grid grid-cols-2 gap-3">
          <RadioCard
            name="carnetEntretien"
            value="oui"
            label="Oui"
            checked={value.carnetEntretien === true}
            onChange={() => onChange({ carnetEntretien: true })}
          />
          <RadioCard
            name="carnetEntretien"
            value="non"
            label="Non"
            checked={value.carnetEntretien === false}
            onChange={() => onChange({ carnetEntretien: false })}
          />
        </div>
      </div>
    </div>
  );
}
```

`components/estimator/Step3Situation.tsx`:

```typescript
"use client";

import type { SellerSituation, MotifVente, DelaiVente } from "@/types/vehicle";
import { RadioCard } from "@/components/ui/RadioCard";

const MOTIFS: { value: MotifVente; label: string }[] = [
  { value: "nouveau_vehicule", label: "Acheter un nouveau véhicule" },
  { value: "besoin_argent", label: "Besoin d'argent" },
  { value: "changement_vehicule", label: "Changement de véhicule" },
  { value: "succession", label: "Succession" },
  { value: "autre", label: "Autre" },
];

const DELAIS: { value: DelaiVente; label: string }[] = [
  { value: "urgent", label: "Urgent" },
  { value: "sous_1_mois", label: "Sous 1 mois" },
  { value: "plus_tard", label: "Plus tard" },
];

interface Step3Props {
  value: Partial<SellerSituation>;
  onChange: (patch: Partial<SellerSituation>) => void;
}

export function Step3Situation({ value, onChange }: Step3Props) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-2 text-sm font-medium text-[var(--color-navy)]">
          Pourquoi souhaitez-vous vendre votre véhicule ?
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {MOTIFS.map((m) => (
            <RadioCard
              key={m.value}
              name="motifVente"
              value={m.value}
              label={m.label}
              checked={value.motifVente === m.value}
              onChange={(v) => onChange({ motifVente: v as MotifVente })}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-[var(--color-navy)]">Date souhaitée de vente</p>
        <div className="grid grid-cols-3 gap-3">
          {DELAIS.map((d) => (
            <RadioCard
              key={d.value}
              name="delaiVente"
              value={d.value}
              label={d.label}
              checked={value.delaiVente === d.value}
              onChange={(v) => onChange({ delaiVente: v as DelaiVente })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
```

`components/estimator/Step4Contact.tsx`:

```typescript
"use client";

import type { ContactInfo } from "@/types/vehicle";
import { Input } from "@/components/ui/Input";

interface Step4Props {
  value: Partial<ContactInfo>;
  onChange: (patch: Partial<ContactInfo>) => void;
}

export function Step4Contact({ value, onChange }: Step4Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Nom"
          name="nom"
          value={value.nom ?? ""}
          onChange={(e) => onChange({ nom: e.target.value })}
        />
        <Input
          label="Prénom"
          name="prenom"
          value={value.prenom ?? ""}
          onChange={(e) => onChange({ prenom: e.target.value })}
        />
        <Input
          label="Téléphone"
          name="telephone"
          type="tel"
          value={value.telephone ?? ""}
          onChange={(e) => onChange({ telephone: e.target.value })}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={value.email ?? ""}
          onChange={(e) => onChange({ email: e.target.value })}
        />
        <Input
          label="Ville"
          name="ville"
          value={value.ville ?? ""}
          onChange={(e) => onChange({ ville: e.target.value })}
        />
        <Input
          label="Code postal"
          name="codePostal"
          value={value.codePostal ?? ""}
          onChange={(e) => onChange({ codePostal: e.target.value })}
        />
      </div>

      <label className="flex items-start gap-2 text-sm text-[var(--color-navy)]">
        <input
          type="checkbox"
          checked={value.consentement === true}
          onChange={(e) => onChange({ consentement: e.target.checked })}
          className="mt-1"
        />
        J&apos;accepte d&apos;être contacté concernant mon estimation.
      </label>
    </div>
  );
}
```

- [ ] **Step 7: Write failing integration test for `StepForm`**

```typescript
// components/estimator/StepForm.test.tsx
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StepForm } from "./StepForm";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

beforeEach(() => {
  sessionStorage.clear();
  pushMock.mockClear();
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: "abc123", score: 75, urgence: "chaud" }),
    })
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

async function fillStep1(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("Marque"), "Renault");
  await user.type(screen.getByLabelText("Modèle"), "Clio");
  await user.type(screen.getByLabelText("Année"), "2020");
  await user.type(screen.getByLabelText("Version / finition"), "Zen");
  await user.type(screen.getByLabelText("Kilométrage"), "40000");
  await user.type(screen.getByLabelText("Puissance fiscale"), "5");
  await user.type(screen.getByLabelText("Nombre de portes"), "5");
  await user.click(screen.getByText("Diesel"));
  await user.click(screen.getByText("Manuelle"));
}

async function fillStep2(user: ReturnType<typeof userEvent.setup>) {
  // "Oui"/"Non" each appear twice (accident, carnetEntretien) — RadioCard renders both
  // options regardless of selection, so disambiguate by DOM order via getAllByText.
  await user.click(screen.getByText("Très bon"));
  const nonOptions = screen.getAllByText("Non");
  await user.click(nonOptions[0]); // accident: non
  await user.click(screen.getByText("Valide"));
  await user.type(screen.getByLabelText("Nombre de propriétaires"), "1");
  const ouiOptions = screen.getAllByText("Oui");
  await user.click(ouiOptions[ouiOptions.length - 1]); // carnetEntretien: oui
}

async function fillStep3(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByText("Changement de véhicule"));
  await user.click(screen.getByText("Urgent"));
}

async function fillStep4(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("Nom"), "Dupont");
  await user.type(screen.getByLabelText("Prénom"), "Marie");
  await user.type(screen.getByLabelText("Téléphone"), "0612345678");
  await user.type(screen.getByLabelText("Email"), "marie@example.com");
  await user.type(screen.getByLabelText("Ville"), "Lyon");
  await user.type(screen.getByLabelText("Code postal"), "69000");
  await user.click(screen.getByRole("checkbox"));
}

describe("StepForm", () => {
  it("shows step 1 fields on initial render", () => {
    render(<StepForm />);
    expect(screen.getByLabelText("Marque")).toBeInTheDocument();
  });

  it("does not advance to step 2 when required fields are missing", async () => {
    render(<StepForm />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /suivant/i }));
    expect(screen.getByLabelText("Marque")).toBeInTheDocument();
  });

  it("walks through all 4 steps and submits, redirecting to the result page", async () => {
    render(<StepForm />);
    const user = userEvent.setup();

    await fillStep1(user);
    await user.click(screen.getByRole("button", { name: /suivant/i }));
    expect(screen.getByLabelText("Nombre de propriétaires")).toBeInTheDocument();

    await fillStep2(user);
    await user.click(screen.getByRole("button", { name: /suivant/i }));
    expect(screen.getByText("Urgent")).toBeInTheDocument();

    await fillStep3(user);
    await user.click(screen.getByRole("button", { name: /suivant/i }));
    expect(screen.getByLabelText("Nom")).toBeInTheDocument();

    await fillStep4(user);
    await user.click(screen.getByRole("button", { name: /obtenir mon estimation/i }));

    expect(pushMock).toHaveBeenCalledWith("/estimation/merci");
  });
});
```

- [ ] **Step 8: Run test to verify it fails**

Run: `npm test -- components/estimator/StepForm.test.tsx`
Expected: FAIL — `StepForm` does not exist.

- [ ] **Step 9: Implement `components/estimator/StepForm.tsx`**

```typescript
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEstimationForm } from "@/lib/useEstimationForm";
import {
  vehicleInfoSchema,
  vehicleConditionSchema,
  sellerSituationSchema,
  contactInfoSchema,
} from "@/lib/validation";
import { ProgressBar } from "./ProgressBar";
import { Step1Vehicle } from "./Step1Vehicle";
import { Step2Condition } from "./Step2Condition";
import { Step3Situation } from "./Step3Situation";
import { Step4Contact } from "./Step4Contact";
import { Button } from "@/components/ui/Button";

const STEP_SCHEMAS = [
  vehicleInfoSchema,
  vehicleConditionSchema,
  sellerSituationSchema,
  contactInfoSchema,
];

export function StepForm() {
  const router = useRouter();
  const form = useEstimationForm();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const stepData = [form.data.vehicle, form.data.condition, form.data.situation, form.data.contact][
    form.step - 1
  ];

  function handleNext() {
    const schema = STEP_SCHEMAS[form.step - 1];
    const result = schema.safeParse(stepData);
    if (!result.success) {
      setError("Merci de compléter tous les champs requis.");
      return;
    }
    setError(null);
    form.goNext();
  }

  async function handleSubmit() {
    const result = contactInfoSchema.safeParse(form.data.contact);
    if (!result.success) {
      setError("Merci de compléter tous les champs requis.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "estimation", ...form.data }),
      });
      if (!res.ok) throw new Error("submit failed");
      const body = await res.json();
      sessionStorage.setItem(
        "estimation-result",
        JSON.stringify({ ...body, vehicule: form.data.vehicle })
      );
      form.reset();
      router.push("/estimation/merci");
    } catch {
      setError("Une erreur est survenue, merci de réessayer.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8">
      <ProgressBar step={form.step} total={4} />

      {form.step === 1 && <Step1Vehicle value={form.data.vehicle} onChange={form.updateVehicle} />}
      {form.step === 2 && (
        <Step2Condition value={form.data.condition} onChange={form.updateCondition} />
      )}
      {form.step === 3 && (
        <Step3Situation value={form.data.situation} onChange={form.updateSituation} />
      )}
      {form.step === 4 && <Step4Contact value={form.data.contact} onChange={form.updateContact} />}

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex justify-between">
        {form.step > 1 ? (
          <Button variant="outline" onClick={form.goBack}>
            Précédent
          </Button>
        ) : (
          <span />
        )}
        {form.step < 4 ? (
          <Button onClick={handleNext}>Suivant</Button>
        ) : (
          <Button onClick={handleSubmit} disabled={submitting}>
            {submitting ? "Envoi..." : "Obtenir mon estimation"}
          </Button>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 10: Run test to verify it passes**

Run: `npm test -- components/estimator/StepForm.test.tsx`
Expected: PASS.

- [ ] **Step 11: Run full suite and build**

Run: `npm test`
Expected: all green.

Run: `npm run build`
Expected: succeeds (note: `StepForm` must be used inside a Client Component tree — verified in Task 10).

- [ ] **Step 12: Commit**

```bash
git add components/estimator/
git commit -m "Add multi-step estimator form with validation and submission"
```

---

## Task 10: Estimation and result pages

**Files:**
- Create: `app/estimation/page.tsx`
- Create: `app/estimation/merci/page.tsx`
- Create: `app/estimation/merci/ResultView.tsx`

- [ ] **Step 1: Implement `app/estimation/page.tsx`**

```typescript
import type { Metadata } from "next";
import { StepForm } from "@/components/estimator/StepForm";

export const metadata: Metadata = {
  title: "Estimation gratuite de véhicule | Estimer Mon Auto",
  description:
    "Estimez gratuitement la valeur de votre véhicule en quelques minutes et recevez le rappel d'un expert.",
};

export default function EstimationPage() {
  return (
    <main className="bg-[var(--color-gray-50)] px-4 py-12">
      <h1 className="mb-8 text-center text-3xl font-bold text-[var(--color-navy)]">
        Estimez votre véhicule gratuitement
      </h1>
      <StepForm />
    </main>
  );
}
```

- [ ] **Step 2: Implement `app/estimation/merci/ResultView.tsx`** (Client Component, reads sessionStorage)

```typescript
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface StoredResult {
  id: string;
  score: number;
  urgence: "chaud" | "tiede" | "froid";
  vehicule: { marque?: string; modele?: string; annee?: number; kilometrage?: number };
}

const MESSAGES: Record<StoredResult["urgence"], string> = {
  chaud:
    "Votre profil correspond exactement à ce que recherchent nos partenaires. Un expert vous contacte en priorité.",
  tiede: "Votre estimation est enregistrée. Un membre de notre équipe reviendra vers vous rapidement.",
  froid: "Merci pour votre demande. Nous restons disponibles quand vous serez prêt à avancer.",
};

export function ResultView() {
  const [result, setResult] = useState<StoredResult | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("estimation-result");
    if (raw) setResult(JSON.parse(raw));
  }, []);

  if (!result) {
    return (
      <div className="mx-auto max-w-xl text-center">
        <p className="mb-6 text-[var(--color-gray-600)]">
          Nous n&apos;avons pas retrouvé de demande récente. Vous pouvez refaire une estimation.
        </p>
        <Link href="/estimation">
          <Button>Estimer mon véhicule</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl text-center">
      <h1 className="mb-4 text-3xl font-bold text-[var(--color-navy)]">
        Votre demande d&apos;estimation a bien été enregistrée.
      </h1>
      <div className="mb-6 rounded-lg border border-[var(--color-gray-200)] bg-white p-6 text-left">
        <p className="font-semibold text-[var(--color-navy)]">
          {result.vehicule.marque} {result.vehicule.modele} ({result.vehicule.annee})
        </p>
        <p className="text-[var(--color-gray-600)]">{result.vehicule.kilometrage} km</p>
      </div>
      <p className="mb-8 text-[var(--color-gray-600)]">{MESSAGES[result.urgence]}</p>
      <a href="tel:0123456789">
        <Button>Être rappelé maintenant</Button>
      </a>
    </div>
  );
}
```

- [ ] **Step 3: Implement `app/estimation/merci/page.tsx`**

```typescript
import type { Metadata } from "next";
import { ResultView } from "./ResultView";

export const metadata: Metadata = {
  title: "Estimation reçue | Estimer Mon Auto",
  robots: { index: false, follow: false },
};

export default function MerciPage() {
  return (
    <main className="bg-[var(--color-gray-50)] px-4 py-16">
      <ResultView />
    </main>
  );
}
```

- [ ] **Step 4: Manual verification**

Run: `npm run dev`, navigate to `/estimation`, complete all 4 steps, submit. Verify redirect to `/estimation/merci` shows the vehicle summary and a message matching the score band. Confirm a new entry appears in `data/leads.json`.

- [ ] **Step 5: Run full suite and build**

Run: `npm test && npm run build`
Expected: all green, build succeeds.

- [ ] **Step 6: Commit**

```bash
git add app/estimation/
git commit -m "Add estimation and result pages"
```

---

## Task 11: Layout shell (Header, Footer, CallBar, ExitIntentPopup)

**Files:**
- Create: `components/layout/Header.tsx`
- Create: `components/layout/Footer.tsx`
- Create: `components/layout/CallBar.tsx`
- Create: `components/layout/ExitIntentPopup.tsx`
- Test: `components/layout/ExitIntentPopup.test.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Implement `components/layout/Header.tsx`**

```typescript
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/estimation", label: "Estimation véhicule" },
  { href: "/comment-ca-marche", label: "Comment ça marche" },
  { href: "/avis-clients", label: "Avis clients" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-gray-200)] bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-[var(--color-navy)]">
          Estimer Mon Auto
        </Link>
        <nav className="hidden gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--color-navy)] hover:text-[var(--color-orange)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/estimation">
          <Button className="hidden sm:inline-flex">Estimer mon véhicule gratuitement</Button>
        </Link>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Implement `components/layout/Footer.tsx`**

```typescript
export function Footer() {
  return (
    <footer className="bg-[var(--color-navy)] px-4 py-10 text-sm text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:justify-between">
        <div>
          <p className="font-semibold">Estimer Mon Auto</p>
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
```

- [ ] **Step 3: Implement `components/layout/CallBar.tsx`**

```typescript
export function CallBar() {
  return (
    <a
      href="tel:0123456789"
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-[var(--color-orange)] py-3 text-center font-semibold text-white md:hidden"
    >
      Appeler maintenant — 01 23 45 67 89
    </a>
  );
}
```

- [ ] **Step 4: Write failing test for `ExitIntentPopup`**

```typescript
// components/layout/ExitIntentPopup.test.tsx
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { ExitIntentPopup } from "./ExitIntentPopup";

beforeEach(() => {
  sessionStorage.clear();
  vi.useFakeTimers();
});

describe("ExitIntentPopup", () => {
  it("does not show immediately", () => {
    render(<ExitIntentPopup />);
    expect(screen.queryByText(/estimer mon véhicule/i)).not.toBeInTheDocument();
  });

  it("shows after mouse leaves the top of the viewport", () => {
    render(<ExitIntentPopup />);
    act(() => {
      const evt = new MouseEvent("mouseout", { clientY: -10 });
      document.dispatchEvent(evt);
    });
    expect(screen.getByText(/avant de partir/i)).toBeInTheDocument();
  });

  it("does not show again in the same session after dismissal", () => {
    sessionStorage.setItem("exit-intent-dismissed", "true");
    render(<ExitIntentPopup />);
    act(() => {
      const evt = new MouseEvent("mouseout", { clientY: -10 });
      document.dispatchEvent(evt);
    });
    expect(screen.queryByText(/avant de partir/i)).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 5: Run test to verify it fails**

Run: `npm test -- components/layout/ExitIntentPopup.test.tsx`
Expected: FAIL — component does not exist.

- [ ] **Step 6: Implement `components/layout/ExitIntentPopup.tsx`**

```typescript
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const DISMISS_KEY = "exit-intent-dismissed";
const MOBILE_IDLE_MS = 30000;

export function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(DISMISS_KEY)) return;

    function show() {
      if (sessionStorage.getItem(DISMISS_KEY)) return;
      setVisible(true);
    }

    function handleMouseOut(e: MouseEvent) {
      if (e.clientY <= 0) show();
    }

    let idleTimer: ReturnType<typeof setTimeout>;
    function resetIdleTimer() {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(show, MOBILE_IDLE_MS);
    }

    document.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("touchstart", resetIdleTimer);
    window.addEventListener("scroll", resetIdleTimer);
    window.addEventListener("click", resetIdleTimer);
    resetIdleTimer();

    return () => {
      document.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("touchstart", resetIdleTimer);
      window.removeEventListener("scroll", resetIdleTimer);
      window.removeEventListener("click", resetIdleTimer);
      clearTimeout(idleTimer);
    };
  }, []);

  function dismiss() {
    sessionStorage.setItem(DISMISS_KEY, "true");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="max-w-md rounded-lg bg-white p-8 text-center shadow-xl">
        <h2 className="mb-3 text-xl font-bold text-[var(--color-navy)]">Avant de partir...</h2>
        <p className="mb-6 text-[var(--color-gray-600)]">
          Estimez gratuitement votre véhicule en 2 minutes, sans engagement.
        </p>
        <div className="flex flex-col gap-3">
          <Link href="/estimation" onClick={dismiss}>
            <Button className="w-full">Estimer mon véhicule</Button>
          </Link>
          <button onClick={dismiss} className="text-sm text-[var(--color-gray-600)] underline">
            Non merci
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 7: Run test to verify it passes**

Run: `npm test -- components/layout/ExitIntentPopup.test.tsx`
Expected: PASS.

- [ ] **Step 8: Wire everything into `app/layout.tsx`**

Modify `app/layout.tsx` to render `<Header />`, `{children}`, `<Footer />`, `<CallBar />`, `<ExitIntentPopup />` inside `<body>`, keeping the existing font/className setup from `create-next-app`.

- [ ] **Step 9: Run full suite and build**

Run: `npm test && npm run build`
Expected: all green.

- [ ] **Step 10: Commit**

```bash
git add components/layout/ app/layout.tsx
git commit -m "Add site layout shell: Header, Footer, CallBar, ExitIntentPopup"
```

---

## Task 12: Home page

**Files:**
- Create: `components/home/Hero.tsx`
- Create: `components/home/TrustBadges.tsx`
- Create: `components/home/CTASection.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Implement `components/home/Hero.tsx`**

```typescript
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="bg-[var(--color-navy)] px-4 py-20 text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
        <div>
          <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
            Obtenez une estimation gratuite de votre véhicule en quelques minutes
          </h1>
          <p className="mb-8 text-lg text-white/80">
            Recevez une estimation personnalisée et découvrez combien vaut réellement votre
            voiture.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/estimation">
              <Button>Estimer mon véhicule</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Être rappelé
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image
            src="/hero-car.jpg"
            alt="Véhicule d'occasion premium"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
```

Note: `public/hero-car.jpg` must be added manually (a licensed automotive photo) — use a placeholder solid-color image for now so the build doesn't fail on a missing asset; document this in the README as a pre-launch TODO.

- [ ] **Step 2: Implement `components/home/TrustBadges.tsx`**

```typescript
const BADGES = [
  { title: "Estimation gratuite", desc: "Aucun frais, aucun engagement." },
  { title: "Réponse rapide", desc: "Un expert vous recontacte sous 24h." },
  { title: "Accompagnement personnalisé", desc: "Un interlocuteur dédié à votre projet." },
  { title: "Réseau de professionnels", desc: "Des acheteurs qualifiés partout en France." },
];

export function TrustBadges() {
  return (
    <section className="bg-white px-4 py-16">
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {BADGES.map((b) => (
          <div key={b.title} className="rounded-lg border border-[var(--color-gray-200)] p-6">
            <h3 className="mb-2 font-semibold text-[var(--color-navy)]">{b.title}</h3>
            <p className="text-sm text-[var(--color-gray-600)]">{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Implement `components/home/CTASection.tsx`**

```typescript
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section className="bg-[var(--color-gray-50)] px-4 py-16 text-center">
      <h2 className="mb-4 text-2xl font-bold text-[var(--color-navy)]">
        Prêt à connaître la valeur de votre véhicule ?
      </h2>
      <Link href="/estimation">
        <Button>Estimer mon véhicule gratuitement</Button>
      </Link>
    </section>
  );
}
```

- [ ] **Step 4: Assemble `app/page.tsx`**

```typescript
import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { TrustBadges } from "@/components/home/TrustBadges";
import { CTASection } from "@/components/home/CTASection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";

export const metadata: Metadata = {
  title: "Estimation voiture gratuite et rachat rapide | Estimer Mon Auto",
  description:
    "Estimez gratuitement votre véhicule, recevez le rappel d'un expert et vendez votre voiture rapidement grâce à notre réseau de professionnels automobiles.",
  openGraph: {
    title: "Estimer Mon Auto — Estimation voiture gratuite",
    description: "Découvrez la valeur réelle de votre véhicule en quelques minutes.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustBadges />
      <HowItWorks preview />
      <Testimonials preview />
      <CTASection />
    </main>
  );
}
```

(`HowItWorks` and `Testimonials` are built in Task 13 with a `preview` prop that renders a shortened version for the home page.)

- [ ] **Step 5: Run full suite and build**

Run: `npm test && npm run build`
Expected: all green (Task 13 must land first if building strictly in order — otherwise stub `HowItWorks`/`Testimonials` temporarily).

- [ ] **Step 6: Commit**

```bash
git add components/home/ app/page.tsx
git commit -m "Build home page: hero, trust badges, CTA sections"
```

---

## Task 13: Marketing content pages

**Files:**
- Create: `components/sections/HowItWorks.tsx`
- Create: `components/sections/Testimonials.tsx`
- Create: `components/sections/FAQAccordion.tsx`
- Test: `components/sections/FAQAccordion.test.tsx`
- Create: `app/comment-ca-marche/page.tsx`
- Create: `app/avis-clients/page.tsx`
- Create: `app/faq/page.tsx`

- [ ] **Step 1: Implement `components/sections/HowItWorks.tsx`**

```typescript
const STEPS = [
  { title: "Remplissez votre estimation", desc: "Renseignez les informations de votre véhicule en quelques minutes." },
  { title: "Recevez une analyse", desc: "Notre outil calcule une première estimation personnalisée." },
  { title: "Un expert vous rappelle", desc: "Un conseiller Axicall affine l'estimation avec vous." },
  { title: "Finalisez votre vente", desc: "Vous choisissez de vendre au meilleur prix, en toute simplicité." },
];

export function HowItWorks({ preview = false }: { preview?: boolean }) {
  const steps = preview ? STEPS.slice(0, 4) : STEPS;
  return (
    <section className="px-4 py-16">
      <h2 className="mb-10 text-center text-2xl font-bold text-[var(--color-navy)]">
        Comment ça marche
      </h2>
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <div key={s.title} className="text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-orange)] font-bold text-white">
              {i + 1}
            </div>
            <h3 className="mb-2 font-semibold text-[var(--color-navy)]">{s.title}</h3>
            <p className="text-sm text-[var(--color-gray-600)]">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Implement `components/sections/Testimonials.tsx`**

```typescript
const TESTIMONIALS = [
  { name: "Sophie L.", city: "Nantes", text: "Estimation reçue en 2 minutes et rappelée le jour même. Vente conclue en une semaine." },
  { name: "Karim B.", city: "Toulouse", text: "Process simple, pas de mauvaise surprise sur le prix annoncé." },
  { name: "Amélie R.", city: "Lille", text: "J'ai comparé plusieurs offres, celle-ci était la plus rapide et la plus claire." },
];

export function Testimonials({ preview = false }: { preview?: boolean }) {
  const items = preview ? TESTIMONIALS.slice(0, 2) : TESTIMONIALS;
  return (
    <section className="bg-white px-4 py-16">
      <h2 className="mb-10 text-center text-2xl font-bold text-[var(--color-navy)]">Avis clients</h2>
      <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t) => (
          <blockquote key={t.name} className="rounded-lg border border-[var(--color-gray-200)] p-6">
            <p className="mb-4 text-[var(--color-gray-600)]">&ldquo;{t.text}&rdquo;</p>
            <footer className="text-sm font-semibold text-[var(--color-navy)]">
              {t.name} — {t.city}
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Write failing test for `FAQAccordion`**

```typescript
// components/sections/FAQAccordion.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FAQAccordion } from "./FAQAccordion";

describe("FAQAccordion", () => {
  it("hides answers by default and reveals on click", async () => {
    render(<FAQAccordion />);
    expect(screen.queryByText(/oui, l'estimation est 100% gratuite/i)).not.toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(screen.getByText(/l'estimation est-elle gratuite/i));
    expect(screen.getByText(/oui, l'estimation est 100% gratuite/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 4: Run test to verify it fails**

Run: `npm test -- components/sections/FAQAccordion.test.tsx`
Expected: FAIL — component does not exist.

- [ ] **Step 5: Implement `components/sections/FAQAccordion.tsx`**

```typescript
"use client";

import { useState } from "react";

const FAQS = [
  { q: "L'estimation est-elle gratuite ?", a: "Oui, l'estimation est 100% gratuite et sans engagement." },
  { q: "Dois-je vendre mon véhicule ?", a: "Non, l'estimation ne vous engage à rien. Vous restez libre de vendre ou non." },
  { q: "Combien de temps faut-il pour avoir une réponse ?", a: "Un expert vous recontacte généralement sous 24h ouvrées." },
  { q: "Quels véhicules acceptez-vous ?", a: "Tous types de véhicules d'occasion, essence, diesel, hybride ou électrique." },
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-3">
      {FAQS.map((faq, i) => (
        <div key={faq.q} className="rounded-lg border border-[var(--color-gray-200)]">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full px-5 py-4 text-left font-medium text-[var(--color-navy)]"
          >
            {faq.q}
          </button>
          {openIndex === i && (
            <p className="px-5 pb-4 text-[var(--color-gray-600)]">{faq.a}</p>
          )}
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `npm test -- components/sections/FAQAccordion.test.tsx`
Expected: PASS.

- [ ] **Step 7: Implement the three pages**

`app/comment-ca-marche/page.tsx`:

```typescript
import type { Metadata } from "next";
import { HowItWorks } from "@/components/sections/HowItWorks";

export const metadata: Metadata = {
  title: "Comment ça marche | Estimer Mon Auto",
  description: "Découvrez les 4 étapes pour estimer et vendre votre véhicule rapidement.",
};

export default function CommentCaMarchePage() {
  return (
    <main>
      <h1 className="pt-12 text-center text-3xl font-bold text-[var(--color-navy)]">
        Comment ça marche
      </h1>
      <HowItWorks />
    </main>
  );
}
```

`app/avis-clients/page.tsx`:

```typescript
import type { Metadata } from "next";
import { Testimonials } from "@/components/sections/Testimonials";

export const metadata: Metadata = {
  title: "Avis clients | Estimer Mon Auto",
  description: "Découvrez les témoignages de nos clients ayant estimé et vendu leur véhicule.",
};

export default function AvisClientsPage() {
  return (
    <main>
      <h1 className="pt-12 text-center text-3xl font-bold text-[var(--color-navy)]">Avis clients</h1>
      <Testimonials />
    </main>
  );
}
```

`app/faq/page.tsx`:

```typescript
import type { Metadata } from "next";
import { FAQAccordion } from "@/components/sections/FAQAccordion";

export const metadata: Metadata = {
  title: "FAQ | Estimer Mon Auto",
  description: "Toutes les réponses à vos questions sur l'estimation et la vente de votre véhicule.",
};

export default function FAQPage() {
  return (
    <main className="px-4 py-12">
      <h1 className="mb-10 text-center text-3xl font-bold text-[var(--color-navy)]">
        Questions fréquentes
      </h1>
      <FAQAccordion />
    </main>
  );
}
```

- [ ] **Step 8: Run full suite and build**

Run: `npm test && npm run build`
Expected: all green.

- [ ] **Step 9: Commit**

```bash
git add components/sections/ app/comment-ca-marche/ app/avis-clients/ app/faq/
git commit -m "Add How It Works, Testimonials, FAQ sections and pages"
```

---

## Task 14: Contact page

**Files:**
- Create: `components/contact/ContactForm.tsx`
- Test: `components/contact/ContactForm.test.tsx`
- Create: `app/contact/page.tsx`

- [ ] **Step 1: Write failing test**

```typescript
// components/contact/ContactForm.test.tsx
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "./ContactForm";

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({ ok: true, json: async () => ({ id: "xyz" }) })
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("ContactForm", () => {
  it("shows a confirmation message after successful submission", async () => {
    render(<ContactForm />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText("Nom"), "Martin");
    await user.type(screen.getByLabelText("Email"), "martin@example.com");
    await user.type(screen.getByLabelText("Téléphone"), "0612345678");
    await user.type(screen.getByLabelText("Message"), "Bonjour, une question.");
    await user.click(screen.getByRole("button", { name: /envoyer/i }));
    expect(await screen.findByText(/message bien envoyé/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- components/contact/ContactForm.test.tsx`
Expected: FAIL — component does not exist.

- [ ] **Step 3: Implement `components/contact/ContactForm.tsx`**

```typescript
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [values, setValues] = useState({ nom: "", email: "", telephone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "contact", ...values }),
      });
      if (!res.ok) throw new Error("failed");
      setSent(true);
    } catch {
      setError("Une erreur est survenue, merci de réessayer.");
    }
  }

  if (sent) {
    return <p className="text-[var(--color-navy)]">Votre message bien envoyé. Nous revenons vers vous rapidement.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Nom"
        name="nom"
        value={values.nom}
        onChange={(e) => setValues({ ...values, nom: e.target.value })}
        required
      />
      <Input
        label="Email"
        name="email"
        type="email"
        value={values.email}
        onChange={(e) => setValues({ ...values, email: e.target.value })}
        required
      />
      <Input
        label="Téléphone"
        name="telephone"
        value={values.telephone}
        onChange={(e) => setValues({ ...values, telephone: e.target.value })}
        required
      />
      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="text-sm font-medium text-[var(--color-navy)]">
          Message
        </label>
        <textarea
          id="message"
          value={values.message}
          onChange={(e) => setValues({ ...values, message: e.target.value })}
          className="rounded-md border border-[var(--color-gray-200)] px-3 py-2"
          rows={4}
          required
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit">Envoyer</Button>
    </form>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- components/contact/ContactForm.test.tsx`
Expected: PASS.

- [ ] **Step 5: Implement `app/contact/page.tsx`**

```typescript
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Estimer Mon Auto",
  description: "Contactez notre équipe pour toute question sur l'estimation ou la vente de votre véhicule.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto grid max-w-5xl gap-10 px-4 py-12 md:grid-cols-2">
      <div>
        <h1 className="mb-6 text-3xl font-bold text-[var(--color-navy)]">Contact</h1>
        <ContactForm />
      </div>
      <div className="flex flex-col gap-3 text-[var(--color-gray-600)]">
        <p>Téléphone : 01 23 45 67 89 (placeholder)</p>
        <p>Email : contact@monestimationauto.fr (placeholder)</p>
        <p>Horaires : Lun-Ven 9h-18h (placeholder)</p>
      </div>
    </main>
  );
}
```

- [ ] **Step 6: Run full suite and build**

Run: `npm test && npm run build`
Expected: all green.

- [ ] **Step 7: Commit**

```bash
git add components/contact/ app/contact/
git commit -m "Add contact page with lead-generating contact form"
```

---

## Task 15: SEO (sitemap, robots, JSON-LD)

**Files:**
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Modify: `app/page.tsx` (add JSON-LD script)
- Modify: `app/contact/page.tsx` (add JSON-LD script)
- Modify: `app/layout.tsx` (default metadata + metadataBase)

- [ ] **Step 1: Implement `app/sitemap.ts`**

```typescript
import type { MetadataRoute } from "next";

const BASE_URL = "https://www.monestimationauto.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/estimation",
    "/comment-ca-marche",
    "/avis-clients",
    "/faq",
    "/contact",
  ];
  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));
}
```

- [ ] **Step 2: Implement `app/robots.ts`**

```typescript
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/estimation/merci" },
    sitemap: "https://www.monestimationauto.fr/sitemap.xml",
  };
}
```

- [ ] **Step 3: Add default metadata and metadataBase to `app/layout.tsx`**

```typescript
export const metadata: Metadata = {
  metadataBase: new URL("https://www.monestimationauto.fr"),
  title: {
    default: "Estimer Mon Auto — Estimation et rachat de véhicule",
    template: "%s",
  },
  description:
    "Estimation gratuite, rachat et mise en relation pour vendre votre véhicule d'occasion rapidement.",
  keywords: [
    "estimation voiture",
    "estimation véhicule",
    "rachat voiture",
    "vendre voiture rapidement",
    "reprise automobile",
  ],
};
```

- [ ] **Step 4: Add JSON-LD to `app/page.tsx`**

Add before the closing `</main>` in the returned JSX:

```typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Estimer Mon Auto",
      description: "Estimation gratuite et rachat de véhicules d'occasion.",
      areaServed: "FR",
    }),
  }}
/>
```

- [ ] **Step 5: Run full suite and build**

Run: `npm test && npm run build`
Expected: all green.

- [ ] **Step 6: Commit**

```bash
git add app/sitemap.ts app/robots.ts app/layout.tsx app/page.tsx
git commit -m "Add sitemap, robots.txt, default SEO metadata and JSON-LD"
```

---

## Task 16: README and environment scaffolding

**Files:**
- Create: `.env.example`
- Modify: `README.md`

- [ ] **Step 1: Create `.env.example`**

```
# Réservé pour la future intégration Supabase
# NEXT_PUBLIC_SUPABASE_URL=
# SUPABASE_SERVICE_ROLE_KEY=

# Réservé pour un futur envoi d'email (ex: Resend)
# RESEND_API_KEY=
```

- [ ] **Step 2: Write `README.md`**

Cover, in order: project description; local install (`npm install`, `npm run dev`); running tests (`npm test`); deployment to Vercel (push to GitHub, import project in Vercel, no build config needed — Next.js is auto-detected); configuring a custom domain in Vercel project settings; environment variables (reference `.env.example`); a "Connecting Supabase later" section explaining that only `lib/leads.ts::saveLead()`/`getAllLeads()` need to change; a "Connecting a CRM" section noting the same seam applies; a pre-launch checklist (replace placeholder phone/email/hours in `Footer.tsx`, `CallBar.tsx`, `app/contact/page.tsx`; replace `public/hero-car.jpg` placeholder with a licensed photo; update `BASE_URL` in `app/sitemap.ts`/`app/robots.ts`/`app/layout.tsx` metadataBase once the real domain is known).

- [ ] **Step 3: Commit**

```bash
git add README.md .env.example
git commit -m "Add README and environment variable scaffolding"
```

---

## Task 17: Final verification pass

- [ ] **Step 1: Full test suite**

Run: `npm test`
Expected: all tests pass.

- [ ] **Step 2: Production build**

Run: `npm run build`
Expected: succeeds with no type errors.

- [ ] **Step 3: Manual smoke test**

Run: `npm run dev`. Walk through: home page CTA → estimation form (all 4 steps, including a validation error on an empty required field) → submission → result page shows correct summary and message for a "chaud" profile (e.g., urgent sale, recent low-mileage car, valid phone) → check `data/leads.json` has the new entry with `statut: "nouveau"`. Then test the contact page form and the FAQ accordion toggle. Resize to mobile width and confirm the `CallBar` appears and the desktop nav collapses.

- [ ] **Step 4: Final commit if any fixes were needed**

```bash
git add -A
git commit -m "Fix issues found during final verification pass"
```
