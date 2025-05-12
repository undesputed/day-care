"use client"
import { ProviderLayout } from "@/components/provider/layout/provider-layout"
import { DashboardStatCardProvider } from "@/components/provider/ui/dashboard-stat-card-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Inbox, MessageSquareText, ListChecks, FileCodeIcon as FileContract } from "lucide-react"
import Link from "next/link"

export default function ProviderDashboard() {
  // Mock data
  const providerName = "ElderBridge Home Care"
  const stats = [
    {
      title: "Total Leads Received",
      value: 27,
      icon: <Inbox size={18} />,
      description: "5 new this week",
    },
    {
      title: "Responses Sent",
      value: 19,
      icon: <MessageSquareText size={18} />,
      description: "70% response rate",
    },
    {
      title: "Active Services",
      value: 5,
      icon: <ListChecks size={18} />,
      description: "Last updated 2 days ago",
    },
    {
      title: "Pending Contracts",
      value: 2,
      icon: <FileContract size={18} />,
      description: "Renewal needed",
    },
  ]

  const recentLeads = [
    {
      id: "1",
      name: "Robert Johnson",
      careType: "Memory Care",
      date: "May 10, 2023",
    },
    {
      id: "2",
      name: "Maria Garcia",
      careType: "Assisted Living",
      date: "May 9, 2023",
    },
    {
      id: "3",
      name: "David Lee",
      careType: "Independent Living",
      date: "May 8, 2023",
    },
  ]

  return (
    <ProviderLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome, {providerName}</h1>
          <p className="text-gray-500">Here's what's happening with your provider account today.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <DashboardStatCardProvider
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              description={stat.description}
            />
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="bg-white border-[#bdd8c0]">
            <CardHeader>
              <CardTitle className="text-lg">Recent Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="flex items-center justify-between border-b border-[#bdd8c0]/30 pb-2 last:border-0"
                  >
                    <div>
                      <p className="font-medium">{lead.name}</p>
                      <p className="text-sm text-gray-500">
                        {lead.careType} • {lead.date}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#bdd8c0] hover:bg-[#d1eee4] hover:text-gray-700"
                      asChild
                    >
                      <Link href={`/provider/respond?id=${lead.id}`}>View</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-[#bdd8c0]">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="w-full bg-[#9bc3a2] hover:bg-[#9bc3a2]/80 text-white" asChild>
                  <Link href="/provider/leads">Respond to New Leads</Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-[#bdd8c0] hover:bg-[#d1eee4] hover:text-gray-700"
                  asChild
                >
                  <Link href="/provider/services">Manage Services</Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-[#bdd8c0] hover:bg-[#d1eee4] hover:text-gray-700"
                  asChild
                >
                  <Link href="/provider/profile">Update Profile</Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-[#bdd8c0] hover:bg-[#d1eee4] hover:text-gray-700"
                  asChild
                >
                  <Link href="/provider/contracts">View Contracts</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProviderLayout>
  )
}
