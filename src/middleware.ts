import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /admin routes (not /admin/login or /api/admin/login)
  if (
    pathname.startsWith("/admin") &&
    pathname !== "/admin/login" &&
    !pathname.startsWith("/api/admin/login")
  ) {
    const token = req.cookies.get("admin_auth")?.value;
    const secret = process.env.ADMIN_SECRET ?? "scrapyard_admin";

    if (!token || token !== secret) {
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
