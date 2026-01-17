import type { Metadata } from "next";
import BlogItem from "@/components/BlogItem";
import PageTitle from "@/components/ui/PageTitle";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { getBlogPosts } from "@/lib/strapi";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Блог",
  description:
    "Научете повече за слънчевата енергия, съвети за инвестиции и новини от SolarTech Solutions.",
};

// Fallback blog posts removed

export default async function BlogPage() {
  let posts: any[] = [];
  try {
    const strapiPosts = await getBlogPosts();
    console.log("Strapi Posts Fetched:", strapiPosts?.length);
    posts = strapiPosts || [];
  } catch (error) {
    console.error("Failed to fetch posts in BlogPage:", error);
    posts = [];
  }

  return (
    <>
      <PageTitle
        title="Блог"
        breadcrumbs={[{ label: "НАЧАЛО", href: "/" }, { label: "БЛОГ" }]}
      />

      <Section paddingY="xl" bgColor="white">
        <Container>
          {posts.length > 0 ? (
            <div className="flex flex-col divide-y divide-slate-200">
              {posts.map((post) => (
                <BlogItem
                  key={post.id}
                  post={{
                    id: post.id,
                    title: post.title,
                    excerpt: post.excerpt,
                    image: post.featuredImage || "/images/blog-img-1.jpg",
                    date: formatDate(post.publishedAt),
                    readTime: "5 минути", // Placeholder as it's not in the source data
                    slug: post.slug,
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">
                Все още няма публикувани статии.
              </p>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
