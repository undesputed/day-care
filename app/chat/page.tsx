import AuthLayout from "@/components/layout/auth-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Send, Edit, Share2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ChatPage() {
  return (
    <AuthLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Chat Assistant</h1>
          <p className="text-muted-foreground mt-2">
            Have a conversation with our AI to find the right senior care options for your needs.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="border-[#bdd8c0] h-[calc(100vh-240px)]">
              <CardHeader className="pb-3 border-b">
                <CardTitle className="text-lg font-medium">Conversation</CardTitle>
              </CardHeader>
              <CardContent className="p-4 overflow-y-auto h-[calc(100%-140px)]">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/ai-avatar.png" alt="AI Assistant" />
                      <AvatarFallback className="bg-[#9bc3a2] text-white">AI</AvatarFallback>
                    </Avatar>
                    <div className="bg-[#d1eee4] p-3 rounded-lg rounded-tl-none max-w-[80%]">
                      <p className="text-sm">
                        Hello Jane! I'm your AI assistant. I'll help you find the right senior care options. Could you
                        tell me what type of care you're looking for?
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-end">
                    <div className="bg-[#9bc3a2]/10 p-3 rounded-lg rounded-tr-none max-w-[80%]">
                      <p className="text-sm">
                        I'm looking for assisted living options for my mother. She's 78 and needs help with daily
                        activities, but she's still quite independent.
                      </p>
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatar.png" alt="Jane Dela Cruz" />
                      <AvatarFallback className="bg-[#bdd8c0] text-white">JD</AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/ai-avatar.png" alt="AI Assistant" />
                      <AvatarFallback className="bg-[#9bc3a2] text-white">AI</AvatarFallback>
                    </Avatar>
                    <div className="bg-[#d1eee4] p-3 rounded-lg rounded-tl-none max-w-[80%]">
                      <p className="text-sm">
                        Thanks for sharing that information. Assisted living would be a good option for your mother.
                        Could you tell me which area you're looking in?
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-end">
                    <div className="bg-[#9bc3a2]/10 p-3 rounded-lg rounded-tr-none max-w-[80%]">
                      <p className="text-sm">We're looking in the Seattle area, preferably north Seattle.</p>
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatar.png" alt="Jane Dela Cruz" />
                      <AvatarFallback className="bg-[#bdd8c0] text-white">JD</AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/ai-avatar.png" alt="AI Assistant" />
                      <AvatarFallback className="bg-[#9bc3a2] text-white">AI</AvatarFallback>
                    </Avatar>
                    <div className="bg-[#d1eee4] p-3 rounded-lg rounded-tl-none max-w-[80%]">
                      <p className="text-sm">
                        Great! North Seattle has several excellent assisted living facilities. Do you have a budget
                        range in mind for monthly costs?
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t p-3">
                <div className="flex w-full items-center space-x-2">
                  <Input placeholder="Type your message..." className="focus-visible:ring-[#9bc3a2]" />
                  <Button size="icon" className="bg-[#9bc3a2] hover:bg-[#9bc3a2]/90">
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>

          <div>
            <Card className="border-[#bdd8c0] sticky top-24">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium">Information Summary</CardTitle>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Care Type</h3>
                    <p className="text-sm font-medium">Assisted Living</p>
                  </div>
                  <Separator className="bg-[#bdd8c0]/30" />
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Location</h3>
                    <p className="text-sm font-medium">North Seattle, WA</p>
                  </div>
                  <Separator className="bg-[#bdd8c0]/30" />
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Budget</h3>
                    <p className="text-sm font-medium text-orange-500">Pending</p>
                  </div>
                  <Separator className="bg-[#bdd8c0]/30" />
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Additional Notes</h3>
                    <p className="text-sm">
                      Mother is 78 years old, needs assistance with daily activities but is still quite independent.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button className="w-full bg-[#9bc3a2] hover:bg-[#9bc3a2]/90">
                  <Share2 className="mr-2 h-4 w-4" />
                  Submit to Providers
                </Button>
                <Button variant="outline" className="w-full border-[#9bc3a2] text-[#9bc3a2] hover:bg-[#9bc3a2]/10">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Information
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}
