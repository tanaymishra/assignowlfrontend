import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Array of exempted route patterns that don't require authentication
const exemptedRoutes = [
  '/',              // Home page
  '/auth/*',        // All auth routes
  '/api/*',         // All API routes
  '/_next/*',       // Next.js static assets
  '/public/*',      // Public assets
  '/favicon.ico',   // Favicon
  '/comman/*',
  '/sections/*'
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  console.log('🔍 Middleware checking path:', pathname)

  // Check if the current route matches any exempted pattern
  const isExemptedRoute = exemptedRoutes.some(pattern => {
    if (pattern.endsWith('/*')) {
      // Handle wildcard patterns like /auth/* or /api/*
      const basePattern = pattern.slice(0, -2) // Remove /*
      return pathname.startsWith(basePattern)
    } else {
      // Handle exact matches
      return pathname === pattern
    }
  })

  if (isExemptedRoute) {
    console.log('✅ Route is exempted, allowing access')
    return NextResponse.next()
  }

  // Check if the token cookie exists
  const token = request.cookies.get('token')
  console.log(request.cookies , "Cookies")
  if (token && token.value) {
    console.log('🔑 Token found:', token.value)
    console.log('✅ Token present, allowing access')
    return NextResponse.next()
  } else {
    console.log('❌ No token found, redirecting to home')
    const homeUrl = new URL('/', request.url)
    return NextResponse.redirect(homeUrl)
  }
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths
     */
    '/(.*)',
  ],
}