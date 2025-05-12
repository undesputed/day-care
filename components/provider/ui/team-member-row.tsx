"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface TeamMemberRowProps {
  member: {
    id: string
    name: string
    email: string
    role: string
    status: "active" | "pending" | "inactive"
  }
  onRemove: (id: string) => void
}

export function TeamMemberRow({ member, onRemove }: TeamMemberRowProps) {
  return (
    <tr className="border-b border-[#bdd8c0]/50 hover:bg-[#d1eee4]/20">
      <td className="py-3 px-4">{member.name}</td>
      <td className="py-3 px-4">{member.email}</td>
      <td className="py-3 px-4">{member.role}</td>
      <td className="py-3 px-4">
        <Badge
          className={cn(
            "font-normal",
            member.status === "active"
              ? "bg-green-500 hover:bg-green-600"
              : member.status === "pending"
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-gray-400 hover:bg-gray-500",
          )}
        >
          {member.status === "active" ? "Active" : member.status === "pending" ? "Pending" : "Inactive"}
        </Badge>
      </td>
      <td className="py-3 px-4">
        <Button variant="destructive" size="sm" onClick={() => onRemove(member.id)}>
          Remove
        </Button>
      </td>
    </tr>
  )
}
