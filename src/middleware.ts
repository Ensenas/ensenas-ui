import { NextResponse } from 'next/server';
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const { pathname } = req.nextUrl;
    const isAuthorized = req.nextauth?.token?.premium;
    if (
      (pathname.startsWith('/learning/levels/') && (pathname.includes('intermedio') || pathname.includes('avanzado'))) ||
      pathname.includes('/freeMode') || pathname.includes('/contact')
    ) {
      if (!isAuthorized) {
        return NextResponse.redirect(new URL('/access-denied', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ['/learning/levels/:path*', '/freeMode', '/contact']
};