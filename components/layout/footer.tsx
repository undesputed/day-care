import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Facebook, Twitter, Linkedin } from "lucide-react"

const footerLinks = [
  {
    section: "Company",
    links: [
      { name: "About Us", href: "#" },
      { name: "Our Team", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#" },
    ],
  },
  {
    section: "Resources",
    links: [
      { name: "Blog", href: "#" },
      { name: "Guides", href: "#" },
      { name: "FAQ", href: "#" },
      { name: "Support", href: "#" },
    ],
  },
  {
    section: "Legal",
    links: [
      { name: "Terms of Service", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "Accessibility", href: "#" },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-[#c2dacc]/30 border-t border-[#9bc3a2]/20">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="space-y-8 md:w-1/3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-[#9bc3a2] flex items-center justify-center">
              <span className="font-bold text-white">SC</span>
            </div>
            <span className="font-semibold text-lg text-gray-900">SeniorCare Central</span>
          </div>
          <p className="text-sm text-gray-600">
            Connecting families with trusted senior care providers since 2020. Our mission is to make finding the right
            care simple and stress-free.
          </p>
          <div className="flex space-x-6">
            <Link href="#" className="text-gray-500 hover:text-[#9bc3a2]">
              <span className="sr-only">Facebook</span>
              <Facebook className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-gray-500 hover:text-[#9bc3a2]">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-gray-500 hover:text-[#9bc3a2]">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-6 w-6" />
            </Link>
          </div>
        </div>

        <div className="mt-10 md:mt-0 md:w-2/3">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
            {footerLinks.map((section) => (
              <div key={section.section}>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">{section.section}</h3>
                <ul role="list" className="mt-4 space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-sm text-gray-600 hover:text-[#9bc3a2]">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Separator className="bg-[#9bc3a2]/10" />

      <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="md:w-1/2">
            <p className="text-sm text-gray-500">Subscribe to our newsletter</p>
            <div className="mt-2 flex max-w-md">
              <Input
                type="email"
                placeholder="Enter your email"
                className="rounded-r-none border-r-0 focus-visible:ring-[#9bc3a2]"
              />
              <Button className="rounded-l-none bg-[#9bc3a2] hover:bg-[#9bc3a2]/90">Subscribe</Button>
            </div>
          </div>
          <p className="mt-8 text-xs text-gray-500 md:mt-0">
            &copy; {new Date().getFullYear()} SeniorCare Central. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
