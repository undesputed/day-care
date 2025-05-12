import { SelectItem } from "@/components/ui/select"
import { SelectContent } from "@/components/ui/select"
import { SelectValue } from "@/components/ui/select"
import { SelectTrigger } from "@/components/ui/select"
import { Select } from "@/components/ui/select"
import AuthLayout from "@/components/layout/auth-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle, MessageSquare, Send } from "lucide-react"

const faqs = [
  {
    question: "How does SeniorCare Central work?",
    answer:
      "SeniorCare Central uses AI to help you find the right senior care options. You'll have a conversation with our AI assistant to discuss your needs and preferences. Based on this information, we'll match you with providers that best fit your requirements. You can then explore these options, save favorites, and connect directly with providers.",
  },
  {
    question: "Is the service free to use?",
    answer:
      "Yes, SeniorCare Central is completely free for families seeking care options. We are compensated by our partner providers when a successful match is made, which allows us to offer our guidance and support at no cost to you.",
  },
  {
    question: "How accurate are the AI recommendations?",
    answer:
      "Our AI recommendations are based on the information you provide during your conversation and our extensive database of senior care providers. The more details you share about your needs, preferences, and budget, the more accurate our recommendations will be. We continuously improve our AI based on feedback and outcomes.",
  },
  {
    question: "Can I speak with a human advisor?",
    answer:
      "Yes, while our AI assistant handles most inquiries, we understand that some situations require a human touch. You can request to speak with a human advisor at any time during your journey. Our team of experienced senior care specialists is available to provide personalized guidance and support.",
  },
  {
    question: "How do I schedule a call with the AI assistant?",
    answer:
      "To schedule a call with our AI assistant, navigate to the 'Schedule AI Call' page from your dashboard. Select your preferred date, time, and whether you'd like an audio or video call. You'll receive a confirmation email with a link to join the call at the scheduled time.",
  },
  {
    question: "What information do I need to provide?",
    answer:
      "To get the most accurate recommendations, we'll ask about the type of care needed, location preferences, budget range, specific care requirements, and any other relevant details. All information you provide is secure and will only be shared with providers you choose to connect with.",
  },
  {
    question: "How do I contact providers?",
    answer:
      "Once you've reviewed your matches, you can choose to submit your information to providers directly through our platform. Providers will then contact you via your preferred method (email or phone). You can also schedule virtual tours or in-person visits through our platform.",
  },
  {
    question: "Can I change my preferences after submitting them?",
    answer:
      "Yes, you can update your preferences at any time. Simply go to your conversation summary page and click 'Edit Information'. You can also start a new conversation with our AI assistant to refine your needs and preferences.",
  },
]

export default function SupportPage() {
  return (
    <AuthLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Support Center</h1>
          <p className="text-muted-foreground mt-2">Find answers to common questions or get in touch with our team.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="border-[#bdd8c0]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-[#9bc3a2]" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>Find answers to common questions about SeniorCare Central.</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-b border-[#bdd8c0]/50">
                      <AccordionTrigger className="text-left font-medium hover:text-[#9bc3a2] hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="border-[#bdd8c0] sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-[#9bc3a2]" />
                  Contact Support
                </CardTitle>
                <CardDescription>Get help from our support team.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" className="focus-visible:ring-[#9bc3a2]" defaultValue="Jane Dela Cruz" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    className="focus-visible:ring-[#9bc3a2]"
                    defaultValue="jane.delacruz@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="issue">Issue</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select an issue" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical Problem</SelectItem>
                      <SelectItem value="account">Account Issue</SelectItem>
                      <SelectItem value="billing">Billing Question</SelectItem>
                      <SelectItem value="provider">Provider Inquiry</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Describe your issue or question..."
                    className="min-h-32 focus-visible:ring-[#9bc3a2]"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button className="w-full bg-[#9bc3a2] hover:bg-[#9bc3a2]/90">
                  <Send className="mr-2 h-4 w-4" />
                  Submit Request
                </Button>
                <Button variant="outline" className="w-full border-[#9bc3a2] text-[#9bc3a2] hover:bg-[#9bc3a2]/10">
                  Request Human Advisor
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}
