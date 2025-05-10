import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { MapPin, Phone, Mail } from "lucide-react"

export default function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#d1eee4]/30" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="contact-heading" className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Contact Us
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Have questions or need assistance? We're here to help. Reach out to our team for personalized support.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input type="text" id="first-name" className="focus-visible:ring-[#9bc3a2]" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input type="text" id="last-name" className="focus-visible:ring-[#9bc3a2]" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" className="focus-visible:ring-[#9bc3a2]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input type="tel" id="phone" className="focus-visible:ring-[#9bc3a2]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" rows={4} className="focus-visible:ring-[#9bc3a2]" />
              </div>
              <div>
                <Button className="w-full bg-[#9bc3a2] hover:bg-[#9bc3a2]/90">Send Message</Button>
              </div>
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-[#9bc3a2] mt-0.5" />
                  <div>
                    <h4 className="font-medium">Address</h4>
                    <p className="text-gray-600">123 Care Lane, Seattle, WA 98101</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-[#9bc3a2] mt-0.5" />
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <p className="text-gray-600">(800) 555-1234</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-[#9bc3a2] mt-0.5" />
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-gray-600">info@seniorcarecentral.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6">Office Hours</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Monday - Friday</span>
                  <span className="text-gray-600">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Saturday</span>
                  <span className="text-gray-600">9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Sunday</span>
                  <span className="text-gray-600">Closed</span>
                </div>
              </div>
            </div>

            <Card className="border-[#9bc3a2]/20 overflow-hidden">
              <CardContent className="p-0">
                <div className="h-64 bg-[#bdd8c0] flex items-center justify-center">
                  <MapPin className="h-12 w-12 text-white/70" />
                  <span className="sr-only">Map placeholder</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
