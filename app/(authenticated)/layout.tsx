import DashboardSidebar from '@/components/layout/sidebar'
import DashboardHeader from '@/components/layout/dashboard-header'

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 relative">
      {/* Glassy background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
      
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-h-screen relative z-10">
        <DashboardHeader />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}