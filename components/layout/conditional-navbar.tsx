"use client"

import { usePathname } from 'next/navigation'
import { Navbar } from './navbar'

export function ConditionalNavbar() {
  const pathname = usePathname()
  
  // Don't show navbar on authenticated routes
  const isAuthenticatedRoute = pathname.startsWith('/dashboard') || 
                              pathname.startsWith('/profile') || 
                              pathname.startsWith('/settings') ||
                              pathname.startsWith('/assignments') ||
                              pathname.startsWith('/analytics') ||
                              pathname.startsWith('/scorer')
  
  // Also don't show on public routes (they have their own navbar in layout)
  const isPublicRoute = pathname === '/' || pathname.startsWith('/public')
  
  if (isAuthenticatedRoute || isPublicRoute) {
    return null
  }
  
  return <Navbar />
}