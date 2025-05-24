"use client"

import type React from "react"

import AuthLayout from "@/components/layout/auth-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Send, Edit, Share2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { createChatSession, getChatSessionByUserId } from "@/actions/chat_sessions/actions"
import { createChatMessage, getChatMessages } from "@/actions/chat_messages/actions"
import { useEffect, useState, useRef } from "react"
import type { ChatSession } from "@/types/chat_sessions"
import type { ChatMessage } from "@/types/chat_messages"
import type { IntakeProfile } from "@/types/intake_profiles"
import { getIntakeProfile } from "@/actions/intake_profiles/actions"
import { Textarea } from "@/components/ui/textarea"

// Typing indicator component
const TypingIndicator = () => {
  return (
    <div className="flex gap-3">
      <Avatar className="h-8 w-8">
        <AvatarImage src="/ai-avatar.png" alt="AI Assistant" />
        <AvatarFallback className="bg-[#9bc3a2] text-white">AI</AvatarFallback>
      </Avatar>
      <div className="bg-[#d1eee4] p-3 rounded-lg rounded-tl-none max-w-[80%]">
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          </div>
          <span className="text-xs text-gray-500 ml-2">AI is typing...</span>
        </div>
      </div>
    </div>
  )
}

export default function ChatPage() {
  const [chatSession, setChatSession] = useState<ChatSession | null>(null)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [intakeProfile, setIntakeProfile] = useState<IntakeProfile | null>(null)
  const [message, setMessage] = useState<string>("")
  const [threadId, setThreadId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const [isSending, setIsSending] = useState<boolean>(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatMessages, isTyping])

  const saveMessage = async (message: string, sender: string) => {
    if (!chatSession?.id) {
      console.error("No chat session ID available")
      return null
    }

    const newMessage: any = {
      session_id: chatSession.id,
      sender: sender,
      message: message,
      created_at: new Date().toISOString(),
    }

    try {
      const result = await createChatMessage(newMessage)
      console.log("Message saved:", result)
      return result
    } catch (error) {
      console.error("Error saving message:", error)
      return null
    }
  }

  const createThread = async () => {
    const response = await fetch("/api/ai/thread", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (!response.ok) {
      const text = await response.text()
      throw new Error(`Failed to create thread: ${text}`)
    }
    return response.json()
  }

  const createMessage = async (message: string) => {
    console.log("Creating message with threadId:", threadId)
    const response = await fetch("/api/ai/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        threadId: threadId,
        message: message,
        role: "user",
      }),
    })

    if (!response.ok) {
      throw new Error(`Failed to create message: ${response.statusText}`)
    }

    return response.json()
  }

  const createRun = async (threadId: string) => {
    console.log("Creating run with threadId:", threadId)
    const response = await fetch("/api/ai/run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        threadId: threadId,
      }),
    })

    if (!response.ok) {
      throw new Error(`Failed to create run: ${response.statusText}`)
    }

    const result = await response.json()
    console.log("AI Run result:", result)
    return result
  }

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isSending) return

    console.log("Sending message:", messageText)
    setIsSending(true)
    setMessage("") // Clear input immediately

    // Generate a unique temporary ID
    const tempId = `temp-user-${Date.now()}-${Math.random()}`

    try {
      // Create optimistic user message for immediate UI feedback
      const optimisticUserMessage: ChatMessage = {
        id: tempId,
        session_id: chatSession?.id || "",
        sender: "user",
        message: messageText,
        created_at: new Date().toISOString(),
      }

      // Add user message to UI immediately
      setChatMessages((prev) => [...prev, optimisticUserMessage])

      // Save user message to database
      const savedUserMessage: any = await saveMessage(messageText, "user")

      // Update the optimistic message with the real one from database
      if (savedUserMessage?.data) {
        setChatMessages((prev) => prev.map((msg) => (msg.id === tempId ? savedUserMessage.data : msg)))
      }

      // Show typing indicator
      setIsTyping(true)

      // Send message to AI and get response
      await createMessage(messageText)
      const run = await createRun(threadId || "")

      console.log("AI response received:", run.reply)

      // Hide typing indicator
      setIsTyping(false)

      if (run.reply) {
        // Save AI response to database
        const savedAIMessage: any = await saveMessage(run.reply, "assistant")

        if (savedAIMessage?.data) {
          // Add AI message to UI
          setChatMessages((prev) => [...prev, savedAIMessage.data])
          console.log("AI message added to UI")
        } else {
          // If saving failed, still show the message in UI
          const aiMessage: ChatMessage = {
            id: `ai-${Date.now()}`,
            session_id: chatSession?.id || "",
            sender: "assistant",
            message: run.reply,
            created_at: new Date().toISOString(),
          }
          setChatMessages((prev) => [...prev, aiMessage])
          console.log("AI message added to UI (fallback)")
        }
      } else {
        console.error("No reply received from AI")
        setError("No response received from AI. Please try again.")
      }
    } catch (error) {
      console.error("Error in sendMessage:", error)
      setError(`Failed to send message: ${error instanceof Error ? error.message : "Unknown error"}`)
      setIsTyping(false)

      // Remove the optimistic user message on error
      setChatMessages((prev) => prev.filter((msg) => msg.id !== tempId))
    } finally {
      setIsSending(false)
      // Focus back to input
      inputRef.current?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage(message)
    }
    // Allow Shift+Enter for new lines
  }

  const handleSendClick = () => {
    sendMessage(message)
  }

  // Refresh messages function
  const refreshMessages = async () => {
    if (chatSession?.id) {
      try {
        const messages = await getChatMessages(chatSession.id)
        if (messages.data) {
          setChatMessages(messages.data)
          console.log("Messages refreshed:", messages.data.length)
        }
      } catch (error) {
        console.error("Error refreshing messages:", error)
      }
    }
  }

  useEffect(() => {
    const fetchChatSession = async () => {
      try {
        let session = await getChatSessionByUserId()
        if (session.error || !session.data || session.data.length === 0) {
          const thread = await createThread()
          setThreadId(thread.id)
          const newSession: any = {
            thread_id: thread.id,
            ai_summary: [],
            status: "incomplete",
            is_ready_for_match: false,
            created_at: "2025-05-24T14:30:00.000Z",
          }
          const newSessionResponse = await createChatSession(newSession)

          if (newSessionResponse.error) {
            setError(newSessionResponse.error)
            return
          }

          session = { data: [newSessionResponse.data] }
        }

        if (session.data && session.data) {
          setChatSession(session.data as ChatSession)
          setThreadId(session.data.thread_id)
          const sessionId = session.data.id
          if (sessionId) {
            const intakeProfile = await getIntakeProfile(sessionId)
            if (intakeProfile.error) {
              setError(intakeProfile.error)
            } else if (intakeProfile.data) {
              setIntakeProfile(intakeProfile.data[0] as IntakeProfile)
            }
            const messages = await getChatMessages(sessionId)
            if (messages.error) {
              setError(messages.error)
            } else if (messages.data) {
              setChatMessages(messages.data)
              console.log("Initial messages loaded:", messages.data.length)
            }
          }
        }
      } catch (err) {
        setError("Failed to load chat session")
        console.error(err)
      }
    }

    fetchChatSession()
  }, [])

  // Focus input on component mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <AuthLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Chat Assistant</h1>
          <p className="text-muted-foreground mt-2">
            Have a conversation with our AI to find the right senior care options for your needs.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
            <Button variant="outline" size="sm" className="ml-2" onClick={() => setError(null)}>
              Dismiss
            </Button>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="border-[#bdd8c0] h-[calc(100vh-240px)]">
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">Conversation</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#9bc3a2] text-[#9bc3a2] hover:bg-[#9bc3a2]/10"
                      onClick={refreshMessages}
                    >
                      Refresh
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#9bc3a2] text-[#9bc3a2] hover:bg-[#9bc3a2]/10"
                    >
                      Get Summary
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 overflow-y-auto h-[calc(100%-140px)]">
                <div className="space-y-4">
                  {chatMessages.length > 0 ? (
                    chatMessages.map((message, index) => (
                      <div
                        key={`${message.id}-${index}`}
                        className={`flex gap-3 ${message.sender === "user" ? "justify-end" : ""}`}
                      >
                        {message.sender !== "user" && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/ai-avatar.png" alt="AI Assistant" />
                            <AvatarFallback className="bg-[#9bc3a2] text-white">AI</AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`${message.sender === "user" ? "bg-[#9bc3a2]/10" : "bg-[#d1eee4]"} p-3 rounded-lg ${message.sender === "user" ? "rounded-tr-none" : "rounded-tl-none"} max-w-[80%]`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                          <span className="text-xs text-gray-500 mt-1 block">
                            {new Date(message.created_at).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        {message.sender === "user" && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/avatar.png" alt="User Avatar" />
                            <AvatarFallback className="bg-[#bdd8c0] text-white">JD</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-muted-foreground py-8">
                      <p className="text-sm">Welcome! Start a conversation to find the right senior care options.</p>
                      <p className="text-xs mt-2">Type your message below and press Enter to begin.</p>
                    </div>
                  )}

                  {/* Typing indicator */}
                  {isTyping && <TypingIndicator />}

                  {/* Auto-scroll anchor */}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
              <CardFooter className="border-t p-3">
                <div className="flex w-full items-end space-x-2">
                  <Textarea
                    ref={inputRef}
                    placeholder="Type your message..."
                    className="focus-visible:ring-[#9bc3a2] min-h-[40px] max-h-[120px] resize-none"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isSending}
                    rows={1}
                    style={{
                      height: "auto",
                      minHeight: "40px",
                      maxHeight: "120px",
                    }}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement
                      target.style.height = "auto"
                      target.style.height = Math.min(target.scrollHeight, 120) + "px"
                    }}
                  />
                  <Button
                    size="icon"
                    className="bg-[#9bc3a2] hover:bg-[#9bc3a2]/90 flex-shrink-0"
                    onClick={handleSendClick}
                    disabled={isSending || !message.trim()}
                  >
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>

          <div>
            <Card className="border-[#bdd8c0] h-[calc(100vh-240px)] flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium">Information Summary</CardTitle>
              </CardHeader>
              <CardContent className="pb-3 overflow-y-auto flex-grow">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Care Type</h3>
                    <p className="text-sm font-medium">{intakeProfile?.care_type || "N/A"}</p>
                  </div>
                  <Separator className="bg-[#bdd8c0]/30" />
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Location</h3>
                    <p className="text-sm font-medium">{intakeProfile?.preferred_region || "N/A"}</p>
                  </div>
                  <Separator className="bg-[#bdd8c0]/30" />
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Budget</h3>
                    <p className="text-sm font-medium text-orange-500">
                      {intakeProfile ? `$${intakeProfile.budget_min} - $${intakeProfile.budget_max}` : "Pending"}
                    </p>
                  </div>
                  <Separator className="bg-[#bdd8c0]/30" />
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Move-in Timeline</h3>
                    <p className="text-sm">{intakeProfile?.move_in_timeline || "N/A"}</p>
                  </div>
                  <Separator className="bg-[#bdd8c0]/30" />
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Family Contact Name</h3>
                    <p className="text-sm">{intakeProfile?.family_contact_name || "N/A"}</p>
                  </div>
                  <Separator className="bg-[#bdd8c0]/30" />
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Family Contact Phone</h3>
                    <p className="text-sm">{intakeProfile?.family_contact_phone || "N/A"}</p>
                  </div>
                  <Separator className="bg-[#bdd8c0]/30" />
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Special Needs</h3>
                    <p className="text-sm">{intakeProfile?.special_needs || "No special needs"}</p>
                  </div>
                  <Separator className="bg-[#bdd8c0]/30" />
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Additional Notes</h3>
                    <p className="text-sm">{intakeProfile?.additional_notes || "No additional notes"}</p>
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
