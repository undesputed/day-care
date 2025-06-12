import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

const PUBLIC_PATHS = [
  "/",
  "/admin/login",
  "/login",
  "/register",
  "/forgot-password",
  "/api",
  "/_next",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
  "/public",
];

export default async function middleware(request: NextRequest) {
  // Allow public paths
  const { pathname } = request.nextUrl;
  if (
    pathname === "/" ||
    PUBLIC_PATHS.some((path) => path !== "/" && pathname.startsWith(path))
  ) {
    return NextResponse.next();
  }

  // Create Supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll() {},
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If not logged in, redirect to login
  if (!user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Get user role from metadata
  const { data: profile } = await supabase
    .from('user_profile')
    .select('user_role')
    .eq('user_id', user.id)
    .single();

  const userRole = profile?.user_role;

  // Role-based access control
  if (pathname.startsWith('/admin')) {
    if (userRole !== 'admin') {
      // Redirect non-admin users trying to access admin routes
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else if (pathname.startsWith('/provider')) {
    if (userRole !== 'provider') {
      // Redirect non-provider users trying to access provider routes
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else if (pathname === '/' || pathname.startsWith('/dashboard')) {
    if (userRole === 'admin') {
      // Redirect admin users trying to access user dashboard
      return NextResponse.redirect(new URL('/admin', request.url));
    } else if (userRole === 'provider') {
      // Redirect provider users trying to access user dashboard
      return NextResponse.redirect(new URL('/provider', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js|ico|txt|xml)$).*)",
  ],
};
