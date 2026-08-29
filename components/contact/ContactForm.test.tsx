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
    expect(await screen.findByText(/message a bien été envoyé/i)).toBeInTheDocument();
  });
});
