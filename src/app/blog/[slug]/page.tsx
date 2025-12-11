import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPost, getBlogPosts } from "@/lib/strapi";
import { formatDate, calculateReadingTime } from "@/lib/utils";
import Button from "@/components/ui/Button";

// Fallback blog posts for static generation
const fallbackPosts = [
  {
    id: 1,
    slug: "10-reasons-go-solar-2025",
    title: "10 Reasons Why 2025 Is the Best Year to Go Solar",
    excerpt: "With new tax incentives, improved technology, and rising electricity costs, there's never been a better time to switch to solar energy.",
    content: `
The solar industry has never been more accessible or affordable than it is right now. If you've been on the fence about making the switch to solar energy, here are 10 compelling reasons why 2025 is the year to take the plunge.

## 1. Federal Tax Credits at Their Peak

The federal Investment Tax Credit (ITC) offers homeowners a 30% tax credit on their solar installation costs. This is one of the most generous incentives in solar history, but it won't last forever.

## 2. Dramatically Improved Panel Efficiency

Modern solar panels are achieving efficiency rates of 22-23%, compared to just 15% a decade ago. This means you need fewer panels to generate the same amount of power.

## 3. Record-Low Installation Costs

The cost of solar installations has dropped by over 70% since 2010. What once cost $50,000 can now be achieved for under $15,000 after incentives.

## 4. Rising Electricity Rates

Utility rates continue to climb at an average of 3-5% annually. By going solar, you lock in your energy costs for 25+ years.

## 5. Battery Storage Revolution

Home battery systems like the Tesla Powerwall have made it possible to store solar energy for use at night or during outages.

## 6. Increased Home Value

Studies show that solar panels can increase your home's value by 4-6%. That's a significant return on investment if you decide to sell.

## 7. Energy Independence

With solar and battery storage, you're no longer at the mercy of utility companies or the grid. Generate and use your own clean power.

## 8. Environmental Impact

The average residential solar system offsets about 100,000 pounds of carbon dioxide over its lifetime—equivalent to planting 2,500 trees.

## 9. Smart Home Integration

Modern solar systems integrate seamlessly with smart home technology, allowing you to monitor and optimize your energy usage from your phone.

## 10. Financing Options

With $0-down financing, power purchase agreements (PPAs), and solar leases, there's an option for every budget.

## Ready to Get Started?

Contact SolarTech Solutions today for a free consultation and discover how much you could save by going solar in 2025.
    `,
    author: "Sarah Martinez",
    publishedAt: "2025-12-10T10:00:00.000Z",
    featuredImage: null,
  },
  {
    id: 2,
    slug: "understanding-solar-panel-efficiency",
    title: "Understanding Solar Panel Efficiency: What You Need to Know",
    excerpt: "Not all solar panels are created equal. Learn how to evaluate panel efficiency ratings.",
    content: `
When shopping for solar panels, you'll encounter a lot of numbers and specifications. One of the most important metrics to understand is panel efficiency. Here's your complete guide.

## What Is Solar Panel Efficiency?

Solar panel efficiency refers to how much of the sunlight hitting a panel is converted into usable electricity. A panel with 20% efficiency converts 20% of the solar energy it receives into electrical power.

## Why Efficiency Matters

Higher efficiency panels produce more power in the same amount of space. This is particularly important if you have limited roof space or want to maximize your energy production.

## Current Efficiency Standards

- **Standard Panels**: 17-19% efficiency
- **Premium Panels**: 20-22% efficiency
- **High-End Panels**: 22-23% efficiency (like SunPower and Maxeon)

## Factors Affecting Real-World Efficiency

1. **Temperature**: Panels lose efficiency in extreme heat
2. **Shading**: Even partial shade significantly reduces output
3. **Orientation**: South-facing panels in the Northern Hemisphere perform best
4. **Tilt Angle**: Optimal angles vary by latitude

## Cost vs. Efficiency Trade-off

Higher efficiency panels cost more upfront but may be worth it if:
- You have limited roof space
- You want maximum energy production
- You're planning to add an EV or heat pump

## Our Recommendation

For most homeowners, mid-range efficiency panels (19-21%) offer the best balance of performance and value. Our experts can help you determine the right choice for your specific situation.
    `,
    author: "David Chen",
    publishedAt: "2025-12-08T10:00:00.000Z",
    featuredImage: null,
  },
];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  let post;
  try {
    post = await getBlogPost(slug);
  } catch {
    post = fallbackPosts.find((p) => p.slug === slug);
  }
  
  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
  };
}

export async function generateStaticParams() {
  try {
    const posts = await getBlogPosts();
    if (posts.length > 0) {
      return posts.map((post) => ({ slug: post.slug }));
    }
  } catch {
    // Fall through to fallback
  }
  
  return fallbackPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  
  let post;
  try {
    post = await getBlogPost(slug);
    if (!post) {
      post = fallbackPosts.find((p) => p.slug === slug);
    }
  } catch {
    post = fallbackPosts.find((p) => p.slug === slug);
  }

  if (!post) {
    notFound();
  }

  const readingTime = calculateReadingTime(post.content);

  return (
    <>
      {/* Hero Section */}
      <section className="gradient-hero pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-solar-orange/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-solar-orange hover:text-solar-amber transition-colors mb-6"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-center gap-6 text-slate-300">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full gradient-solar flex items-center justify-center text-white font-bold">
                  {post.author.charAt(0)}
                </div>
                <span>{post.author}</span>
              </div>
              <span>•</span>
              <time>{formatDate(post.publishedAt)}</time>
              <span>•</span>
              <span>{readingTime} min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.featuredImage && (
        <section className="container -mt-10 relative z-20">
          <div className="aspect-video rounded-2xl overflow-hidden">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </section>
      )}

      {/* Article Content */}
      <article className="section bg-white dark:bg-slate-900">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Prose content */}
            <div className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-p:text-muted prose-p:leading-relaxed prose-strong:text-foreground prose-ul:text-muted prose-li:text-muted max-w-none">
              {post.content.split('\n').map((paragraph, index) => {
                if (!paragraph.trim()) return null;
                
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-2xl font-bold mt-12 mb-4">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                
                if (paragraph.startsWith('- ')) {
                  return (
                    <li key={index} className="text-muted">
                      {paragraph.replace('- ', '')}
                    </li>
                  );
                }
                
                if (paragraph.match(/^\d+\.\s/)) {
                  return (
                    <p key={index} className="text-muted leading-relaxed">
                      <strong>{paragraph.split(':')[0]}:</strong>
                      {paragraph.split(':').slice(1).join(':')}
                    </p>
                  );
                }
                
                return (
                  <p key={index} className="text-muted leading-relaxed mb-4">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Author Bio */}
            <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full gradient-solar flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm text-muted mb-1">Written by</p>
                  <p className="text-xl font-bold mb-2">{post.author}</p>
                  <p className="text-muted">
                    Solar energy expert at SolarTech Solutions with years of experience 
                    helping homeowners and businesses transition to clean energy.
                  </p>
                </div>
              </div>
            </div>

            {/* Share & CTA */}
            <div className="mt-12 p-8 rounded-2xl bg-slate-50 dark:bg-slate-800">
              <h3 className="text-xl font-bold mb-4 text-center">
                Ready to Start Your Solar Journey?
              </h3>
              <p className="text-muted text-center mb-6">
                Get a free quote and see how much you could save with solar.
              </p>
              <div className="flex justify-center gap-4">
                <Button href="/contact">Get Free Quote</Button>
                <Button href="/blog" variant="outline">Read More Articles</Button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
