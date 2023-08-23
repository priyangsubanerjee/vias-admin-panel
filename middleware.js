import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const session = await getToken({ req: req, secret: process.env.SECRET_SALT });
  if (req.nextUrl.pathname === "/") {
    if (session) {
      console.log("Auth");
      return NextResponse.redirect(new URL("/inventory", req.url));
    } else {
      console.log("Auth wrong");

      return NextResponse.next();
    }
  } else {
    if (session) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
}

export const config = {
  matcher: ["/", "/inventory/:path*", "/customers/:path*"],
};
