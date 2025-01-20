import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { verifyJwt } from "./lib/jwt";

export async function middleware(request: NextRequest) {
  // Define Secret
  const secret = process.env.NEXTAUTH_SECRET;

  // Retrieve the token
  const token = await getToken({ req: request, secret });
  const { pathname } = request.nextUrl;

  // If no token is found, redirect to /login
  if (!token) {
    return logoutAndRedirect(request);
  }

  try {
    // Verify the JWT token
    const payload = await verifyJwt(String(token.access_token));
    const role = payload.role;

    // Role-based access control
    if (pathname.startsWith("/sales") && role !== "sales") {
      return NextResponse.redirect(new URL("/admin", request.url));
    } else if (pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/sales", request.url));
    }

    // Redirect root path to /sales
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/sales", request.url));
    }
  } catch (error) {
    // If token verification fails, logout and redirect
    return logoutAndRedirect(request);
  }

  // Allow the request to continue
  return NextResponse.next();
}

// Utility function to logout and redirect
function logoutAndRedirect(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/login", request.url));

  // Clear authentication cookies
  response.cookies.set("next-auth.session-token", "", { path: "/", maxAge: 0 });
  response.cookies.set("next-auth.callback-url", "", { path: "/", maxAge: 0 });

  return response;
}

export const config = {
  matcher: ["/", "/sales/:path*", "/admin/:path*"],
};
