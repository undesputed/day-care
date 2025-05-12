import type { ReactNode } from "react"
import UserSidebarNav from "@/components/navigation/user-sidebar-nav"
import ChatbotButton from "@/components/ui/chatbot-button"
import { UserNav } from "@/components/navigation/user-nav"

interface AuthLayoutProps {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#c2dacc]/30">
      <div className="flex min-h-screen">
        <UserSidebarNav />
        <div className="flex-1">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-[#bdd8c0] bg-white px-6">
            <div className="flex flex-1 items-center justify-end">
              <UserNav />
            </div>
          </header>
          <main className="flex-1 p-6 md:p-8">{children}</main>
        </div>
      </div>
      <ChatbotButton />
    </div>
  )
}
