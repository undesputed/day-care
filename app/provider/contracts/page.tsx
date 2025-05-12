"use client"

import { useState } from "react"
import Image from "next/image"
import { Calendar, Download, FileText, PenLine } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContractSummaryCard } from "@/components/provider/ui/contract-summary-card"

export default function ContractsPage() {
  const [activeTab, setActiveTab] = useState("current")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Contract Management</h1>
        <p className="text-muted-foreground">View and manage your contracts with SeniorCare Central</p>
      </div>

      <Tabs defaultValue="current" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="bg-[#b4d1be]">
          <TabsTrigger value="current">Current Contract</TabsTrigger>
          <TabsTrigger value="history">Contract History</TabsTrigger>
          <TabsTrigger value="addendum">Addendums</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="mt-4">
          <div className="grid gap-6 md:grid-cols-2">
            <ContractSummaryCard
              contract={{
                title: "Service Provider Agreement",
                status: "active",
                startDate: "Jan 15, 2023",
                endDate: "Jan 14, 2024",
                id: "SCC-2023-0472",
                documentUrl: "/contract-document.pdf"   
              }}
              onRequestUpdate={() => {}}
            />

            <Card className="overflow-hidden">
              <CardHeader className="bg-[#c2dacc] pb-4">
                <CardTitle>Contract Preview</CardTitle>
                <CardDescription>Preview your current contract document</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative h-[300px] w-full bg-[#f8f9fa]">
                  <Image
                    src="/contract-document.png"
                    alt="Contract document preview"
                    fill
                    className="object-contain p-4"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                    <Button variant="outline" className="gap-2 bg-white">
                      <FileText className="h-4 w-4" />
                      Preview Full Document
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between bg-[#f8f9fa] px-6 py-4">
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
                <Button variant="outline" className="gap-2">
                  <PenLine className="h-4 w-4" />
                  Sign Electronically
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-6">
            <Card>
              <CardHeader className="bg-[#c2dacc]">
                <CardTitle>Contract Details</CardTitle>
                <CardDescription>Key information about your current contract</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Contract Type</p>
                    <p>Standard Service Provider Agreement</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Commission Rate</p>
                    <p>12% of confirmed placements</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Payment Terms</p>
                    <p>Net 30 days after placement confirmation</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Service Areas</p>
                    <p>San Francisco Bay Area, Sacramento Region</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Renewal Terms</p>
                    <p>Automatic annual renewal with 60-day opt-out notice</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Account Manager</p>
                    <p>Sarah Williams (sarah.w@seniorcarecentral.com)</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t bg-[#f8f9fa] px-6 py-4">
                <Button variant="outline" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  Schedule Review Call
                </Button>
                <Button className="gap-2 bg-[#9bc3a2] hover:bg-[#8ab391]">Request Contract Update</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <Card>
            <CardHeader className="bg-[#c2dacc]">
              <CardTitle>Contract History</CardTitle>
              <CardDescription>View your previous contracts with SeniorCare Central</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="border-b">
                <div className="grid grid-cols-5 bg-[#f8f9fa] px-6 py-3 text-sm font-medium">
                  <div>Contract ID</div>
                  <div>Type</div>
                  <div>Period</div>
                  <div>Status</div>
                  <div>Actions</div>
                </div>
              </div>
              <div className="divide-y">
                <div className="grid grid-cols-5 items-center px-6 py-4">
                  <div className="font-medium">SCC-2022-0389</div>
                  <div>Standard Agreement</div>
                  <div>Jan 2022 - Jan 2023</div>
                  <div>
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                      Expired
                    </span>
                  </div>
                  <div>
                    <Button variant="ghost" size="sm" className="h-8 gap-1">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-5 items-center px-6 py-4">
                  <div className="font-medium">SCC-2021-0256</div>
                  <div>Trial Agreement</div>
                  <div>Jul 2021 - Jan 2022</div>
                  <div>
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                      Expired
                    </span>
                  </div>
                  <div>
                    <Button variant="ghost" size="sm" className="h-8 gap-1">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="addendum" className="mt-4">
          <Card>
            <CardHeader className="bg-[#c2dacc]">
              <CardTitle>Contract Addendums</CardTitle>
              <CardDescription>View and manage addendums to your current contract</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="rounded-md border">
                <div className="grid grid-cols-4 bg-[#f8f9fa] px-6 py-3 text-sm font-medium">
                  <div>Addendum</div>
                  <div>Date Added</div>
                  <div>Description</div>
                  <div>Actions</div>
                </div>
                <div className="divide-y">
                  <div className="grid grid-cols-4 items-center px-6 py-4">
                    <div className="font-medium">Service Area Expansion</div>
                    <div>Mar 15, 2023</div>
                    <div>Added Monterey County to service areas</div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="h-8 gap-1">
                        <FileText className="h-4 w-4" />
                        View
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 gap-1">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center px-6 py-4">
                    <div className="font-medium">Special Promotion Terms</div>
                    <div>May 22, 2023</div>
                    <div>Summer 2023 referral bonus program</div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="h-8 gap-1">
                        <FileText className="h-4 w-4" />
                        View
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 gap-1">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button className="gap-2 bg-[#9bc3a2] hover:bg-[#8ab391]">Request New Addendum</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
