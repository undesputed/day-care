"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation";
import { signIn } from "@/actions/auth/actions";
import { ErrorDialog } from "@/components/auth/error-dialog";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (formData: FormData) => {
    try {
      await signIn(formData);
    } catch (error) {
      // Handle specific error messages
      const errorMsg = error instanceof Error ? error.message : "An unexpected error occurred";
      let displayMessage = "An error occurred during sign in.";
      
      if (errorMsg.includes("Invalid login credentials")) {
        displayMessage = "Invalid email or password. Please try again.";
      } else if (errorMsg.includes("Email not confirmed")) {
        displayMessage = "Please confirm your email address before signing in.";
      } else if (errorMsg.includes("User not found")) {
        displayMessage = "No account found with this email address.";
      } else if (errorMsg.includes("Too many requests")) {
        displayMessage = "Too many login attempts. Please try again later.";
      }
      
      setErrorMessage(displayMessage);
      setIsErrorDialogOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#c2dacc]/30 flex flex-col">
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-[#9bc3a2] flex items-center justify-center">
              <span className="font-bold text-white">SC</span>
            </div>
            <span className="font-semibold text-lg text-gray-900">SeniorCare Central</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-[#bdd8c0] shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Sign in to your account to continue your senior care journey
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form action={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="name@example.com" className="focus-visible:ring-[#9bc3a2]" required />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-sm font-medium text-[#9bc3a2] hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input id="password" name="password" type="password" placeholder="••••••••" className="focus-visible:ring-[#9bc3a2]" required />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" className="border-[#9bc3a2] data-[state=checked]:bg-[#9bc3a2]" />
                <Label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </Label>
              </div>
              <Button className="w-full bg-[#9bc3a2] hover:bg-[#9bc3a2]/90" type="submit">Sign In</Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 8v8"></path>
                  <path d="M8 12h8"></path>
                </svg>
                Google
              </Button>
              <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
                Facebook
              </Button>
            </div>

            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link href="/register" className="font-medium text-[#9bc3a2] hover:underline">
                Create one
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>

      <footer className="py-6 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} SeniorCare Central. All rights reserved.</p>
      </footer>

      <ErrorDialog
        isOpen={isErrorDialogOpen}
        onClose={() => setIsErrorDialogOpen(false)}
        error={errorMessage}
      />
    </div>
  );
}
