import TestimonialCard from "@/components/ui/testimonial-card"

const testimonials = [
  {
    content:
      "We were overwhelmed until we found this platform. It saved us time and gave us peace of mind. The advisors truly understood our needs and found the perfect assisted living facility for my mother.",
    author: "Maria T.",
    role: "Daughter",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60&query=woman%20portrait",
  },
  {
    content:
      "The personalized recommendations were spot on. We were able to find a memory care facility that specialized in my father's specific needs. The transition was smooth, and he's now receiving excellent care.",
    author: "James L.",
    role: "Son",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60&query=man%20portrait",
  },
  {
    content:
      "As a long-distance caregiver, I was struggling to find appropriate care for my aunt. This platform connected me with local experts who helped me navigate the options and make informed decisions despite being miles away.",
    author: "Sarah K.",
    role: "Niece",
    rating: 4,
    image: "/placeholder.svg?height=60&width=60&query=woman%20portrait%202",
  },
]

export default function Testimonials() {
  return (
    <div className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">What Families Say</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Hear from families who have found the perfect care solution through our platform.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              content={testimonial.content}
              author={testimonial.author}
              role={testimonial.role}
              rating={testimonial.rating}
              image={testimonial.image}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
