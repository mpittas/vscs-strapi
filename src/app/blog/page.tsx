import type { Metadata } from "next";
import BlogCard from "@/components/BlogCard";
import Button from "@/components/ui/Button";
import { getBlogPosts } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Stay informed about solar energy trends, tips for maximizing your solar investment, and the latest news from SolarTech Solutions.",
};

// Fallback blog posts when Strapi is not available
const fallbackPosts = [
  {
    id: 1,
    title: "10 Reasons Why 2025 Is the Best Year to Go Solar",
    slug: "10-reasons-go-solar-2025",
    excerpt: "With new tax incentives, improved technology, and rising electricity costs, there's never been a better time to switch to solar energy. Discover why smart homeowners are making the switch now.",
    author: "Sarah Martinez",
    publishedAt: "2025-12-10T10:00:00.000Z",
    featuredImage: null,
  },
  {
    id: 2,
    title: "Understanding Solar Panel Efficiency: What You Need to Know",
    slug: "understanding-solar-panel-efficiency",
    excerpt: "Not all solar panels are created equal. Learn how to evaluate panel efficiency ratings and what they mean for your energy production and savings over time.",
    author: "David Chen",
    publishedAt: "2025-12-08T10:00:00.000Z",
    featuredImage: null,
  },
  {
    id: 3,
    title: "How Battery Storage Is Revolutionizing Home Solar",
    slug: "battery-storage-revolutionizing-home-solar",
    excerpt: "Solar batteries have changed the game for homeowners. Discover how adding battery storage to your solar system can maximize savings and provide energy independence.",
    author: "Michael Thompson",
    publishedAt: "2025-12-05T10:00:00.000Z",
    featuredImage: null,
  },
  {
    id: 4,
    title: "The Complete Guide to Solar Tax Credits in 2025",
    slug: "complete-guide-solar-tax-credits-2025",
    excerpt: "Federal and state tax incentives can significantly reduce your solar installation costs. Here's everything you need to know about claiming your solar tax credits.",
    author: "Emily Rodriguez",
    publishedAt: "2025-12-01T10:00:00.000Z",
    featuredImage: null,
  },
  {
    id: 5,
    title: "Commercial Solar: ROI Analysis for Business Owners",
    slug: "commercial-solar-roi-analysis",
    excerpt: "Thinking about solar for your business? We break down the numbers, timeline, and real-world returns you can expect from a commercial solar installation.",
    author: "David Chen",
    publishedAt: "2025-11-28T10:00:00.000Z",
    featuredImage: null,
  },
  {
    id: 6,
    title: "Solar Maintenance 101: Keeping Your System at Peak Performance",
    slug: "solar-maintenance-101",
    excerpt: "Solar panels are low-maintenance, but not no-maintenance. Learn the essential tips for keeping your solar system running at maximum efficiency for decades.",
    author: "Sarah Martinez",
    publishedAt: "2025-11-25T10:00:00.000Z",
    featuredImage: null,
  },
];

export default async function BlogPage() {
  // Try to fetch from Strapi, fall back to static data
  let posts;
  try {
    const strapiPosts = await getBlogPosts();
    posts = strapiPosts.length > 0 ? strapiPosts : fallbackPosts;
  } catch {
    posts = fallbackPosts;
  }

  return (
    <>
      {/* Hero Section */}
      <section className="gradient-hero pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-solar-orange/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-blue/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-solar-orange/10 border border-solar-orange/20 text-solar-orange text-sm font-medium mb-6">
              SolarTech Blog
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Solar Energy{" "}
              <span className="text-gradient-solar">Insights & News</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl">
              Stay informed about the latest in solar technology, industry trends, 
              and tips to maximize your solar investment.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {posts.length > 0 && (
        <section className="section bg-white dark:bg-slate-900">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="aspect-video rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
                {posts[0].featuredImage ? (
                  <img
                    src={posts[0].featuredImage}
                    alt={posts[0].title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center gradient-solar">
                    <svg className="w-32 h-32 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                )}
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 rounded-full bg-solar-orange text-white text-sm font-medium">
                    Featured
                  </span>
                </div>
              </div>
              
              <div>
                <span className="text-solar-orange font-medium">Latest Article</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
                  {posts[0].title}
                </h2>
                <p className="text-lg text-muted mb-6">
                  {posts[0].excerpt}
                </p>
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full gradient-solar flex items-center justify-center text-white font-bold">
                      {posts[0].author.charAt(0)}
                    </div>
                    <span className="text-muted">{posts[0].author}</span>
                  </div>
                  <span className="text-muted">•</span>
                  <time className="text-muted">
                    {new Date(posts[0].publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
                <Button href={`/blog/${posts[0].slug}`}>
                  Read Article
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="section bg-slate-50 dark:bg-slate-800/50">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">All Articles</h2>
            <div className="text-muted">{posts.length} articles</div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section bg-white dark:bg-slate-900">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="section-title mb-4">Stay Updated</h2>
            <p className="text-muted mb-8">
              Subscribe to our newsletter for the latest solar news, tips, and exclusive offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-solar-orange"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
