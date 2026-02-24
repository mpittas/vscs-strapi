"use client";

import Link from "next/link";
import { Heading, Text } from "@/components/ui/Typography";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import BlogItem from "@/components/BlogItem";

// Static blog posts data removed

interface BlogOverviewProps {
  posts: any[];
}

export default function BlogOverview({ posts = [] }: BlogOverviewProps) {
  const { t } = useTranslation("home");
  return (
    <Section paddingY="blog" bgColor="light">
      <Container>
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start justify-between mb-2 md:mb-12">
          {/* Title */}
          <Heading as="h2" className="max-w-xl mb-6 lg:mb-0">
            {t("blog.title_part1")}{" "}
            <span className="text-brand-green">
              {t("blog.title_highlight")}
            </span>
            <br />
            {t("blog.title_part2")}
            <br />
            {t("blog.title_part3")}
          </Heading>

          {/* View All Link */}
          <Link
            href="/blog"
            className="flex items-center gap-2 text-slate-900 hover:text-brand-green transition-colors group border-b border-slate-900 pb-1"
          >
            <Text variant="body-16" as="span">
              {t("blog.view_all")}
            </Text>
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
            <Text variant="body-18" className="text-slate-900">
              {t("blog.no_posts")}
            </Text>
          </div>
        )}
      </div>
    </Section>
  );
}
