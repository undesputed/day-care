import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ProviderCardProps {
  name: string
  description: string
  tags: string[]
  image: string
}

export default function ProviderCard({ name, description, tags, image }: ProviderCardProps) {
  return (
    <Card className="border-[#9bc3a2]/20 h-full flex flex-col">
      <CardHeader className="flex flex-row items-start space-x-4 pb-2">
        <div className="h-16 w-16 rounded-lg overflow-hidden bg-[#bdd8c0] flex items-center justify-center">
          <img src={image || "/placeholder.svg"} alt={name} className="h-full w-full object-cover" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{name}</h3>
          <div className="flex flex-wrap gap-1 mt-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-[#b4d1be] hover:bg-[#b4d1be]/90 text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-600">{description}</p>
      </CardContent>
      <CardFooter>
        <Button className="bg-[#9bc3a2] hover:bg-[#9bc3a2]/90 w-full">View Profile</Button>
      </CardFooter>
    </Card>
  )
}
