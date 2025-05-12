"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

interface ContractSummaryCardProps {
  contract: {
    id: string
    title: string
    startDate: string
    endDate: string
    status: "active" | "pending" | "renewal"
    documentUrl: string
  }
  onRequestUpdate: (id: string) => void
}

export function ContractSummaryCard({ contract, onRequestUpdate }: ContractSummaryCardProps) {
  return (
    <Card className="bg-[#d1eee4] border-[#bdd8c0]">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">{contract.title}</CardTitle>
          <Badge
            className={cn(
              "font-normal",
              contract.status === "active"
                ? "bg-green-500 hover:bg-green-600"
                : contract.status === "pending"
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-[#9bc3a2] hover:bg-[#9bc3a2]/80",
            )}
          >
            {contract.status === "active" ? "Active" : contract.status === "pending" ? "Pending" : "Renewal Needed"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Start Date:</span>
            <span className="font-medium">{contract.startDate}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">End Date:</span>
            <span className="font-medium">{contract.endDate}</span>
          </div>
          <div className="pt-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full border-[#bdd8c0] hover:bg-[#d1eee4] hover:text-gray-700"
              onClick={() => window.open(contract.documentUrl, "_blank")}
            >
              <FileText size={16} className="mr-2" /> View Contract
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 pt-0">
        <Button
          variant="outline"
          size="sm"
          className="w-full border-[#bdd8c0] hover:bg-[#d1eee4] hover:text-gray-700"
          onClick={() => window.open(contract.documentUrl, "_blank")}
        >
          <Download size={16} className="mr-2" /> Download PDF
        </Button>
        <Button
          variant="default"
          size="sm"
          className="w-full bg-[#9bc3a2] hover:bg-[#9bc3a2]/80 text-white"
          onClick={() => onRequestUpdate(contract.id)}
        >
          Request Contract Update
        </Button>
      </CardFooter>
    </Card>
  )
}
