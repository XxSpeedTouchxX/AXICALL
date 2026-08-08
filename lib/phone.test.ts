import { describe, it, expect } from "vitest";
import { isValidFrenchPhone, isValidInternationalPhone, normalizePhone } from "./phone";

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

  it("accepts a +33-prefixed number", () => {
    expect(isValidFrenchPhone("+33 6 12 34 56 78")).toBe(true);
    expect(isValidFrenchPhone("+33612345678")).toBe(true);
  });
});

describe("isValidInternationalPhone", () => {
  it("accepts any valid French number", () => {
    expect(isValidInternationalPhone("0612345678")).toBe(true);
    expect(isValidInternationalPhone("+33 6 12 34 56 78")).toBe(true);
  });

  it("accepts a loose international number with a country code", () => {
    expect(isValidInternationalPhone("+1 415 555 0123")).toBe(true);
    expect(isValidInternationalPhone("+32 470 12 34 56")).toBe(true);
  });

  it("rejects numbers without a country code that aren't valid French numbers", () => {
    expect(isValidInternationalPhone("123")).toBe(false);
    expect(isValidInternationalPhone("1612345678")).toBe(false);
  });

  it("rejects an international number that's too short", () => {
    expect(isValidInternationalPhone("+123")).toBe(false);
  });
});
