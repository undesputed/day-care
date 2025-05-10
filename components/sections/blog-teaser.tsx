import { Button } from "@/components/ui/button"
import BlogCard from "@/components/ui/blog-card"
import Link from "next/link"

const blogPosts = [
  {
    title: "10 Signs It's Time for Assisted Living",
    excerpt:
      "Recognizing when your loved one might benefit from additional support and care in an assisted living environment.",
    image: "/senior-couple-home.png",
    date: "May 2, 2025",
    readTime: "5 min read",
    slug: "signs-its-time-for-assisted-living",
    author: "Jennifer Wilson",
  },
  {
    title: "How to Talk to Parents About Senior Care",
    excerpt:
      "Navigating difficult conversations with aging parents about their future care needs with compassion and understanding.",
    image: "/family-discussion.png",
    date: "April 18, 2025",
    readTime: "7 min read",
    slug: "talking-to-parents-about-senior-care",
    author: "Michael Chen",
  },
  {
    title: "Navigating Dementia with Compassion",
    excerpt:
      "Practical strategies and emotional support for families caring for loved ones with dementia and memory challenges.",
    image: "/caregiver-with-senior.png",
    date: "April 5, 2025",
    readTime: "6 min read",
    slug: "navigating-dementia-with-compassion",
    author: "Sophia Rodriguez",
  },
]

export default function BlogTeaser() {
  return (
    <section id="blog" className="py-24 sm:py-32 bg-[#c2dacc]/20" aria-labelledby="blog-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="blog-heading" className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Senior Care Resources & Insights
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Helpful resources, tips, and insights for navigating senior care and supporting your loved ones.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 sm:mt-20 lg:max-w-none lg:grid-cols-3 md:grid-cols-2">
          {blogPosts.map((post) => (
            <BlogCard
              key={post.title}
              title={post.title}
              excerpt={post.excerpt}
              image={post.image}
              date={post.date}
              readTime={post.readTime}
              slug={post.slug}
            />
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link href="/blog">
            <Button className="bg-[#9bc3a2] hover:bg-[#9bc3a2]/90">Browse All Senior Care Articles</Button>
          </Link>
        </div>
      </div>

      {/* Structured data for blog posts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            headline: "Senior Care Resources & Insights",
            description:
              "Helpful resources, tips, and insights for navigating senior care and supporting your loved ones.",
            url: "https://seniorcarecentral.com/blog",
            blogPost: blogPosts.map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              description: post.excerpt,
              datePublished: new Date(post.date).toISOString(),
              author: {
                "@type": "Person",
                name: post.author,
              },
              publisher: {
                "@type": "Organization",
                name: "SeniorCare Central",
                logo: {
                  "@type": "ImageObject",
                  url: "https://seniorcarecentral.com/logo.png",
                },
              },
              image: `https://seniorcarecentral.com${post.image}`,
              url: `https://seniorcarecentral.com/blog/${post.slug}`,
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://seniorcarecentral.com/blog/${post.slug}`,
              },
            })),
          }),
        }}
      />
    </section>
  )
}
