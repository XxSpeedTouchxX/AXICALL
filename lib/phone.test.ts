import { describe, it, expect } from "vitest";
import { isValidFrenchPhone, normalizePhone } from "./phone";

describe("normalizePhone", () => {
  it("strips all whitespace", () => {
    expect(normalizePhone("06 12 34 56 78")).toBe("0612345678");
    expect(normalizePhone("06 123 45678")).toBe("0612345678");
  });
});

describe("isValidFrenchPhone", () => {
  it("accepts a 10-digit number starting with 0 regardless of spacing", () => {
    expect(isValidFrenchPhone("0612345678")).toBe(true);
    expect(isValidFrenchPhone("06 12 34 56 78")).toBe(true);
    expect(isValidFrenchPhone("06 123 45678")).toBe(true);
  });

  it("rejects numbers that are too short or don't start with 0", () => {
    expect(isValidFrenchPhone("123")).toBe(false);
    expect(isValidFrenchPhone("1612345678")).toBe(false);
  });
});
