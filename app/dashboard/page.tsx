import AuthLayout from "@/components/layout/auth-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Calendar, Building2, ArrowRight, Bell } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <AuthLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, Jane</h1>
          <p className="text-muted-foreground mt-2">Here's an overview of your senior care journey and next steps.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-[#bdd8c0]">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">Conversation in Progress</CardTitle>
              <CardDescription>Your AI assessment is 75% complete</CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="h-2 w-full bg-[#d1eee4] rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-[#9bc3a2] rounded-full"></div>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Needs identified, budget pending. Continue your conversation to get personalized recommendations.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-[#9bc3a2] hover:bg-[#9bc3a2]/90">
                <Link href="/chat">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Continue Chat
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-[#bdd8c0]">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">Your Last AI Session</CardTitle>
              <CardDescription>May 12, 2025 at 10:30 AM</CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Care Type:</span>
                  <span className="font-medium">Assisted Living</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-medium">Seattle, WA</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Budget:</span>
                  <span className="font-medium">Pending</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                asChild
                variant="outline"
                className="w-full border-[#9bc3a2] text-[#9bc3a2] hover:bg-[#9bc3a2]/10"
              >
                <Link href="/summary">
                  View Summary
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-[#bdd8c0]">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
              <CardDescription>Continue your care journey</CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="space-y-2">
                <Button asChild className="w-full bg-[#9bc3a2] hover:bg-[#9bc3a2]/90">
                  <Link href="/matches">
                    <Building2 className="mr-2 h-4 w-4" />
                    View Matches
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-[#9bc3a2] text-[#9bc3a2] hover:bg-[#9bc3a2]/10"
                >
                  <Link href="/schedule">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule AI Call
                  </Link>
                </Button>
              </div>
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">
              Complete your profile to get more personalized recommendations.
            </CardFooter>
          </Card>
        </div>

        <h2 className="text-xl font-semibold mt-4">Recent Notifications</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "A Place for Mom",
              description: "Responded to your inquiry about assisted living options in Seattle.",
              time: "2 hours ago",
            },
            {
              title: "CareNest",
              description: "Sent you information about their memory care services and pricing.",
              time: "Yesterday",
            },
            {
              title: "ElderBridge",
              description: "Scheduled a virtual tour for next Tuesday at 2:00 PM.",
              time: "2 days ago",
            },
          ].map((notification, index) => (
            <Card key={index} className="border-[#bdd8c0]">
              <CardHeader className="pb-2 flex flex-row items-start space-y-0 space-x-4">
                <Bell className="h-5 w-5 text-[#9bc3a2] mt-0.5" />
                <div>
                  <CardTitle className="text-base font-medium">{notification.title}</CardTitle>
                  <CardDescription className="text-xs">{notification.time}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{notification.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full text-[#9bc3a2] hover:bg-[#9bc3a2]/10 hover:text-[#9bc3a2]">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </AuthLayout>
  )
}
