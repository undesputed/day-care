"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface LeadTableRowProps {
  lead: {
    id: string
    name: string
    careType: string
    budget: string
    region: string
    status: "new" | "contacted"
    date: string
  }
  onViewDetails: (id: string) => void
  onRespond: (id: string) => void
}

export function LeadTableRow({ lead, onViewDetails, onRespond }: LeadTableRowProps) {
  return (
    <tr className="border-b border-[#bdd8c0]/50 hover:bg-[#d1eee4]/20">
      <td className="py-3 px-4">{lead.name}</td>
      <td className="py-3 px-4">{lead.careType}</td>
      <td className="py-3 px-4">{lead.budget}</td>
      <td className="py-3 px-4">{lead.region}</td>
      <td className="py-3 px-4">
        <Badge
          className={cn(
            "font-normal",
            lead.status === "new"
              ? "bg-[#9bc3a2] hover:bg-[#9bc3a2]/80"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300",
          )}
        >
          {lead.status === "new" ? "New" : "Contacted"}
        </Badge>
      </td>
      <td className="py-3 px-4 text-sm text-gray-500">{lead.date}</td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-[#bdd8c0] hover:bg-[#d1eee4] hover:text-gray-700"
            onClick={() => onViewDetails(lead.id)}
          >
            View Details
          </Button>
          <Button
            variant="default"
            size="sm"
            className="bg-[#9bc3a2] hover:bg-[#9bc3a2]/80 text-white"
            onClick={() => onRespond(lead.id)}
          >
            Respond
          </Button>
        </div>
      </td>
    </tr>
  )
}
