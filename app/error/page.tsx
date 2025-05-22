"use client"

import Link from "next/link"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="min-h-screen bg-[#c2dacc] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center bg-[#d1eee4] p-8 rounded-lg shadow-md">
        <div>
          <div className="mx-auto h-24 w-24 rounded-full bg-[#bdd8c0] flex items-center justify-center">
            <AlertCircle className="h-12 w-12 text-[#9bc3a2]" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Oops! Something went wrong.</h2>
          <p className="mt-2 text-sm text-gray-600">{error.message || "An unexpected error occurred"}</p>
          {error.digest && <p className="mt-2 text-xs text-gray-500">Error ID: {error.digest}</p>}
        </div>
        <div className="space-y-4">
          <Button className="w-full bg-[#9bc3a2] hover:bg-[#8ab391] text-white" onClick={() => reset()}>
            Try Again
          </Button>
          <Link href="/" passHref>
            <Button
              className="w-full"
              variant="outline"
              style={{
                borderColor: "#bdd8c0",
                color: "#4a5568",
                backgroundColor: "transparent",
              }}
            >
              Return to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
