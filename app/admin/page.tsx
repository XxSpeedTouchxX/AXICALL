import type { Metadata } from "next";
import { getAllLeads } from "@/lib/leads";
import type { Lead, LeadStatus } from "@/types/lead";
import { LeadStatusSelect } from "./LeadStatusSelect";

export const metadata: Metadata = {
  title: "Back-office — leads",
  robots: { index: false, follow: false },
};

// Always read the file fresh: leads arrive while the process is running.
export const dynamic = "force-dynamic";

const STATUS_LABELS: Record<LeadStatus, string> = {
  nouveau: "Nouveau",
  a_rappeler: "À rappeler",
  contacte: "Contacté",
  rendez_vous_pris: "RDV pris",
  vendu: "Vendu",
  perdu: "Perdu",
};

const URGENCE_STYLE: Record<string, string> = {
  chaud: "bg-accent text-black",
  tiede: "bg-accent/20 text-ink",
  froid: "bg-line text-muted",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Days until the 12-month phone consent lapses; negative once expired. */
function daysUntil(iso: string): number {
  return Math.ceil((new Date(iso).getTime() - Date.now()) / 86_400_000);
}

export default async function AdminPage() {
  const leads = await getAllLeads();
  const sorted = [...leads].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const estimations = sorted.filter((l): l is Extract<Lead, { type: "estimation" }> => l.type === "estimation");
  const expiringSoon = estimations.filter((l) => {
    const days = daysUntil(l.consentement.dateExpiration);
    return days <= 30;
  });

  return (
    <main className="min-h-screen bg-paper px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow mb-2">— Back-office</p>
        <h1 className="mb-6 text-2xl font-bold tracking-tight text-ink md:text-3xl">
          Leads reçus
        </h1>

        <div className="mb-8 grid gap-3 sm:grid-cols-4">
          <Stat label="Total" value={sorted.length} />
          <Stat label="Estimations" value={estimations.length} />
          <Stat label="Nouveaux" value={sorted.filter((l) => l.statut === "nouveau").length} />
          <Stat
            label="Consentements à renouveler"
            value={expiringSoon.length}
            warn={expiringSoon.length > 0}
          />
        </div>

        {sorted.length === 0 ? (
          <p className="border border-line bg-white p-8 text-center text-muted">
            Aucun lead pour le moment.
          </p>
        ) : (
          <div className="overflow-x-auto border border-line bg-white">
            <table className="w-full min-w-[900px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-paper/60">
                  <th className="border-b-2 border-line px-4 py-3 font-bold text-ink">Reçu le</th>
                  <th className="border-b-2 border-line px-4 py-3 font-bold text-ink">Prospect</th>
                  <th className="border-b-2 border-line px-4 py-3 font-bold text-ink">Véhicule</th>
                  <th className="border-b-2 border-line px-4 py-3 font-bold text-ink">Score</th>
                  <th className="border-b-2 border-line px-4 py-3 font-bold text-ink">Consentement</th>
                  <th className="border-b-2 border-line px-4 py-3 font-bold text-ink">Statut</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((lead) => {
                  const isEstimation = lead.type === "estimation";
                  const expiry = isEstimation ? daysUntil(lead.consentement.dateExpiration) : null;
                  return (
                    <tr key={lead.id} className="align-top">
                      <td className="border-b border-line px-4 py-3 text-muted">
                        {formatDate(lead.createdAt)}
                      </td>
                      <td className="border-b border-line px-4 py-3">
                        <p className="font-semibold text-ink">
                          {isEstimation ? `${lead.prospect.prenom} ${lead.prospect.nom}` : lead.prospect.nom}
                        </p>
                        <p className="text-muted">
                          <a href={`tel:${lead.prospect.telephone}`} className="underline">
                            {lead.prospect.telephone}
                          </a>
                        </p>
                        <p className="text-muted">
                          <a href={`mailto:${lead.prospect.email}`} className="underline">
                            {lead.prospect.email}
                          </a>
                        </p>
                        {isEstimation && <p className="text-muted">{lead.prospect.ville}</p>}
                      </td>
                      <td className="border-b border-line px-4 py-3 text-muted">
                        {isEstimation ? (
                          <>
                            <p className="font-semibold text-ink">
                              {lead.vehicule.marque} {lead.vehicule.modele}
                            </p>
                            <p>
                              {lead.vehicule.annee} — {lead.vehicule.kilometrage.toLocaleString("fr-FR")} km
                            </p>
                            <p>{lead.vehicule.carburant}</p>
                          </>
                        ) : (
                          <p className="max-w-xs whitespace-pre-wrap">{lead.prospect.message}</p>
                        )}
                      </td>
                      <td className="border-b border-line px-4 py-3">
                        {isEstimation ? (
                          <span
                            className={`inline-block px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${
                              URGENCE_STYLE[lead.urgence] ?? ""
                            }`}
                          >
                            {lead.score} · {lead.urgence}
                          </span>
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>
                      <td className="border-b border-line px-4 py-3 text-xs text-muted">
                        {isEstimation ? (
                          <>
                            <p className={expiry !== null && expiry <= 30 ? "font-bold text-red-700" : ""}>
                              {expiry !== null && expiry < 0
                                ? `Expiré depuis ${Math.abs(expiry)} j`
                                : `Valide ${expiry} j`}
                            </p>
                            <p>IP : {lead.consentement.adresseIp ?? "inconnue"}</p>
                            <p>CGU : {lead.consentement.cguAcceptees ? "acceptées" : "non"}</p>
                          </>
                        ) : (
                          <span>—</span>
                        )}
                      </td>
                      <td className="border-b border-line px-4 py-3">
                        <LeadStatusSelect
                          id={lead.id}
                          statut={lead.statut}
                          labels={STATUS_LABELS}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-6 text-xs text-muted">
          Données personnelles — accès réservé. Un consentement téléphonique expiré interdit tout
          nouvel appel : voir la procédure d&apos;opposition.
        </p>
      </div>
    </main>
  );
}

function Stat({ label, value, warn }: { label: string; value: number; warn?: boolean }) {
  return (
    <div className={`border-l-[3px] bg-white p-4 ${warn ? "border-red-600" : "border-accent"}`}>
      <p className="text-2xl font-bold tracking-tight text-ink">{value}</p>
      <p className="text-xs uppercase tracking-wide text-muted">{label}</p>
    </div>
  );
}
