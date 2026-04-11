import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function proxy(req) {
    const role = req.nextauth?.token?.role;

    // If authenticated but not ADMIN, redirect to login with error
    if (!role || role !== "ADMIN") {
      return NextResponse.redirect(
        new URL("/admin/login?error=AccessDenied", req.url)
      );
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/admin/login",
    },
  }
);

export const config = {
  // Protect all /admin routes EXCEPT the login page itself
  matcher: ["/admin", "/admin/((?!login).*)"],
};
