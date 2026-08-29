import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Estimer mon véhicule</Button>);
    expect(screen.getByRole("button", { name: "Estimer mon véhicule" })).toBeInTheDocument();
  });

  it("applies the orange variant class by default", () => {
    render(<Button>CTA</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-[var(--accent)]");
  });

  it("applies the outline variant class when specified", () => {
    render(<Button variant="outline">Secondaire</Button>);
    expect(screen.getByRole("button")).not.toHaveClass("bg-[var(--accent)]");
  });
});
