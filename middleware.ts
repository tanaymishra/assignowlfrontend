import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Array of exempted routes that don't require authentication
const exemptedRoutes = [
  '/',                    // Home page
  '/auth/signup',         // Signup page
  '/auth/login',          // Login page (if exists)
  '/auth/verify',         // Email verification (if exists)
  '/auth/forgot-password', // Forgot password (if exists)
  '/auth/reset-password',  // Reset password (if exists)
  '/api/auth/login',      // Login API
  '/api/auth/signup',     // Signup API
  '/api/auth/verify',     // Verification API
  '/api/auth/logout',     // Logout API
  '/favicon.ico',         // Favicon
  '/_next',               // Next.js static assets
  '/public',              // Public assets
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the current route is in the exempted routes
  const isExemptedRoute = exemptedRoutes.some(route => {
    // Handle exact matches
    if (route === pathname) return true
    
    // Handle routes that start with certain patterns (like /_next, /api)
    if (route.endsWith('/') && pathname.startsWith(route)) return true
    if (pathname.startsWith(route + '/')) return true
    
    return false
  })

  // If the route is exempted, let it proceed
  if (isExemptedRoute) {
    return NextResponse.next()
  }

  // Check if the token cookie exists
  const token = request.cookies.get('token')

  // If no token exists, redirect to home page
  if (!token) {
    const homeUrl = new URL('/', request.url)
    return NextResponse.redirect(homeUrl)
  }

  // If token exists, let the request proceed
  return NextResponse.next()
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}