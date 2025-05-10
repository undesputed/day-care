import { Button } from "@/components/ui/button"
import ProviderCard from "@/components/ui/provider-card"

const providers = [
  {
    name: "A Place for Mom",
    description:
      "The largest senior living referral service in North America, helping families find the right senior care for their loved ones.",
    tags: ["Free Service", "Trusted Advisors", "North America"],
    image: "/abstract-geometric-apfm.png",
  },
  {
    name: "Senior Living Advisors",
    description:
      "Personalized guidance from experts who understand the local senior care landscape and available options.",
    tags: ["Local Experts", "Personalized Service", "Family Owned"],
    image: "/service-level-agreement.png",
  },
  {
    name: "Care Pathways",
    description:
      "Specialized in memory care and dementia support, offering tailored recommendations for cognitive care needs.",
    tags: ["Memory Care", "Dementia Specialists", "Nationwide"],
    image: "/abstract-geometric-shapes.png",
  },
]

export default function ProvidersList() {
  return (
    <div id="providers" className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet Our Partners</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We work with trusted providers across the country to ensure you find the best care options.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 sm:mt-20 lg:max-w-none lg:grid-cols-3 md:grid-cols-2">
          {providers.map((provider) => (
            <ProviderCard
              key={provider.name}
              name={provider.name}
              description={provider.description}
              tags={provider.tags}
              image={provider.image}
            />
          ))}
        </div>
        <div className="mt-16 text-center">
          <Button className="bg-[#9bc3a2] hover:bg-[#9bc3a2]/90">View All Providers</Button>
        </div>
      </div>
    </div>
  )
}
