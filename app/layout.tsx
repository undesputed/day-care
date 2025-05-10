import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "SeniorCare Central | Find the Right Senior Care",
    template: "%s | SeniorCare Central",
  },
  description:
    "Connect with trusted senior care providers tailored to your needs. We help families find the perfect care solution for their loved ones.",
  keywords: [
    "senior care",
    "assisted living",
    "memory care",
    "elder care",
    "senior living",
    "nursing homes",
    "home care",
    "retirement communities",
  ],
  authors: [{ name: "SeniorCare Central" }],
  creator: "SeniorCare Central",
  publisher: "SeniorCare Central",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://seniorcarecentral.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SeniorCare Central | Find the Right Senior Care",
    description:
      "Connect with trusted senior care providers tailored to your needs. We help families find the perfect care solution for their loved ones.",
    url: "https://seniorcarecentral.com",
    siteName: "SeniorCare Central",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SeniorCare Central - Find the Right Senior Care",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SeniorCare Central | Find the Right Senior Care",
    description:
      "Connect with trusted senior care providers tailored to your needs. We help families find the perfect care solution for their loved ones.",
    images: ["/twitter-image.png"],
    creator: "@seniorcarecentral",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get theme from <html> for SSR fallback
  const theme = typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  return (
    <html lang="en" className={theme} style={{ colorScheme: theme }}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "SeniorCare Central",
              url: "https://seniorcarecentral.com",
              logo: "https://seniorcarecentral.com/logo.png",
              sameAs: [
                "https://facebook.com/seniorcarecentral",
                "https://twitter.com/seniorcarecentral",
                "https://linkedin.com/company/seniorcarecentral",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-800-555-1234",
                contactType: "customer service",
                areaServed: "US",
                availableLanguage: "English",
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: "123 Care Lane",
                addressLocality: "Seattle",
                addressRegion: "WA",
                postalCode: "98101",
                addressCountry: "US",
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
