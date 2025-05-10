import { Search, Users, HeartHandshake } from "lucide-react"

const steps = [
  {
    name: "Consultation",
    description:
      "Share your needs and preferences with our expert advisors who understand the complexities of senior care.",
    icon: Search,
  },
  {
    name: "Personalized Matches",
    description: "Receive a curated list of providers that match your specific requirements, location, and budget.",
    icon: Users,
  },
  {
    name: "Ongoing Support",
    description: "Get continuous guidance throughout your decision-making process and transition to care.",
    icon: HeartHandshake,
  },
]

export default function HowItWorks() {
  return (
    <div className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">How It Works</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our simple 3-step process helps you find the perfect care solution for your loved ones.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#b4d1be]">
                    <step.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <span className="text-xl">
                    Step {index + 1}: {step.name}
                  </span>
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{step.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
