"use client"

import type React from "react"

import { useState } from "react"
import { ProviderLayout } from "@/components/provider/layout/provider-layout"
import { ServiceCardEditable } from "@/components/provider/ui/service-card-editable"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"

export default function ManageServices() {
  const [services, setServices] = useState([
    {
      id: "1",
      name: "Assisted Living",
      description:
        "Personalized care services for seniors who need help with daily activities while maintaining their independence.",
      pricingRange: "$3,500 - $4,500 per month",
    },
    {
      id: "2",
      name: "Memory Care",
      description:
        "Specialized care for seniors with Alzheimer's, dementia, or other memory impairments in a secure environment.",
      pricingRange: "$4,500 - $5,500 per month",
    },
    {
      id: "3",
      name: "Respite Care",
      description: "Short-term care services providing relief for primary caregivers.",
      pricingRange: "$200 - $300 per day",
    },
    {
      id: "4",
      name: "Adult Day Services",
      description: "Daytime care and companionship for seniors in a community setting.",
      pricingRange: "$75 - $100 per day",
    },
    {
      id: "5",
      name: "Skilled Nursing",
      description: "Advanced medical care provided by licensed nurses for seniors with complex health needs.",
      pricingRange: "$6,000 - $8,000 per month",
    },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    pricingRange: "",
  })

  const handleDeleteService = (id: string) => {
    setServices(services.filter((service) => service.id !== id))
  }

  const handleSaveService = (id: string, data: { name: string; description: string; pricingRange: string }) => {
    setServices(services.map((service) => (service.id === id ? { ...service, ...data } : service)))
  }

  const handleAddService = () => {
    const newId = (services.length + 1).toString()
    setServices([...services, { id: newId, ...newService }])
    setNewService({ name: "", description: "", pricingRange: "" })
    setShowAddForm(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewService((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <ProviderLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Manage Services</h1>
            <p className="text-gray-500">Add, edit, or remove services that your facility offers.</p>
          </div>
          <Button className="bg-[#9bc3a2] hover:bg-[#9bc3a2]/80 text-white" onClick={() => setShowAddForm(true)}>
            <Plus size={18} className="mr-2" /> Add Service
          </Button>
        </div>

        {showAddForm && (
          <Card className="bg-white border-[#bdd8c0]">
            <CardHeader>
              <CardTitle className="text-lg">Add New Service</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="name">Service Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={newService.name}
                  onChange={handleChange}
                  className="border-[#bdd8c0]"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={newService.description}
                  onChange={handleChange}
                  rows={3}
                  className="border-[#bdd8c0]"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="pricingRange">Pricing Range</Label>
                <Input
                  id="pricingRange"
                  name="pricingRange"
                  value={newService.pricingRange}
                  onChange={handleChange}
                  placeholder="e.g. $3,500 - $4,500 per month"
                  className="border-[#bdd8c0]"
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button
                variant="outline"
                className="border-[#bdd8c0] hover:bg-[#d1eee4] hover:text-gray-700"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </Button>
              <Button className="bg-[#9bc3a2] hover:bg-[#9bc3a2]/80 text-white" onClick={handleAddService}>
                Add Service
              </Button>
            </CardFooter>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <ServiceCardEditable
              key={service.id}
              service={service}
              onDelete={handleDeleteService}
              onSave={handleSaveService}
            />
          ))}
        </div>
      </div>
    </ProviderLayout>
  )
}
