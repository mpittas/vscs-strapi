import {
  Hero,
  ClientLogos,
  WhyUs,
  AboutUs,
  OurServices,
  ProjectsOverview,
  BlogOverview,
  Marquee,
  CTABanner,
} from "@/components/sections";
import { getPaginatedData } from "@/lib/strapi";
import { formatDate } from "@/lib/utils";

interface BlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  featuredImage?: {
    url: string;
    alternativeText?: string;
  };
}

export default async function HomePage() {
  let posts: any[] = [];

  try {
    const { data } = await getPaginatedData<BlogPost>(
      "blog-posts",
      1,
      3, // Limit to 3 items
      ["strapi", "blog-posts"]
    );

    posts =
      data.map((post) => ({
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        image: post.featuredImage?.url
          ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"}${post.featuredImage.url}`
          : "/images/blog-img-1.jpg",
        date: formatDate(post.publishedAt),
        readTime: "5 минути", // Placeholder
        slug: post.slug,
      })) || [];
  } catch (error) {
    console.error("Failed to fetch posts in HomePage:", error);
    posts = [];
  }

  return (
    <>
      <Hero />
      <ClientLogos />
      <AboutUs />
      <OurServices />
      <ProjectsOverview />
      <WhyUs />
      <BlogOverview posts={posts} />
      <Marquee />
      <CTABanner />
    </>
  );
}
