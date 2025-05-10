import { Building2, Brain, Home, Building, Heart, Hospital, UserRound, Workflow } from "lucide-react"
import ServiceCard from "@/components/ui/service-card"

const services = [
  {
    title: "Assisted Living",
    description:
      "Residential care that provides personal care support, meals, and housekeeping while promoting independence.",
    icon: Building2,
    slug: "assisted-living",
  },
  {
    title: "Memory Care",
    description:
      "Specialized care for those with Alzheimer's, dementia, and other memory impairments in a secure environment.",
    icon: Brain,
    slug: "memory-care",
  },
  {
    title: "Independent Living",
    description: "Housing designed for seniors who can still live independently but desire community and amenities.",
    icon: Home,
    slug: "independent-living",
  },
  {
    title: "Senior Living",
    description: "Age-restricted communities offering various levels of care and social activities for older adults.",
    icon: Building,
    slug: "senior-living",
  },
  {
    title: "Senior Care",
    description: "A range of services designed to help seniors with daily activities and medical needs.",
    icon: Heart,
    slug: "senior-care",
  },
  {
    title: "Nursing Homes",
    description: "Facilities providing 24-hour skilled nursing care for those with complex medical needs.",
    icon: Hospital,
    slug: "nursing-homes",
  },
  {
    title: "Home Care",
    description: "Professional caregiving services provided in the comfort of one's own home.",
    icon: UserRound,
    slug: "home-care",
  },
  {
    title: "Continuing Care Retirement",
    description: "Communities offering multiple levels of care that adapt as residents' needs change over time.",
    icon: Workflow,
    slug: "continuing-care-retirement",
  },
]

export default function ServicesOverview() {
  return (
    <section id="services" className="py-24 sm:py-32 bg-[#c2dacc]/20" aria-labelledby="services-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="services-heading" className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Senior Care Services
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We connect families with a wide range of senior care options to meet every need and preference.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:max-w-none lg:grid-cols-4 md:grid-cols-2">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              icon={service.icon}
              slug={service.slug}
            />
          ))}
        </div>
      </div>

      {/* Structured data for services */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: services.map((service, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Service",
                name: service.title,
                description: service.description,
                url: `https://seniorcarecentral.com/services/${service.slug}`,
                provider: {
                  "@type": "Organization",
                  name: "SeniorCare Central",
                },
              },
            })),
          }),
        }}
      />
    </section>
  )
}
