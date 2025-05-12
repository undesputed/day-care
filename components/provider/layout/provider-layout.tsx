"use client"

import type React from "react"

import { useState } from "react"
import { ProviderSidebarNav } from "../navigation/provider-sidebar-nav"
import { ProviderHeader } from "../navigation/provider-header"

interface ProviderLayoutProps {
  children: React.ReactNode
}

export function ProviderLayout({ children }: ProviderLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-[#c2dacc]/30">
      <ProviderSidebarNav open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <ProviderHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-6 bg-[#c2dacc]/20">{children}</main>
      </div>
    </div>
  )
}
