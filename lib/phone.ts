export function normalizePhone(raw: string): string {
  return raw.replace(/\s+/g, "");
}

export function isValidFrenchPhone(raw: string): boolean {
  return /^0[1-9]\d{8}$/.test(normalizePhone(raw));
}
