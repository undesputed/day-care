import Header from "@/components/layout/header"
import Hero from "@/components/sections/hero"
import HowItWorks from "@/components/sections/how-it-works"
import ServicesOverview from "@/components/sections/services-overview"
import ProvidersList from "@/components/sections/providers-list"
import BlogTeaser from "@/components/sections/blog-teaser"
import CaregivingSupport from "@/components/sections/caregiving-support"
import SeniorProducts from "@/components/sections/senior-products"
import Testimonials from "@/components/sections/testimonials"
import FAQs from "@/components/sections/faqs"
import AboutUs from "@/components/sections/about-us"
import Contact from "@/components/sections/contact"
import Footer from "@/components/layout/footer"
import ChatbotButton from "@/components/ui/chatbot-button"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#d1eee4]/30">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <ServicesOverview />
        <ProvidersList />
        <BlogTeaser />
        <CaregivingSupport />
        <SeniorProducts />
        <Testimonials />
        <FAQs />
        <AboutUs />
        <Contact />
      </main>
      <Footer />
      <ChatbotButton />
    </div>
  )
}
