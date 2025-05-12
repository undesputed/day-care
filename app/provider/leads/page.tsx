"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ProviderLayout } from "@/components/provider/layout/provider-layout"
import { LeadTableRow } from "@/components/provider/ui/lead-table-row"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"

export default function LeadsInbox() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [careTypeFilter, setCareTypeFilter] = useState("")
  const [dateFilter, setDateFilter] = useState("")
  const [budgetFilter, setBudgetFilter] = useState("")

  // Mock data
  const leads = [
    {
      id: "1",
      name: "Robert Johnson",
      careType: "Memory Care",
      budget: "$4,000 - $5,000",
      region: "North Seattle",
      status: "new" as const,
      date: "May 10, 2023",
    },
    {
      id: "2",
      name: "Maria Garcia",
      careType: "Assisted Living",
      budget: "$3,500 - $4,500",
      region: "Bellevue",
      status: "new" as const,
      date: "May 9, 2023",
    },
    {
      id: "3",
      name: "David Lee",
      careType: "Independent Living",
      budget: "$2,500 - $3,500",
      region: "Kirkland",
      status: "contacted" as const,
      date: "May 8, 2023",
    },
    {
      id: "4",
      name: "Sarah Williams",
      careType: "Memory Care",
      budget: "$4,500 - $5,500",
      region: "Redmond",
      status: "contacted" as const,
      date: "May 7, 2023",
    },
    {
      id: "5",
      name: "Michael Brown",
      careType: "Assisted Living",
      budget: "$3,000 - $4,000",
      region: "South Seattle",
      status: "new" as const,
      date: "May 6, 2023",
    },
  ]

  const handleViewDetails = (id: string) => {
    // In a real app, this would open a modal or navigate to a details page
    console.log("View details for lead:", id)
  }

  const handleRespond = (id: string) => {
    router.push(`/provider/respond?id=${id}`)
  }

  // Filter leads based on search term and filters
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.region.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCareType = careTypeFilter ? lead.careType === careTypeFilter : true
    const matchesDate = true // Implement date filtering logic if needed
    const matchesBudget = true // Implement budget filtering logic if needed
    return matchesSearch && matchesCareType && matchesDate && matchesBudget
  })

  return (
    <ProviderLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Leads Inbox</h1>
          <p className="text-gray-500">Manage and respond to leads from potential clients.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search leads..."
              className="pl-10 border-[#bdd8c0]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={careTypeFilter} onValueChange={setCareTypeFilter}>
              <SelectTrigger className="w-[180px] border-[#bdd8c0]">
                <SelectValue placeholder="Care Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Care Types</SelectItem>
                <SelectItem value="Assisted Living">Assisted Living</SelectItem>
                <SelectItem value="Memory Care">Memory Care</SelectItem>
                <SelectItem value="Independent Living">Independent Living</SelectItem>
                <SelectItem value="Home Care">Home Care</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="border-[#bdd8c0] hover:bg-[#d1eee4] hover:text-gray-700">
              <Filter size={18} className="mr-2" /> More Filters
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-md border border-[#bdd8c0] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#d1eee4]/50 border-b border-[#bdd8c0]">
                  <th className="text-left py-3 px-4 font-medium">Name</th>
                  <th className="text-left py-3 px-4 font-medium">Care Type</th>
                  <th className="text-left py-3 px-4 font-medium">Budget</th>
                  <th className="text-left py-3 px-4 font-medium">Region</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Date</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <LeadTableRow key={lead.id} lead={lead} onViewDetails={handleViewDetails} onRespond={handleRespond} />
                ))}
                {filteredLeads.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-6 text-center text-gray-500">
                      No leads found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ProviderLayout>
  )
}
