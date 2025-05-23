import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { publicRoutes, authRoutes } from '@/routes';

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    const isLoggedIn = !!token;
    const { pathname } = req.nextUrl;
    const { nextUrl } = req;

    const isPublic = publicRoutes.includes(pathname);
    const isAuthRoute = authRoutes.includes(pathname);
    const isProfileComplete = token?.profileComplete;
    const isAdmin = token?.role === 'ADMIN';
    const isAdminRoute = nextUrl.pathname.startsWith('/admin');

    if (isPublic || isAdmin) {
        return NextResponse.next();
    }

    if (isAdminRoute && !isAdmin) {
        return NextResponse.redirect(new URL('/', nextUrl));
    }

    if (isAuthRoute && isLoggedIn && pathname !== '/members') {
        return NextResponse.redirect(new URL('/members', req.url));
    }

    if (!isPublic && !isLoggedIn && !isAuthRoute) {
        if (pathname !== '/login' && pathname !== '/register') {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }

    if (isLoggedIn && !isProfileComplete && nextUrl.pathname !== '/complete-profile') {
        return NextResponse.redirect(new URL('/complete-profile', nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico|sitemap.xml|robots.txt).*)'],
};
