import { useEffect, useState } from 'react'

import { SidebarInset, SidebarProvider } from '../../components/ui/sidebar.tsx'
import { AppSidebar } from '../../components/dashboard/layout/sidebar/app-sidebar.tsx'
import { SiteHeader } from '../../components/dashboard/layout/header'
import { ActiveSectionProvider } from '../../contexts/active-section-context.tsx'
import { FingridSearchProvider } from '@/features/contexts/FingridSearchProvider.tsx'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [defaultOpen, setDefaultOpen] = useState(true)

  useEffect(() => {
    const getSidebarState = async () => {
      const cookie = await cookieStore.get('sidebar_state')
      setDefaultOpen(cookie?.value === 'true' || cookie === undefined)
    }
    getSidebarState()
  }, [])

  return (
    <ActiveSectionProvider>
      <FingridSearchProvider>
        <SidebarProvider
          defaultOpen={defaultOpen}
          style={{
            '--sidebar-width': 'calc(var(--spacing) * 64)',
            '--header-height': 'calc(var(--spacing) * 14)',
          } as React.CSSProperties}
        >
          <AppSidebar variant="inset" />
          <SidebarInset>
            <SiteHeader />
            <div className="flex flex-1 flex-col">
              <div className="content-container p-4">{children}</div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </FingridSearchProvider>
    </ActiveSectionProvider>
  )
}