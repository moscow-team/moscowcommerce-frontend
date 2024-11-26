import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
interface Session {
  estado: string;
  token: string;
  role: string;
}
const restrictedCustomerRoutes = ["/dashboard"]; // Define your restricted routes here
const restrictedAdminRoutes = ["/carrito"]; // Define your restricted routes here

export default withAuth(async function middleware(req: NextRequest) {
  const session: Session | null = req.nextauth.token;
  if (!session) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  if (
    session.role == "CUSTOMER" &&
    restrictedCustomerRoutes.some((route) =>
      req.nextUrl.pathname.startsWith(route)
    )
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (
    session.role == "ADMIN" &&
    restrictedAdminRoutes.some((route) =>
      req.nextUrl.pathname.startsWith(route)
    )
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
});

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/(.*)",
    "/perfil",
    "/perfil/(.*)",
    "/categoria",
    "/categoria/(.*)",
    "/producto",
    "/producto/(.*)",
    "/carrito",
  ],
};
