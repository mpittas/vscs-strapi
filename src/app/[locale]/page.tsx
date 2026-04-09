import {
  Hero,
  ClientLogos,
  WhyUs,
  AboutUs,
  OurServices,
  ProjectsOverview,
  BlogOverview,
  Marquee,
  CTABanner,
} from "@/components/sections";
import { getPaginatedData } from "@/lib/strapi";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import { getStrapiMedia } from "@/lib/media";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { resources } = await initTranslations(locale, [
    "common",
    "home",
    "marquee",
  ]);
  let posts: any[] = [];

  try {
    const { data } = await getPaginatedData(
      "blog-posts",
      1,
      3, // Limit to 3 items
      ["strapi", "blog-posts"],
      locale,
    );

    posts =
      data.map((post: any) => ({
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        image:
          getStrapiMedia(post.featuredImage?.url) || "/images/blog-img-1.jpg",
        date: formatDate(post.publishedAt),
        readTime: "5 минути", // Placeholder
        slug: post.slug,
      })) || [];
  } catch (error) {
    console.error("Failed to fetch posts in HomePage:", error);
    posts = [];
  }

  return (
    <TranslationsProvider
      locale={locale}
      resources={resources}
      namespaces={["common", "home", "marquee"]}
    >
      <Hero />
      <ClientLogos />
      <AboutUs />
      <OurServices />
      <ProjectsOverview />
      <WhyUs />
      <BlogOverview posts={posts} />
      <Marquee />
      <CTABanner />
    </TranslationsProvider>
  );
}
