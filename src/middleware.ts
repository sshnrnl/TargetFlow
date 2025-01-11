import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  // Define your secret from the next-auth configuration
  const secret = process.env.NEXTAUTH_SECRET;

  // Retrieve the token from the cookies
  const token = await getToken({ req: request, secret });

  const { pathname } = request.nextUrl;

  // If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Role-based access control
  if (pathname.startsWith("/sales") && token.role !== "sales") {
    return NextResponse.redirect(new URL("/admin", request.url));
  } else if (pathname.startsWith("/admin") && token.role !== "admin") {
    return NextResponse.redirect(new URL("/sales", request.url));
  }

  // Allow access to the root path
  if (pathname === "/" && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/sales/:path*", "/admin/:path*"],
};
