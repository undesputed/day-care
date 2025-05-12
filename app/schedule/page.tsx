import AuthLayout from "@/components/layout/auth-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Video, Phone, CalendarClock, CheckCircle2 } from "lucide-react"

export default function SchedulePage() {
  return (
    <AuthLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Schedule an AI Call</h1>
          <p className="text-muted-foreground mt-2">
            Book a personalized call with our AI assistant to discuss your senior care needs in more detail.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="border-[#bdd8c0]">
              <CardHeader>
                <CardTitle>Select Date and Time</CardTitle>
                <CardDescription>Choose a convenient time for your call</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Label className="mb-2 block">Date</Label>
                    <Calendar
                      mode="single"
                      className="rounded-md border border-[#bdd8c0]"
                      classNames={{
                        day_selected: "bg-[#9bc3a2] text-white hover:bg-[#9bc3a2] hover:text-white",
                        day_today: "bg-[#d1eee4] text-[#9bc3a2]",
                      }}
                    />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="mb-2 block">Time</Label>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="9:00">9:00 AM</SelectItem>
                          <SelectItem value="10:00">10:00 AM</SelectItem>
                          <SelectItem value="11:00">11:00 AM</SelectItem>
                          <SelectItem value="12:00">12:00 PM</SelectItem>
                          <SelectItem value="13:00">1:00 PM</SelectItem>
                          <SelectItem value="14:00">2:00 PM</SelectItem>
                          <SelectItem value="15:00">3:00 PM</SelectItem>
                          <SelectItem value="16:00">4:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="mb-2 block">Duration</Label>
                      <Select defaultValue="30">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="45">45 minutes</SelectItem>
                          <SelectItem value="60">60 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="mb-2 block">Call Type</Label>
                      <RadioGroup defaultValue="audio" className="flex gap-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="audio" id="audio" className="text-[#9bc3a2]" />
                          <Label htmlFor="audio" className="flex items-center">
                            <Phone className="mr-2 h-4 w-4" />
                            Audio
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="video" id="video" className="text-[#9bc3a2]" />
                          <Label htmlFor="video" className="flex items-center">
                            <Video className="mr-2 h-4 w-4" />
                            Video
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#9bc3a2] hover:bg-[#9bc3a2]/90">
                  <CalendarClock className="mr-2 h-4 w-4" />
                  Schedule Now
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div>
            <Card className="border-[#bdd8c0] sticky top-24">
              <CardHeader>
                <CardTitle>What to Expect</CardTitle>
                <CardDescription>During your AI consultation call</CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <ul className="space-y-4">
                  {[
                    "Detailed discussion about care needs and preferences",
                    "Exploration of financial considerations and budget planning",
                    "Information about available facilities in your area",
                    "Answers to your specific questions about senior care",
                    "Next steps and personalized recommendations",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#9bc3a2] mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex flex-col text-sm text-muted-foreground">
                <p>
                  You'll receive a confirmation email with a link to join the call. You can reschedule or cancel at any
                  time.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}
