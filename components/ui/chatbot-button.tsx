"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send } from "lucide-react"

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <Card className="w-80 sm:w-96 shadow-lg border-[#9bc3a2]/20 animate-in slide-in-from-bottom-5">
          <CardHeader className="bg-[#9bc3a2] text-white py-3 px-4 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base font-medium text-white">AI Assistant</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-[#9bc3a2]/20 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </CardHeader>
          <CardContent className="p-4 h-80 overflow-y-auto">
            <div className="space-y-4">
              <div className="bg-[#d1eee4] p-3 rounded-lg rounded-tl-none max-w-[80%]">
                <p className="text-sm">Hello Jane! I'm your AI assistant. How can I help you with senior care today?</p>
              </div>
              <div className="bg-[#d1eee4] p-3 rounded-lg rounded-tl-none max-w-[80%]">
                <p className="text-sm">I can help with:</p>
                <ul className="text-sm list-disc pl-5 mt-1">
                  <li>Finding care options</li>
                  <li>Understanding services</li>
                  <li>Scheduling consultations</li>
                  <li>Answering questions</li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-3 border-t">
            <div className="flex w-full items-center space-x-2">
              <Input placeholder="Type your message..." className="focus-visible:ring-[#9bc3a2]" />
              <Button size="icon" className="bg-[#9bc3a2] hover:bg-[#9bc3a2]/90">
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </CardFooter>
        </Card>
      ) : (
        <Button
          size="icon"
          className="h-14 w-14 rounded-full bg-[#9bc3a2] hover:bg-[#9bc3a2]/90 shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">Open chat</span>
        </Button>
      )}
    </div>
  )
}
