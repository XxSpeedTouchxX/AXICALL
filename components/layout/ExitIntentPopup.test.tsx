import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { ExitIntentPopup } from "./ExitIntentPopup";

beforeEach(() => {
  sessionStorage.clear();
  vi.useFakeTimers();
});

describe("ExitIntentPopup", () => {
  it("does not show immediately", () => {
    render(<ExitIntentPopup />);
    expect(screen.queryByText(/estimer mon véhicule/i)).not.toBeInTheDocument();
  });

  it("shows after mouse leaves the top of the viewport", () => {
    render(<ExitIntentPopup />);
    act(() => {
      const evt = new MouseEvent("mouseout", { clientY: -10 });
      document.dispatchEvent(evt);
    });
    expect(screen.getByText(/avant de partir/i)).toBeInTheDocument();
  });

  it("does not show again in the same session after dismissal", () => {
    sessionStorage.setItem("exit-intent-dismissed", "true");
    render(<ExitIntentPopup />);
    act(() => {
      const evt = new MouseEvent("mouseout", { clientY: -10 });
      document.dispatchEvent(evt);
    });
    expect(screen.queryByText(/avant de partir/i)).not.toBeInTheDocument();
  });
});
