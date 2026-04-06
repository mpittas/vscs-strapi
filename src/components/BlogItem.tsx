import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { Heading, Text } from "@/components/ui/Typography";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";
import { truncateText } from "@/lib/utils";

interface BlogItemProps {
  post: {
    id: number;
    title: string;
    excerpt: string;
    image: string;
    date: string;
    readTime: string;
    slug: string;
  };
}

export default function BlogItem({ post }: BlogItemProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group py-12 block hover:bg-neutral-200"
    >
      <Container>
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:gap-12">
          {/* Left Column - Meta */}
          <div className="order-2 lg:order-1 lg:col-span-2">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <Text variant="body-14">{post.date}</Text>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <Text variant="body-14">{post.readTime}</Text>
              </div>
            </div>
          </div>

          {/* Middle Column - Content */}
          <div className="order-3 lg:order-2 lg:col-span-6 lg:pr-8">
            <Heading as="h3" className="mb-3">
              {post.title}
            </Heading>
            <Text variant="body-16" className="text-slate-900">
              {truncateText(post.excerpt, 140)}
            </Text>
          </div>

          {/* Image Column - First on mobile, last on desktop */}
          <div className="order-1 lg:order-3 flex lg:col-span-4 justify-start lg:justify-end">
            <div className="relative h-[140px] w-full lg:h-[150px]">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 rounded-full"
              />
              {/* Arrow Button Overlay */}
              <div className="absolute top-1/2 -translate-y-1/2 left-3 lg:-left-5 w-14 h-14 rounded-full bg-brand-green flex items-center justify-center transition-transform">
                <ArrowUpRight className="w-5 h-5 text-dark-green" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Link>
  );
}
