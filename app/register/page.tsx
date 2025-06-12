import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import {signUp} from "@/actions/auth/actions";

export default async function RegisterPage() {
  const supabase = createClient();
  const {data} = await (await supabase).auth.getUser();

  if(data.user){
    redirect("/");
  }

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

      <main className="flex-1 flex items-center justify-center p-4 py-8">
        <Card className="w-full max-w-md border-[#bdd8c0] shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
            <CardDescription className="text-center">
              Join SeniorCare Central to find the perfect care solution for your loved ones
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form action={signUp}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fName">First Name</Label>
                  <Input id="fName" name="fName" placeholder="Jane" className="focus-visible:ring-[#9bc3a2]" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lName">Last Name</Label>
                  <Input id="lName" name="lName" placeholder="Doe" className="focus-visible:ring-[#9bc3a2]" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="name@example.com" className="focus-visible:ring-[#9bc3a2]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" placeholder="••••••••" className="focus-visible:ring-[#9bc3a2]" />
                <p className="text-xs text-muted-foreground">
                  Password must be at least 8 characters long and include a number and a special character.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  className="focus-visible:ring-[#9bc3a2]"
                />
              </div>
              <div className="flex items-start space-x-2 my-4">
                <Checkbox id="terms" name="terms" className="border-[#9bc3a2] data-[state=checked]:bg-[#9bc3a2] mt-1" />
                <Label htmlFor="terms" className="text-sm leading-tight">
                  I agree to the{" "}
                  <Link href="/terms" className="font-medium text-[#9bc3a2] hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="font-medium text-[#9bc3a2] hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>
              <Button className="w-full bg-[#9bc3a2] hover:bg-[#9bc3a2]/90" type="submit">Create Account</Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">

            {/* <div className="relative my-2">
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
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M18.3 8.4a4.8 4.8 0 0 0-6.6-2.4 4.8 4.8 0 0 0-2.4 6.6l3 5.2a2 2 0 0 0 3.6-1.2 1 1 0 0 1 1-1 1 1 0 0 1 1 1 4 4 0 0 1-7.3 2.3L8 14.7a8 8 0 0 1 3-11 8 8 0 0 1 11 3 8 8 0 0 1-3 11" />
                </svg>
                Google
              </Button>
              <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                Facebook
              </Button>
            </div> */}

            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-[#9bc3a2] hover:underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>

      <footer className="py-6 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} SeniorCare Central. All rights reserved.</p>
      </footer>
    </div>
  )
}
