"use client";

import React from "react";
import { Badge } from "@/components/ui/badge"
import AuthLayout from "@/components/layout/auth-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Building2, Calendar, Trash2 } from "lucide-react"
import { getProfile } from "@/actions/profile/actions"
import { Textarea } from "@/components/ui/textarea"
import { UserProfile } from "@/types/user_profile"
import { updateProfile } from "@/actions/profile/actions"
import { updatePassword } from "@/actions/auth/actions";

export default function ProfilePage() {
  const [profile, setProfile] = React.useState<UserProfile | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await getProfile();
      if ("error" in profileData) {
        setError(profileData.error);
      } else {
        setProfile(profileData as UserProfile);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!profile) return;
    const formData = new FormData(event.target as HTMLFormElement);
    const updatedProfile: UserProfile = {
      ...profile,
      first_name: formData.get('first-name') as string,
      last_name: formData.get('last-name') as string,
      phone_number: formData.get('phone') as string,
      address: formData.get('address') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      zip_code: formData.get('zip-code') as string,
      preferences_json: formData.get('preferences') as string,
    };
    const result = await updateProfile(updatedProfile);
    if (result.error) {
      console.error(result.error);
    } else {
      console.log('Profile updated successfully');
    }
  };

  const handlePasswordUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const newPassword = formData.get('new-password') as string;
    const confirmPassword = formData.get('confirm-password') as string;

    if (newPassword !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    try {
      await updatePassword(formData);
      console.log('Password updated successfully');
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
          <p className="text-muted-foreground mt-2">Manage your account information and preferences.</p>
        </div>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="bg-[#d1eee4]">
            <TabsTrigger value="personal" className="data-[state=active]:bg-[#9bc3a2] data-[state=active]:text-white">
              Personal Information
            </TabsTrigger>
            <TabsTrigger value="saved" className="data-[state=active]:bg-[#9bc3a2] data-[state=active]:text-white">
              Saved Providers
            </TabsTrigger>
            <TabsTrigger value="scheduled" className="data-[state=active]:bg-[#9bc3a2] data-[state=active]:text-white">
              Scheduled Calls
            </TabsTrigger>
          </TabsList>
          <TabsContent value="personal" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-[#bdd8c0]">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={profile.avatar || "/avatar.png"} alt={`${profile.first_name} ${profile.last_name}`} />
                      <AvatarFallback className="bg-[#9bc3a2] text-white text-xl">{profile.first_name[0]}{profile.last_name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-medium">Profile Photo</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        This will be displayed on your profile and in the chat.
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#9bc3a2] text-[#9bc3a2] hover:bg-[#9bc3a2]/10"
                        >
                          Change Photo
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-destructive text-destructive hover:bg-destructive/10"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" name="first-name" defaultValue={profile.first_name} className="focus-visible:ring-[#9bc3a2]" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" name="last-name" defaultValue={profile.last_name} className="focus-visible:ring-[#9bc3a2]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={profile.email}
                      className="focus-visible:ring-[#9bc3a2]"
                      disabled
                    />
                    <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      defaultValue={profile.phone_number || ""}
                      className="focus-visible:ring-[#9bc3a2]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" name="address" defaultValue={profile.address || ""} className="focus-visible:ring-[#9bc3a2]" />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" name="city" defaultValue={profile.city || ""} className="focus-visible:ring-[#9bc3a2]" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input id="state" name="state" defaultValue={profile.state || ""} className="focus-visible:ring-[#9bc3a2]" />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="zip-code">ZIP Code</Label>
                      <Input id="zip-code" name="zip-code" defaultValue={profile.zip_code || ""} className="focus-visible:ring-[#9bc3a2]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="preferences">Preferences</Label>
                    <Textarea
                      id="preferences"
                      name="preferences"
                      className="min-h-[100px] focus-visible:ring-[#9bc3a2]"
                      placeholder="Enter any specific preferences for senior care services"
                      defaultValue={profile.preferences_json || ""}
                    />
                    <p className="text-xs text-muted-foreground">
                      These preferences will help us tailor recommendations to your needs
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="bg-[#9bc3a2] hover:bg-[#9bc3a2]/90">Save Changes</Button>
                </CardFooter>
              </Card>

              <Card className="border-[#bdd8c0]">
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>Change your password</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" className="focus-visible:ring-[#9bc3a2]" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" name="new-password" type="password" className="focus-visible:ring-[#9bc3a2]" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" name="confirm-password" type="password" className="focus-visible:ring-[#9bc3a2]" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="bg-[#9bc3a2] hover:bg-[#9bc3a2]/90">Update Password</Button>
                </CardFooter>
              </Card>

              <Card className="border-[#bdd8c0] md:col-span-2">
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Email Notifications</h3>
                        <p className="text-sm text-muted-foreground">
                          Receive email notifications about new matches and messages.
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="email-notifications" className="sr-only">
                          Email Notifications
                        </Label>
                        <input
                          type="checkbox"
                          id="email-notifications"
                          className="h-4 w-4 rounded border-[#9bc3a2] text-[#9bc3a2] focus:ring-[#9bc3a2]"
                          defaultChecked
                        />
                      </div>
                    </div>
                    <Separator className="bg-[#bdd8c0]/30" />
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">SMS Notifications</h3>
                        <p className="text-sm text-muted-foreground">
                          Receive text message reminders for scheduled calls.
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="sms-notifications" className="sr-only">
                          SMS Notifications
                        </Label>
                        <input
                          type="checkbox"
                          id="sms-notifications"
                          className="h-4 w-4 rounded border-[#9bc3a2] text-[#9bc3a2] focus:ring-[#9bc3a2]"
                          defaultChecked
                        />
                      </div>
                    </div>
                    <Separator className="bg-[#bdd8c0]/30" />
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Data Sharing</h3>
                        <p className="text-sm text-muted-foreground">
                          Allow us to share your information with matched providers.
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="data-sharing" className="sr-only">
                          Data Sharing
                        </Label>
                        <input
                          type="checkbox"
                          id="data-sharing"
                          className="h-4 w-4 rounded border-[#9bc3a2] text-[#9bc3a2] focus:ring-[#9bc3a2]"
                          defaultChecked
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="destructive" className="flex items-center">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Account
                  </Button>
                  <Button className="bg-[#9bc3a2] hover:bg-[#9bc3a2]/90">Save Preferences</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="saved" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "A Place for Mom",
                  description:
                    "Free senior living referral service with nationwide coverage and personalized guidance.",
                  location: "Seattle, WA",
                  services: ["Placement Service", "Financial Guidance", "Virtual Tours"],
                  savedOn: "May 10, 2025",
                },
                {
                  name: "CareNest",
                  description: "Boutique assisted living with a focus on wellness and active lifestyle programs.",
                  location: "Northgate, Seattle, WA",
                  services: ["Assisted Living", "Independent Living", "Wellness Programs"],
                  savedOn: "May 8, 2025",
                },
                {
                  name: "ElderBridge",
                  description: "Comprehensive senior care services with a focus on aging in place and transitions.",
                  location: "Ballard, Seattle, WA",
                  services: ["Assisted Living", "Home Care", "Care Management"],
                  savedOn: "May 5, 2025",
                },
              ].map((provider, index) => (
                <Card key={index} className="border-[#bdd8c0]">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-[#b4d1be] flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-base font-medium">{provider.name}</CardTitle>
                        <CardDescription className="text-xs">Saved on {provider.savedOn}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm mb-3">{provider.description}</p>
                    <div className="flex items-start gap-2 mb-2">
                      <span className="text-sm">{provider.location}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {provider.services.map((service, i) => (
                        <Badge key={i} variant="outline" className="border-[#9bc3a2] text-[#9bc3a2]">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button className="flex-1 bg-[#9bc3a2] hover:bg-[#9bc3a2]/90">View Details</Button>
                    <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="scheduled" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  type: "AI Video Call",
                  date: "May 15, 2025",
                  time: "10:00 AM",
                  duration: "30 minutes",
                  topic: "Discussing budget options and financial assistance",
                  status: "Upcoming",
                },
                {
                  type: "Provider Introduction",
                  date: "May 18, 2025",
                  time: "2:00 PM",
                  duration: "45 minutes",
                  topic: "Virtual tour of Sunrise Senior Living facility",
                  status: "Upcoming",
                },
                {
                  type: "AI Audio Call",
                  date: "May 8, 2025",
                  time: "11:30 AM",
                  duration: "30 minutes",
                  topic: "Initial needs assessment and care options",
                  status: "Completed",
                },
              ].map((call, index) => (
                <Card key={index} className="border-[#bdd8c0]">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-[#b4d1be] flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-base font-medium">{call.type}</CardTitle>
                        <CardDescription className="text-xs">
                          {call.date} at {call.time} ({call.duration})
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm mb-3">{call.topic}</p>
                    <Badge
                      className={
                        call.status === "Upcoming"
                          ? "bg-[#9bc3a2]"
                          : call.status === "Completed"
                            ? "bg-gray-500"
                            : "bg-orange-500"
                      }
                    >
                      {call.status}
                    </Badge>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    {call.status === "Upcoming" ? (
                      <>
                        <Button className="flex-1 bg-[#9bc3a2] hover:bg-[#9bc3a2]/90">Join Call</Button>
                        <Button variant="outline" className="border-[#9bc3a2] text-[#9bc3a2] hover:bg-[#9bc3a2]/10">
                          Reschedule
                        </Button>
                      </>
                    ) : (
                      <Button className="flex-1 bg-[#9bc3a2] hover:bg-[#9bc3a2]/90">View Summary</Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </form>
      <form onSubmit={handlePasswordUpdate} className="flex flex-col gap-6">
        <Card className="border-[#bdd8c0]">
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Change your password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" className="focus-visible:ring-[#9bc3a2]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" name="new-password" type="password" className="focus-visible:ring-[#9bc3a2]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" name="confirm-password" type="password" className="focus-visible:ring-[#9bc3a2]" />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="bg-[#9bc3a2] hover:bg-[#9bc3a2]/90">Update Password</Button>
          </CardFooter>
        </Card>
      </form>
    </AuthLayout>
  )
}
