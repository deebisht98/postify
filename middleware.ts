// export { default } from "next-auth/middleware";
// import withAuth from "next-auth/middleware";

// export default withAuth({
//   pages: {
//     signIn: `/login`,
//   },
// });

// export const config = { matcher: ["/create"] };

import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  if (req.nextUrl.pathname.startsWith("/login") && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/create") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  //   const authMiddleware = await withAuth({
  //     pages: {
  //       signIn: `/login`,
  //     },
  //   });

  //   return authMiddleware(req, event);
}
