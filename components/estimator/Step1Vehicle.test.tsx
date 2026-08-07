import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Step1Vehicle } from "./Step1Vehicle";

describe("Step1Vehicle", () => {
  it("calls onChange with the entered marque", async () => {
    const onChange = vi.fn();
    render(<Step1Vehicle value={{}} onChange={onChange} />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText("Marque"), "Renault");
    expect(onChange).toHaveBeenCalled();
  });

  it("renders fuel type options as radio cards", () => {
    render(<Step1Vehicle value={{}} onChange={vi.fn()} />);
    expect(screen.getByText("Essence")).toBeInTheDocument();
    expect(screen.getByText("Diesel")).toBeInTheDocument();
    expect(screen.getByText("Hybride")).toBeInTheDocument();
    expect(screen.getByText("Electrique")).toBeInTheDocument();
  });
});
