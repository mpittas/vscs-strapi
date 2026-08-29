import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import LocalizedLink from "@/components/LocalizedLink";
import { getProject, getProjects, buildLocalePaths } from "@/lib/strapi";
import i18nConfig from "@/i18nConfig";
import { truncateText } from "@/lib/utils";
import { Heading } from "@/components/ui/Typography";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import BadgeDefault from "@/components/ui/BadgeDefault";
import Sidebar from "@/components/ui/Sidebar";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { markdownComponents } from "@/lib/markdownStyles";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Zap,
  CircleUser,
} from "lucide-react";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import { TranslatedSlugProvider } from "@/components/TranslatedSlugProvider";
import dynamic from "next/dynamic";

const ProjectGallery = dynamic(() => import("@/components/ProjectGallery"));

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

// Pre-render project pages at build time so navigation is instant (fully
// prefetched static routes) instead of a slow on-demand server render.
export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of i18nConfig.locales) {
    const projects = await getProjects(locale);
    for (const project of projects) {
      if (project.slug) params.push({ locale, slug: project.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = await getProject(slug, locale);

  if (!project) {
    const { t } = await initTranslations(locale, ["projects"]);
    return { title: t("projects:details.error_not_found") };
  }

  const description = truncateText(project.content, 160);

  return {
    title: project.title,
    description,
    openGraph: {
      title: project.title,
      description,
      type: "article",
      publishedTime: project.publishedAt,
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const { t, resources } = await initTranslations(locale, [
    "projects",
    "common",
  ]);
  const project = await getProject(slug, locale);

  if (!project) {
    notFound();
  }

  const localePaths = buildLocalePaths(project, "proekti");

  const sidebarItems = [
    {
      label: t("projects:details.year_label"),
      value: project.year,
      icon: Calendar,
      show: !!project.year,
    },
    {
      label: t("projects:details.client_label"),
      value: project.client,
      icon: CircleUser,
      show: !!project.client,
    },
    {
      label: t("projects:details.services_label"),
      value: project.services,
      icon: Zap,
      show: !!project.services,
    },
  ] as const;

  return (
    <>
      <TranslatedSlugProvider paths={localePaths} />
      <TranslationsProvider
        locale={locale}
        resources={resources}
        namespaces={["projects", "common"]}
      >
        {/* Hero Section */}
        <section
          data-reveal-hero=""
          className="relative pt-32 pb-24 border-b border-white/10 overflow-hidden"
        >
          {project.featuredImage ? (
            <>
              <Image
                src={project.featuredImage}
                alt=""
                fill
                className="object-cover z-0"
                priority
                sizes="100vw"
                aria-hidden
              />
              <div className="absolute inset-0 bg-[#001D13] opacity-80 z-10" />
            </>
          ) : (
            <div className="absolute inset-0 bg-[#0a0f0a] z-0" />
          )}

          <Container className="relative z-20">
            <div className="max-w-4xl">
              {/* Back Button */}
              <div data-reveal="fade" className="mb-10">
                <LocalizedLink href="/proekti" className="inline-block">
                  <BadgeDefault
                    variant="outline-white"
                    uppercase
                    className="gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    {t("projects:details.back_to_all")}
                  </BadgeDefault>
                </LocalizedLink>
              </div>

              {/* Title */}
              <Heading
                as="h1"
                data-reveal="title"
                className="text-white mb-6 text-4xl md:text-5xl lg:text-6xl font-medium leading-tight"
              >
                {project.title}
              </Heading>

              {/* Badges/Meta */}
              <div data-reveal="rise" className="flex flex-wrap items-center gap-4">
                {project.energy && (
                  <BadgeDefault variant="white" size="md" className="gap-2">
                    <Zap className="w-4 h-4 fill-current" />
                    {project.energy}
                  </BadgeDefault>
                )}

                {project.location && (
                  <div className="inline-flex items-center gap-2 text-white/80 px-2 py-1.5 text-sm">
                    <MapPin className="w-4 h-4 text-[#b4d429]" />
                    {project.location}
                  </div>
                )}
              </div>
            </div>
          </Container>
        </section>

        {/* Main Content Section */}
        <Section className="pb-24 pt-16 bg-[#FAFAFA]" paddingY="none">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
              {/* Left Content Column (2/3 width) */}
              <div className="lg:col-span-8">
                <Heading as="h2" className="text-3xl mb-8">
                  {t("projects:details.about_title")}
                </Heading>

                {/* Project Content */}
                {project.content && (
                  <div className="prose prose-lg max-w-none text-slate-700">
                    <ReactMarkdown
                      rehypePlugins={[rehypeRaw]}
                      components={markdownComponents}
                    >
                      {project.content}
                    </ReactMarkdown>
                  </div>
                )}

                {/* Gallery Section */}
                {project.gallery && project.gallery.length > 0 && (
                  <div className="mt-16 pt-10 border-t border-slate-200">
                    <Heading as="h3" className="text-2xl mb-8">
                      {t("projects:details.gallery_title")}
                    </Heading>
                    <ProjectGallery images={project.gallery} />
                  </div>
                )}
              </div>

              {/* Right Sidebar Column (1/3 width) - Sticky */}
              <div className="lg:col-span-4 space-y-8">
                <Sidebar className="bg-green-800/10 p-6">
                  <h3 className="text-xl font-normal text-slate-900 mb-6 pb-6 border-b border-black/8">
                    {t("projects:details.sidebar_title")}
                  </h3>

                  <div className="space-y-6">
                    {sidebarItems.map(
                      (item) =>
                        item.show && (
                          <div key={item.label} className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/60 flex items-center justify-center shrink-0 text-green-700">
                              <item.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="font-normal uppercase tracking-wider text-green-950/60 mb-0.5">
                                {item.label}
                              </div>
                              <div className="text-slate-900 font-medium">
                                {item.value}
                              </div>
                            </div>
                          </div>
                        ),
                    )}
                  </div>

                  <div className="mt-6 pt-6 border-t border-black/8">
                    <Button
                      href="/kontakti"
                      variant="black"
                      fullWidth
                      className="!py-3"
                    >
                      {t("projects:details.request_quote_btn")}
                    </Button>
                  </div>
                </Sidebar>
              </div>
            </div>
          </Container>
        </Section>
      </TranslationsProvider>
    </>
  );
}
