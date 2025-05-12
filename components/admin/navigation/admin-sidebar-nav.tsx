"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Building2,
  Users,
  FileCodeIcon as FileContract,
  CreditCard,
  Phone,
  UserCog,
  Settings,
  LogOut,
} from "lucide-react"

const navItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Providers",
    href: "/admin/providers",
    icon: Building2,
  },
  {
    title: "CRM",
    href: "/admin/crm",
    icon: Users,
  },
  {
    title: "Contracts",
    href: "/admin/contracts",
    icon: FileContract,
  },
  {
    title: "Payments",
    href: "/admin/payments",
    icon: CreditCard,
  },
  {
    title: "AI Call Logs",
    href: "/admin/call-logs",
    icon: Phone,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: UserCog,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export default function AdminSidebarNav() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-[#d1eee4] border-r border-[#c2dacc] flex flex-col h-screen sticky top-0">
      <div className="h-16 border-b border-[#c2dacc] flex items-center px-4">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-[#9bc3a2] flex items-center justify-center">
            <span className="font-bold text-white">SC</span>
          </div>
          <span className="font-semibold text-lg">Admin Portal</span>
        </Link>
      </div>
      <div className="flex-1 py-6 px-3 flex flex-col">
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-[#9bc3a2]/20 text-[#9bc3a2]"
                  : "text-gray-700 hover:bg-[#9bc3a2]/10 hover:text-[#9bc3a2]",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.title}
            </Link>
          ))}
        </div>
        <div className="mt-auto pt-6 border-t border-[#c2dacc] space-y-1">
          <Link
            href="/admin/logout"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-[#9bc3a2]/10 hover:text-[#9bc3a2] transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Link>
        </div>
      </div>
    </div>
  )
}
