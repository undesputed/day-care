import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#d1eee4]" aria-labelledby="hero-heading">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-[#9bc3a2]/20 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-[#bdd8c0]/20">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect width="100%" height="100%" strokeWidth={0} fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl text-center">
          <h1 id="hero-heading" className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Find the Right Senior Care. All in One Place.
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We help families connect with trusted providers tailored to their needs. Our platform simplifies the process
            of finding quality care for your loved ones.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="#services">
              <Button className="bg-[#9bc3a2] hover:bg-[#9bc3a2]/90 text-lg px-6 py-6">Explore Services</Button>
            </Link>
            <Link href="#about">
              <Button
                variant="outline"
                className="border-[#9bc3a2] text-[#9bc3a2] hover:bg-[#9bc3a2]/10 text-lg px-6 py-6"
              >
                Learn More About Our Platform
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Structured data for the hero section */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Senior Care Referral Service",
            description: "We help families connect with trusted providers tailored to their needs.",
            provider: {
              "@type": "Organization",
              name: "SeniorCare Central",
            },
            serviceType: "Senior Care Referral",
            areaServed: {
              "@type": "Country",
              name: "United States",
            },
          }),
        }}
      />
    </section>
  )
}
