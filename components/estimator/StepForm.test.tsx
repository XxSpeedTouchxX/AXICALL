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
