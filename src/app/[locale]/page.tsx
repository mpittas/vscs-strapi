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
import { getPaginatedData, getProjectMapMarkers, getProjects } from "@/lib/strapi";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import { getStrapiMedia } from "@/lib/media";
import { formatDate } from "@/lib/utils";

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
  let projects: Array<{
    id: number;
    title: string;
    location: string;
    image: string;
    href: string;
  }> = [];

  let mapMarkers: Awaited<ReturnType<typeof getProjectMapMarkers>> = [];

  const projectPath = (slug: string) =>
    locale === "bg" ? `/proekti/${slug}` : `/${locale}/proekti/${slug}`;

  try {
    const [strapiProjects, markers] = await Promise.all([
      getProjects(locale),
      getProjectMapMarkers(locale),
    ]);
    mapMarkers = markers;
    projects = strapiProjects.slice(0, 6).map((project) => ({
      id: project.id,
      title: project.title,
      location: project.location,
      image: project.featuredImage || "/images/type-of-service-1.jpg",
      href: projectPath(project.slug),
    }));
  } catch (error) {
    console.error("Failed to fetch projects in HomePage:", error);
    projects = [];
    mapMarkers = [];
  }

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
      <ProjectsOverview projects={projects} mapMarkers={mapMarkers} />
      <WhyUs />
      <BlogOverview posts={posts} />
      <Marquee />
      <CTABanner />
    </TranslationsProvider>
  );
}
