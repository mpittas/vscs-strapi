import Link from "next/link";
import { Heading } from "@/components/ui/Typography";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { ArrowRight } from "lucide-react";
import BlogItem from "@/components/BlogItem";

// Static blog posts data removed

interface BlogOverviewProps {
  posts: any[];
}

export default function BlogOverview({ posts = [] }: BlogOverviewProps) {
  return (
    <Section paddingY="xl" bgColor="light">
      <Container>
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start justify-between mb-12">
          {/* Title */}
          <Heading as="h2" className="max-w-xl mb-6 lg:mb-0">
            Бъдете в <span className="text-brand-green">час с новините</span>
            <br />
            свързани със соларните
            <br />
            панели в сайта
          </Heading>

          {/* View All Link */}
          <Link
            href="/blog"
            className="flex items-center gap-2 text-dark-green hover:text-brand-green transition-colors group border-b border-dark-green pb-1"
          >
            <span className="font-normal">Виж всички</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>

      {/* Blog Posts List */}
      <div className="flex flex-col divide-y divide-slate-200">
        {posts.length > 0 ? (
          posts.map((post) => <BlogItem key={post.id} post={post} />)
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">
              Все още няма публикувани статии.
            </p>
          </div>
        )}
      </div>
    </Section>
  );
}
