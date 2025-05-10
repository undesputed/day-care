import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users } from "lucide-react"

const teamMembers = [
  {
    name: "Jennifer Wilson",
    role: "Founder & CEO",
    image: "/placeholder.svg?height=80&width=80&query=woman%20executive",
  },
  {
    name: "Michael Chen",
    role: "Senior Care Advisor",
    image: "/placeholder.svg?height=80&width=80&query=man%20advisor",
  },
  {
    name: "Sophia Rodriguez",
    role: "Family Support Specialist",
    image: "/placeholder.svg?height=80&width=80&query=woman%20specialist",
  },
]

export default function AboutUs() {
  return (
    <div id="about" className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">About Us</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our mission is to simplify the process of finding quality senior care and provide families with the support
            they need during this important transition.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Our Mission</h3>
            <p className="text-gray-600 mb-6">
              At SeniorCare Central, we believe that every senior deserves compassionate, high-quality care that meets
              their unique needs and preferences. We are dedicated to empowering families with the information,
              resources, and support they need to make confident decisions about senior care.
            </p>
            <p className="text-gray-600 mb-6">
              Our platform connects families with trusted providers across the spectrum of senior care services, from
              in-home care to assisted living and memory care facilities. We simplify what can be an overwhelming
              process, providing personalized guidance every step of the way.
            </p>
            <h3 className="text-2xl font-semibold mb-6">Our Values</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="h-6 w-6 rounded-full bg-[#9bc3a2] flex items-center justify-center text-white font-bold flex-shrink-0 mt-0.5">
                  1
                </span>
                <span>
                  <strong>Compassion:</strong> We approach every family's situation with empathy and understanding.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-6 w-6 rounded-full bg-[#9bc3a2] flex items-center justify-center text-white font-bold flex-shrink-0 mt-0.5">
                  2
                </span>
                <span>
                  <strong>Integrity:</strong> We provide honest, transparent guidance and recommendations.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-6 w-6 rounded-full bg-[#9bc3a2] flex items-center justify-center text-white font-bold flex-shrink-0 mt-0.5">
                  3
                </span>
                <span>
                  <strong>Excellence:</strong> We maintain high standards in all aspects of our service.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-6 w-6 rounded-full bg-[#9bc3a2] flex items-center justify-center text-white font-bold flex-shrink-0 mt-0.5">
                  4
                </span>
                <span>
                  <strong>Accessibility:</strong> We make quality information and support available to all families.
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6">Our Team</h3>
            <p className="text-gray-600 mb-8">
              Our team consists of experienced senior care advisors, healthcare professionals, and family support
              specialists who are passionate about helping seniors and their families navigate the care journey.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <Card key={member.name} className="border-[#9bc3a2]/20">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="h-20 w-20 rounded-full overflow-hidden mb-4">
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h4 className="font-semibold">{member.name}</h4>
                    <p className="text-gray-600 text-sm">{member.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Button className="bg-[#9bc3a2] hover:bg-[#9bc3a2]/90">
                <Users className="mr-2 h-4 w-4" />
                Meet Our Full Team
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
