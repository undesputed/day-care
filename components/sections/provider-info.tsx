import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, MapPin, Phone, Calendar, CheckCircle } from "lucide-react"

export default function ProviderInfo() {
  return (
    <div className="py-24 sm:py-32 bg-[#d1eee4]/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Provider Spotlight</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Get to know our featured provider and the exceptional services they offer.
          </p>
        </div>

        <Card className="mx-auto max-w-4xl shadow-lg border-[#9bc3a2]/20">
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6">
            <div className="h-24 w-24 rounded-lg bg-[#bdd8c0] flex items-center justify-center">
              <span className="font-bold text-white text-2xl">APFM</span>
            </div>
            <div className="flex-1">
              <CardTitle className="text-2xl">A Place for Mom</CardTitle>
              <CardDescription className="text-base mt-2">
                The largest senior living referral service in North America, helping families find the right senior care
                for their loved ones.
              </CardDescription>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge className="bg-[#9bc3a2]">Free Service</Badge>
                <Badge className="bg-[#b4d1be]">Trusted Advisors</Badge>
                <Badge className="bg-[#bdd8c0]">North America</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#9bc3a2] mt-0.5" />
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-gray-600">123 Care Lane, Seattle, WA 98101</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="h-5 w-5 text-[#9bc3a2] mt-0.5" />
                <div>
                  <h3 className="font-medium">Website</h3>
                  <a href="#" className="text-[#9bc3a2] hover:underline">
                    www.aplaceformom.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-[#9bc3a2] mt-0.5" />
                <div>
                  <h3 className="font-medium">Contact Number</h3>
                  <p className="text-gray-600">(800) 555-1234</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-[#9bc3a2] mt-0.5" />
                <div>
                  <h3 className="font-medium">Years in Operation</h3>
                  <p className="text-gray-600">20+ years</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-medium mb-3">Services Offered</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  "Assisted Living",
                  "Memory Care",
                  "Independent Living",
                  "Senior Living",
                  "Nursing Homes",
                  "Home Care",
                ].map((service) => (
                  <div key={service} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#9bc3a2]" />
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end border-t border-gray-200 pt-6">
            <Button className="bg-[#9bc3a2] hover:bg-[#9bc3a2]/90">View Full Profile</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
