import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import AdminLayout from "@/components/admin/layout/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, Key, RefreshCw, Shield, Globe, Mail, Bell, Database, Webhook } from "lucide-react"

export default function SettingsPage() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings & Permissions</h1>
          <p className="text-muted-foreground mt-1">Manage system settings and user permissions.</p>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="bg-[#d1eee4]">
            <TabsTrigger value="general" className="data-[state=active]:bg-[#9bc3a2] data-[state=active]:text-white">
              General
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-[#9bc3a2] data-[state=active]:text-white">
              Security
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-[#9bc3a2] data-[state=active]:text-white"
            >
              Notifications
            </TabsTrigger>
            <TabsTrigger value="api" className="data-[state=active]:bg-[#9bc3a2] data-[state=active]:text-white">
              API & Integrations
            </TabsTrigger>
            <TabsTrigger value="roles" className="data-[state=active]:bg-[#9bc3a2] data-[state=active]:text-white">
              Roles & Permissions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-[#c2dacc]">
                <CardHeader>
                  <CardTitle>Platform Settings</CardTitle>
                  <CardDescription>Configure general platform settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="platform-name">Platform Name</Label>
                    <Input
                      id="platform-name"
                      defaultValue="SeniorCare Central"
                      className="focus-visible:ring-[#9bc3a2]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="platform-url">Platform URL</Label>
                    <div className="flex items-center">
                      <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="platform-url"
                        defaultValue="https://seniorcarecentral.com"
                        className="focus-visible:ring-[#9bc3a2]"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Admin Email</Label>
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="admin-email"
                        defaultValue="admin@seniorcarecentral.com"
                        className="focus-visible:ring-[#9bc3a2]"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="america_los_angeles">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="america_los_angeles">America/Los Angeles (UTC-08:00)</SelectItem>
                        <SelectItem value="america_new_york">America/New York (UTC-05:00)</SelectItem>
                        <SelectItem value="europe_london">Europe/London (UTC+00:00)</SelectItem>
                        <SelectItem value="asia_tokyo">Asia/Tokyo (UTC+09:00)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-[#9bc3a2] hover:bg-[#9bc3a2]/90">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-[#c2dacc]">
                <CardHeader>
                  <CardTitle>Maintenance Mode</CardTitle>
                  <CardDescription>Configure system maintenance settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Maintenance Mode</h3>
                      <p className="text-sm text-muted-foreground">
                        Enable maintenance mode to temporarily disable the platform for users.
                      </p>
                    </div>
                    <Switch id="maintenance-mode" />
                  </div>
                  <Separator className="bg-[#c2dacc]/50" />
                  <div className="space-y-2">
                    <Label htmlFor="maintenance-message">Maintenance Message</Label>
                    <Textarea
                      id="maintenance-message"
                      placeholder="Enter a message to display during maintenance..."
                      className="min-h-32 focus-visible:ring-[#9bc3a2]"
                      defaultValue="We're currently performing scheduled maintenance. Please check back soon."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maintenance-time">Scheduled Maintenance Time</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <Input id="maintenance-start" type="datetime-local" className="focus-visible:ring-[#9bc3a2]" />
                      <Input id="maintenance-end" type="datetime-local" className="focus-visible:ring-[#9bc3a2]" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-[#9bc3a2] hover:bg-[#9bc3a2]/90">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-[#c2dacc]">
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Configure security and authentication settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-muted-foreground">
                        Require two-factor authentication for all admin users.
                      </p>
                    </div>
                    <Switch id="2fa-required" defaultChecked />
                  </div>
                  <Separator className="bg-[#c2dacc]/50" />
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Password Expiration</h3>
                      <p className="text-sm text-muted-foreground">
                        Require users to change their password periodically.
                      </p>
                    </div>
                    <Switch id="password-expiration" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-expiration-days">Password Expiration Period (Days)</Label>
                    <Input
                      id="password-expiration-days"
                      type="number"
                      defaultValue="90"
                      className="focus-visible:ring-[#9bc3a2]"
                    />
                  </div>
                  <Separator className="bg-[#c2dacc]/50" />
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout (Minutes)</Label>
                    <Input
                      id="session-timeout"
                      type="number"
                      defaultValue="30"
                      className="focus-visible:ring-[#9bc3a2]"
                    />
                    <p className="text-xs text-muted-foreground">
                      Users will be automatically logged out after this period of inactivity.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-[#9bc3a2] hover:bg-[#9bc3a2]/90">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-[#c2dacc]">
                <CardHeader>
                  <CardTitle>API Security</CardTitle>
                  <CardDescription>Manage API keys and access tokens</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="api-key"
                        defaultValue="sk_live_51NzQHpLkdIwUZQHU7rdONwYGGg"
                        className="focus-visible:ring-[#9bc3a2]"
                        type="password"
                      />
                      <Button variant="outline" size="icon" className="flex-shrink-0">
                        <Key className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      This key provides full access to the API. Keep it secure.
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">API Rate Limiting</h3>
                      <p className="text-sm text-muted-foreground">Limit the number of API requests per minute.</p>
                    </div>
                    <Switch id="rate-limiting" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rate-limit">Rate Limit (Requests per Minute)</Label>
                    <Input id="rate-limit" type="number" defaultValue="100" className="focus-visible:ring-[#9bc3a2]" />
                  </div>
                  <Separator className="bg-[#c2dacc]/50" />
                  <div className="flex justify-between">
                    <Button variant="outline" className="border-[#c2dacc]">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Regenerate API Key
                    </Button>
                    <Button variant="outline" className="border-[#c2dacc]">
                      <Key className="mr-2 h-4 w-4" />
                      Create New Key
                    </Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-[#9bc3a2] hover:bg-[#9bc3a2]/90">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <Card className="border-[#c2dacc]">
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure system and email notification settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-3">
                        <Bell className="h-5 w-5 text-[#9bc3a2] mt-0.5" />
                        <div>
                          <h4 className="font-medium">New User Registration</h4>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications when new users register on the platform.
                          </p>
                        </div>
                      </div>
                      <Switch id="new-user-notification" defaultChecked />
                    </div>
                    <Separator className="bg-[#c2dacc]/50" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-3">
                        <Bell className="h-5 w-5 text-[#9bc3a2] mt-0.5" />
                        <div>
                          <h4 className="font-medium">New Provider Registration</h4>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications when new providers register on the platform.
                          </p>
                        </div>
                      </div>
                      <Switch id="new-provider-notification" defaultChecked />
                    </div>
                    <Separator className="bg-[#c2dacc]/50" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-3">
                        <Bell className="h-5 w-5 text-[#9bc3a2] mt-0.5" />
                        <div>
                          <h4 className="font-medium">Failed AI Calls</h4>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications when AI calls fail or receive low satisfaction ratings.
                          </p>
                        </div>
                      </div>
                      <Switch id="failed-call-notification" defaultChecked />
                    </div>
                    <Separator className="bg-[#c2dacc]/50" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-3">
                        <Bell className="h-5 w-5 text-[#9bc3a2] mt-0.5" />
                        <div>
                          <h4 className="font-medium">Contract Expiration</h4>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications when provider contracts are about to expire.
                          </p>
                        </div>
                      </div>
                      <Switch id="contract-expiration-notification" defaultChecked />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">System Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-3">
                        <Bell className="h-5 w-5 text-[#9bc3a2] mt-0.5" />
                        <div>
                          <h4 className="font-medium">System Updates</h4>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications about system updates and maintenance.
                          </p>
                        </div>
                      </div>
                      <Switch id="system-update-notification" defaultChecked />
                    </div>
                    <Separator className="bg-[#c2dacc]/50" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-3">
                        <Bell className="h-5 w-5 text-[#9bc3a2] mt-0.5" />
                        <div>
                          <h4 className="font-medium">Security Alerts</h4>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications about security events and suspicious activities.
                          </p>
                        </div>
                      </div>
                      <Switch id="security-alert-notification" defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notification-email">Notification Email</Label>
                  <Input
                    id="notification-email"
                    type="email"
                    defaultValue="admin@seniorcarecentral.com"
                    className="focus-visible:ring-[#9bc3a2]"
                  />
                  <p className="text-xs text-muted-foreground">All system notifications will be sent to this email.</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-[#9bc3a2] hover:bg-[#9bc3a2]/90">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="api" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-[#c2dacc]">
                <CardHeader>
                  <CardTitle>API Configuration</CardTitle>
                  <CardDescription>Configure API settings and endpoints</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-base-url">API Base URL</Label>
                    <Input
                      id="api-base-url"
                      defaultValue="https://api.seniorcarecentral.com/v1"
                      className="focus-visible:ring-[#9bc3a2]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="api-version">API Version</Label>
                    <Select defaultValue="v1">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select API version" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="v1">v1 (Current)</SelectItem>
                        <SelectItem value="v2">v2 (Beta)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Enable API Access</h3>
                      <p className="text-sm text-muted-foreground">Allow external applications to access the API.</p>
                    </div>
                    <Switch id="enable-api" defaultChecked />
                  </div>
                  <Separator className="bg-[#c2dacc]/50" />
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">API Documentation</h3>
                      <p className="text-sm text-muted-foreground">Make API documentation publicly accessible.</p>
                    </div>
                    <Switch id="api-docs" defaultChecked />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-[#9bc3a2] hover:bg-[#9bc3a2]/90">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-[#c2dacc]">
                <CardHeader>
                  <CardTitle>Webhooks</CardTitle>
                  <CardDescription>Configure webhook endpoints for event notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Enable Webhooks</h3>
                      <p className="text-sm text-muted-foreground">
                        Send event notifications to external applications via webhooks.
                      </p>
                    </div>
                    <Switch id="enable-webhooks" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="webhook-url">Webhook URL</Label>
                    <div className="flex items-center gap-2">
                      <Webhook className="h-4 w-4 text-muted-foreground" />
                      <Input
                        id="webhook-url"
                        placeholder="https://example.com/webhook"
                        className="focus-visible:ring-[#9bc3a2]"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Webhook Events</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="event-user-created"
                          className="border-[#9bc3a2] data-[state=checked]:bg-[#9bc3a2]"
                        />
                        <Label htmlFor="event-user-created">User Created</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="event-provider-created"
                          className="border-[#9bc3a2] data-[state=checked]:bg-[#9bc3a2]"
                        />
                        <Label htmlFor="event-provider-created">Provider Created</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="event-contract-signed"
                          className="border-[#9bc3a2] data-[state=checked]:bg-[#9bc3a2]"
                        />
                        <Label htmlFor="event-contract-signed">Contract Signed</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="event-payment-received"
                          className="border-[#9bc3a2] data-[state=checked]:bg-[#9bc3a2]"
                        />
                        <Label htmlFor="event-payment-received">Payment Received</Label>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="webhook-secret">Webhook Secret</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="webhook-secret"
                        type="password"
                        defaultValue="whsec_8KYb6hDaSWe4fUVE3LwEebZ7"
                        className="focus-visible:ring-[#9bc3a2]"
                      />
                      <Button variant="outline" size="icon" className="flex-shrink-0">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      This secret is used to verify webhook requests from our server.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-[#9bc3a2] hover:bg-[#9bc3a2]/90">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-[#c2dacc] md:col-span-2">
                <CardHeader>
                  <CardTitle>Database Configuration</CardTitle>
                  <CardDescription>Configure database connection settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="db-host">Database Host</Label>
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4 text-muted-foreground" />
                        <Input
                          id="db-host"
                          defaultValue="db.seniorcarecentral.com"
                          className="focus-visible:ring-[#9bc3a2]"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="db-port">Database Port</Label>
                      <Input id="db-port" defaultValue="5432" className="focus-visible:ring-[#9bc3a2]" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="db-name">Database Name</Label>
                      <Input id="db-name" defaultValue="seniorcarecentral" className="focus-visible:ring-[#9bc3a2]" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="db-user">Database User</Label>
                      <Input id="db-user" defaultValue="admin" className="focus-visible:ring-[#9bc3a2]" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="db-password">Database Password</Label>
                      <Input
                        id="db-password"
                        type="password"
                        defaultValue="********"
                        className="focus-visible:ring-[#9bc3a2]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="db-ssl">SSL Mode</Label>
                      <Select defaultValue="require">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select SSL mode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="disable">Disable</SelectItem>
                          <SelectItem value="allow">Allow</SelectItem>
                          <SelectItem value="prefer">Prefer</SelectItem>
                          <SelectItem value="require">Require</SelectItem>
                          <SelectItem value="verify-ca">Verify CA</SelectItem>
                          <SelectItem value="verify-full">Verify Full</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Connection Pooling</h3>
                      <p className="text-sm text-muted-foreground">Enable database connection pooling.</p>
                    </div>
                    <Switch id="connection-pooling" defaultChecked />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-[#9bc3a2] hover:bg-[#9bc3a2]/90">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="roles" className="mt-6">
            <Card className="border-[#c2dacc]">
              <CardHeader>
                <CardTitle>Roles & Permissions</CardTitle>
                <CardDescription>Manage user roles and access permissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">User Roles</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-[#9bc3a2] mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-medium">Super Admin</h4>
                        <p className="text-sm text-muted-foreground">
                          Full access to all system features and settings.
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          <Badge className="bg-[#9bc3a2]/20 text-[#9bc3a2] hover:bg-[#9bc3a2]/30">
                            All Permissions
                          </Badge>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="border-[#c2dacc]">
                        Edit
                      </Button>
                    </div>
                    <Separator className="bg-[#c2dacc]/50" />
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-[#9bc3a2] mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-medium">Admin</h4>
                        <p className="text-sm text-muted-foreground">
                          Access to most system features except critical settings.
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          <Badge className="bg-[#9bc3a2]/20 text-[#9bc3a2] hover:bg-[#9bc3a2]/30">
                            User Management
                          </Badge>
                          <Badge className="bg-[#9bc3a2]/20 text-[#9bc3a2] hover:bg-[#9bc3a2]/30">
                            Provider Management
                          </Badge>
                          <Badge className="bg-[#9bc3a2]/20 text-[#9bc3a2] hover:bg-[#9bc3a2]/30">
                            Contract Management
                          </Badge>
                          <Badge className="bg-[#9bc3a2]/20 text-[#9bc3a2] hover:bg-[#9bc3a2]/30">
                            Payment Management
                          </Badge>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="border-[#c2dacc]">
                        Edit
                      </Button>
                    </div>
                    <Separator className="bg-[#c2dacc]/50" />
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-[#9bc3a2] mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-medium">Provider Admin</h4>
                        <p className="text-sm text-muted-foreground">Access to provider-specific features and data.</p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          <Badge className="bg-[#9bc3a2]/20 text-[#9bc3a2] hover:bg-[#9bc3a2]/30">
                            Provider Profile
                          </Badge>
                          <Badge className="bg-[#9bc3a2]/20 text-[#9bc3a2] hover:bg-[#9bc3a2]/30">Provider Staff</Badge>
                          <Badge className="bg-[#9bc3a2]/20 text-[#9bc3a2] hover:bg-[#9bc3a2]/30">
                            Lead Management
                          </Badge>
                          <Badge className="bg-[#9bc3a2]/20 text-[#9bc3a2] hover:bg-[#9bc3a2]/30">
                            Contract Viewing
                          </Badge>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="border-[#c2dacc]">
                        Edit
                      </Button>
                    </div>
                    <Separator className="bg-[#c2dacc]/50" />
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-[#9bc3a2] mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-medium">Provider Staff</h4>
                        <p className="text-sm text-muted-foreground">Limited access to provider-specific features.</p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          <Badge className="bg-[#9bc3a2]/20 text-[#9bc3a2] hover:bg-[#9bc3a2]/30">Lead Viewing</Badge>
                          <Badge className="bg-[#9bc3a2]/20 text-[#9bc3a2] hover:bg-[#9bc3a2]/30">Lead Responses</Badge>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="border-[#c2dacc]">
                        Edit
                      </Button>
                    </div>
                    <Separator className="bg-[#c2dacc]/50" />
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-[#9bc3a2] mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-medium">Customer</h4>
                        <p className="text-sm text-muted-foreground">Access to customer-specific features.</p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          <Badge className="bg-[#9bc3a2]/20 text-[#9bc3a2] hover:bg-[#9bc3a2]/30">
                            Profile Management
                          </Badge>
                          <Badge className="bg-[#9bc3a2]/20 text-[#9bc3a2] hover:bg-[#9bc3a2]/30">AI Chat</Badge>
                          <Badge className="bg-[#9bc3a2]/20 text-[#9bc3a2] hover:bg-[#9bc3a2]/30">
                            Provider Viewing
                          </Badge>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="border-[#c2dacc]">
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" className="border-[#c2dacc]">
                    <Shield className="mr-2 h-4 w-4" />
                    Create New Role
                  </Button>
                  <Button className="bg-[#9bc3a2] hover:bg-[#9bc3a2]/90">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
