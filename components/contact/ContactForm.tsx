"use client";

import { useState } from "react";
import { CheckCircle2, User, Mail, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { PhoneField } from "@/components/ui/PhoneField";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [values, setValues] = useState({ nom: "", email: "", telephone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "contact", ...values }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center gap-3 border border-[var(--color-gray-200)] bg-white p-10 text-center shadow-sm">
        <CheckCircle2 className="h-12 w-12 text-[var(--color-orange)]" aria-hidden="true" />
        <p className="text-lg font-semibold text-[var(--color-navy)]">Votre message a bien été envoyé.</p>
        <p className="text-sm text-[var(--color-gray-600)]">Nous revenons vers vous rapidement.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 border border-[var(--color-gray-200)] bg-white p-6 shadow-sm sm:p-8"
    >
      <Input
        label="Nom"
        name="nom"
        icon={User}
        value={values.nom}
        onChange={(e) => setValues({ ...values, nom: e.target.value })}
        required
      />
      <Input
        label="Email"
        name="email"
        type="email"
        icon={Mail}
        value={values.email}
        onChange={(e) => setValues({ ...values, email: e.target.value })}
        required
      />
      <PhoneField
        value={values.telephone}
        onChange={(telephone) => setValues({ ...values, telephone })}
      />
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-[var(--color-navy)]">
          Message
        </label>
        <div className="relative">
          <MessageSquare className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-[var(--color-gray-600)]" />
          <textarea
            id="message"
            value={values.message}
            onChange={(e) => setValues({ ...values, message: e.target.value })}
            className="w-full border border-[var(--color-gray-200)] bg-white py-2.5 pl-10 pr-3 text-[var(--color-navy)] transition-colors focus:border-[var(--color-orange)] focus:outline-none focus:ring-2 focus:ring-[var(--color-orange)]/15"
            rows={4}
            required
          />
        </div>
      </div>
      {status === "error" && (
        <p className="text-sm text-red-600">Une erreur est survenue, merci de réessayer.</p>
      )}
      <Button type="submit" loading={status === "sending"} className="w-full sm:w-auto">
        {status === "sending" ? "Envoi en cours…" : "Envoyer"}
      </Button>
    </form>
  );
}
