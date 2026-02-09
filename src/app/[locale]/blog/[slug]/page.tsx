import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPost, getBlogPosts } from "@/lib/strapi";
import { formatDate, calculateReadingTime } from "@/lib/utils";
import { Heading } from "@/components/ui/Typography";
import Container from "@/components/ui/Container";

import { ArrowLeft, Calendar } from "lucide-react";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import BadgeDefault from "@/components/ui/BadgeDefault";
import type { IconType } from "react-icons";

interface ShareButtonProps {
  icon: IconType;
  label: string;
  onClick?: () => void;
}

function ShareButton({ icon: Icon, label, onClick }: ShareButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#b4d429] hover:text-[#0a0f0a] transition-all duration-300"
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}

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

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug, locale } = await params;

  const post = await getBlogPost(slug, locale);

  if (!post) {
    notFound();
  }

  const readingTime = calculateReadingTime(post.content);

  return (
    <>
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
              {/* Excerpt / Intro */}
              <div className="mb-12 border-l-4 border-[#b4d429] pl-6 py-2">
                <p className="text-xl md:text-xl font-serif italic text-slate-800 mb-0">
                  {post.excerpt}
                </p>
              </div>

              {/* Prose content */}
              <div>
                {post.content.split("\n").map((paragraph, index) => {
                  if (!paragraph.trim()) return null;

                  if (paragraph.startsWith("## ")) {
                    return (
                      <h2
                        key={index}
                        className="text-2xl md:text-3xl mt-12 mb-6"
                      >
                        {paragraph.replace("## ", "")}
                      </h2>
                    );
                  }

                  if (paragraph.startsWith("- ")) {
                    return (
                      <ul key={index} className="list-disc pl-5 mb-4">
                        <li className="text-slate-600">
                          {paragraph.replace("- ", "")}
                        </li>
                      </ul>
                    );
                  }

                  if (paragraph.match(/^\d+\.\s/)) {
                    // Handle numbered lists or just bold prefix
                    const parts = paragraph.split(":");
                    if (parts.length > 1) {
                      return (
                        <p key={index} className="mb-4">
                          <strong className="text-slate-800">
                            {parts[0]}:
                          </strong>
                          {parts.slice(1).join(":")}
                        </p>
                      );
                    }
                  }

                  return (
                    <p
                      key={index}
                      className="mb-6 text-slate-600 leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Share & Footer */}
              <div className="mt-16 pt-8 border-t border-slate-200">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <span className="text-slate-900 font-normal">
                    Сподели статията:
                  </span>
                  <div className="flex gap-2">
                    <ShareButton icon={FaFacebook} label="Share on Facebook" />
                    <ShareButton icon={FaLinkedin} label="Share on LinkedIn" />
                    <ShareButton
                      icon={FaInstagram}
                      label="Share on Instagram"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
