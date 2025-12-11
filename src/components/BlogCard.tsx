import Link from "next/link";
import { formatDate } from "@/lib/utils";

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
    <Link href={`/blog/${post.slug}`} className="group">
      <article className="card h-full flex flex-col">
        {/* Image */}
        <div className="aspect-video rounded-lg bg-slate-100 dark:bg-slate-800 mb-6 overflow-hidden relative">
          {post.featuredImage ? (
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center gradient-solar">
              <svg className="w-16 h-16 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          )}
          {/* Category tag */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full bg-solar-orange/90 text-white text-xs font-medium">
              Solar News
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <h2 className="text-xl font-bold mb-3 group-hover:text-solar-orange transition-colors line-clamp-2">
            {post.title}
          </h2>
          
          <p className="text-muted mb-4 line-clamp-3 flex-1">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full gradient-solar flex items-center justify-center text-white text-xs font-bold">
                {post.author.charAt(0)}
              </div>
              <span className="text-sm text-muted">{post.author}</span>
            </div>
            <time className="text-sm text-muted">
              {formatDate(post.publishedAt)}
            </time>
          </div>
        </div>
      </article>
    </Link>
  );
}
