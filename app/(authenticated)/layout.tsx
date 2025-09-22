"use client"

import { useState } from 'react'
import DashboardSidebar from '@/components/layout/sidebar'
import DashboardHeader from '@/components/layout/dashboard-header'
import MobileSidebar from '@/components/layout/mobile-sidebar'

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 relative">
      {/* Glassy background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
      
      {/* Desktop sidebar */}
      <DashboardSidebar />
      
      {/* Mobile sidebar */}
      <MobileSidebar 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-screen relative z-10 w-full md:w-auto">
        <DashboardHeader onMobileMenuClick={() => setMobileMenuOpen(true)} />
        <main className="flex-1 p-3 sm:p-4 lg:p-6 overflow-y-auto">
          <div className="max-w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}