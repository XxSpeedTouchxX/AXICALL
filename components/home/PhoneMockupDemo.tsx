"use client";

import { useState } from "react";
import { COMPANY } from "@/lib/company";
import styles from "./PhoneMockupDemo.module.css";

const TOTAL_STEPS = 6;
const BRAND_CHIPS = ["Peugeot", "Renault", "Volkswagen", "BMW"];
const FUEL_CHIPS = ["Essence", "Diesel", "Hybride", "Électrique"];

const STEP_TITLES = [
  "Votre véhicule",
  "Modèle & année",
  "Kilométrage & énergie",
  "Votre code postal",
  "Vos coordonnées",
];

/**
 * Visual-only preview of the estimation flow, shown inside a phone mockup on
 * the homepage. Purely local UI state (no submission) — the real, functional
 * form lives at /estimation; every CTA around this demo links there.
 */
export function PhoneMockupDemo() {
  const [step, setStep] = useState(0);
  const [method, setMethod] = useState<"plate" | "manual">("plate");
  const [brand, setBrand] = useState<string | null>(null);
  const [fuel, setFuel] = useState<string | null>(null);

  function next() {
    if (step < TOTAL_STEPS - 1) setStep(step + 1);
  }
  function back() {
    if (step > 0) setStep(step - 1);
  }
  function reset() {
    setStep(0);
    setBrand(null);
    setFuel(null);
  }

  const progressPct = Math.min(100, ((step + 1) / TOTAL_STEPS) * 100);
  const stepLabel = step < TOTAL_STEPS - 1 ? `Étape ${step + 1} sur ${TOTAL_STEPS - 1}` : "Terminé";

  return (
    <div className={styles.phoneWrap}>
      <div className={styles.phoneShell}>
        <div className={styles.dynamicIsland} />
        <div className={styles.screen}>
          <div className={styles.screenTopbar}>
            <div className={styles.brandmark}>
              {COMPANY.publicName}
              <small>Estimation gratuite</small>
            </div>
          </div>
          <div className={styles.screenBody}>
            <div className={styles.progress}>
              <div className={styles.progressFill} style={{ width: `${progressPct}%` }} />
            </div>
            <div className={styles.stepLabel}>{stepLabel}</div>
            {step < STEP_TITLES.length && <div className={styles.stepTitle}>{STEP_TITLES[step]}</div>}

            {step === 0 && (
              <div className={`${styles.stepPanel} ${styles.active}`}>
                <div className={styles.methodTabs}>
                  <button type="button" className={`${styles.mtab} ${method === "plate" ? styles.on : ""}`} onClick={() => setMethod("plate")}>
                    Plaque
                  </button>
                  <button type="button" className={`${styles.mtab} ${method === "manual" ? styles.on : ""}`} onClick={() => setMethod("manual")}>
                    Marque / modèle
                  </button>
                </div>
                {method === "plate" ? (
                  <div>
                    <input className={`${styles.field} ${styles.plateField}`} placeholder="AA-123-AA" maxLength={9} />
                    <div className={styles.hint}>On récupère automatiquement marque, modèle et année.</div>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                    <input className={styles.field} placeholder="Écrivez ou sélectionnez une marque" />
                    <div className={styles.chipRow}>
                      {BRAND_CHIPS.map((b) => (
                        <div key={b} className={`${styles.chip} ${brand === b ? styles.sel : ""}`} onClick={() => setBrand(b)}>
                          {b}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className={styles.stepNav}>
                  <button type="button" className={styles.btnNext} onClick={next}>Continuer</button>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className={`${styles.stepPanel} ${styles.active}`}>
                <input className={styles.field} placeholder="Modèle (ex : Clio V)" />
                <input className={styles.field} placeholder="Année de mise en circulation" />
                <div className={styles.stepNav}>
                  <button type="button" className={styles.btnBack} onClick={back}>Retour</button>
                  <button type="button" className={styles.btnNext} onClick={next}>Continuer</button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className={`${styles.stepPanel} ${styles.active}`}>
                <input className={styles.field} placeholder="Kilométrage" />
                <div className={styles.chipRow}>
                  {FUEL_CHIPS.map((f) => (
                    <div key={f} className={`${styles.chip} ${fuel === f ? styles.sel : ""}`} onClick={() => setFuel(f)}>
                      {f}
                    </div>
                  ))}
                </div>
                <div className={styles.stepNav}>
                  <button type="button" className={styles.btnBack} onClick={back}>Retour</button>
                  <button type="button" className={styles.btnNext} onClick={next}>Continuer</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className={`${styles.stepPanel} ${styles.active}`}>
                <input className={styles.field} placeholder="Code postal" />
                <input className={styles.field} placeholder="Votre prénom" />
                <div className={styles.stepNav}>
                  <button type="button" className={styles.btnBack} onClick={back}>Retour</button>
                  <button type="button" className={styles.btnNext} onClick={next}>Continuer</button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className={`${styles.stepPanel} ${styles.active}`}>
                <div className={styles.lastStepNote}>Dernière étape — 15 secondes</div>
                <input className={styles.field} placeholder="Numéro de téléphone" />
                <input className={styles.field} placeholder="Adresse e-mail" />
                <label className={styles.consent}>
                  <input type="checkbox" />
                  J&apos;accepte d&apos;être recontacté(e) par {COMPANY.publicName} au sujet de la vente de mon
                  véhicule. Consentement valable 12 mois, retrait possible à tout moment.
                </label>
                <div className={styles.stepNav}>
                  <button type="button" className={styles.btnBack} onClick={back}>Retour</button>
                  <button type="button" className={styles.btnNext} onClick={next}>Obtenir mon estimation</button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className={`${styles.stepPanel} ${styles.active}`} style={{ alignItems: "center", textAlign: "center", justifyContent: "center" }}>
                <div className={styles.successIcon}>→</div>
                <div className={styles.stepTitle} style={{ textAlign: "center" }}>Merci, c&apos;est noté !</div>
                <p style={{ fontSize: 12.5, color: "var(--muted)", lineHeight: 1.5 }}>
                  Une agence partenaire près de chez vous vous recontacte sous 24h.
                </p>
                <div className={styles.stepNav}>
                  <button type="button" className={styles.btnNext} onClick={reset}>Recommencer la démo</button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.homeIndicator} />
      </div>
    </div>
  );
}
