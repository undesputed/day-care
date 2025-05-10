import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How much does the senior care referral service cost?",
    answer:
      "Our service is completely free for families. We are compensated by our partner providers when a placement is made, which allows us to offer our guidance and support at no cost to you.",
  },
  {
    question: "How do you select your senior care provider partners?",
    answer:
      "We have a rigorous vetting process for all provider partners. We evaluate their licensing status, inspection reports, staff-to-resident ratios, quality of care, and resident satisfaction. We only partner with providers who meet our high standards.",
  },
  {
    question: "What geographic areas do your senior care services cover?",
    answer:
      "We currently serve all 50 states in the US, with a network of local advisors who have deep knowledge of the senior care options in their regions.",
  },
  {
    question: "How long does the senior care placement process take?",
    answer:
      "The timeline varies based on your specific needs and urgency. We can provide recommendations within 24-48 hours of your initial consultation. For urgent situations, we can expedite the process and help you find immediate care options.",
  },
  {
    question: "Can you help with Medicaid or Medicare coverage for senior care?",
    answer:
      "Yes, our advisors are knowledgeable about Medicaid and Medicare coverage for different types of senior care. We can help you understand what may be covered and connect you with providers that accept these payment methods.",
  },
  {
    question: "What if we're not satisfied with the recommended senior care providers?",
    answer:
      "Your satisfaction is our priority. If you're not happy with the initial recommendations, we'll work with you to understand your concerns and provide alternative options until we find the right fit for your loved one.",
  },
]

export default function FAQs() {
  return (
    <section className="py-24 sm:py-32 bg-[#c2dacc]/20" aria-labelledby="faqs-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="faqs-heading" className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Frequently Asked Questions About Senior Care
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Find answers to common questions about our senior care referral services and senior care options.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-[#9bc3a2]/20">
                <AccordionTrigger className="text-left font-medium text-gray-900 hover:text-[#9bc3a2] hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* Structured data for FAQs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </section>
  )
}
