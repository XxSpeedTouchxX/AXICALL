export function normalizePhone(raw: string): string {
  return raw.replace(/\s+/g, "");
}

export function isValidFrenchPhone(raw: string): boolean {
  const normalized = normalizePhone(raw);
  const asNationalFormat = normalized.startsWith("+33") ? "0" + normalized.slice(3) : normalized;
  return /^0[1-9]\d{8}$/.test(asNationalFormat);
}

/**
 * Accepts a French national/mobile number (with or without the +33 prefix)
 * or a loose international number (+ followed by 7-15 digits), so the
 * contact form can be used with a non-French dial code.
 */
export function isValidInternationalPhone(raw: string): boolean {
  if (isValidFrenchPhone(raw)) return true;
  const normalized = normalizePhone(raw);
  return /^\+\d{7,15}$/.test(normalized);
}
