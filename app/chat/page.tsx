"use client"

import type React from "react"
import ReactMarkdown from "react-markdown"

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
import { getIntakeProfile, createIntakeProfile, updateIntakeProfile } from "@/actions/intake_profiles/actions"
import { Textarea } from "@/components/ui/textarea"
import { updateChatSession } from "@/actions/chat_sessions/actions"
import { toast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createAdminNotification } from '@/actions/admin/admin_notification/actions'
import { getProfile } from '@/actions/profile/actions'

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

// Function to format AI responses and convert JSON blocks to readable text
const formatAIResponse = (message: string): string => {
  // Regular expression to match JSON code blocks
  const jsonBlockRegex = /```json\s*\n([\s\S]*?)\n```/g

  let formattedMessage = message
  let match

  while ((match = jsonBlockRegex.exec(message)) !== null) {
    const jsonString = match[1]
    const fullMatch = match[0]

    try {
      const jsonData = JSON.parse(jsonString)
      let readableText = ""

      // Handle different types of JSON structures
      if (jsonData.care_type || jsonData.preferred_region) {
        // This is a care profile summary
        readableText = formatCareProfile(jsonData)
      } else if (jsonData.suggested_provider_tags) {
        // This is provider matching tags
        readableText = formatProviderTags(jsonData)
      } else {
        // Generic JSON formatting
        readableText = formatGenericJson(jsonData)
      }

      formattedMessage = formattedMessage.replace(fullMatch, readableText)
    } catch (error) {
      // If JSON parsing fails, leave the original block
      console.warn("Failed to parse JSON block:", error)
    }
  }

  return formattedMessage
}

const formatCareProfile = (data: any): string => {
  const careTypeMap: { [key: string]: string } = {
    nursing_home: "Nursing Home",
    assisted_living: "Assisted Living",
    memory_care: "Memory Care",
    independent_living: "Independent Living",
    home_care: "Home Care",
  }

  let formatted = "📋 **Care Profile Summary:**\n\n"

  if (data.care_type) {
    formatted += `• **Care Type:** ${careTypeMap[data.care_type] || data.care_type}\n`
  }
  if (data.preferred_region) {
    formatted += `• **Location:** ${data.preferred_region}\n`
  }
  if (data.budget_min && data.budget_max) {
    formatted += `• **Budget Range:** $${data.budget_min.toLocaleString()} - $${data.budget_max.toLocaleString()}\n`
  }
  if (data.move_in_timeline) {
    formatted += `• **Move-in Timeline:** ${data.move_in_timeline}\n`
  }
  if (data.special_needs) {
    formatted += `• **Special Care Needs:** ${data.special_needs}\n`
  }
  if (data.user_role) {
    formatted += `• **Your Role:** ${data.user_role}\n`
  }
  if (data.additional_notes) {
    formatted += `• **Additional Notes:** ${data.additional_notes}\n`
  }

  return formatted
}

const formatProviderTags = (data: any): string => {
  let formatted = "🏷️ **Recommended Provider Categories:**\n\n"

  if (data.suggested_provider_tags && Array.isArray(data.suggested_provider_tags)) {
    data.suggested_provider_tags.forEach((tag: string, index: number) => {
      formatted += `${index + 1}. ${tag}\n`
    })
  }

  return formatted
}

const formatGenericJson = (data: any): string => {
  let formatted = "📊 **Information Summary:**\n\n"

  Object.entries(data).forEach(([key, value]) => {
    const formattedKey = key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())

    if (Array.isArray(value)) {
      formatted += `• **${formattedKey}:**\n`
      value.forEach((item, index) => {
        formatted += `  ${index + 1}. ${item}\n`
      })
    } else {
      formatted += `• **${formattedKey}:** ${value}\n`
    }
  })

  return formatted
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
  const [isSummaryLoading, setIsSummaryLoading] = useState(false)
  const [summaryStatus, setSummaryStatus] = useState<string | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editForm, setEditForm] = useState<IntakeProfile | null>(null)
  const [editLoading, setEditLoading] = useState(false)
  const [editError, setEditError] = useState<string | null>(null)

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatMessages, isTyping])

  const saveMessage = async (message: string, sender: string) => {
    console.log("Chat Session ID:", chatSession)
    if (!chatSession?.id) {
      console.log("No chat session ID available")
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
        // Format the AI response before saving/displaying
        const formattedReply = formatAIResponse(run.reply)

        // Save AI response to database (save original for data integrity)
        const savedAIMessage: any = await saveMessage(run.reply, "assistant")

        if (savedAIMessage?.data) {
          // Update the saved message with formatted content for display
          const displayMessage = { ...savedAIMessage.data, message: formattedReply }
          setChatMessages((prev) => [...prev, displayMessage])
          console.log("AI message added to UI")
        } else {
          // If saving failed, still show the formatted message in UI
          const aiMessage: ChatMessage = {
            id: `ai-${Date.now()}`,
            session_id: chatSession?.id || "",
            sender: "assistant",
            message: formattedReply,
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
      // Ensure focus is restored with a small delay to handle async state updates
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
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
    // Restore focus immediately after clicking send
    setTimeout(() => {
      inputRef.current?.focus()
    }, 50)
  }

  // Refresh messages function
  const refreshMessages = async () => {
    if (chatSession?.id) {
      try {
        const messages = await getChatMessages(chatSession.id)
        if (messages.data) {
          // Format existing messages when refreshing
          const formattedMessages = messages.data.map((msg) => {
            if (msg.sender === "assistant") {
              return { ...msg, message: formatAIResponse(msg.message) }
            }
            return msg
          })
          setChatMessages(formattedMessages)
          console.log("Messages refreshed:", formattedMessages.length)
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
              // Format existing messages on initial load
              const formattedMessages = messages.data.map((msg) => {
                if (msg.sender === "assistant") {
                  return { ...msg, message: formatAIResponse(msg.message) }
                }
                return msg
              })
              setChatMessages(formattedMessages)
              console.log("Initial messages loaded:", formattedMessages.length)
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

  // Helper: Validate IntakeProfile fields (except id, created_at)
  const isIntakeProfileReady = (profile: any) => {
    const requiredFields = [
      "session_id",
      "user_id",
      "care_type",
      "preferred_region",
      "budget_min",
      "budget_max",
      "move_in_timeline",
      "special_needs",
      "family_contact_name",
      "family_contact_phone",
      "is_ready_for_match",
      "summary_completed",
      "additional_notes",
    ]
    return requiredFields.every(
      (field) => profile[field] !== undefined && profile[field] !== null && profile[field] !== "",
    )
  }

  // Handler for Get Summary button
  const handleGetSummary = async () => {
    if (!threadId || !chatSession?.id || isSummaryLoading) return
    setIsSummaryLoading(true)
    setSummaryStatus("Retrieving conversation data...")
    setError(null)
    try {
      // Fetch user profile for first_name and last_name
      const userProfile = await getProfile();
      // 1. Send summary prompt to assistant
      setSummaryStatus("Requesting summary from AI...")
      const summaryPrompt = `Summarize the entire conversation so far and return the result as a single JSON object in the following format. Strictly follow the schema and do not add or omit any fields. Use the following type definition (TypeScript):\n\n'export type IntakeProfile = {\\n  id: string;\\n  created_at: string;\\n  session_id: string;\\n  user_id: string;\\n  first_name: string;\\n  last_name: string;\\n  care_type: string;\\n  preferred_region: string;\\n  budget_min: number;\\n  budget_max: number;\\n  move_in_timeline: string;\\n  special_needs: string;\\n  family_contact_name: string;\\n  family_contact_phone: string;\\n  is_ready_for_match: boolean;\\n  summary_completed: boolean;\\n  additional_notes: string;\\n}'\n\nReturn only a JSON code block, and set 'strict' to true. Do not include any explanation or extra text.`
      await createMessage(summaryPrompt)
      // 2. Trigger a new run
      setSummaryStatus("Waiting for AI to process summary...")
      const run = await createRun(threadId)
      if (!run.intakeProfile) {
        setError("AI did not return a valid summary. Please try again.")
        setIsSummaryLoading(false)
        setSummaryStatus(null)
        return
      }
      setSummaryStatus("Validating summary data...")
      // 3. Validate and save
      const profile = run.intakeProfile
      // Fill in id, created_at if missing
      profile.created_at = profile.created_at || new Date().toISOString()
      profile.session_id = chatSession.id
      profile.user_id = chatSession.user_id
      // Set first_name and last_name from AI or user profile
      let userFirstName = "";
      let userLastName = "";
      if (userProfile && !("error" in userProfile)) {
        userFirstName = (userProfile as import('@/types/user_profile').UserProfile).first_name;
        userLastName = (userProfile as import('@/types/user_profile').UserProfile).last_name;
      }
      profile.first_name = (profile.first_name && profile.first_name.trim()) || userFirstName;
      profile.last_name = (profile.last_name && profile.last_name.trim()) || userLastName;
      // Validate
      const ready = isIntakeProfileReady(profile)
      profile.is_ready_for_match = ready
      profile.summary_completed = true
      // Save to intake_profiles
      setSummaryStatus("Saving summary to database...")
      const saveResult = await createIntakeProfile(profile)
      if (saveResult.error) {
        setError(saveResult.error)
        setIsSummaryLoading(false)
        setSummaryStatus(null)
        return
      }
      // Update chat_sessions
      setSummaryStatus("Updating session status...")
      await updateChatSession(chatSession.id, { is_ready_for_match: ready })
      setSummaryStatus("Summary saved successfully.")
      setIntakeProfile(profile)
      // Show success toast on the right side
      toast({
        title: "Information Summary Updated!",
        description: "The information on the right has been updated with the latest summary.",
      })
      setTimeout(() => setSummaryStatus(null), 2000)
    } catch (err: any) {
      setError(err.message || "Failed to get summary.")
    } finally {
      setIsSummaryLoading(false)
    }
  }

  // Open dialog and populate form
  const handleEditClick = () => {
    setEditForm(intakeProfile ? { ...intakeProfile } : null)
    setEditDialogOpen(true)
    setEditError(null)
  }

  // Handle form field changes
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editForm) return
    const { name, value } = e.target
    setEditForm({ ...editForm, [name]: value })
  }

  // Handle save
  const handleEditSave = async () => {
    if (!editForm || !editForm.id) return
    setEditLoading(true)
    setEditError(null)
    try {
      const result = await updateIntakeProfile(editForm.id, editForm)
      if (result.error) {
        setEditError(result.error)
      } else {
        setIntakeProfile(editForm)
        setEditDialogOpen(false)
        toast({ title: "Information Updated", description: "Your information summary has been updated." })
      }
    } catch (err: any) {
      setEditError(err.message || "Failed to update information.")
    } finally {
      setEditLoading(false)
    }
  }

  const handleSubmitToProviders = async () => {
    if (!chatSession?.id) return;
    try {
      const notification = {
        session_id: chatSession.id,
        message: 'A user has submitted their information for provider matching.',
        read: false,
        created_at: new Date().toISOString(),
      };
      const result = await createAdminNotification(notification);
      if (result.error) {
        toast({ title: 'Error', description: result.error, variant: 'destructive' });
      } else {
        toast({ title: 'Submitted!', description: 'Your information has been sent to the admin for provider matching.' });
      }
    } catch (err: any) {
      toast({ title: 'Error', description: err.message || 'Failed to submit to providers.', variant: 'destructive' });
    }
  };

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
                      onClick={handleGetSummary}
                      disabled={isSummaryLoading}
                    >
                      {isSummaryLoading ? summaryStatus || "Processing..." : "Get Summary"}
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
                          {message.sender === "assistant" ? (
                            <ReactMarkdown
                              components={{
                                p: ({ children }) => <p className="text-sm whitespace-pre-wrap">{children}</p>,
                              }}
                            >
                              {message.message}
                            </ReactMarkdown>
                          ) : (
                            <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                          )}
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
                    onBlur={(e) => {
                      // Prevent losing focus during message sending
                      if (isSending) {
                        e.preventDefault()
                        setTimeout(() => {
                          inputRef.current?.focus()
                        }, 50)
                      }
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
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">First Name</h3>
                    <p className="text-sm font-medium">{intakeProfile?.first_name || "N/A"}</p>
                  </div>
                  <Separator className="bg-[#bdd8c0]/30" />
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Last Name</h3>
                    <p className="text-sm font-medium">{intakeProfile?.last_name || "N/A"}</p>
                  </div>
                  <Separator className="bg-[#bdd8c0]/30" />
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
                <Button className="w-full bg-[#9bc3a2] hover:bg-[#9bc3a2]/90" onClick={handleSubmitToProviders}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Submit to Providers
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-[#9bc3a2] text-[#9bc3a2] hover:bg-[#9bc3a2]/10"
                  onClick={handleEditClick}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Information
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {summaryStatus && <div className="text-xs text-[#9bc3a2] mt-2">{summaryStatus}</div>}
      </div>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-[#4a7c59]">Edit Information Summary</DialogTitle>
            <DialogDescription>
              Update the information collected from your conversation. This will be used to match you with suitable providers.
            </DialogDescription>
          </DialogHeader>
          {editForm && (
            <form
              className="space-y-5 flex-1 flex flex-col"
              onSubmit={(e) => {
                e.preventDefault()
                handleEditSave()
              }}
              style={{ minHeight: 0 }}
            >
              <div className="space-y-4 flex-1 overflow-y-auto">
                <div className="space-y-2">
                  <Label htmlFor="first_name" className="text-sm font-medium">
                    First Name
                  </Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    value={editForm.first_name || ""}
                    onChange={handleEditChange}
                    className="focus-visible:ring-[#9bc3a2]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name" className="text-sm font-medium">
                    Last Name
                  </Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    value={editForm.last_name || ""}
                    onChange={handleEditChange}
                    className="focus-visible:ring-[#9bc3a2]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="care_type" className="text-sm font-medium">
                    Care Type
                  </Label>
                  <Input
                    id="care_type"
                    name="care_type"
                    value={editForm.care_type || ""}
                    onChange={handleEditChange}
                    className="focus-visible:ring-[#9bc3a2]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferred_region" className="text-sm font-medium">
                    Location
                  </Label>
                  <Input
                    id="preferred_region"
                    name="preferred_region"
                    value={editForm.preferred_region || ""}
                    onChange={handleEditChange}
                    className="focus-visible:ring-[#9bc3a2]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget_min" className="text-sm font-medium">
                      Budget Min ($)
                    </Label>
                    <Input
                      id="budget_min"
                      name="budget_min"
                      type="number"
                      value={editForm.budget_min || ""}
                      onChange={handleEditChange}
                      className="focus-visible:ring-[#9bc3a2]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget_max" className="text-sm font-medium">
                      Budget Max ($)
                    </Label>
                    <Input
                      id="budget_max"
                      name="budget_max"
                      type="number"
                      value={editForm.budget_max || ""}
                      onChange={handleEditChange}
                      className="focus-visible:ring-[#9bc3a2]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="move_in_timeline" className="text-sm font-medium">
                    Move-in Timeline
                  </Label>
                  <Input
                    id="move_in_timeline"
                    name="move_in_timeline"
                    value={editForm.move_in_timeline || ""}
                    onChange={handleEditChange}
                    className="focus-visible:ring-[#9bc3a2]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="family_contact_name" className="text-sm font-medium">
                    Family Contact Name
                  </Label>
                  <Input
                    id="family_contact_name"
                    name="family_contact_name"
                    value={editForm.family_contact_name || ""}
                    onChange={handleEditChange}
                    className="focus-visible:ring-[#9bc3a2]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="family_contact_phone" className="text-sm font-medium">
                    Family Contact Phone
                  </Label>
                  <Input
                    id="family_contact_phone"
                    name="family_contact_phone"
                    value={editForm.family_contact_phone || ""}
                    onChange={handleEditChange}
                    className="focus-visible:ring-[#9bc3a2]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="special_needs" className="text-sm font-medium">
                    Special Needs
                  </Label>
                  <Input
                    id="special_needs"
                    name="special_needs"
                    value={editForm.special_needs || ""}
                    onChange={handleEditChange}
                    className="focus-visible:ring-[#9bc3a2]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="additional_notes" className="text-sm font-medium">
                    Additional Notes
                  </Label>
                  <Textarea
                    id="additional_notes"
                    name="additional_notes"
                    value={editForm.additional_notes || ""}
                    onChange={handleEditChange}
                    className="min-h-[80px] focus-visible:ring-[#9bc3a2]"
                  />
                </div>
                {editError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                    {editError}
                  </div>
                )}
              </div>
              <DialogFooter className="sticky bottom-0 bg-white pt-4 pb-2 z-10 flex gap-2 border-t mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditDialogOpen(false)}
                  className="border-gray-300"
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#9bc3a2] hover:bg-[#9bc3a2]/90" disabled={editLoading}>
                  {editLoading ? "Saving..." : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </AuthLayout>
  )
}
