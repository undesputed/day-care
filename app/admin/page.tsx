import AdminLayout from "@/components/admin/layout/admin-layout"
import DashboardStatCard from "@/components/admin/dashboard/dashboard-stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Building2, FileCodeIcon as FileContract, Phone, UserPlus, Building } from "lucide-react"

// Mock data for recent leads
const recentLeads = [
  {
    name: "Robert Johnson",
    email: "robert.j@example.com",
    date: "May 12, 2025",
    status: "In Conversation",
  },
  {
    name: "Maria Garcia",
    email: "maria.g@example.com",
    date: "May 11, 2025",
    status: "Scheduled",
  },
  {
    name: "David Lee",
    email: "david.l@example.com",
    date: "May 10, 2025",
    status: "Converted",
  },
  {
    name: "Sarah Wilson",
    email: "sarah.w@example.com",
    date: "May 9, 2025",
    status: "In Conversation",
  },
]

// Mock data for provider distribution
const providerData = [
  { name: "Assisted Living", value: 35, color: "#9bc3a2" },
  { name: "Memory Care", value: 25, color: "#b4d1be" },
  { name: "Independent Living", value: 20, color: "#c2dacc" },
  { name: "Home Care", value: 15, color: "#d1eee4" },
  { name: "Nursing Homes", value: 5, color: "#e0f5eb" },
]

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, Admin Jane!</h1>
          <p className="text-muted-foreground mt-1">Here's what's happening with SeniorCare Central today.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <DashboardStatCard
            title="Total Users"
            value="2,856"
            description="Total registered users on the platform"
            icon={Users}
            trend={{ value: "12% from last month", positive: true }}
            linkHref="/admin/users"
            linkText="View all users"
          />
          <DashboardStatCard
            title="Registered Providers"
            value="124"
            description="Active care providers in the system"
            icon={Building2}
            trend={{ value: "8% from last month", positive: true }}
            linkHref="/admin/providers"
            linkText="Manage providers"
          />
          <DashboardStatCard
            title="Pending Contracts"
            value="18"
            description="Contracts awaiting review or signature"
            icon={FileContract}
            trend={{ value: "5% from last month", positive: false }}
            linkHref="/admin/contracts"
            linkText="Review contracts"
          />
          <DashboardStatCard
            title="Completed AI Calls"
            value="342"
            description="AI consultations completed this month"
            icon={Phone}
            trend={{ value: "24% from last month", positive: true }}
            linkHref="/admin/call-logs"
            linkText="View call logs"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-[#c2dacc] lg:col-span-2">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Monthly revenue from provider contracts and referrals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-end gap-2 pt-10 relative">
                {/* Simple CSS bar chart */}
                <div className="absolute inset-x-0 top-0 flex justify-between text-sm text-muted-foreground">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                </div>
                <div className="w-full h-[1px] bg-[#e0f5eb] absolute bottom-0 left-0"></div>
                <div className="flex-1 h-[40%] bg-[#9bc3a2] rounded-t-md"></div>
                <div className="flex-1 h-[30%] bg-[#9bc3a2] rounded-t-md"></div>
                <div className="flex-1 h-[60%] bg-[#9bc3a2] rounded-t-md"></div>
                <div className="flex-1 h-[80%] bg-[#9bc3a2] rounded-t-md"></div>
                <div className="flex-1 h-[70%] bg-[#9bc3a2] rounded-t-md"></div>
                <div className="flex-1 h-[90%] bg-[#9bc3a2] rounded-t-md"></div>
                <div className="flex-1 h-[100%] bg-[#9bc3a2] rounded-t-md"></div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#c2dacc]">
            <CardHeader>
              <CardTitle>Provider Distribution</CardTitle>
              <CardDescription>Breakdown by care type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex flex-col justify-center">
                {/* Simple CSS-based distribution chart */}
                {providerData.map((item, index) => (
                  <div key={index} className="flex items-center mb-4">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                    <div className="flex-1 text-sm">{item.name}</div>
                    <div className="text-sm font-medium">{item.value}%</div>
                  </div>
                ))}
                <div className="mt-4 h-4 w-full rounded-full bg-gray-100 overflow-hidden flex">
                  {providerData.map((item, index) => (
                    <div
                      key={index}
                      className="h-full"
                      style={{ width: `${item.value}%`, backgroundColor: item.color }}
                    ></div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-[#c2dacc]">
            <CardHeader>
              <CardTitle>Recent Leads</CardTitle>
              <CardDescription>Latest client inquiries from the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentLeads.map((lead, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b border-[#c2dacc] pb-3 last:border-0"
                  >
                    <div>
                      <p className="font-medium">{lead.name}</p>
                      <p className="text-sm text-muted-foreground">{lead.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">{lead.date}</p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          lead.status === "Converted"
                            ? "bg-green-100 text-green-800"
                            : lead.status === "Scheduled"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#c2dacc]">
            <CardHeader>
              <CardTitle>Platform Activity</CardTitle>
              <CardDescription>User engagement metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="users">
                <TabsList className="bg-[#d1eee4]">
                  <TabsTrigger
                    value="users"
                    className="data-[state=active]:bg-[#9bc3a2] data-[state=active]:text-white"
                  >
                    New Users
                  </TabsTrigger>
                  <TabsTrigger
                    value="providers"
                    className="data-[state=active]:bg-[#9bc3a2] data-[state=active]:text-white"
                  >
                    New Providers
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="users" className="mt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold">128</p>
                      <p className="text-sm text-muted-foreground">New users this week</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-[#9bc3a2]/20 flex items-center justify-center">
                      <UserPlus className="h-6 w-6 text-[#9bc3a2]" />
                    </div>
                  </div>
                  <div className="mt-6 space-y-2">
                    {/* Simple activity bars */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs w-8">Mon</span>
                      <div className="h-2 bg-[#9bc3a2] rounded-full" style={{ width: "60%" }}></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs w-8">Tue</span>
                      <div className="h-2 bg-[#9bc3a2] rounded-full" style={{ width: "75%" }}></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs w-8">Wed</span>
                      <div className="h-2 bg-[#9bc3a2] rounded-full" style={{ width: "45%" }}></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs w-8">Thu</span>
                      <div className="h-2 bg-[#9bc3a2] rounded-full" style={{ width: "90%" }}></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs w-8">Fri</span>
                      <div className="h-2 bg-[#9bc3a2] rounded-full" style={{ width: "65%" }}></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs w-8">Sat</span>
                      <div className="h-2 bg-[#9bc3a2] rounded-full" style={{ width: "30%" }}></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs w-8">Sun</span>
                      <div className="h-2 bg-[#9bc3a2] rounded-full" style={{ width: "20%" }}></div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="providers" className="mt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold">12</p>
                      <p className="text-sm text-muted-foreground">New providers this week</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-[#9bc3a2]/20 flex items-center justify-center">
                      <Building className="h-6 w-6 text-[#9bc3a2]" />
                    </div>
                  </div>
                  <div className="mt-6 space-y-2">
                    {/* Simple activity bars */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs w-8">Mon</span>
                      <div className="h-2 bg-[#b4d1be] rounded-full" style={{ width: "30%" }}></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs w-8">Tue</span>
                      <div className="h-2 bg-[#b4d1be] rounded-full" style={{ width: "45%" }}></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs w-8">Wed</span>
                      <div className="h-2 bg-[#b4d1be] rounded-full" style={{ width: "25%" }}></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs w-8">Thu</span>
                      <div className="h-2 bg-[#b4d1be] rounded-full" style={{ width: "60%" }}></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs w-8">Fri</span>
                      <div className="h-2 bg-[#b4d1be] rounded-full" style={{ width: "35%" }}></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs w-8">Sat</span>
                      <div className="h-2 bg-[#b4d1be] rounded-full" style={{ width: "15%" }}></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs w-8">Sun</span>
                      <div className="h-2 bg-[#b4d1be] rounded-full" style={{ width: "10%" }}></div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
