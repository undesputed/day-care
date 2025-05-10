import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, Utensils, Shield, Pill, Phone, Car } from "lucide-react"

const products = [
  {
    title: "Fall Detection Devices",
    description: "Wearable technology that automatically detects falls and alerts emergency services or caregivers.",
    icon: Bell,
  },
  {
    title: "Meal Delivery",
    description:
      "Nutritious, ready-to-eat meals delivered directly to seniors' homes, accommodating dietary restrictions.",
    icon: Utensils,
  },
  {
    title: "Medical Alert Systems",
    description: "Emergency response systems that provide 24/7 monitoring and immediate assistance when needed.",
    icon: Shield,
  },
  {
    title: "Medication Management",
    description:
      "Smart pill dispensers and reminder systems to ensure medications are taken correctly and on schedule.",
    icon: Pill,
  },
  {
    title: "Senior-Friendly Phones",
    description: "Easy-to-use mobile devices with large buttons, simplified interfaces, and emergency features.",
    icon: Phone,
  },
  {
    title: "Transportation Services",
    description: "Reliable transportation options for medical appointments, shopping, and social activities.",
    icon: Car,
  },
]

export default function SeniorProducts() {
  return (
    <div className="py-24 sm:py-32 bg-[#d1eee4]/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Senior Products and Services</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Essential products and services designed to enhance safety, independence, and quality of life for seniors.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:max-w-none lg:grid-cols-3 md:grid-cols-2">
          {products.map((product) => (
            <Card key={product.title} className="border-[#9bc3a2]/20">
              <CardHeader className="pb-2">
                <div className="h-12 w-12 rounded-lg bg-[#b4d1be] flex items-center justify-center mb-4">
                  <product.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle>{product.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{product.description}</p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="text-[#9bc3a2] hover:text-[#9bc3a2]/90 hover:bg-[#9bc3a2]/10 p-0 h-auto"
                >
                  Learn more →
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button className="bg-[#9bc3a2] hover:bg-[#9bc3a2]/90">View All Products</Button>
        </div>
      </div>
    </div>
  )
}
