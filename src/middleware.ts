import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { publicRoutes, authRoutes } from '@/routes';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const isLoggedIn = !!token;
  const { pathname } = req.nextUrl;

  const isPublic = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);

  if (isPublic) {
    return NextResponse.next();
  }

  if (isAuthRoute && isLoggedIn && pathname !== '/members') {
    return NextResponse.redirect(new URL('/members', req.url));
  }

  if (!isPublic && !isLoggedIn) {
    if (pathname !== '/login' && pathname !== '/register') {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
