import type { ReactNode } from "react"
import AdminSidebarNav from "@/components/admin/navigation/admin-sidebar-nav"
import AdminHeader from "@/components/admin/navigation/admin-header"

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-[#c2dacc]/10 flex">
      <AdminSidebarNav />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
