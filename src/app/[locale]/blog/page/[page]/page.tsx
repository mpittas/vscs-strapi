import { notFound } from "next/navigation";
import initTranslations from "@/app/i18n";
import i18nConfig from "@/i18nConfig";
import { getPaginatedData } from "@/lib/strapi";
import BlogListContent, { BLOG_PAGE_SIZE } from "../../BlogListContent";

interface PageProps {
  params: Promise<{ locale: string; page: string }>;
}

// Pre-render every pagination page at build time. Page 1 lives at /blog, so
// only pages 2..N are generated here.
export async function generateStaticParams() {
  const params: { locale: string; page: string }[] = [];
  for (const locale of i18nConfig.locales) {
    const { meta } = await getPaginatedData(
      "blog-posts",
      1,
      BLOG_PAGE_SIZE,
      ["strapi", "blog-posts"],
      locale,
    );
    const pageCount = meta?.pagination?.pageCount ?? 1;
    for (let page = 2; page <= pageCount; page++) {
      params.push({ locale, page: String(page) });
    }
  }
  return params;
}

export const generateMetadata = async ({ params }: PageProps) => {
  const { locale } = await params;
  const { t } = await initTranslations(locale, ["blog"]);

  return {
    title: t("blog:metadata.title"),
    description: t("blog:metadata.description"),
  };
};

export default async function BlogPaginatedPage({ params }: PageProps) {
  const { locale, page } = await params;
  const currentPage = Number(page);

  // Page 1 is served at /blog; reject non-numeric or out-of-range values.
  if (!Number.isInteger(currentPage) || currentPage < 2) {
    notFound();
  }

  return <BlogListContent locale={locale} currentPage={currentPage} />;
}
