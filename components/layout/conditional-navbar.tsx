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
                              pathname.startsWith('/analytics')
  
  if (isAuthenticatedRoute) {
    return null
  }
  
  return <Navbar />
}