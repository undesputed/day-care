"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Calendar,
  Building2,
  User,
  Clock,
  HelpCircle,
  LogOut,
} from "lucide-react"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "AI Chat",
    href: "/chat",
    icon: MessageSquare,
  },
  {
    title: "Conversation Summary",
    href: "/summary",
    icon: FileText,
  },
  {
    title: "Schedule AI Call",
    href: "/schedule",
    icon: Calendar,
  },
  {
    title: "Provider Matches",
    href: "/matches",
    icon: Building2,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    title: "Conversation History",
    href: "/history",
    icon: Clock,
  },
  {
    title: "Support Center",
    href: "/support",
    icon: HelpCircle,
  },
]

export default function UserSidebarNav() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r border-[#bdd8c0] bg-white md:block md:w-64 lg:w-72">
      <div className="flex h-16 items-center border-b border-[#bdd8c0] px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-[#9bc3a2] flex items-center justify-center">
            <span className="font-bold text-white">SC</span>
          </div>
          <span className="font-semibold text-lg">SeniorCare Central</span>
        </Link>
      </div>
      <div className="flex flex-col gap-1 p-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              pathname === item.href
                ? "bg-[#9bc3a2]/10 text-[#9bc3a2]"
                : "text-gray-600 hover:bg-[#9bc3a2]/10 hover:text-[#9bc3a2]",
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.title}
          </Link>
        ))}
        <div className="mt-auto pt-4">
          <Link
            href="/logout"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-[#9bc3a2]/10 hover:text-[#9bc3a2] transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </Link>
        </div>
      </div>
    </div>
  )
}
