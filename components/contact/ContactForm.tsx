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
