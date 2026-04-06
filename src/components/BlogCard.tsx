import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Heading, Text } from "@/components/ui/Typography";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  featuredImage?: string | null;
}

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group h-full block">
      <article className="h-full flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
        {/* Image */}
        <div className="aspect-[16/10] bg-slate-100 relative overflow-hidden">
          {post.featuredImage ? (
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-100">
              <svg
                className="w-12 h-12 text-slate-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
          {/* Category tag */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold shadow-sm">
              Solar News
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium text-brand-green uppercase tracking-wide">
              {formatDate(post.publishedAt)}
            </span>
            <span className="text-slate-300 text-xs">•</span>
            <span className="text-xs text-slate-500">{post.author}</span>
          </div>

          <Heading
            as="h3"
            className="text-xl mb-3 group-hover:text-brand-green transition-colors line-clamp-2"
          >
            {post.title}
          </Heading>

          <Text className="text-slate-700 text-sm mb-4 line-clamp-3 flex-1">
            {post.excerpt}
          </Text>

          <div className="pt-4 mt-auto border-t border-slate-100 flex items-center justify-between">
            <span className="text-sm font-bold text-slate-900 group-hover:text-brand-green transition-colors flex items-center gap-2">
              Прочети повече
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
