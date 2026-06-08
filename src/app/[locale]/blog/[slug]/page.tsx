import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPost, getBlogPosts, buildLocalePaths } from "@/lib/strapi";
import i18nConfig from "@/i18nConfig";
import { formatDate } from "@/lib/utils";
import { Heading } from "@/components/ui/Typography";
import Container from "@/components/ui/Container";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { markdownComponents } from "@/lib/markdownStyles";

import { ArrowLeft, Calendar } from "lucide-react";
import BadgeDefault from "@/components/ui/BadgeDefault";
import { TranslatedSlugProvider } from "@/components/TranslatedSlugProvider";
import { CTABanner } from "@/components/sections";
import ShareButtons from "@/components/ShareButtons";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

// Pre-render blog post pages at build time so navigation is instant (fully
// prefetched static routes) instead of a slow on-demand server render.
export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of i18nConfig.locales) {
    const posts = await getBlogPosts(locale);
    for (const post of posts) {
      if (post.slug) params.push({ locale, slug: post.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;

  const post = await getBlogPost(slug, locale);

  if (!post) {
    const { t } = await initTranslations(locale, ["blog"]);
    return { title: t("blog:details.error_not_found") };
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

export default async function BlogPostPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const { t, resources } = await initTranslations(locale, [
    "blog",
    "common",
    "home",
  ]);
  const post = await getBlogPost(slug, locale);

  if (!post) {
    notFound();
  }

  const localePaths = buildLocalePaths(post, "blog");

  return (
    <>
      <TranslatedSlugProvider paths={localePaths} />
      <TranslationsProvider
        locale={locale}
        resources={resources}
        namespaces={["blog", "common", "home"]}
      >
      {/* Hero Section */}
      <section className="bg-[#0a0f0a] relative pt-24 pb-32">
        <Container size="sm">
          <div className="max-w-4xl">
            {/* Back Button */}
            <div className="mb-12 flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center gap-6">
              <Link href="/blog" className="inline-block">
                <BadgeDefault
                  variant="outline-white"
                  uppercase
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t("blog:details.back_to_all")}
                </BadgeDefault>
              </Link>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4">
                <BadgeDefault variant="primary" size="sm" uppercase>
                  {post.category || t("blog:details.uncategorized")}
                </BadgeDefault>

                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <Calendar className="w-4 h-4" />
                  <time>{formatDate(post.publishedAt)}</time>
                </div>
              </div>
            </div>

            {/* Title */}
            <Heading as="h2" className="text-white">
              {post.title}
            </Heading>
          </div>
        </Container>
      </section>

      {/* Content Section with Image overlapping */}
      <section className="bg-[#f0f2f0] bg-neutral-100 pb-18">
        <Container size="sm">
          {/* Featured Image - Negative margin to overlap hero */}
          <div className="-mt-18 bg-white relative z-20 p-4 rounded-3xl">
            <div className="aspect-[21/9] relative rounded-2xl overflow-hidden mb-8">
              {post.featuredImage ? (
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
              ) : (
                <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                  <span className="text-lg">
                    {t("blog:details.no_feature_image")}
                  </span>
                </div>
              )}
            </div>

            <div className="px-6">
              {/* Prose content */}
              <div className="prose prose-lg max-w-none">
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw]}
                  components={markdownComponents}
                >
                  {post.content}
                </ReactMarkdown>
              </div>

              {/* Share & Footer */}
              <div className="mt-16 pt-8 border-t border-slate-200">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <span className="text-slate-900 font-normal">
                    {t("blog:details.share_article")}
                  </span>
                  <ShareButtons title={post.title} />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CTABanner />
      </TranslationsProvider>
    </>
  );
}
