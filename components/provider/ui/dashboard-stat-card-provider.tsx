import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface DashboardStatCardProviderProps {
  title: string
  value: string | number
  icon: React.ReactNode
  description?: string
  className?: string
}

export function DashboardStatCardProvider({
  title,
  value,
  icon,
  description,
  className,
}: DashboardStatCardProviderProps) {
  return (
    <Card className={cn("bg-[#d1eee4] border-[#bdd8c0]", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <div className="w-8 h-8 rounded-full bg-[#9bc3a2]/20 flex items-center justify-center text-[#9bc3a2]">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-800">{value}</div>
        {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
      </CardContent>
    </Card>
  )
}
