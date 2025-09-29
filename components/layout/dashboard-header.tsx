"use client"

import { Bell, Search, User, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
// import { ThemeToggle } from '@/components/theme/theme-toggle'
import { useAuth } from '@/lib/store'
import { motion } from 'framer-motion'

interface DashboardHeaderProps {
  onMobileMenuClick?: () => void
}

export default function DashboardHeader({ onMobileMenuClick }: DashboardHeaderProps) {
  const { user } = useAuth()

  return (
    <header className="bg-background/80 backdrop-blur-md border-b border-border/40 px-4 sm:px-6 py-3 sm:py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        {/* Mobile menu button + Title */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Mobile sidebar toggle - only visible on mobile */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden h-9 w-9"
            onClick={onMobileMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex flex-col">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-foreground leading-tight">
              Welcome back!
            </h1>
            {user && (
              <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                {user.name}
              </p>
            )}
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
          {/* Search - hidden on small mobile */}
          <Button variant="ghost" size="icon" className="relative hidden xs:flex h-9 w-9">
            <Search className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative h-9 w-9">
            <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
            <motion.span 
              className="absolute -top-1 -right-1 h-2 w-2 sm:h-3 sm:w-3 bg-primary rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            />
          </Button>
          
          {/* <ThemeToggle /> */}
          
          {/* User info - responsive */}
          {user && (
            <div className="hidden sm:flex items-center space-x-2 px-2 sm:px-3 py-1.5 rounded-lg bg-muted/50 border border-border/40">
              <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-3 w-3 sm:h-5 sm:w-5 text-primary" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-foreground max-w-[100px] lg:max-w-none truncate">
                {user.name}
              </span>
            </div>
          )}
          
          {/* Mobile user avatar - only visible on small screens */}
          {user && (
            <Button variant="ghost" size="icon" className="sm:hidden h-9 w-9">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}