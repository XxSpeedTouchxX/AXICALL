import nodemailer from "nodemailer";
import type { Lead } from "@/types/lead";
import { COMPANY } from "./company";

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

/** Sender shown to recipients. Falls back to the SMTP account when unset. */
function fromAddress(): string {
  const address = process.env.MAIL_FROM ?? process.env.SMTP_USER ?? "onboarding@resend.dev";
  return `${COMPANY.publicName} <${address}>`;
}

/**
 * Sends through the mailbox hosted alongside the site (o2switch includes one
 * with the domain). Preferred over a third-party API: no external account, no
 * quota, and the From address matches the site's own domain.
 */
async function sendViaSmtp({ to, subject, html }: SendEmailParams): Promise<boolean> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  if (!host || !user || !pass) return false;

  const port = Number(process.env.SMTP_PORT ?? 465);
  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      // 465 is implicit TLS; 587 upgrades via STARTTLS.
      secure: port === 465,
      auth: { user, pass },
    });
    await transporter.sendMail({ from: fromAddress(), to, subject, html });
  } catch (err) {
    console.error("[email] SMTP send failed", err);
  }
  return true;
}

/** Sends through the Resend HTTP API, when an API key is configured instead. */
async function sendViaResend({ to, subject, html }: SendEmailParams): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: fromAddress(), to, subject, html }),
    });
    if (!res.ok) {
      console.error(`[email] Resend API returned ${res.status} sending to ${to}`);
    }
  } catch (err) {
    console.error("[email] Resend send failed", err);
  }
  return true;
}

/**
 * Single seam for outbound email. Tries the site's own mailbox first, then
 * Resend, and otherwise logs instead of sending — so dev and CI stay silent
 * and nothing breaks until one of the two is configured (see .env.example).
 */
async function sendEmail(params: SendEmailParams): Promise<void> {
  if (await sendViaSmtp(params)) return;
  if (await sendViaResend(params)) return;
  console.log(
    `[email] No SMTP_* or RESEND_API_KEY configured — would have sent "${params.subject}" to ${params.to}`
  );
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
