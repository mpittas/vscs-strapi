import type { Metadata } from "next";
import BlogItem from "@/components/BlogItem";
import PageTitle from "@/components/ui/PageTitle";
import Section from "@/components/ui/Section";
import Pagination from "@/components/ui/Pagination";
import { getPaginatedData } from "@/lib/strapi";
import { getStrapiMedia } from "@/lib/media";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Блог",
  description:
    "Научете повече за слънчевата енергия, съвети за инвестиции и новини от SolarTech Solutions.",
};

interface BlogPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

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

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedSearchParams = await searchParams;
  const pageParam = resolvedSearchParams?.page;

  const currentPage =
    typeof pageParam === "string" ? parseInt(pageParam, 10) : 1;
  const pageSize = 6;

  let posts: any[] = [];
  let totalPages = 1;

  try {
    const { data, meta } = await getPaginatedData<BlogPost>(
      "blog-posts",
      currentPage,
      pageSize,
      ["strapi", "blog-posts"]
    );
    console.log("Strapi Posts Fetched:", data?.length);

    posts =
      data.map((post) => ({
        ...post,
        featuredImage: getStrapiMedia(post.featuredImage?.url),
      })) || [];

    totalPages = meta?.pagination?.pageCount || 1;
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

      <Section paddingY="sm" bgColor="white">
        {posts.length > 0 ? (
          <>
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

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              baseUrl="/blog"
              className="pt-8"
            />
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">
              Все още няма публикувани статии.
            </p>
          </div>
        )}
      </Section>
    </>
  );
}
