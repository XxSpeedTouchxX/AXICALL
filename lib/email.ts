import type { Lead } from "@/types/lead";
import { COMPANY } from "./company";

const FROM_ADDRESS = "MonEstimationAuto <onboarding@resend.dev>";

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

/**
 * Single seam for outbound email. Without RESEND_API_KEY set, this logs
 * instead of sending — safe to call in dev/CI, and starts working the
 * moment a real key is added to the environment (see .env.example).
 */
async function sendEmail({ to, subject, html }: SendEmailParams): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log(`[email] RESEND_API_KEY not set — would have sent "${subject}" to ${to}`);
    return;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: FROM_ADDRESS, to, subject, html }),
    });
    if (!res.ok) {
      console.error(`[email] Resend API returned ${res.status} sending to ${to}`);
    }
  } catch (err) {
    console.error("[email] Failed to send email", err);
  }
}

/** Notifies the agency inbox whenever a new lead (estimation or contact) comes in. */
export async function notifyAgencyOfNewLead(lead: Lead): Promise<void> {
  if (lead.type === "estimation") {
    const { vehicule, prospect, score, urgence } = lead;
    await sendEmail({
      to: COMPANY.email,
      subject: `Nouveau lead ${urgence} — ${vehicule.marque} ${vehicule.modele}`,
      html: `
        <h2>Nouvelle demande d'estimation</h2>
        <p><strong>Score:</strong> ${score}/100 (${urgence})</p>
        <p><strong>Véhicule:</strong> ${vehicule.marque} ${vehicule.modele} (${vehicule.annee}) — ${vehicule.kilometrage} km — ${vehicule.carburant}</p>
        <p><strong>Prospect:</strong> ${prospect.prenom} ${prospect.nom} — ${prospect.telephone} — ${prospect.email} — ${prospect.ville}</p>
      `,
    });
  } else {
    const { prospect } = lead;
    await sendEmail({
      to: COMPANY.email,
      subject: `Nouveau message de contact — ${prospect.nom}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>De:</strong> ${prospect.nom} — ${prospect.telephone} — ${prospect.email}</p>
        <p><strong>Message:</strong> ${prospect.message}</p>
      `,
    });
  }
}

/** Confirms receipt to the prospect after an estimation submission. */
export async function confirmEstimationToProspect(lead: Lead): Promise<void> {
  if (lead.type !== "estimation") return;
  await sendEmail({
    to: lead.prospect.email,
    subject: "Votre demande d'estimation a bien été reçue",
    html: `
      <p>Bonjour ${lead.prospect.prenom},</p>
      <p>Nous avons bien reçu votre demande d'estimation pour votre ${lead.vehicule.marque} ${lead.vehicule.modele}.
      Un membre de notre équipe vous recontactera prochainement.</p>
      <p>L'équipe ${COMPANY.publicName}</p>
    `,
  });
}
