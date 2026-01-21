import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProject, getProjects } from "@/lib/strapi";
import { Heading } from "@/components/ui/Typography";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import BadgeDefault from "@/components/ui/BadgeDefault";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  Zap,
} from "lucide-react";
import type { IconType } from "react-icons";

interface ShareButtonProps {
  icon: IconType;
  label: string;
  onClick?: () => void;
}

function ShareButton({ icon: Icon, label, onClick }: ShareButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#b4d429] hover:text-[#0a0f0a] transition-all duration-300"
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return { title: "Проектът не е намерен" };
  }

  return {
    title: project.title,
    description: project.excerpt,
    openGraph: {
      title: project.title,
      description: project.excerpt,
      type: "article",
      publishedTime: project.publishedAt,
    },
  };
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const statusIcon =
    project.projectStatus === "Завършен" ? CheckCircle2 : Clock;
  const statusText =
    project.projectStatus === "Завършен" ? "Завършен" : "В процес";
  const statusColor =
    project.projectStatus === "Завършен" ? "text-green-600" : "text-amber-600";

  return (
    <>
      {/* Dark Hero Section */}
      <section className="bg-[#0a0f0a] relative pt-32 pb-24 border-b border-white/10">
        <Container>
          <div className="max-w-4xl">
            {/* Back Button */}
            <div className="mb-10">
              <Link href="/proekti" className="inline-block">
                <BadgeDefault
                  variant="outline-white"
                  uppercase
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Всички проекти
                </BadgeDefault>
              </Link>
            </div>

            {/* Title */}
            <Heading
              as="h1"
              className="text-white mb-6 text-4xl md:text-5xl lg:text-6xl font-medium leading-tight"
            >
              {project.title}
            </Heading>

            {/* Subtitle/Excerpt */}
            {/* <div className="text-white/70 text-lg md:text-xl font-light mb-8 max-w-2xl leading-relaxed">
              {project.excerpt}
            </div> */}

            {/* Badges/Meta */}
            <div className="flex flex-wrap items-center gap-4">
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

        {/* Background Pattern/Overlay opacity */}
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5 pointer-events-none" />
      </section>

      {/* Main Content Section */}
      <Section className="pb-24 pt-16 bg-[#FAFAFA]" paddingY="none">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            {/* Left Content Column (2/3 width) */}
            <div className="lg:col-span-8">
              <Heading as="h2" className="text-3xl mb-8">
                За Проекта
              </Heading>

              {/* Project Content */}
              {project.content && (
                <div className="prose prose-lg max-w-none text-slate-600 space-y-6">
                  {project.content.split("\n").map((paragraph, index) => {
                    const trimmed = paragraph.trim();
                    if (!trimmed) return null;

                    // Headers
                    if (trimmed.startsWith("## ")) {
                      return (
                        <h3
                          key={index}
                          className="text-2xl font-medium text-slate-900 mt-10 mb-4"
                        >
                          {trimmed.replace(/^##\s+/, "")}
                        </h3>
                      );
                    }
                    if (
                      trimmed.startsWith("# ") ||
                      trimmed.startsWith("### ")
                    ) {
                      return (
                        <h4
                          key={index}
                          className="text-xl font-medium text-slate-900 mt-8 mb-3"
                        >
                          {trimmed.replace(/^[#]+\s+/, "")}
                        </h4>
                      );
                    }

                    // Bullet lists
                    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
                      return (
                        <ul
                          key={index}
                          className="list-disc pl-5 mb-4 space-y-1"
                        >
                          <li>{trimmed.replace(/^[-*]\s+/, "")}</li>
                        </ul>
                      );
                    }

                    // Key-value pairs (bolding the key)
                    // Matches "Key: Value" or "1. Key: Value"
                    const keyValMatch = trimmed.match(
                      /^(\d+\.\s)?([^:]+):(.+)$/,
                    );
                    if (keyValMatch && trimmed.length < 150) {
                      const prefix = keyValMatch[1] || "";
                      const key = keyValMatch[2];
                      const val = keyValMatch[3];
                      return (
                        <p key={index} className="mb-4">
                          {prefix}
                          <strong className="text-slate-900">{key}:</strong>
                          {val}
                        </p>
                      );
                    }

                    return (
                      <p key={index} className="leading-relaxed">
                        {trimmed}
                      </p>
                    );
                  })}
                </div>
              )}

              {/* Gallery Section */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="mt-16 pt-10 border-t border-slate-200">
                  <Heading as="h3" className="text-2xl mb-8">
                    Галерия
                  </Heading>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Featured Image First in Grid if needed, but usually strictly gallery */}
                    {project.featuredImage && (
                      <div className="aspect-[4/3] relative rounded-xl overflow-hidden group">
                        <Image
                          src={project.featuredImage}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    {project.gallery.map((image, index) => (
                      <div
                        key={index}
                        className="aspect-[4/3] relative rounded-xl overflow-hidden group"
                      >
                        <Image
                          src={image.url || ""}
                          alt={image.alt || `Gallery image ${index + 1}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar Column (1/3 width) - Sticky */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-green-800/10 rounded-2xl p-6 sticky top-24">
                <h3 className="text-xl font-normal text-slate-900 mb-6 pb-6 border-b border-black/8">
                  Детайли
                </h3>

                <div className="space-y-6">
                  {(
                    [
                      {
                        label: "ГОДИНА",
                        value: project.year,
                        icon: Calendar,
                        show: !!project.year,
                      },
                      {
                        label: "ТИП",
                        value: project.services,
                        icon: Zap,
                        show: !!project.services,
                      },
                      {
                        label: "СТАТУС",
                        value: statusText,
                        icon: statusIcon,
                        show: true,
                      },
                    ] as const
                  ).map(
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
                    href="/contacts"
                    variant="black"
                    fullWidth
                    className="!py-3"
                  >
                    Поискай оферта
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
