import type { Metadata } from "next";
import BlogItem from "@/components/BlogItem";
import PageTitle from "@/components/ui/PageTitle";
import Section from "@/components/ui/Section";
import Pagination from "@/components/ui/Pagination";
import { getPaginatedData } from "@/lib/strapi";
import { getStrapiMedia } from "@/lib/media";
import { formatDate } from "@/lib/utils";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  const { t } = await initTranslations(locale, ["blog"]);

  return {
    title: t("blog:metadata.title"),
    description: t("blog:metadata.description"),
  };
};

export const dynamic = "force-dynamic";

interface BlogPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BlogPage({
  params,
  searchParams,
}: BlogPageProps) {
  const { locale } = await params;
  const { t, resources } = await initTranslations(locale, ["blog", "common"]);
  const resolvedSearchParams = await searchParams;
  const pageParam = resolvedSearchParams?.page;

  const currentPage =
    typeof pageParam === "string" ? parseInt(pageParam, 10) : 1;
  const pageSize = 6;

  let posts: any[] = [];
  let totalPages = 1;

  try {
    const { data, meta } = await getPaginatedData(
      "blog-posts",
      currentPage,
      pageSize,
      ["strapi", "blog-posts"],
      locale,
    );
    console.log("Strapi Posts Fetched:", data?.length);

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
