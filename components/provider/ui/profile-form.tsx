"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"

interface ProfileFormProps {
  profile: {
    companyName: string
    logo: string
    bio: string
    website: string
    phone: string
    address: string
  }
  onSave: (data: any) => void
}

export function ProfileForm({ profile, onSave }: ProfileFormProps) {
  const [formData, setFormData] = useState({
    companyName: profile.companyName,
    logo: profile.logo,
    bio: profile.bio,
    website: profile.website,
    phone: profile.phone,
    address: profile.address,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Card className="bg-white border-[#bdd8c0]">
      <CardHeader className="border-b border-[#bdd8c0]/50">
        <CardTitle className="text-lg">Profile Settings</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-1">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="border-[#bdd8c0]"
              required
            />
          </div>
          <div className="space-y-1">
            <Label>Company Logo</Label>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-md bg-[#d1eee4] flex items-center justify-center">
                {formData.logo ? (
                  <img
                    src={formData.logo || "/placeholder.svg"}
                    alt="Company Logo"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-[#9bc3a2] text-xs">No Logo</span>
                )}
              </div>
              <Button
                type="button"
                variant="outline"
                className="border-[#bdd8c0] hover:bg-[#d1eee4] hover:text-gray-700"
              >
                <Upload size={16} className="mr-2" /> Upload Logo
              </Button>
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="bio">Company Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="min-h-[120px] border-[#bdd8c0]"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="border-[#bdd8c0]"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border-[#bdd8c0]"
                required
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border-[#bdd8c0]"
              required
            />
          </div>
          <div className="pt-2">
            <Label>Location Map</Label>
            <div className="h-[200px] bg-[#d1eee4] rounded-md flex items-center justify-center">
              <span className="text-[#9bc3a2] text-sm">Map Preview</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 border-t border-[#bdd8c0]/50 pt-4">
          <Button type="submit" className="bg-[#9bc3a2] hover:bg-[#9bc3a2]/80 text-white">
            Save Changes
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
