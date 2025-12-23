import Image from "next/image";
import Link from "next/link";
import { Heading, Text } from "@/components/ui/Typography";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { Calendar, Clock, ArrowUpRight, ArrowRight } from "lucide-react";

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
        <div className="flex items-start justify-between mb-24">
          {/* Title */}
          <Heading as="h2" className="max-w-xl">
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
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group py-8 first:pt-0 last:pb-0"
            >
              <div className="grid grid-cols-12 gap-12">
                {/* Left Column - Meta */}
                <div className="col-span-3">
                  <div className="flex gap-5">
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
                <div className="col-span-5 pr-8">
                  <Heading
                    as="h3"
                    className="text-xl font-medium text-dark-green mb-3 group-hover:text-brand-green transition-colors"
                  >
                    {post.title}
                  </Heading>
                  <Text
                    variant="body-14"
                    className="text-slate-500 leading-relaxed"
                  >
                    {post.excerpt}
                  </Text>
                </div>

                {/* Right Column - Image */}
                <div className="col-span-4 flex justify-end">
                  <div className="relative w-full h-[140px]">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 rounded-full"
                    />
                    {/* Arrow Button Overlay */}
                    <div className="absolute top-1/2 -translate-y-1/2 -left-5 w-14 h-14 rounded-full bg-brand-green flex items-center justify-center transition-transform">
                      <ArrowUpRight className="w-5 h-5 text-dark-green" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
