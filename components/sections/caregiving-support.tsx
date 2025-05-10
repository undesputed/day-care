import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BookOpen } from "lucide-react"

export default function CaregivingSupport() {
  return (
    <div className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Caregiving Support and Tips</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Resources and guidance to help you provide the best care for your loved ones.
          </p>
        </div>

        <div className="mt-16 mx-auto max-w-5xl">
          <Card className="overflow-hidden border-[#9bc3a2]/20">
            <div className="grid md:grid-cols-2">
              <div className="h-64 md:h-auto bg-[#bdd8c0] relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen className="h-24 w-24 text-white/70" />
                </div>
              </div>
              <div>
                <CardHeader>
                  <CardTitle className="text-2xl">Featured Article</CardTitle>
                  <CardDescription>Expert guidance for caregivers</CardDescription>
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-semibold mb-3">How to Choose a Memory Care Facility</h3>
                  <p className="text-gray-600">
                    Memory care facilities provide specialized care for individuals with Alzheimer's, dementia, and
                    other memory impairments. This guide walks you through the essential factors to consider when
                    selecting the right facility for your loved one.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="bg-[#9bc3a2] hover:bg-[#9bc3a2]/90 group">
                    Read Full Article
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardFooter>
              </div>
            </div>
          </Card>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Understanding Medicare Coverage", "Self-Care for Caregivers", "Managing Medication Schedules"].map(
              (title) => (
                <Card key={title} className="border-[#9bc3a2]/20">
                  <CardHeader>
                    <CardTitle className="text-lg">{title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">
                      Essential information and practical tips to help you navigate this important aspect of caregiving.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="ghost"
                      className="text-[#9bc3a2] hover:text-[#9bc3a2]/90 hover:bg-[#9bc3a2]/10 p-0 h-auto group"
                    >
                      Learn more
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardFooter>
                </Card>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
