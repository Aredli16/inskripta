import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  const hostname =
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host") ||
    "";
  const subdomain = hostname.split(".")[0];
  const searchParams = request.nextUrl.searchParams.toString();
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = `${request.nextUrl.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

  // Check if the request is for the auth page or any of its subpages => continue
  if (request.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.next();
  }

  // If the request is from localhost, rewrite it to /home (landing page)
  if (hostname === "localhost:3000" || subdomain === "localhost") {
    // If the request is from localhost/admin, rewrite it to /home/admin (super admin page) and require authentication
    if (request.nextUrl.pathname.startsWith("/admin")) {
      const response = await updateSession(request);

      // User is not authenticated => redirect to /auth
      if (response.headers.get("location")?.includes("/auth")) {
        return response;
      }

      // User is authenticated => rewrite to /home/admin
      return NextResponse.rewrite(
        new URL(`/home${path === "/" ? "" : path}`, request.url),
        response,
      );
    }

    // If the request is from localhost, rewrite it to /home (landing page)
    return NextResponse.rewrite(
      new URL(`/home${path === "/" ? "" : path}`, request.url),
    );
  }

  const response = await updateSession(request);

  // User is not authenticated => redirect to /auth
  if (response.headers.get("location")?.includes("/auth")) {
    return response;
  }

  // Rewrite everything else to  ̀/[domain]` dynamic route
  return NextResponse.rewrite(
    new URL(`/${subdomain}${path}`, request.url),
    response,
  );
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
