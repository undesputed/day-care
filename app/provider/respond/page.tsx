"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ProviderLayout } from "@/components/provider/layout/provider-layout"
import { ResponseForm } from "@/components/provider/ui/response-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function RespondToLead() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const leadId = searchParams.get("id")
  const [lead, setLead] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Mock data - in a real app, this would be fetched from an API
  const mockLeads = {
    "1": {
      id: "1",
      name: "Robert Johnson",
      careType: "Memory Care",
      budget: "$4,000 - $5,000",
      region: "North Seattle",
      status: "new",
      date: "May 10, 2023",
      details:
        "Looking for memory care for father with early-stage Alzheimer's. Needs private room and specialized care programs.",
    },
    "2": {
      id: "2",
      name: "Maria Garcia",
      careType: "Assisted Living",
      budget: "$3,500 - $4,500",
      region: "Bellevue",
      status: "new",
      date: "May 9, 2023",
      details:
        "Seeking assisted living for mother who needs help with daily activities but is still relatively independent.",
    },
    "3": {
      id: "3",
      name: "David Lee",
      careType: "Independent Living",
      budget: "$2,500 - $3,500",
      region: "Kirkland",
      status: "contacted",
      date: "May 8, 2023",
      details:
        "Looking for independent living community for active senior couple. Interested in social activities and fitness programs.",
    },
  }

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      if (leadId && mockLeads[leadId as keyof typeof mockLeads]) {
        setLead(mockLeads[leadId as keyof typeof mockLeads])
      }
      setLoading(false)
    }, 500)
  }, [leadId])

  const handleSubmit = (data: any) => {
    // In a real app, this would send the data to an API
    console.log("Submitting response:", data)
    // Show success message and redirect
    alert("Response sent successfully!")
    router.push("/provider/leads")
  }

  const handleCancel = () => {
    router.push("/provider/leads")
  }

  if (loading) {
    return (
      <ProviderLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-t-[#9bc3a2] border-[#d1eee4] rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading lead information...</p>
          </div>
        </div>
      </ProviderLayout>
    )
  }

  if (!lead) {
    return (
      <ProviderLayout>
        <div className="space-y-6">
          <div>
            <Button variant="ghost" className="mb-4" asChild>
              <Link href="/provider/leads">
                <ArrowLeft size={18} className="mr-2" /> Back to Leads
              </Link>
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">Lead Not Found</h1>
            <p className="text-gray-500">The lead you're looking for doesn't exist or has been removed.</p>
          </div>
        </div>
      </ProviderLayout>
    )
  }

  return (
    <ProviderLayout>
      <div className="space-y-6">
        <div>
          <Button variant="ghost" className="mb-4" asChild>
            <Link href="/provider/leads">
              <ArrowLeft size={18} className="mr-2" /> Back to Leads
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Respond to Lead</h1>
          <p className="text-gray-500">Send a personalized response to {lead.name}.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-4">
            <div className="bg-white rounded-md border border-[#bdd8c0] p-4">
              <h2 className="font-medium text-lg mb-4">Lead Information</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{lead.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Care Type</p>
                  <p className="font-medium">{lead.careType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Budget</p>
                  <p className="font-medium">{lead.budget}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Region</p>
                  <p className="font-medium">{lead.region}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date Received</p>
                  <p className="font-medium">{lead.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Details</p>
                  <p className="font-medium">{lead.details}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-2">
            <ResponseForm lead={lead} onSubmit={handleSubmit} onCancel={handleCancel} />
          </div>
        </div>
      </div>
    </ProviderLayout>
  )
}
