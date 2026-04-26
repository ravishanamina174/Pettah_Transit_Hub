import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isProtectedRoute = createRouteMatcher(['/booking(.*)']);

export default clerkMiddleware(async (auth, req) => {
  // 1. Handle Clerk Protection
  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  // 2. Handle your Proxy Logic (Example)
  // If your proxy.ts was forwarding requests to a backend:
  if (req.nextUrl.pathname.startsWith('/api/proxy-target')) {
     return NextResponse.rewrite(new URL('https://your-api-url.com', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // This matcher is required for Clerk and Next.js internal optimization
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};