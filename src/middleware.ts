import { NextResponse } from "next/server";

const subdomains = [{ subdomain: "admin" }, { subdomain: "sales" }];

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};

export default async function middleware(req: Request) {
  const url = new URL(req.url);
  const hostname = req.headers.get("host") || "";

  // Define list of allowed domains
  const allowedDomains = [
    "localhost:3000",
    "localhost:3001",
    "sebastianshanreinaldo.com",
    "b689qkm0-3000.asse.devtunnels.ms",
    "192.168.0.102:3000",
    "192.168.0.102:3001",
  ];

  // Check if the current hostname is in the list of allowed domains
  const isAllowedDomain = allowedDomains.some((domain) =>
    hostname.includes(domain)
  );

  // Extract the port from the hostname
  const port = url.port;

  console.log("Hostname:", hostname);
  console.log("Port:", port);

  // Determine the subdomain based on the port
  let subdomain = "";
  if (port === "3000") {
    subdomain = "admin";
  } else if (port === "3001") {
    subdomain = "sales";
  }

  // If user is on an allowed domain and has a valid subdomain
  if (isAllowedDomain && (subdomain === "admin" || subdomain === "sales")) {
    // Rewrite the URL to include the subdomain as a dynamic path
    const rewriteUrl = new URL(`/${subdomain}${url.pathname}`, req.url);
    console.log("Rewriting to:", rewriteUrl.toString());
    return NextResponse.rewrite(rewriteUrl);
  }

  console.warn("Request not allowed:", req.url);
  return new Response(null, { status: 404 });
}
