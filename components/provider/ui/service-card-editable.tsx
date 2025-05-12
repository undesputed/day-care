"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Trash, Check, X } from "lucide-react"

interface ServiceCardEditableProps {
  service: {
    id: string
    name: string
    description: string
    pricingRange: string
  }
  onDelete: (id: string) => void
  onSave: (id: string, data: { name: string; description: string; pricingRange: string }) => void
}

export function ServiceCardEditable({ service, onDelete, onSave }: ServiceCardEditableProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: service.name,
    description: service.description,
    pricingRange: service.pricingRange,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    onSave(service.id, formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      name: service.name,
      description: service.description,
      pricingRange: service.pricingRange,
    })
    setIsEditing(false)
  }

  return (
    <Card className="bg-[#d1eee4] border-[#bdd8c0]">
      <CardHeader className="pb-2">
        {isEditing ? (
          <Input name="name" value={formData.name} onChange={handleChange} className="font-medium" />
        ) : (
          <CardTitle className="text-lg font-medium">{service.name}</CardTitle>
        )}
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-1">Description</label>
              <Textarea name="description" value={formData.description} onChange={handleChange} rows={3} />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Pricing Range</label>
              <Input name="pricingRange" value={formData.pricingRange} onChange={handleChange} />
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-gray-600">{service.description}</p>
            <p className="text-sm font-medium">
              Pricing Range: <span className="text-gray-600">{service.pricingRange}</span>
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {isEditing ? (
          <>
            <Button
              variant="outline"
              size="sm"
              className="border-[#bdd8c0] hover:bg-[#d1eee4] hover:text-gray-700"
              onClick={handleCancel}
            >
              <X size={16} className="mr-1" /> Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              className="bg-[#9bc3a2] hover:bg-[#9bc3a2]/80 text-white"
              onClick={handleSave}
            >
              <Check size={16} className="mr-1" /> Save
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outline"
              size="sm"
              className="border-[#bdd8c0] hover:bg-[#d1eee4] hover:text-gray-700"
              onClick={() => setIsEditing(true)}
            >
              <Edit size={16} className="mr-1" /> Edit
            </Button>
            <Button variant="destructive" size="sm" onClick={() => onDelete(service.id)}>
              <Trash size={16} className="mr-1" /> Delete
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}
