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
import { Search, Filter, MoreHorizontal, Download, Upload, FileText } from "lucide-react"

// Mock data for contracts
const contracts = [
  {
    id: "CNT-2025-001",
    provider: "Sunrise Senior Living",
    startDate: "Jan 15, 2025",
    endDate: "Jan 14, 2026",
    status: "Active",
    value: "$12,000",
    type: "Annual",
  },
  {
    id: "CNT-2025-002",
    provider: "Golden Years Care",
    startDate: "Feb 3, 2025",
    endDate: "Feb 2, 2026",
    status: "Active",
    value: "$9,600",
    type: "Annual",
  },
  {
    id: "CNT-2025-003",
    provider: "Evergreen Retirement",
    startDate: "Mar 22, 2025",
    endDate: "Mar 21, 2026",
    status: "Pending",
    value: "$8,400",
    type: "Annual",
  },
  {
    id: "CNT-2025-004",
    provider: "Comfort Home Care",
    startDate: "Apr 10, 2025",
    endDate: "Oct 9, 2025",
    status: "Active",
    value: "$4,800",
    type: "Semi-Annual",
  },
  {
    id: "CNT-2025-005",
    provider: "Pacific Northwest Care",
    startDate: "May 5, 2025",
    endDate: "May 4, 2026",
    status: "Expired",
    value: "$10,200",
    type: "Annual",
  },
  {
    id: "CNT-2025-006",
    provider: "Serenity Senior Services",
    startDate: "May 18, 2025",
    endDate: "May 17, 2026",
    status: "Active",
    value: "$11,400",
    type: "Annual",
  },
]

export default function ContractsPage() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Contracts Management</h1>
            <p className="text-muted-foreground mt-1">Manage and monitor all provider contracts.</p>
          </div>
          <Button className="bg-[#9bc3a2] hover:bg-[#9bc3a2]/90">
            <Upload className="mr-2 h-4 w-4" />
            Upload New Contract
          </Button>
        </div>

        <Card className="border-[#c2dacc]">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Provider Contracts</CardTitle>
                <CardDescription>A list of all contracts between the platform and providers.</CardDescription>
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
                <Input placeholder="Search contracts..." className="pl-8 focus-visible:ring-[#9bc3a2]" />
              </div>
            </div>
            <div className="rounded-md border border-[#c2dacc]">
              <Table>
                <TableHeader className="bg-[#d1eee4]/50">
                  <TableRow>
                    <TableHead>Contract ID</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contracts.map((contract) => (
                    <TableRow key={contract.id}>
                      <TableCell className="font-medium">{contract.id}</TableCell>
                      <TableCell>{contract.provider}</TableCell>
                      <TableCell>{contract.type}</TableCell>
                      <TableCell>{contract.startDate}</TableCell>
                      <TableCell>{contract.endDate}</TableCell>
                      <TableCell>{contract.value}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            contract.status === "Active"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : contract.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                : "bg-red-100 text-red-800 hover:bg-red-100"
                          }
                        >
                          {contract.status}
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
                              <FileText className="mr-2 h-4 w-4" />
                              View contract
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download PDF
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Edit details</DropdownMenuItem>
                            <DropdownMenuItem>Renew contract</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {contract.status === "Active" ? (
                              <DropdownMenuItem className="text-red-600">Terminate</DropdownMenuItem>
                            ) : contract.status === "Pending" ? (
                              <DropdownMenuItem className="text-green-600">Activate</DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem>Archive</DropdownMenuItem>
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
