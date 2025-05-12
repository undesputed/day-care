import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"
import Link from "next/link"

interface DashboardStatCardProps {
  title: string
  value: string
  description: string
  icon: LucideIcon
  trend?: {
    value: string
    positive: boolean
  }
  linkHref: string
  linkText: string
}

export default function DashboardStatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  linkHref,
  linkText,
}: DashboardStatCardProps) {
  return (
    <Card className="border-[#c2dacc]">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-[#9bc3a2]" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && (
          <div className={`mt-1 text-xs ${trend.positive ? "text-green-600" : "text-red-600"} flex items-center gap-1`}>
            {trend.positive ? "↑" : "↓"} {trend.value}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full text-[#9bc3a2] hover:bg-[#9bc3a2]/10 hover:text-[#9bc3a2]" asChild>
          <Link href={linkHref}>{linkText}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
