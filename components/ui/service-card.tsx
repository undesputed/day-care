import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import Link from "next/link"

interface ServiceCardProps {
  title: string
  description: string
  icon: LucideIcon
  slug: string
}

export default function ServiceCard({ title, description, icon: Icon, slug }: ServiceCardProps) {
  return (
    <Card className="border-[#9bc3a2]/20 h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="h-12 w-12 rounded-lg bg-[#b4d1be] flex items-center justify-center mb-4">
          <Icon className="h-6 w-6 text-white" aria-hidden="true" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-600">{description}</p>
      </CardContent>
      <CardFooter>
        <Link
          href={`/services/${slug}`}
          className="text-[#9bc3a2] hover:underline text-sm font-medium"
          aria-label={`Learn more about ${title} services`}
        >
          Explore {title} options and benefits →
        </Link>
      </CardFooter>
    </Card>
  )
}
