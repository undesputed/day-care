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
import { Plus, MoreHorizontal, Search, Filter, Download } from "lucide-react"

// Mock data for providers
const providers = [
  {
    id: 1,
    name: "Sunrise Senior Living",
    contactPerson: "Emily Johnson",
    email: "emily.j@sunrisesenior.com",
    phone: "(206) 555-1234",
    status: "Active",
    dateRegistered: "Jan 15, 2025",
    type: "Assisted Living",
  },
  {
    id: 2,
    name: "Golden Years Care",
    contactPerson: "Michael Smith",
    email: "michael.s@goldenyears.com",
    phone: "(206) 555-5678",
    status: "Active",
    dateRegistered: "Feb 3, 2025",
    type: "Memory Care",
  },
  {
    id: 3,
    name: "Evergreen Retirement",
    contactPerson: "Sarah Williams",
    email: "sarah.w@evergreenretire.com",
    phone: "(206) 555-9012",
    status: "Pending",
    dateRegistered: "Mar 22, 2025",
    type: "Independent Living",
  },
  {
    id: 4,
    name: "Comfort Home Care",
    contactPerson: "David Brown",
    email: "david.b@comforthome.com",
    phone: "(206) 555-3456",
    status: "Active",
    dateRegistered: "Apr 10, 2025",
    type: "Home Care",
  },
  {
    id: 5,
    name: "Pacific Northwest Care",
    contactPerson: "Jennifer Davis",
    email: "jennifer.d@pnwcare.com",
    phone: "(206) 555-7890",
    status: "Inactive",
    dateRegistered: "May 5, 2025",
    type: "Nursing Home",
  },
  {
    id: 6,
    name: "Serenity Senior Services",
    contactPerson: "Robert Wilson",
    email: "robert.w@serenitysenior.com",
    phone: "(206) 555-2345",
    status: "Active",
    dateRegistered: "May 18, 2025",
    type: "Assisted Living",
  },
]

export default function ProvidersPage() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Providers Management</h1>
            <p className="text-muted-foreground mt-1">Manage and monitor all registered care providers.</p>
          </div>
          <Button className="bg-[#9bc3a2] hover:bg-[#9bc3a2]/90">
            <Plus className="mr-2 h-4 w-4" />
            Add New Provider
          </Button>
        </div>

        <Card className="border-[#c2dacc]">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Registered Providers</CardTitle>
                <CardDescription>A list of all providers in the SeniorCare Central platform.</CardDescription>
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
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search providers..." className="pl-8 focus-visible:ring-[#9bc3a2]" />
              </div>
            </div>
            <div className="rounded-md border border-[#c2dacc]">
              <Table>
                <TableHeader className="bg-[#d1eee4]/50">
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact Person</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date Registered</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {providers.map((provider) => (
                    <TableRow key={provider.id}>
                      <TableCell className="font-medium">{provider.name}</TableCell>
                      <TableCell>
                        <div>
                          <div>{provider.contactPerson}</div>
                          <div className="text-xs text-muted-foreground">{provider.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{provider.type}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            provider.status === "Active"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : provider.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                : "bg-red-100 text-red-800 hover:bg-red-100"
                          }
                        >
                          {provider.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{provider.dateRegistered}</TableCell>
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
                            <DropdownMenuItem>Edit provider</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View contracts</DropdownMenuItem>
                            <DropdownMenuItem>Manage services</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {provider.status === "Active" ? (
                              <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem className="text-green-600">Activate</DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
