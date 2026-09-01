// @vitest-environment node
import { describe, it, expect, beforeEach } from "vitest";
import { checkRateLimit, resetRateLimit } from "./rateLimit";

beforeEach(() => {
  resetRateLimit();
});

describe("checkRateLimit", () => {
  it("allows requests up to the limit", () => {
    for (let i = 0; i < 5; i++) {
      expect(checkRateLimit("1.2.3.4").allowed).toBe(true);
    }
  });

  it("blocks the request that exceeds the limit", () => {
    for (let i = 0; i < 5; i++) checkRateLimit("1.2.3.4");
    const result = checkRateLimit("1.2.3.4");
    expect(result.allowed).toBe(false);
    expect(result.retryAfterSeconds).toBeGreaterThan(0);
  });

  it("tracks each caller separately", () => {
    for (let i = 0; i < 5; i++) checkRateLimit("1.2.3.4");
    expect(checkRateLimit("5.6.7.8").allowed).toBe(true);
  });

  it("allows again once the window has passed", () => {
    const start = Date.now();
    for (let i = 0; i < 5; i++) checkRateLimit("1.2.3.4", start);
    expect(checkRateLimit("1.2.3.4", start).allowed).toBe(false);
    expect(checkRateLimit("1.2.3.4", start + 61_000).allowed).toBe(true);
  });
});
