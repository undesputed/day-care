"use client"

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
import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getUserList } from "@/actions/admin/users/action"
import { UserProfile } from "@/types/user_profile"

// Add pagination state after the users mock data
const ITEMS_PER_PAGE = 10

export default function UsersPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE)
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    fetchUsers("all")
  }, [])

  const fetchUsers = async (role: string) => {
    const response = await getUserList("all", 1, 10, role)
    if (response.data) {
      setUsers(response.data)
    }
  }

  // Calculate pagination for filtered users
  const getFilteredUsers = (tab: string) => {
    switch (tab) {
      case "all":
        return users
      case "user":
        return users.filter((user) => user.role === "Customer")
      case "provider":
        return users.filter((user) => user.role.includes("Provider"))
      case "admin":
        return users.filter((user) => user.role === "admin")
      default:
        return users
    }
  }

  const getPaginatedUsers = (filteredUsers: typeof users) => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredUsers.slice(startIndex, endIndex)
  }

  const getTotalPages = (totalItems: number) => Math.ceil(totalItems / itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number.parseInt(value))
    setCurrentPage(1) // Reset to first page when changing items per page
  }

  // Reset to page 1 when switching tabs
  const handleTabChange = () => {
    setCurrentPage(1)
  }

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
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-[#9bc3a2] data-[state=active]:text-white"
                  onClick={handleTabChange}
                >
                  All Users
                </TabsTrigger>
                <TabsTrigger
                  value="customers"
                  className="data-[state=active]:bg-[#9bc3a2] data-[state=active]:text-white"
                  onClick={handleTabChange}
                >
                  Customers
                </TabsTrigger>
                <TabsTrigger
                  value="providers"
                  className="data-[state=active]:bg-[#9bc3a2] data-[state=active]:text-white"
                  onClick={handleTabChange}
                >
                  Providers
                </TabsTrigger>
                <TabsTrigger
                  value="admins"
                  className="data-[state=active]:bg-[#9bc3a2] data-[state=active]:text-white"
                  onClick={handleTabChange}
                >
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
                      {(() => {
                        const filteredUsers = getFilteredUsers("all")
                        const paginatedUsers = getPaginatedUsers(filteredUsers)
                        const totalPages = getTotalPages(filteredUsers.length)

                        return (
                          <>
                            {paginatedUsers.map((user) => (
                              <TableRow key={user.id}>
                                <TableCell>
                                  <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                                      <AvatarFallback className="bg-[#9bc3a2] text-white">
                                        {user.name
                                          .split(" ")
                                          .map((n: string) => n[0])
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
                          </>
                        )
                      })()}
                    </TableBody>
                  </Table>

                  {/* Pagination Controls */}
                  {(() => {
                    const filteredUsers = getFilteredUsers("all")
                    const totalPages = getTotalPages(filteredUsers.length)
                    const startIndex = (currentPage - 1) * itemsPerPage + 1
                    const endIndex = Math.min(currentPage * itemsPerPage, filteredUsers.length)

                    return (
                      <div className="flex items-center justify-between px-4 py-3 border-t border-[#c2dacc]">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Show</span>
                          <select
                            value={itemsPerPage}
                            onChange={(e) => handleItemsPerPageChange(e.target.value)}
                            className="border border-[#c2dacc] rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#9bc3a2]"
                          >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                          </select>
                          <span className="text-sm text-muted-foreground">per page</span>
                        </div>

                        <div className="text-sm text-muted-foreground">
                          Showing {startIndex} to {endIndex} of {filteredUsers.length} users
                        </div>

                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="border-[#c2dacc] hover:bg-[#9bc3a2]/10"
                          >
                            <ChevronLeft className="h-4 w-4" />
                            Previous
                          </Button>

                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Button
                              key={page}
                              variant={currentPage === page ? "default" : "outline"}
                              size="sm"
                              onClick={() => handlePageChange(page)}
                              className={
                                currentPage === page
                                  ? "bg-[#9bc3a2] hover:bg-[#9bc3a2]/90"
                                  : "border-[#c2dacc] hover:bg-[#9bc3a2]/10"
                              }
                            >
                              {page}
                            </Button>
                          ))}

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="border-[#c2dacc] hover:bg-[#9bc3a2]/10"
                          >
                            Next
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )
                  })()}
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
                      {(() => {
                        const filteredUsers = getFilteredUsers("customers")
                        const paginatedUsers = getPaginatedUsers(filteredUsers)
                        const totalPages = getTotalPages(filteredUsers.length)

                        return (
                          <>
                            {paginatedUsers.map((user) => (
                              <TableRow key={user.id}>
                                <TableCell>
                                  <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                                      <AvatarFallback className="bg-[#9bc3a2] text-white">
                                        {user.name
                                          .split(" ")
                                          .map((n: string) => n[0])
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
                          </>
                        )
                      })()}
                    </TableBody>
                  </Table>

                  {/* Pagination Controls */}
                  {(() => {
                    const filteredUsers = getFilteredUsers("customers")
                    const totalPages = getTotalPages(filteredUsers.length)
                    const startIndex = (currentPage - 1) * itemsPerPage + 1
                    const endIndex = Math.min(currentPage * itemsPerPage, filteredUsers.length)

                    return (
                      <div className="flex items-center justify-between px-4 py-3 border-t border-[#c2dacc]">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Show</span>
                          <select
                            value={itemsPerPage}
                            onChange={(e) => handleItemsPerPageChange(e.target.value)}
                            className="border border-[#c2dacc] rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#9bc3a2]"
                          >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                          </select>
                          <span className="text-sm text-muted-foreground">per page</span>
                        </div>

                        <div className="text-sm text-muted-foreground">
                          Showing {startIndex} to {endIndex} of {filteredUsers.length} users
                        </div>

                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="border-[#c2dacc] hover:bg-[#9bc3a2]/10"
                          >
                            <ChevronLeft className="h-4 w-4" />
                            Previous
                          </Button>

                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Button
                              key={page}
                              variant={currentPage === page ? "default" : "outline"}
                              size="sm"
                              onClick={() => handlePageChange(page)}
                              className={
                                currentPage === page
                                  ? "bg-[#9bc3a2] hover:bg-[#9bc3a2]/90"
                                  : "border-[#c2dacc] hover:bg-[#9bc3a2]/10"
                              }
                            >
                              {page}
                            </Button>
                          ))}

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="border-[#c2dacc] hover:bg-[#9bc3a2]/10"
                          >
                            Next
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )
                  })()}
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
                      {(() => {
                        const filteredUsers = getFilteredUsers("providers")
                        const paginatedUsers = getPaginatedUsers(filteredUsers)
                        const totalPages = getTotalPages(filteredUsers.length)

                        return (
                          <>
                            {paginatedUsers.map((user) => (
                              <TableRow key={user.id}>
                                <TableCell>
                                  <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                                      <AvatarFallback className="bg-[#9bc3a2] text-white">
                                        {user.name
                                          .split(" ")
                                          .map((n: string) => n[0])
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
                          </>
                        )
                      })()}
                    </TableBody>
                  </Table>

                  {/* Pagination Controls */}
                  {(() => {
                    const filteredUsers = getFilteredUsers("providers")
                    const totalPages = getTotalPages(filteredUsers.length)
                    const startIndex = (currentPage - 1) * itemsPerPage + 1
                    const endIndex = Math.min(currentPage * itemsPerPage, filteredUsers.length)

                    return (
                      <div className="flex items-center justify-between px-4 py-3 border-t border-[#c2dacc]">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Show</span>
                          <select
                            value={itemsPerPage}
                            onChange={(e) => handleItemsPerPageChange(e.target.value)}
                            className="border border-[#c2dacc] rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#9bc3a2]"
                          >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                          </select>
                          <span className="text-sm text-muted-foreground">per page</span>
                        </div>

                        <div className="text-sm text-muted-foreground">
                          Showing {startIndex} to {endIndex} of {filteredUsers.length} users
                        </div>

                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="border-[#c2dacc] hover:bg-[#9bc3a2]/10"
                          >
                            <ChevronLeft className="h-4 w-4" />
                            Previous
                          </Button>

                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Button
                              key={page}
                              variant={currentPage === page ? "default" : "outline"}
                              size="sm"
                              onClick={() => handlePageChange(page)}
                              className={
                                currentPage === page
                                  ? "bg-[#9bc3a2] hover:bg-[#9bc3a2]/90"
                                  : "border-[#c2dacc] hover:bg-[#9bc3a2]/10"
                              }
                            >
                              {page}
                            </Button>
                          ))}

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="border-[#c2dacc] hover:bg-[#9bc3a2]/10"
                          >
                            Next
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )
                  })()}
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
                      {(() => {
                        const filteredUsers = getFilteredUsers("admins")
                        const paginatedUsers = getPaginatedUsers(filteredUsers)
                        const totalPages = getTotalPages(filteredUsers.length)

                        return (
                          <>
                            {paginatedUsers.map((user) => (
                              <TableRow key={user.id}>
                                <TableCell>
                                  <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                                      <AvatarFallback className="bg-[#9bc3a2] text-white">
                                        {user.name
                                          .split(" ")
                                          .map((n: string) => n[0])
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
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            ))}
                          </>
                        )
                      })()}
                    </TableBody>
                  </Table>

                  {/* Pagination Controls */}
                  {(() => {
                    const filteredUsers = getFilteredUsers("admins")
                    const totalPages = getTotalPages(filteredUsers.length)
                    const startIndex = (currentPage - 1) * itemsPerPage + 1
                    const endIndex = Math.min(currentPage * itemsPerPage, filteredUsers.length)

                    return (
                      <div className="flex items-center justify-between px-4 py-3 border-t border-[#c2dacc]">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Show</span>
                          <select
                            value={itemsPerPage}
                            onChange={(e) => handleItemsPerPageChange(e.target.value)}
                            className="border border-[#c2dacc] rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#9bc3a2]"
                          >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                          </select>
                          <span className="text-sm text-muted-foreground">per page</span>
                        </div>

                        <div className="text-sm text-muted-foreground">
                          Showing {startIndex} to {endIndex} of {filteredUsers.length} users
                        </div>

                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="border-[#c2dacc] hover:bg-[#9bc3a2]/10"
                          >
                            <ChevronLeft className="h-4 w-4" />
                            Previous
                          </Button>

                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Button
                              key={page}
                              variant={currentPage === page ? "default" : "outline"}
                              size="sm"
                              onClick={() => handlePageChange(page)}
                              className={
                                currentPage === page
                                  ? "bg-[#9bc3a2] hover:bg-[#9bc3a2]/90"
                                  : "border-[#c2dacc] hover:bg-[#9bc3a2]/10"
                              }
                            >
                              {page}
                            </Button>
                          ))}

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="border-[#c2dacc] hover:bg-[#9bc3a2]/10"
                          >
                            Next
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )
                  })()}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
