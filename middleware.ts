import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_ROUTES } from "./routes";

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isAuthRoute = pathname.includes(AUTH_ROUTES);
  const token = req.cookies.get("token");
  if (pathname.startsWith("/videos")) {
    return NextResponse.next();
  }
  if (token) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/auth/admin/get-admin`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      if (isAuthRoute) {
        return NextResponse.redirect(new URL("/", req.url));
      }
      return NextResponse.next();
    } else {
      // Handle invalid token case
      if (!isAuthRoute) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }
      return NextResponse.next();
    }
  } else {
    if (!isAuthRoute) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
