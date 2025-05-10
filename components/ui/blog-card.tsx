import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { CalendarDays, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface BlogCardProps {
  title: string
  excerpt: string
  image: string
  date: string
  readTime: string
  slug?: string
}

export default function BlogCard({ title, excerpt, image, date, readTime, slug = "blog-post" }: BlogCardProps) {
  return (
    <Card className="border-[#9bc3a2]/20 h-full flex flex-col overflow-hidden">
      <div className="h-48 overflow-hidden relative">
        <Image
          src={image || "/placeholder.svg"}
          alt={`Featured image for article: ${title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform hover:scale-105 duration-300"
          priority={false}
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
          <time dateTime={new Date(date).toISOString()} className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            <span>{date}</span>
          </time>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" aria-hidden="true" />
            <span>{readTime}</span>
          </div>
        </div>
        <h3 className="font-semibold text-lg">
          <Link href={`/blog/${slug}`} className="hover:text-[#9bc3a2] transition-colors">
            {title}
          </Link>
        </h3>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-600">{excerpt}</p>
      </CardContent>
      <CardFooter>
        <Link
          href={`/blog/${slug}`}
          className="text-[#9bc3a2] hover:underline text-sm font-medium"
          aria-label={`Read full article about ${title}`}
        >
          Read full article about {title.toLowerCase()} →
        </Link>
      </CardFooter>
    </Card>
  )
}
