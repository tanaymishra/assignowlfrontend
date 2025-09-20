import { Bell, Search, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme/theme-toggle'

export default function DashboardHeader() {
  return (
    <header className="bg-background/80 backdrop-blur-md border-b border-border/40 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold text-foreground">
            Welcome back!
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Search className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full"></span>
          </Button>
          
          <ThemeToggle />
          
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-muted/50 border border-border/40">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground">User Name</span>
          </div>
        </div>
      </div>
    </header>
  )
}