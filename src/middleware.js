import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdmin = token?.user?.isAdmin;
    const path = req.nextUrl.pathname;

    // Admin sayfası kontrolü
    if (path.startsWith("/admin")) {
      if (!isAdmin) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    // Blog sayfası kontrolü - token varsa erişime izin ver
    if (path.startsWith("/blog")) {
      if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // Token varsa authorized true döner
      authorized: ({ token }) => !!token
    }
  }
);

// Hangi path'lerin middleware tarafından kontrol edileceğini belirtiyoruz
export const config = {
  matcher: [
    "/admin/:path*", 
    "/blog/:path*",
    "/blog"  // blog ana sayfası için
  ]
};