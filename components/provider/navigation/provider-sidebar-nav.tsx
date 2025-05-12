"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  LayoutDashboard,
  Inbox,
  MessageSquareText,
  ListChecks,
  FileCodeIcon as FileContract,
  Settings,
  Users2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface ProviderSidebarNavProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function ProviderSidebarNav({ open, setOpen }: ProviderSidebarNavProps) {
  const pathname = usePathname()

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/provider",
      active: pathname === "/provider",
    },
    {
      label: "Leads Inbox",
      icon: Inbox,
      href: "/provider/leads",
      active: pathname === "/provider/leads",
    },
    {
      label: "Respond to Leads",
      icon: MessageSquareText,
      href: "/provider/respond",
      active: pathname === "/provider/respond",
    },
    {
      label: "Manage Services",
      icon: ListChecks,
      href: "/provider/services",
      active: pathname === "/provider/services",
    },
    {
      label: "Contract Management",
      icon: FileContract,
      href: "/provider/contracts",
      active: pathname === "/provider/contracts",
    },
    {
      label: "Profile Settings",
      icon: Settings,
      href: "/provider/profile",
      active: pathname === "/provider/profile",
    },
    {
      label: "Team Access",
      icon: Users2,
      href: "/provider/team",
      active: pathname === "/provider/team",
    },
  ]

  return (
    <div
      className={cn(
        "h-screen bg-white border-r border-[#bdd8c0] transition-all duration-300 flex flex-col",
        open ? "w-64" : "w-[70px]",
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-[#bdd8c0]">
        <Link href="/provider" className="flex items-center">
          {open ? (
            <span className="text-lg font-semibold text-[#9bc3a2]">SeniorCare</span>
          ) : (
            <span className="text-lg font-semibold text-[#9bc3a2]">SC</span>
          )}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(!open)}
          className="text-[#9bc3a2] hover:text-[#9bc3a2] hover:bg-[#d1eee4]"
        >
          {open ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="px-2 py-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 mb-1 rounded-md transition-colors",
                route.active
                  ? "bg-[#d1eee4] text-[#9bc3a2]"
                  : "hover:bg-[#d1eee4]/50 text-gray-600 hover:text-[#9bc3a2]",
              )}
            >
              <route.icon size={20} />
              {open && <span>{route.label}</span>}
            </Link>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t border-[#bdd8c0]">
        {open ? (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#9bc3a2] flex items-center justify-center text-white">JD</div>
            <div>
              <p className="text-sm font-medium">ElderBridge Home Care</p>
              <p className="text-xs text-gray-500">Provider Account</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-8 h-8 rounded-full bg-[#9bc3a2] flex items-center justify-center text-white">JD</div>
          </div>
        )}
      </div>
    </div>
  )
}
