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
