import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProject, getProjects } from "@/lib/strapi";
import { formatDate } from "@/lib/utils";
import { Heading } from "@/components/ui/Typography";
import Container from "@/components/ui/Container";

import {
  ArrowLeft,
  MapPin,
  Calendar,
  Building2,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import BadgeDefault from "@/components/ui/BadgeDefault";
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
      {/* Hero Section */}
      <section className="bg-[#0a0f0a] relative pt-24 pb-32">
        <Container size="sm">
          <div className="max-w-4xl">
            {/* Back Button */}
            <div className="mb-8">
              <Link href="/proekti" className="inline-block">
                <BadgeDefault className="!bg-transparent !border-white !text-white hover:!bg-white/10 transition-colors uppercase tracking-wider text-xs gap-2 !px-5 !py-2.5">
                  <ArrowLeft className="w-4 h-4" />
                  Назад към проекти
                </BadgeDefault>
              </Link>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <BadgeDefault className="!bg-[#009944] !text-white !border-none font-bold tracking-wider text-xs uppercase !px-3 !py-1">
                {project.category || "Проект"}
              </BadgeDefault>

              {project.location && (
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{project.location}</span>
                </div>
              )}

              {project.year && (
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{project.year}</span>
                </div>
              )}
            </div>

            {/* Title */}
            <Heading as="h2" className="text-white">
              {project.title}
            </Heading>
          </div>
        </Container>
      </section>

      {/* Content Section with Image overlapping */}
      <section className="bg-[#f0f2f0] bg-neutral-100 pb-18">
        <Container size="sm">
          {/* Featured Image - Negative margin to overlap hero */}
          <div className="-mt-18 bg-white relative z-20 p-4 rounded-3xl">
            <div className="aspect-[21/9] relative rounded-2xl overflow-hidden mb-8">
              {project.featuredImage ? (
                <Image
                  src={project.featuredImage}
                  alt={project.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
              ) : (
                <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                  <span className="text-lg">Няма изображение</span>
                </div>
              )}
            </div>

            <div className="px-6">
              {/* Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 p-6 bg-slate-50 rounded-2xl">
                {project.energy && (
                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-[#009944] mt-0.5" />
                    <div>
                      <span className="text-xs uppercase tracking-wider text-slate-500 block mb-1">
                        Мощност
                      </span>
                      <span className="text-slate-800 font-medium">
                        {project.energy}
                      </span>
                    </div>
                  </div>
                )}

                {project.year && (
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-[#009944] mt-0.5" />
                    <div>
                      <span className="text-xs uppercase tracking-wider text-slate-500 block mb-1">
                        Година
                      </span>
                      <span className="text-slate-800 font-medium">
                        {project.year}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  {(() => {
                    const StatusIcon = statusIcon;
                    return (
                      <StatusIcon className={`w-5 h-5 ${statusColor} mt-0.5`} />
                    );
                  })()}
                  <div>
                    <span className="text-xs uppercase tracking-wider text-slate-500 block mb-1">
                      Статус
                    </span>
                    <span className={`font-medium ${statusColor}`}>
                      {statusText}
                    </span>
                  </div>
                </div>
              </div>

              {/* Excerpt / Intro */}
              {project.excerpt && (
                <div className="mb-12 border-l-4 border-[#b4d429] pl-6 py-2">
                  <p className="text-xl md:text-xl font-serif italic text-slate-800">
                    {project.excerpt}
                  </p>
                </div>
              )}

              {/* Prose content */}
              {project.content && (
                <div>
                  {project.content.split("\n").map((paragraph, index) => {
                    if (!paragraph.trim()) return null;

                    if (paragraph.startsWith("## ")) {
                      return (
                        <h2
                          key={index}
                          className="text-2xl md:text-3xl mt-12 mb-6"
                        >
                          {paragraph.replace("## ", "")}
                        </h2>
                      );
                    }

                    if (paragraph.startsWith("- ")) {
                      return (
                        <ul key={index} className="list-disc pl-5 mb-4">
                          <li className="text-slate-600">
                            {paragraph.replace("- ", "")}
                          </li>
                        </ul>
                      );
                    }

                    if (paragraph.match(/^\d+\.\s/)) {
                      const parts = paragraph.split(":");
                      if (parts.length > 1) {
                        return (
                          <p key={index} className="mb-4">
                            <strong className="text-slate-800">
                              {parts[0]}:
                            </strong>
                            {parts.slice(1).join(":")}
                          </p>
                        );
                      }
                    }

                    return (
                      <p
                        key={index}
                        className="mb-6 text-slate-600 leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              )}

              {/* Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-xl font-medium mb-6">Галерия</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {project.gallery.map((image, index) => (
                      <div
                        key={index}
                        className="aspect-square relative rounded-xl overflow-hidden"
                      >
                        <Image
                          src={image.url || ""}
                          alt={
                            image.alt ||
                            `${project.title} - изображение ${index + 1}`
                          }
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Share & Footer */}
              <div className="mt-16 pt-8 border-t border-slate-200">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <span className="text-slate-900 font-normal">
                    Сподели проекта:
                  </span>
                  <div className="flex gap-2">
                    <ShareButton icon={FaFacebook} label="Share on Facebook" />
                    <ShareButton icon={FaLinkedin} label="Share on LinkedIn" />
                    <ShareButton
                      icon={FaInstagram}
                      label="Share on Instagram"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
