import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "./app/lib/session";

const privateRoutes = ["/user", "/user/cart", "/user/wishlist"];

export default async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPrivateRoute = privateRoutes.includes(path);

  const cookie = (await cookies()).get("session")?.value;
  if (cookie === undefined) return NextResponse.next();

  const session = await decrypt(cookie);
  if (session === undefined) (await cookies()).delete("session");

  if (isPrivateRoute && !session?.userID) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
