import AuthLayout from "@/components/layout/auth-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, MapPin, DollarSign, Building2, Bookmark, Eye } from "lucide-react"

const providers = [
  {
    id: 1,
    name: "Sunrise Senior Living",
    image: "/provider1.png",
    description: "Luxury assisted living with personalized care in a homelike environment.",
    location: "North Seattle, WA",
    rating: 4.8,
    cost: "$4,500 - $6,200/month",
    services: ["Assisted Living", "Memory Care", "Respite Care"],
    match: "95% Match",
  },
  {
    id: 2,
    name: "A Place for Mom",
    image: "/provider2.png",
    description: "Free senior living referral service with nationwide coverage and personalized guidance.",
    location: "Seattle, WA",
    rating: 4.7,
    cost: "Free Service",
    services: ["Placement Service", "Financial Guidance", "Virtual Tours"],
    match: "92% Match",
  },
  {
    id: 3,
    name: "CareNest",
    image: "/provider3.png",
    description: "Boutique assisted living with a focus on wellness and active lifestyle programs.",
    location: "Northgate, Seattle, WA",
    rating: 4.5,
    cost: "$4,200 - $5,800/month",
    services: ["Assisted Living", "Independent Living", "Wellness Programs"],
    match: "88% Match",
  },
  {
    id: 4,
    name: "ElderBridge",
    image: "/provider4.png",
    description: "Comprehensive senior care services with a focus on aging in place and transitions.",
    location: "Ballard, Seattle, WA",
    rating: 4.6,
    cost: "$3,900 - $5,500/month",
    services: ["Assisted Living", "Home Care", "Care Management"],
    match: "85% Match",
  },
  {
    id: 5,
    name: "Emerald City Senior Living",
    image: "/provider5.png",
    description: "Modern facilities with a focus on community engagement and social activities.",
    location: "Green Lake, Seattle, WA",
    rating: 4.4,
    cost: "$4,100 - $5,600/month",
    services: ["Assisted Living", "Independent Living", "Social Programs"],
    match: "82% Match",
  },
  {
    id: 6,
    name: "Northwest Care Advisors",
    image: "/provider6.png",
    description: "Local experts specializing in Seattle-area senior living options and transitions.",
    location: "Seattle, WA",
    rating: 4.5,
    cost: "Free Consultation",
    services: ["Placement Service", "Local Expertise", "Facility Tours"],
    match: "80% Match",
  },
]

export default function MatchesPage() {
  return (
    <AuthLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Provider Matches</h1>
          <p className="text-muted-foreground mt-2">
            Based on your needs and preferences, we've matched you with these senior care providers.
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-[#d1eee4]">
            <TabsTrigger value="all" className="data-[state=active]:bg-[#9bc3a2] data-[state=active]:text-white">
              All Matches
            </TabsTrigger>
            <TabsTrigger value="assisted" className="data-[state=active]:bg-[#9bc3a2] data-[state=active]:text-white">
              Assisted Living
            </TabsTrigger>
            <TabsTrigger value="memory" className="data-[state=active]:bg-[#9bc3a2] data-[state=active]:text-white">
              Memory Care
            </TabsTrigger>
            <TabsTrigger value="services" className="data-[state=active]:bg-[#9bc3a2] data-[state=active]:text-white">
              Services
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {providers.map((provider) => (
                <Card key={provider.id} className="border-[#bdd8c0]">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-lg bg-[#b4d1be] flex items-center justify-center">
                          <Building2 className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg font-medium">{provider.name}</CardTitle>
                          <div className="flex items-center mt-1">
                            {[...Array(Math.floor(provider.rating))].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-[#9bc3a2] text-[#9bc3a2]" />
                            ))}
                            {provider.rating % 1 >= 0.5 && (
                              <Star className="h-4 w-4 fill-[#9bc3a2]/50 text-[#9bc3a2]" />
                            )}
                            <span className="text-sm ml-1">{provider.rating}</span>
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-[#9bc3a2]">{provider.match}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm mb-3">{provider.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-[#9bc3a2] mt-0.5" />
                        <span className="text-sm">{provider.location}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <DollarSign className="h-4 w-4 text-[#9bc3a2] mt-0.5" />
                        <span className="text-sm">{provider.cost}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {provider.services.map((service, index) => (
                        <Badge key={index} variant="outline" className="border-[#9bc3a2] text-[#9bc3a2]">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button className="flex-1 bg-[#9bc3a2] hover:bg-[#9bc3a2]/90">
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                    <Button variant="outline" className="border-[#9bc3a2] text-[#9bc3a2] hover:bg-[#9bc3a2]/10">
                      <Bookmark className="h-4 w-4" />
                      <span className="sr-only">Save</span>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="assisted" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {providers
                .filter((p) => p.services.includes("Assisted Living"))
                .map((provider) => (
                  <Card key={provider.id} className="border-[#bdd8c0]">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-lg bg-[#b4d1be] flex items-center justify-center">
                            <Building2 className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-lg font-medium">{provider.name}</CardTitle>
                            <div className="flex items-center mt-1">
                              {[...Array(Math.floor(provider.rating))].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-[#9bc3a2] text-[#9bc3a2]" />
                              ))}
                              {provider.rating % 1 >= 0.5 && (
                                <Star className="h-4 w-4 fill-[#9bc3a2]/50 text-[#9bc3a2]" />
                              )}
                              <span className="text-sm ml-1">{provider.rating}</span>
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-[#9bc3a2]">{provider.match}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm mb-3">{provider.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-[#9bc3a2] mt-0.5" />
                          <span className="text-sm">{provider.location}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <DollarSign className="h-4 w-4 text-[#9bc3a2] mt-0.5" />
                          <span className="text-sm">{provider.cost}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {provider.services.map((service, index) => (
                          <Badge key={index} variant="outline" className="border-[#9bc3a2] text-[#9bc3a2]">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button className="flex-1 bg-[#9bc3a2] hover:bg-[#9bc3a2]/90">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                      <Button variant="outline" className="border-[#9bc3a2] text-[#9bc3a2] hover:bg-[#9bc3a2]/10">
                        <Bookmark className="h-4 w-4" />
                        <span className="sr-only">Save</span>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
          <TabsContent value="memory" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {providers
                .filter((p) => p.services.includes("Memory Care"))
                .map((provider) => (
                  <Card key={provider.id} className="border-[#bdd8c0]">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-lg bg-[#b4d1be] flex items-center justify-center">
                            <Building2 className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-lg font-medium">{provider.name}</CardTitle>
                            <div className="flex items-center mt-1">
                              {[...Array(Math.floor(provider.rating))].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-[#9bc3a2] text-[#9bc3a2]" />
                              ))}
                              {provider.rating % 1 >= 0.5 && (
                                <Star className="h-4 w-4 fill-[#9bc3a2]/50 text-[#9bc3a2]" />
                              )}
                              <span className="text-sm ml-1">{provider.rating}</span>
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-[#9bc3a2]">{provider.match}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm mb-3">{provider.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-[#9bc3a2] mt-0.5" />
                          <span className="text-sm">{provider.location}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <DollarSign className="h-4 w-4 text-[#9bc3a2] mt-0.5" />
                          <span className="text-sm">{provider.cost}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {provider.services.map((service, index) => (
                          <Badge key={index} variant="outline" className="border-[#9bc3a2] text-[#9bc3a2]">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button className="flex-1 bg-[#9bc3a2] hover:bg-[#9bc3a2]/90">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                      <Button variant="outline" className="border-[#9bc3a2] text-[#9bc3a2] hover:bg-[#9bc3a2]/10">
                        <Bookmark className="h-4 w-4" />
                        <span className="sr-only">Save</span>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
          <TabsContent value="services" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {providers
                .filter((p) => p.services.includes("Placement Service"))
                .map((provider) => (
                  <Card key={provider.id} className="border-[#bdd8c0]">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-lg bg-[#b4d1be] flex items-center justify-center">
                            <Building2 className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-lg font-medium">{provider.name}</CardTitle>
                            <div className="flex items-center mt-1">
                              {[...Array(Math.floor(provider.rating))].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-[#9bc3a2] text-[#9bc3a2]" />
                              ))}
                              {provider.rating % 1 >= 0.5 && (
                                <Star className="h-4 w-4 fill-[#9bc3a2]/50 text-[#9bc3a2]" />
                              )}
                              <span className="text-sm ml-1">{provider.rating}</span>
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-[#9bc3a2]">{provider.match}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm mb-3">{provider.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-[#9bc3a2] mt-0.5" />
                          <span className="text-sm">{provider.location}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <DollarSign className="h-4 w-4 text-[#9bc3a2] mt-0.5" />
                          <span className="text-sm">{provider.cost}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {provider.services.map((service, index) => (
                          <Badge key={index} variant="outline" className="border-[#9bc3a2] text-[#9bc3a2]">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button className="flex-1 bg-[#9bc3a2] hover:bg-[#9bc3a2]/90">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                      <Button variant="outline" className="border-[#9bc3a2] text-[#9bc3a2] hover:bg-[#9bc3a2]/10">
                        <Bookmark className="h-4 w-4" />
                        <span className="sr-only">Save</span>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AuthLayout>
  )
}
