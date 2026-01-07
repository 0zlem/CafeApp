import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {

    const token = req.cookies.get("access_token")?.value;

    if (!token) {
    return NextResponse.redirect(new URL("/401", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/categories/:path*",
    "/products/:path*",
    "/users/:path*",
    "/tables/:path*",
    "/dashboard/:path*",
    "/ordersKitchen/:path*",
    "/ordersWaiter/:path*",
  ],
};