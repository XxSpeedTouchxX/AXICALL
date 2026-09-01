/**
 * Client IP as seen behind o2switch's Apache/Passenger proxy. X-Forwarded-For
 * is a comma-separated chain; the first entry is the original client.
 */
export function clientIp(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip");
}
