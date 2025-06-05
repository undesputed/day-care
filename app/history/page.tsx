import AuthLayout from "@/components/layout/auth-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, ArrowRight, Clock } from "lucide-react"
import Link from "next/link"

const conversations = [
  {
    id: 1,
    date: "May 12, 2025",
    time: "10:30 AM",
    topic: "Initial Assessment",
    status: "In Progress",
    progress: 75,
    summary:
      "Discussed care needs for mother (78), identified assisted living as preferred option. Location preference: North Seattle. Budget information pending.",
  },
  {
    id: 2,
    date: "May 5, 2025",
    time: "2:15 PM",
    topic: "Care Options Exploration",
    status: "Completed",
    progress: 100,
    summary:
      "Explored different care types including assisted living, memory care, and home care. Discussed benefits and considerations for each option.",
  },
  {
    id: 3,
    date: "April 28, 2025",
    time: "11:00 AM",
    topic: "Getting Started",
    status: "Completed",
    progress: 100,
    summary:
      "Initial conversation to understand needs and concerns. Gathered basic information about care recipient and family situation.",
  },
]

export default function HistoryPage() {
  return (
    <AuthLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Conversation History</h1>
          <p className="text-muted-foreground mt-2">
            Review your past conversations with our AI assistant and continue where you left off.
          </p>
        </div>

        <div className="space-y-6">
          {conversations.map((conversation) => (
            <Card key={conversation.id} className="border-[#bdd8c0]">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-[#b4d1be] flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-medium">{conversation.topic}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>
                            {conversation.date} at {conversation.time}
                          </span>
                        </div>
                      </CardDescription>
                    </div>
                  </div>
                  <Badge
                    className={
                      conversation.status === "In Progress"
                        ? "bg-[#9bc3a2]"
                        : conversation.status === "Completed"
                          ? "bg-gray-500"
                          : "bg-orange-500"
                    }
                  >
                    {conversation.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                {conversation.status === "In Progress" && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{conversation.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-[#d1eee4] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#9bc3a2] rounded-full"
                        style={{ width: `${conversation.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-medium mb-2">Summary</h3>
                  <p className="text-sm text-muted-foreground">{conversation.summary}</p>
                </div>
              </CardContent>
              <CardFooter className="flex gap-3">
                {conversation.status === "In Progress" ? (
                  <Button asChild className="bg-[#9bc3a2] hover:bg-[#9bc3a2]/90">
                    <Link href="/chat">Continue Conversation</Link>
                  </Button>
                ) : (
                  <Button asChild className="bg-[#9bc3a2] hover:bg-[#9bc3a2]/90">
                    <Link href={`/history/${conversation.id}`}>View Details</Link>
                  </Button>
                )}
                <Button variant="outline" className="border-[#9bc3a2] text-[#9bc3a2] hover:bg-[#9bc3a2]/10" asChild>
                  <Link href="/summary">
                    View Summary
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </AuthLayout>
  )
}
