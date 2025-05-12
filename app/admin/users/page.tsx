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
import { Search, Filter, MoreHorizontal, Download, UserPlus, UserCog } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for users
const users = [
  {
    id: 1,
    name: "Robert Johnson",
    email: "robert.j@example.com",
    role: "Customer",
    status: "Active",
    registrationDate: "May 12, 2025",
    lastLogin: "May 12, 2025",
    avatar: "/abstract-rj.png",
  },
  {
    id: 2,
    name: "Maria Garcia",
    email: "maria.g@example.com",
    role: "Customer",
    status: "Active",
    registrationDate: "May 11, 2025",
    lastLogin: "May 12, 2025",
    avatar: "/abstract-geometric-mg.png",
  },
  {
    id: 3,
    name: "David Lee",
    email: "david.l@example.com",
    role: "Provider Admin",
    status: "Active",
    registrationDate: "May 10, 2025",
    lastLogin: "May 11, 2025",
    avatar: "/abstract-dl.png",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah.w@example.com",
    role: "Customer",
    status: "Inactive",
    registrationDate: "May 9, 2025",
    lastLogin: "May 10, 2025",
    avatar: "/stylized-sw.png",
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael.b@example.com",
    role: "Provider Staff",
    status: "Active",
    registrationDate: "May 8, 2025",
    lastLogin: "May 12, 2025",
    avatar: "/monogram-mb.png",
  },
  {
    id: 6,
    name: "Jennifer Davis",
    email: "jennifer.d@example.com",
    role: "Customer",
    status: "Pending",
    registrationDate: "May 7, 2025",
    lastLogin: "Never",
    avatar: "/stylized-jd-initials.png",
  },
]

export default function UsersPage() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Users Management</h1>
            <p className="text-muted-foreground mt-1">Manage and monitor all registered users.</p>
          </div>
          <Button className="bg-[#9bc3a2] hover:bg-[#9bc3a2]/90">
            <UserPlus className="mr-2 h-4 w-4" />
            Add New User
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card className="border-[#c2dacc]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,856</div>
              <p className="text-xs text-muted-foreground">Registered users</p>
              <div className="mt-1 text-xs text-green-600 flex items-center gap-1">↑ 12% from last month</div>
            </CardContent>
          </Card>
          <Card className="border-[#c2dacc]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,142</div>
              <p className="text-xs text-muted-foreground">75% of total</p>
              <div className="mt-1 text-xs text-green-600 flex items-center gap-1">↑ 8% from last month</div>
            </CardContent>
          </Card>
          <Card className="border-[#c2dacc]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Provider Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">248</div>
              <p className="text-xs text-muted-foreground">Provider staff accounts</p>
              <div className="mt-1 text-xs text-green-600 flex items-center gap-1">↑ 5% from last month</div>
            </CardContent>
          </Card>
          <Card className="border-[#c2dacc]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">New Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">128</div>
              <p className="text-xs text-muted-foreground">This week</p>
              <div className="mt-1 text-xs text-green-600 flex items-center gap-1">↑ 15% from last week</div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-[#c2dacc]">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Registered Users</CardTitle>
                <CardDescription>A list of all users in the SeniorCare Central platform.</CardDescription>
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
                  All Users
                </TabsTrigger>
                <TabsTrigger
                  value="customers"
                  className="data-[state=active]:bg-[#9bc3a2] data-[state=active]:text-white"
                >
                  Customers
                </TabsTrigger>
                <TabsTrigger
                  value="providers"
                  className="data-[state=active]:bg-[#9bc3a2] data-[state=active]:text-white"
                >
                  Providers
                </TabsTrigger>
                <TabsTrigger value="admins" className="data-[state=active]:bg-[#9bc3a2] data-[state=active]:text-white">
                  Admins
                </TabsTrigger>
              </TabsList>

              <div className="my-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search users..." className="pl-8 focus-visible:ring-[#9bc3a2]" />
                </div>
              </div>

              <TabsContent value="all" className="mt-0">
                <div className="rounded-md border border-[#c2dacc]">
                  <Table>
                    <TableHeader className="bg-[#d1eee4]/50">
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Registration Date</TableHead>
                        <TableHead>Last Login</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                                <AvatarFallback className="bg-[#9bc3a2] text-white">
                                  {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-xs text-muted-foreground">{user.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{user.role}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                user.status === "Active"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : user.status === "Pending"
                                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                    : "bg-red-100 text-red-800 hover:bg-red-100"
                              }
                            >
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.registrationDate}</TableCell>
                          <TableCell>{user.lastLogin}</TableCell>
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
                                <DropdownMenuItem>View profile</DropdownMenuItem>
                                <DropdownMenuItem>
                                  <UserCog className="mr-2 h-4 w-4" />
                                  Edit user
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Reset password</DropdownMenuItem>
                                {user.status === "Active" ? (
                                  <DropdownMenuItem className="text-red-600">Deactivate account</DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem className="text-green-600">Activate account</DropdownMenuItem>
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

              <TabsContent value="customers" className="mt-0">
                <div className="rounded-md border border-[#c2dacc]">
                  <Table>
                    <TableHeader className="bg-[#d1eee4]/50">
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Registration Date</TableHead>
                        <TableHead>Last Login</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users
                        .filter((user) => user.role === "Customer")
                        .map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                                  <AvatarFallback className="bg-[#9bc3a2] text-white">
                                    {user.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{user.name}</div>
                                  <div className="text-xs text-muted-foreground">{user.email}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  user.status === "Active"
                                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                                    : user.status === "Pending"
                                      ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                      : "bg-red-100 text-red-800 hover:bg-red-100"
                                }
                              >
                                {user.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{user.registrationDate}</TableCell>
                            <TableCell>{user.lastLogin}</TableCell>
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
                                  <DropdownMenuItem>View profile</DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <UserCog className="mr-2 h-4 w-4" />
                                    Edit user
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>Reset password</DropdownMenuItem>
                                  {user.status === "Active" ? (
                                    <DropdownMenuItem className="text-red-600">Deactivate account</DropdownMenuItem>
                                  ) : (
                                    <DropdownMenuItem className="text-green-600">Activate account</DropdownMenuItem>
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

              <TabsContent value="providers" className="mt-0">
                {/* Similar table for provider users */}
                <div className="rounded-md border border-[#c2dacc]">
                  <Table>
                    <TableHeader className="bg-[#d1eee4]/50">
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Registration Date</TableHead>
                        <TableHead>Last Login</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users
                        .filter((user) => user.role.includes("Provider"))
                        .map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                                  <AvatarFallback className="bg-[#9bc3a2] text-white">
                                    {user.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{user.name}</div>
                                  <div className="text-xs text-muted-foreground">{user.email}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  user.status === "Active"
                                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                                    : user.status === "Pending"
                                      ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                      : "bg-red-100 text-red-800 hover:bg-red-100"
                                }
                              >
                                {user.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{user.registrationDate}</TableCell>
                            <TableCell>{user.lastLogin}</TableCell>
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
                                  <DropdownMenuItem>View profile</DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <UserCog className="mr-2 h-4 w-4" />
                                    Edit user
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>View provider</DropdownMenuItem>
                                  <DropdownMenuItem>Reset password</DropdownMenuItem>
                                  {user.status === "Active" ? (
                                    <DropdownMenuItem className="text-red-600">Deactivate account</DropdownMenuItem>
                                  ) : (
                                    <DropdownMenuItem className="text-green-600">Activate account</DropdownMenuItem>
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

              <TabsContent value="admins" className="mt-0">
                {/* Similar table for admin users */}
                <div className="rounded-md border border-[#c2dacc]">
                  <Table>
                    <TableHeader className="bg-[#d1eee4]/50">
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Registration Date</TableHead>
                        <TableHead>Last Login</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/admin-avatar.png" alt="Admin Jane" />
                              <AvatarFallback className="bg-[#9bc3a2] text-white">JD</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">Admin Jane Dela Cruz</div>
                              <div className="text-xs text-muted-foreground">admin@seniorcarecentral.com</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>Super Admin</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                        </TableCell>
                        <TableCell>Jan 15, 2025</TableCell>
                        <TableCell>May 12, 2025</TableCell>
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
                              <DropdownMenuItem>View profile</DropdownMenuItem>
                              <DropdownMenuItem>
                                <UserCog className="mr-2 h-4 w-4" />
                                Edit user
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Reset password</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
