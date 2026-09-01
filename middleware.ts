import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Protects the back-office with HTTP Basic authentication.
 *
 * The pages behind /admin list prospects' names, phone numbers and emails, so
 * this fails closed: if ADMIN_USER/ADMIN_PASSWORD are not set, the section is
 * unreachable rather than public.
 */
export function middleware(request: NextRequest) {
  const expectedUser = process.env.ADMIN_USER;
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedUser || !expectedPassword) {
    return new NextResponse(
      "Back-office désactivé : définissez ADMIN_USER et ADMIN_PASSWORD.",
      { status: 503 }
    );
  }

  const header = request.headers.get("authorization");
  if (header?.startsWith("Basic ")) {
    const [user, password] = atob(header.slice(6)).split(":");
    if (user === expectedUser && password === expectedPassword) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentification requise", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Back-office", charset="UTF-8"' },
  });
}

export const config = {
  matcher: "/admin/:path*",
};
