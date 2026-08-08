import { NextResponse } from "next/server";
import { estimationFormSchema, contactFormSchema } from "@/lib/validation";
import { scoreLead } from "@/lib/scoring";
import { saveLead } from "@/lib/leads";
import { CONSENT_TEXT } from "@/lib/company";
import { notifyAgencyOfNewLead, confirmEstimationToProspect } from "@/lib/email";

export async function POST(request: Request) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

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
    await notifyAgencyOfNewLead(lead);
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
    consentement: { texte: CONSENT_TEXT },
  });

  await notifyAgencyOfNewLead(lead);
  await confirmEstimationToProspect(lead);

  return NextResponse.json({ id: lead.id, score, urgence });
}
