import AdminLayout from "@/components/admin/layout/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, MoreHorizontal, Download, PlayCircle, Flag } from "lucide-react"

// Mock data for AI calls
const calls = [
  {
    id: "CALL-2025-001",
    user: "Robert Johnson",
    date: "May 12, 2025",
    time: "10:30 AM",
    duration: "15 minutes",
    status: "Completed",
    satisfaction: "High",
    notes: "Discussed assisted living options in Seattle area.",
  },
  {
    id: "CALL-2025-002",
    user: "Maria Garcia",
    date: "May 11, 2025",
    time: "2:15 PM",
    duration: "22 minutes",
    status: "Completed",
    satisfaction: "Medium",
    notes: "Explored memory care facilities for mother with dementia.",
  },
  {
    id: "CALL-2025-003",
    user: "David Lee",
    date: "May 10, 2025",
    time: "11:00 AM",
    duration: "18 minutes",
    status: "Completed",
    satisfaction: "High",
    notes: "Discussed budget options and financial assistance programs.",
  },
  {
    id: "CALL-2025-004",
    user: "Sarah Wilson",
    date: "May 9, 2025",
    time: "3:45 PM",
    duration: "12 minutes",
    status: "Failed",
    satisfaction: "Low",
    notes: "Call disconnected multiple times due to technical issues.",
  },
  {
    id: "CALL-2025-005",
    user: "Michael Brown",
    date: "May 8, 2025",
    time: "9:30 AM",
    duration: "25 minutes",
    status: "Completed",
    satisfaction: "High",
    notes: "Detailed discussion about home care services and providers.",
  },
  {
    id: "CALL-2025-006",
    user: "Jennifer Davis",
    date: "May 7, 2025",
    time: "1:00 PM",
    duration: "20 minutes",
    status: "Completed",
    satisfaction: "Medium",
    notes: "Explored nursing home options and Medicare coverage.",
  },
]

export default function CallLogsPage() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">AI Call Logs</h1>
            <p className="text-muted-foreground mt-1">Monitor and review all AI consultation calls.</p>
          </div>
          <Button className="bg-[#9bc3a2] hover:bg-[#9bc3a2]/90">
            <Download className="mr-2 h-4 w-4" />
            Export Call Data
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card className="border-[#c2dacc]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">342</div>
              <p className="text-xs text-muted-foreground">This month</p>
              <div className="mt-1 text-xs text-green-600 flex items-center gap-1">↑ 24% from last month</div>
            </CardContent>
          </Card>
          <Card className="border-[#c2dacc]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Duration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18.5 min</div>
              <p className="text-xs text-muted-foreground">Per call</p>
              <div className="mt-1 text-xs text-green-600 flex items-center gap-1">↑ 5% from last month</div>
            </CardContent>
          </Card>
          <Card className="border-[#c2dacc]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Satisfaction Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">High satisfaction</p>
              <div className="mt-1 text-xs text-green-600 flex items-center gap-1">↑ 3% from last month</div>
            </CardContent>
          </Card>
          <Card className="border-[#c2dacc]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Failed Calls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">This month</p>
              <div className="mt-1 text-xs text-red-600 flex items-center gap-1">↑ 2% from last month</div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-[#c2dacc]">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Call Records</CardTitle>
                <CardDescription>A list of all AI consultation calls.</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-[#c2dacc]">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="border-[#c2dacc]">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="bg-[#d1eee4]">
                <TabsTrigger value="all" className="data-[state=active]:bg-[#9bc3a2] data-[state=active]:text-white">
                  All Calls
                </TabsTrigger>
                <TabsTrigger
                  value="completed"
                  className="data-[state=active]:bg-[#9bc3a2] data-[state=active]:text-white"
                >
                  Completed
                </TabsTrigger>
                <TabsTrigger value="failed" className="data-[state=active]:bg-[#9bc3a2] data-[state=active]:text-white">
                  Failed
                </TabsTrigger>
                <TabsTrigger
                  value="flagged"
                  className="data-[state=active]:bg-[#9bc3a2] data-[state=active]:text-white"
                >
                  Flagged
                </TabsTrigger>
              </TabsList>

              <div className="my-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search calls..." className="pl-8 focus-visible:ring-[#9bc3a2]" />
                </div>
              </div>

              <TabsContent value="all" className="mt-0">
                <div className="rounded-md border border-[#c2dacc]">
                  <Table>
                    <TableHeader className="bg-[#d1eee4]/50">
                      <TableRow>
                        <TableHead>Call ID</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Satisfaction</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {calls.map((call) => (
                        <TableRow key={call.id}>
                          <TableCell className="font-medium">{call.id}</TableCell>
                          <TableCell>{call.user}</TableCell>
                          <TableCell>
                            {call.date} at {call.time}
                          </TableCell>
                          <TableCell>{call.duration}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                call.status === "Completed"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : "bg-red-100 text-red-800 hover:bg-red-100"
                              }
                            >
                              {call.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                call.satisfaction === "High"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : call.satisfaction === "Medium"
                                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                    : "bg-red-100 text-red-800 hover:bg-red-100"
                              }
                            >
                              {call.satisfaction}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>
                                  <PlayCircle className="mr-2 h-4 w-4" />
                                  Replay call
                                </DropdownMenuItem>
                                <DropdownMenuItem>View summary</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>View user profile</DropdownMenuItem>
                                {call.satisfaction === "Low" && (
                                  <DropdownMenuItem>
                                    <Flag className="mr-2 h-4 w-4" />
                                    Flag for review
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="completed" className="mt-0">
                <div className="rounded-md border border-[#c2dacc]">
                  <Table>
                    <TableHeader className="bg-[#d1eee4]/50">
                      <TableRow>
                        <TableHead>Call ID</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Satisfaction</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {calls
                        .filter((call) => call.status === "Completed")
                        .map((call) => (
                          <TableRow key={call.id}>
                            <TableCell className="font-medium">{call.id}</TableCell>
                            <TableCell>{call.user}</TableCell>
                            <TableCell>
                              {call.date} at {call.time}
                            </TableCell>
                            <TableCell>{call.duration}</TableCell>
                            <TableCell>
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{call.status}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  call.satisfaction === "High"
                                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                                    : call.satisfaction === "Medium"
                                      ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                      : "bg-red-100 text-red-800 hover:bg-red-100"
                                }
                              >
                                {call.satisfaction}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>
                                    <PlayCircle className="mr-2 h-4 w-4" />
                                    Replay call
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>View summary</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>View user profile</DropdownMenuItem>
                                  {call.satisfaction === "Low" && (
                                    <DropdownMenuItem>
                                      <Flag className="mr-2 h-4 w-4" />
                                      Flag for review
                                    </DropdownMenuItem>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="failed" className="mt-0">
                {/* Similar table for failed calls */}
                <div className="rounded-md border border-[#c2dacc]">
                  <Table>
                    <TableHeader className="bg-[#d1eee4]/50">
                      <TableRow>
                        <TableHead>Call ID</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Satisfaction</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {calls
                        .filter((call) => call.status === "Failed")
                        .map((call) => (
                          <TableRow key={call.id}>
                            <TableCell className="font-medium">{call.id}</TableCell>
                            <TableCell>{call.user}</TableCell>
                            <TableCell>
                              {call.date} at {call.time}
                            </TableCell>
                            <TableCell>{call.duration}</TableCell>
                            <TableCell>
                              <Badge className="bg-red-100 text-red-800 hover:bg-red-100">{call.status}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-red-100 text-red-800 hover:bg-red-100">{call.satisfaction}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>View details</DropdownMenuItem>
                                  <DropdownMenuItem>View user profile</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <Flag className="mr-2 h-4 w-4" />
                                    Flag for review
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>Contact user</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="flagged" className="mt-0">
                {/* Similar table for flagged calls */}
                <div className="rounded-md border border-[#c2dacc]">
                  <Table>
                    <TableHeader className="bg-[#d1eee4]/50">
                      <TableRow>
                        <TableHead>Call ID</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Satisfaction</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {calls
                        .filter((call) => call.satisfaction === "Low")
                        .map((call) => (
                          <TableRow key={call.id}>
                            <TableCell className="font-medium">{call.id}</TableCell>
                            <TableCell>{call.user}</TableCell>
                            <TableCell>
                              {call.date} at {call.time}
                            </TableCell>
                            <TableCell>{call.duration}</TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  call.status === "Completed"
                                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                                    : "bg-red-100 text-red-800 hover:bg-red-100"
                                }
                              >
                                {call.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-red-100 text-red-800 hover:bg-red-100">{call.satisfaction}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>
                                    <PlayCircle className="mr-2 h-4 w-4" />
                                    Replay call
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>View summary</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>View user profile</DropdownMenuItem>
                                  <DropdownMenuItem>Contact user</DropdownMenuItem>
                                  <DropdownMenuItem>Resolve flag</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="border-[#c2dacc]">
          <CardHeader>
            <CardTitle>Call Notes</CardTitle>
            <CardDescription>Recent notes from AI consultation calls</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {calls.slice(0, 3).map((call) => (
                <div key={call.id} className="border-b border-[#c2dacc] pb-4 last:border-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{call.user}</h3>
                      <p className="text-xs text-muted-foreground">
                        {call.date} at {call.time} • {call.duration}
                      </p>
                    </div>
                    <Badge
                      className={
                        call.satisfaction === "High"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : call.satisfaction === "Medium"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                            : "bg-red-100 text-red-800 hover:bg-red-100"
                      }
                    >
                      {call.satisfaction}
                    </Badge>
                  </div>
                  <p className="text-sm">{call.notes}</p>
                  <div className="mt-2 flex justify-end">
                    <Button variant="ghost" size="sm" className="text-[#9bc3a2] hover:bg-[#9bc3a2]/10">
                      <PlayCircle className="mr-2 h-4 w-4" />
                      Replay Call
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
