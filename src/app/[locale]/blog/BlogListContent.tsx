import BlogItem from "@/components/BlogItem";
import PageTitle from "@/components/ui/PageTitle";
import Section from "@/components/ui/Section";
import Pagination from "@/components/ui/Pagination";
import { getPaginatedData } from "@/lib/strapi";
import { getStrapiMedia } from "@/lib/media";
import { formatDate } from "@/lib/utils";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";

export const BLOG_PAGE_SIZE = 6;

interface BlogListContentProps {
  locale: string;
  currentPage: number;
}

export default async function BlogListContent({
  locale,
  currentPage,
}: BlogListContentProps) {
  const { t, resources } = await initTranslations(locale, ["blog", "common"]);

  let posts: any[] = [];
  let totalPages = 1;

  try {
    const { data, meta } = await getPaginatedData(
      "blog-posts",
      currentPage,
      BLOG_PAGE_SIZE,
      ["strapi", "blog-posts"],
      locale,
    );

    posts =
      data.map((post: any) => ({
        ...post,
        featuredImage: getStrapiMedia(post.featuredImage?.url),
      })) || [];

    totalPages = meta?.pagination?.pageCount || 1;
  } catch (error) {
    console.error("Failed to fetch posts in BlogPage:", error);
    posts = [];
  }

  return (
    <TranslationsProvider
      locale={locale}
      resources={resources}
      namespaces={["blog", "common"]}
    >
      <PageTitle
        title={t("blog:page_title")}
        breadcrumbs={[
          { label: t("common:nav.home"), href: "/" },
          { label: t("blog:breadcrumbs.blog") },
        ]}
      />

      <Section paddingY="sm" bgColor="white">
        {posts.length > 0 ? (
          <>
            <div data-reveal-group="" className="flex flex-col divide-y divide-slate-200">
              {posts.map((post) => (
                <BlogItem
                  key={post.id}
                  post={{
                    id: post.id,
                    title: post.title,
                    excerpt: post.excerpt,
                    content: post.content,
                    image: post.featuredImage || "/images/blog-img-1.jpg",
                    date: formatDate(post.publishedAt),
                    readTime: t("blog:posts.read_time", { count: 5 }), // Placeholder
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
            <p className="text-slate-500 text-lg">{t("blog:posts.no_posts")}</p>
          </div>
        )}
      </Section>
    </TranslationsProvider>
  );
}
