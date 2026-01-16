import Link from "next/link";
import { Heading } from "@/components/ui/Typography";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { ArrowRight } from "lucide-react";
import BlogItem from "@/components/BlogItem";

// Static blog posts data
const blogPosts = [
  {
    id: 1,
    title: "Защо да инвестирате в инсталацията на соларни панели",
    excerpt:
      "Лорем ипсум долор сит амет, малорум суавитате вим те, мел дицо еррор мандамус те, саперет веритус абхорреант еу яуо.",
    image: "/images/blog-img-1.jpg",
    date: "30 Юли, 2025",
    readTime: "5 минути",
    slug: "why-invest-in-solar-panels",
  },
  {
    id: 2,
    title: "Ръководство за зареждане на коли със слънчева енергия",
    excerpt:
      "Лорем ипсум долор сит амет, малорум суавитате вим те, мел дицо еррор мандамус те, саперет веритус абхорреант еу яуо.",
    image: "/images/blog-img-2.jpg",
    date: "30 Юли, 2025",
    readTime: "5 минути",
    slug: "solar-car-charging-guide",
  },
  {
    id: 3,
    title: "Защо да инвестирате в инсталацията на соларни панели",
    excerpt:
      "Лорем ипсум долор сит амет, малорум суавитате вим те, мел дицо еррор мандамус те, саперет веритус абхорреант еу яуо.",
    image: "/images/blog-img-3.jpg",
    date: "30 Юли, 2025",
    readTime: "5 минути",
    slug: "solar-panel-investment",
  },
];

export default function BlogOverview() {
  return (
    <Section paddingY="xl" bgColor="light">
      <Container>
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start justify-between mb-24">
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

        {/* Blog Posts List */}
        <div className="flex flex-col divide-y divide-slate-200">
          {blogPosts.map((post) => (
            <BlogItem key={post.id} post={post} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
