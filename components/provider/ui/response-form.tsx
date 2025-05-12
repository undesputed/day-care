"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ResponseFormProps {
  lead: {
    id: string
    name: string
    careType: string
  }
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function ResponseForm({ lead, onSubmit, onCancel }: ResponseFormProps) {
  const [formData, setFormData] = useState({
    servicePlan: "",
    message: "",
    pricing: "",
    availability: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ leadId: lead.id, ...formData })
  }

  return (
    <Card className="bg-white border-[#bdd8c0]">
      <CardHeader className="border-b border-[#bdd8c0]/50">
        <CardTitle className="text-lg">Respond to Lead: {lead.name}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-1">
            <Label htmlFor="servicePlan">Select Service Plan</Label>
            <Select onValueChange={(value) => handleSelectChange("servicePlan", value)} required>
              <SelectTrigger id="servicePlan" className="border-[#bdd8c0]">
                <SelectValue placeholder="Select a service plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="assisted-living">Assisted Living</SelectItem>
                <SelectItem value="memory-care">Memory Care</SelectItem>
                <SelectItem value="independent-living">Independent Living</SelectItem>
                <SelectItem value="home-care">Home Care</SelectItem>
                <SelectItem value="skilled-nursing">Skilled Nursing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label htmlFor="message">Personalized Message</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write a personalized message to the lead..."
              className="min-h-[120px] border-[#bdd8c0]"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="pricing">Estimated Pricing</Label>
              <Input
                id="pricing"
                name="pricing"
                value={formData.pricing}
                onChange={handleChange}
                placeholder="e.g. $3,500 - $4,500 per month"
                className="border-[#bdd8c0]"
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="availability">Availability</Label>
              <Input
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                placeholder="e.g. Available from June 1st"
                className="border-[#bdd8c0]"
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 border-t border-[#bdd8c0]/50 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="border-[#bdd8c0] hover:bg-[#d1eee4] hover:text-gray-700"
          >
            Cancel
          </Button>
          <Button type="submit" className="bg-[#9bc3a2] hover:bg-[#9bc3a2]/80 text-white">
            Send Offer
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
