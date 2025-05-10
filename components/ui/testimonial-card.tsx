import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Star, StarHalf } from "lucide-react"

interface TestimonialCardProps {
  content: string
  author: string
  role: string
  rating: number
  image: string
}

export default function TestimonialCard({ content, author, role, rating, image }: TestimonialCardProps) {
  return (
    <Card className="border-[#9bc3a2]/20">
      <CardContent className="pt-6">
        <div className="flex gap-1 mb-4">
          {[...Array(Math.floor(rating))].map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-[#9bc3a2] text-[#9bc3a2]" />
          ))}
          {rating % 1 !== 0 && <StarHalf className="h-5 w-5 fill-[#9bc3a2] text-[#9bc3a2]" />}
        </div>
        <p className="text-gray-600 italic mb-6">"{content}"</p>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full overflow-hidden">
            <img src={image || "/placeholder.svg"} alt={author} className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="font-semibold">{author}</p>
            <p className="text-sm text-gray-500">{role}</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
