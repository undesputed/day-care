"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "@/actions/admin/login/action"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ErrorDialog } from "@/components/auth/error-dialog"

export default function LoginPage() {
    const router = useRouter();
    const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (formData: FormData) => {
        console.log("Form submitted:", formData);
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
                        <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
                        <CardDescription className="text-center">
                            Sign in to your account to continue
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <form action={handleSubmit} >
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input 
                                    id="email" 
                                    name="email"
                                    type="email" 
                                    placeholder="name@example.com" 
                                    className="focus-visible:ring-[#9bc3a2]" 
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    <Link href="/forgot-password" className="text-sm font-medium text-[#9bc3a2] hover:underline">
                                        Forgot password?
                                    </Link>
                                </div>
                                <Input 
                                    id="password" 
                                    name="password"
                                    type="password" 
                                    placeholder="••••••••" 
                                    className="focus-visible:ring-[#9bc3a2]" 
                                />
                            </div>
                            <div className="flex items-center space-x-2 my-4">
                                <Checkbox 
                                    id="remember" 
                                    name="remember"
                                    className="border-[#9bc3a2] data-[state=checked]:bg-[#9bc3a2]" 
                                />
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
    )
}
