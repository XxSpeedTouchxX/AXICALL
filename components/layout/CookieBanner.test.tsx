import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CookieBanner } from "./CookieBanner";

beforeEach(() => {
  window.localStorage.clear();
});

describe("CookieBanner", () => {
  it("shows the banner on first visit", async () => {
    render(<CookieBanner />);
    await waitFor(() => {
      expect(screen.getByRole("region", { name: /consentement aux cookies/i })).toBeInTheDocument();
    });
  });

  it("hides the banner and persists the choice after accepting", async () => {
    render(<CookieBanner />);
    const user = userEvent.setup();
    await waitFor(() => screen.getByRole("button", { name: /accepter/i }));
    await user.click(screen.getByRole("button", { name: /accepter/i }));
    expect(screen.queryByRole("region", { name: /consentement aux cookies/i })).not.toBeInTheDocument();
    expect(window.localStorage.getItem("cookie-consent")).toBe("accepted");
  });

  it("hides the banner and persists the choice after declining", async () => {
    render(<CookieBanner />);
    const user = userEvent.setup();
    await waitFor(() => screen.getByRole("button", { name: /refuser/i }));
    await user.click(screen.getByRole("button", { name: /refuser/i }));
    expect(window.localStorage.getItem("cookie-consent")).toBe("declined");
  });

  it("does not show again once a choice was already stored", () => {
    window.localStorage.setItem("cookie-consent", "accepted");
    render(<CookieBanner />);
    expect(screen.queryByRole("region", { name: /consentement aux cookies/i })).not.toBeInTheDocument();
  });
});
