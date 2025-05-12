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
import { Search, Filter, MoreHorizontal, Download, CreditCard, DollarSign } from "lucide-react"

// Mock data for payments
const payments = [
  {
    id: "PMT-2025-001",
    provider: "Sunrise Senior Living",
    date: "Jan 15, 2025",
    amount: "$1,000",
    status: "Paid",
    method: "Credit Card",
    invoice: "INV-2025-001",
  },
  {
    id: "PMT-2025-002",
    provider: "Golden Years Care",
    date: "Feb 3, 2025",
    amount: "$800",
    status: "Paid",
    method: "Bank Transfer",
    invoice: "INV-2025-002",
  },
  {
    id: "PMT-2025-003",
    provider: "Evergreen Retirement",
    date: "Mar 22, 2025",
    amount: "$700",
    status: "Pending",
    method: "Credit Card",
    invoice: "INV-2025-003",
  },
  {
    id: "PMT-2025-004",
    provider: "Comfort Home Care",
    date: "Apr 10, 2025",
    amount: "$400",
    status: "Paid",
    method: "Bank Transfer",
    invoice: "INV-2025-004",
  },
  {
    id: "PMT-2025-005",
    provider: "Pacific Northwest Care",
    date: "May 5, 2025",
    amount: "$850",
    status: "Failed",
    method: "Credit Card",
    invoice: "INV-2025-005",
  },
  {
    id: "PMT-2025-006",
    provider: "Serenity Senior Services",
    date: "May 18, 2025",
    amount: "$950",
    status: "Pending",
    method: "Bank Transfer",
    invoice: "INV-2025-006",
  },
]

// Mock data for revenue by provider
const revenueByProvider = [
  { provider: "Sunrise Senior Living", revenue: 12000 },
  { provider: "Golden Years Care", revenue: 9600 },
  { provider: "Evergreen Retirement", revenue: 8400 },
  { provider: "Comfort Home Care", revenue: 4800 },
  { provider: "Pacific Northwest Care", revenue: 10200 },
]

export default function PaymentsPage() {
  // Calculate total revenue
  const totalRevenue = revenueByProvider.reduce((sum, item) => sum + item.revenue, 0)

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Payments Management</h1>
            <p className="text-muted-foreground mt-1">Track and manage all payments and revenue.</p>
          </div>
          <Button className="bg-[#9bc3a2] hover:bg-[#9bc3a2]/90">
            <DollarSign className="mr-2 h-4 w-4" />
            Record New Payment
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-[#c2dacc]">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Total revenue by provider</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {revenueByProvider.map((item, index) => {
                  const percentage = (item.revenue / totalRevenue) * 100
                  return (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">{item.provider}</span>
                        <span className="text-sm font-medium">${item.revenue.toLocaleString()}</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#9bc3a2] rounded-full" style={{ width: `${percentage}%` }}></div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="mt-6 pt-6 border-t border-[#c2dacc]">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Revenue</span>
                  <span className="font-bold text-lg">${totalRevenue.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#c2dacc]">
            <CardHeader>
              <CardTitle>Payment Statistics</CardTitle>
              <CardDescription>Overview of payment status and methods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#d1eee4]/50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Payment Status</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm">Paid</span>
                      </div>
                      <span className="text-sm font-medium">60%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                        <span className="text-sm">Pending</span>
                      </div>
                      <span className="text-sm font-medium">30%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                        <span className="text-sm">Failed</span>
                      </div>
                      <span className="text-sm font-medium">10%</span>
                    </div>
                  </div>
                  <div className="mt-3 h-2 w-full rounded-full bg-gray-100 overflow-hidden flex">
                    <div className="h-full bg-green-500" style={{ width: "60%" }}></div>
                    <div className="h-full bg-yellow-500" style={{ width: "30%" }}></div>
                    <div className="h-full bg-red-500" style={{ width: "10%" }}></div>
                  </div>
                </div>

                <div className="bg-[#d1eee4]/50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Payment Methods</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-[#9bc3a2] mr-2"></div>
                        <span className="text-sm">Credit Card</span>
                      </div>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-[#b4d1be] mr-2"></div>
                        <span className="text-sm">Bank Transfer</span>
                      </div>
                      <span className="text-sm font-medium">55%</span>
                    </div>
                  </div>
                  <div className="mt-3 h-2 w-full rounded-full bg-gray-100 overflow-hidden flex">
                    <div className="h-full bg-[#9bc3a2]" style={{ width: "45%" }}></div>
                    <div className="h-full bg-[#b4d1be]" style={{ width: "55%" }}></div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-[#d1eee4]/50 rounded-lg p-4 flex flex-col items-center justify-center">
                  <CreditCard className="h-8 w-8 text-[#9bc3a2] mb-2" />
                  <span className="text-2xl font-bold">$45,600</span>
                  <span className="text-sm text-muted-foreground">Total Revenue YTD</span>
                </div>
                <div className="bg-[#d1eee4]/50 rounded-lg p-4 flex flex-col items-center justify-center">
                  <DollarSign className="h-8 w-8 text-[#9bc3a2] mb-2" />
                  <span className="text-2xl font-bold">$3,800</span>
                  <span className="text-sm text-muted-foreground">Revenue This Month</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-[#c2dacc]">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Payment Transactions</CardTitle>
                <CardDescription>A list of all payment transactions.</CardDescription>
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
                  All Payments
                </TabsTrigger>
                <TabsTrigger value="paid" className="data-[state=active]:bg-[#9bc3a2] data-[state=active]:text-white">
                  Paid
                </TabsTrigger>
                <TabsTrigger
                  value="pending"
                  className="data-[state=active]:bg-[#9bc3a2] data-[state=active]:text-white"
                >
                  Pending
                </TabsTrigger>
                <TabsTrigger value="failed" className="data-[state=active]:bg-[#9bc3a2] data-[state=active]:text-white">
                  Failed
                </TabsTrigger>
              </TabsList>

              <div className="my-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search payments..." className="pl-8 focus-visible:ring-[#9bc3a2]" />
                </div>
              </div>

              <TabsContent value="all" className="mt-0">
                <div className="rounded-md border border-[#c2dacc]">
                  <Table>
                    <TableHeader className="bg-[#d1eee4]/50">
                      <TableRow>
                        <TableHead>Payment ID</TableHead>
                        <TableHead>Provider</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.id}</TableCell>
                          <TableCell>{payment.provider}</TableCell>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell>{payment.amount}</TableCell>
                          <TableCell>{payment.method}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                payment.status === "Paid"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : payment.status === "Pending"
                                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                    : "bg-red-100 text-red-800 hover:bg-red-100"
                              }
                            >
                              {payment.status}
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
                                <DropdownMenuItem>View details</DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="mr-2 h-4 w-4" />
                                  Download receipt
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>View invoice</DropdownMenuItem>
                                {payment.status === "Pending" && (
                                  <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-green-600">Mark as paid</DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600">Mark as failed</DropdownMenuItem>
                                  </>
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

              <TabsContent value="paid" className="mt-0">
                <div className="rounded-md border border-[#c2dacc]">
                  <Table>
                    <TableHeader className="bg-[#d1eee4]/50">
                      <TableRow>
                        <TableHead>Payment ID</TableHead>
                        <TableHead>Provider</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments
                        .filter((payment) => payment.status === "Paid")
                        .map((payment) => (
                          <TableRow key={payment.id}>
                            <TableCell className="font-medium">{payment.id}</TableCell>
                            <TableCell>{payment.provider}</TableCell>
                            <TableCell>{payment.date}</TableCell>
                            <TableCell>{payment.amount}</TableCell>
                            <TableCell>{payment.method}</TableCell>
                            <TableCell>
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{payment.status}</Badge>
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
                                  <DropdownMenuItem>
                                    <Download className="mr-2 h-4 w-4" />
                                    Download receipt
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>View invoice</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="pending" className="mt-0">
                {/* Similar table for pending payments */}
                <div className="rounded-md border border-[#c2dacc]">
                  <Table>
                    <TableHeader className="bg-[#d1eee4]/50">
                      <TableRow>
                        <TableHead>Payment ID</TableHead>
                        <TableHead>Provider</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments
                        .filter((payment) => payment.status === "Pending")
                        .map((payment) => (
                          <TableRow key={payment.id}>
                            <TableCell className="font-medium">{payment.id}</TableCell>
                            <TableCell>{payment.provider}</TableCell>
                            <TableCell>{payment.date}</TableCell>
                            <TableCell>{payment.amount}</TableCell>
                            <TableCell>{payment.method}</TableCell>
                            <TableCell>
                              <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                                {payment.status}
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
                                  <DropdownMenuItem>View details</DropdownMenuItem>
                                  <DropdownMenuItem>View invoice</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-green-600">Mark as paid</DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">Mark as failed</DropdownMenuItem>
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
                {/* Similar table for failed payments */}
                <div className="rounded-md border border-[#c2dacc]">
                  <Table>
                    <TableHeader className="bg-[#d1eee4]/50">
                      <TableRow>
                        <TableHead>Payment ID</TableHead>
                        <TableHead>Provider</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments
                        .filter((payment) => payment.status === "Failed")
                        .map((payment) => (
                          <TableRow key={payment.id}>
                            <TableCell className="font-medium">{payment.id}</TableCell>
                            <TableCell>{payment.provider}</TableCell>
                            <TableCell>{payment.date}</TableCell>
                            <TableCell>{payment.amount}</TableCell>
                            <TableCell>{payment.method}</TableCell>
                            <TableCell>
                              <Badge className="bg-red-100 text-red-800 hover:bg-red-100">{payment.status}</Badge>
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
                                  <DropdownMenuItem>View invoice</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-green-600">Retry payment</DropdownMenuItem>
                                  <DropdownMenuItem>Contact provider</DropdownMenuItem>
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
      </div>
    </AdminLayout>
  )
}
