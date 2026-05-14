import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPost, buildLocalePaths } from "@/lib/strapi";
import { formatDate, calculateReadingTime } from "@/lib/utils";
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

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;

  const post = await getBlogPost(slug, locale);

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

export default async function BlogPostPage({ params }: PageProps) {
  const { slug, locale } = await params;

  const post = await getBlogPost(slug, locale);

  if (!post) {
    notFound();
  }

  const readingTime = calculateReadingTime(post.content);
  const localePaths = buildLocalePaths(post, "blog");

  return (
    <>
      <TranslatedSlugProvider paths={localePaths} />
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
                  Всички статии
                </BadgeDefault>
              </Link>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4">
                <BadgeDefault variant="primary" size="sm" uppercase>
                  {post.category || "Uncategorized"}
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
                  <span className="text-lg">No Feature Image</span>
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
                    Сподели статията:
                  </span>
                  <ShareButtons title={post.title} />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
