import AuthLayout from "@/components/layout/auth-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Share2, Home, DollarSign, MapPin, FileText } from "lucide-react"

export default function SummaryPage() {
  return (
    <AuthLayout>
      <div className="flex flex-col gap-6">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight">Here's What We've Learned About You</h1>
          <p className="text-muted-foreground mt-2">
            Based on your conversation with our AI assistant, we've gathered the following information to help find the
            right senior care options for your needs.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          <Card className="border-[#bdd8c0]">
            <CardHeader className="pb-3 flex flex-row items-start space-y-0 space-x-4">
              <Home className="h-5 w-5 text-[#9bc3a2] mt-0.5" />
              <div>
                <CardTitle className="text-lg font-medium">Care Type</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="bg-[#d1eee4] p-3 rounded-lg">
                  <p className="font-medium">Assisted Living</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Assisted living provides personal care support services such as meals, medication management, bathing,
                  dressing and transportation.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#bdd8c0]">
            <CardHeader className="pb-3 flex flex-row items-start space-y-0 space-x-4">
              <DollarSign className="h-5 w-5 text-[#9bc3a2] mt-0.5" />
              <div>
                <CardTitle className="text-lg font-medium">Budget Range</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="bg-[#d1eee4] p-3 rounded-lg">
                  <p className="font-medium text-orange-500">Pending</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  You haven't specified a budget range yet. This information will help us find options that fit your
                  financial situation.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#bdd8c0]">
            <CardHeader className="pb-3 flex flex-row items-start space-y-0 space-x-4">
              <MapPin className="h-5 w-5 text-[#9bc3a2] mt-0.5" />
              <div>
                <CardTitle className="text-lg font-medium">Preferred Region</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="bg-[#d1eee4] p-3 rounded-lg">
                  <p className="font-medium">North Seattle, WA</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  We'll focus on finding senior care options in the North Seattle area to keep your loved one close to
                  family and familiar surroundings.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#bdd8c0]">
            <CardHeader className="pb-3 flex flex-row items-start space-y-0 space-x-4">
              <FileText className="h-5 w-5 text-[#9bc3a2] mt-0.5" />
              <div>
                <CardTitle className="text-lg font-medium">Additional Notes</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="bg-[#d1eee4] p-3 rounded-lg">
                  <p className="text-sm">
                    Mother is 78 years old, needs assistance with daily activities but is still quite independent.
                    Looking for a facility that offers social activities and a sense of community.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center gap-4 mt-4 max-w-4xl mx-auto">
          <Button className="bg-[#9bc3a2] hover:bg-[#9bc3a2]/90 px-8">
            <Share2 className="mr-2 h-4 w-4" />
            Submit to Providers
          </Button>
          <Button variant="outline" className="border-[#9bc3a2] text-[#9bc3a2] hover:bg-[#9bc3a2]/10 px-8">
            <Edit className="mr-2 h-4 w-4" />
            Edit Information
          </Button>
        </div>
      </div>
    </AuthLayout>
  )
}
