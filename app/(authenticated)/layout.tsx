import DashboardSidebar from '@/components/layout/sidebar'
import DashboardHeader from '@/components/layout/dashboard-header'

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader />
        <main className="flex-1 p-6 bg-background/30 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}