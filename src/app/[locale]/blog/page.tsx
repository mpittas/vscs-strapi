import initTranslations from "@/app/i18n";
import BlogListContent from "./BlogListContent";

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

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

// No `searchParams` here: reading them would opt this route into dynamic
// (per-request) rendering. Pagination lives at /blog/page/[page] instead, so
// every blog listing page is statically generated and served from the CDN.
export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  return <BlogListContent locale={locale} currentPage={1} />;
}
