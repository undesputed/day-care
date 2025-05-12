"use client"

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserPlus, Building } from "lucide-react"

const userActivityData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 700 },
  { name: "Jun", value: 900 },
  { name: "Jul", value: 1100 },
]

const providerData = [
  { name: "Assisted Living", value: 35 },
  { name: "Memory Care", value: 25 },
  { name: "Independent Living", value: 20 },
  { name: "Home Care", value: 15 },
  { name: "Nursing Homes", value: 5 },
]

const COLORS = ["#9bc3a2", "#b4d1be", "#c2dacc", "#d1eee4", "#e0f5eb"]

export default function ChartsDashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="border-[#c2dacc] lg:col-span-2">
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
          <CardDescription>Monthly revenue from provider contracts and referrals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userActivityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0f5eb" />
                <XAxis dataKey="name" stroke="#9bc3a2" />
                <YAxis stroke="#9bc3a2" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #c2dacc",
                  }}
                />
                <Line type="monotone" dataKey="value" stroke="#9bc3a2" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#c2dacc]">
        <CardHeader>
          <CardTitle>Provider Distribution</CardTitle>
          <CardDescription>Breakdown by care type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={providerData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {providerData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #c2dacc",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#c2dacc] md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle>Platform Activity</CardTitle>
          <CardDescription>User engagement metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="users">
            <TabsList className="bg-[#d1eee4]">
              <TabsTrigger
                value="users"
                className="data-[state=active]:bg-[#9bc3a2] data-[state=active]:text-white"
              >
                New Users
              </TabsTrigger>
              <TabsTrigger
                value="providers"
                className="data-[state=active]:bg-[#9bc3a2] data-[state=active]:text-white"
              >
                New Providers
              </TabsTrigger>
            </TabsList>
            <TabsContent value="users" className="mt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">128</p>
                  <p className="text-sm text-muted-foreground">New users this week</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-[#9bc3a2]/20 flex items-center justify-center">
                  <UserPlus className="h-6 w-6 text-[#9bc3a2]" />
                </div>
              </div>
              <div className="mt-4 h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={userActivityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0f5eb" />
                    <XAxis dataKey="name" stroke="#9bc3a2" />
                    <YAxis stroke="#9bc3a2" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #c2dacc",
                      }}
                    />
                    <Bar dataKey="value" fill="#9bc3a2" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            <TabsContent value="providers" className="mt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground">New providers this week</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-[#9bc3a2]/20 flex items-center justify-center">
                  <Building className="h-6 w-6 text-[#9bc3a2]" />
                </div>
              </div>
              <div className="mt-4 h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={userActivityData.slice(0, 5)} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0f5eb" />
                    <XAxis dataKey="name" stroke="#9bc3a2" />
                    <YAxis stroke="#9bc3a2" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #c2dacc",
                      }}
                    />
                    <Bar dataKey="value" fill="#b4d1be" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
} 