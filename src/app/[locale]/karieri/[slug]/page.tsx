import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCareer, getCareers } from "@/lib/strapi";
import { Heading } from "@/components/ui/Typography";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import BadgeDefault from "@/components/ui/BadgeDefault";
import Sidebar from "@/components/ui/Sidebar";
import { ArrowLeft, MapPin, Briefcase, CheckCircle2 } from "lucide-react";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const career = await getCareer(slug, locale);

  if (!career) {
    const { t } = await initTranslations(locale, ["careers"]);
    return { title: t("careers:details.error_not_found") };
  }

  return {
    title: `${career.title} | VSCS`,
    description: career.shortDescription,
    openGraph: {
      title: career.title,
      description: career.shortDescription,
      type: "article",
      publishedTime: career.publishedAt,
    },
  };
}

export async function generateStaticParams() {
  const careers = await getCareers();
  return careers.map((career) => ({ slug: career.slug }));
}

export default async function CareerPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const { t, resources } = await initTranslations(locale, [
    "careers",
    "common",
  ]);
  const career = await getCareer(slug, locale);

  if (!career) {
    notFound();
  }

  return (
    <TranslationsProvider
      locale={locale}
      resources={resources}
      namespaces={["careers", "common"]}
    >
      {/* Dark Hero Section - Matching Projects Page */}
      <section className="bg-[#0a0f0a] relative pt-32 pb-24 border-b border-white/10">
        <Container>
          <div className="max-w-4xl">
            {/* Back Button */}
            <div className="mb-10">
              <Link href="/karieri" className="inline-block">
                <BadgeDefault
                  variant="outline-white"
                  uppercase
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t("careers:details.back_to_all")}
                </BadgeDefault>
              </Link>
            </div>

            {/* Title */}
            <Heading
              as="h1"
              className="text-white mb-6 text-4xl md:text-5xl lg:text-6xl font-medium leading-tight"
            >
              {career.title}
            </Heading>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4">
              {career.location && (
                <div className="inline-flex items-center gap-2 text-white/80 px-2 py-1.5 text-sm">
                  <MapPin className="w-4 h-4 text-[#b4d429]" />
                  {career.location}
                </div>
              )}
              <div className="inline-flex items-center gap-2 text-white/80 px-2 py-1.5 text-sm">
                <Briefcase className="w-4 h-4 text-[#b4d429]" />
                {t("careers:details.job_type")}
              </div>
              <div className="inline-flex items-center gap-2 text-white/80 px-2 py-1.5 text-sm">
                <span className="text-[#b4d429]">🌐</span>
                VS Construction Services
              </div>
            </div>
          </div>
        </Container>

        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5 pointer-events-none" />
      </section>

      {/* Main Content & Sidebar */}
      <Section className="pb-24 pt-16 bg-white" paddingY="none">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Left Content Column (2/3 width) */}
            <div className="lg:col-span-8">
              {/* Short Description Intro */}
              {career.shortDescription && (
                <div className="text-base font-medium leading-relaxed mb-10 text-slate-800">
                  {career.shortDescription}
                </div>
              )}

              {/* Main Content Render */}
              {career.mainContent && (
                <div className="prose text-base max-w-none text-slate-600 space-y-6">
                  {career.mainContent.split("\n").map((paragraph, index) => {
                    const trimmed = paragraph.trim();
                    if (!trimmed) return null;

                    // Headers
                    if (trimmed.startsWith("## ")) {
                      return (
                        <h3
                          key={index}
                          className="text-2xl font-bold text-slate-900 mt-10 mb-6"
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
                          className="text-xl font-bold text-slate-900 mt-8 mb-4"
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
                          className="list-disc pl-5 mb-4 space-y-2"
                        >
                          <li>{trimmed.replace(/^[-*]\s+/, "")}</li>
                        </ul>
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
            </div>

            {/* Right Sidebar Column (1/3 width) - Sticky */}
            <div className="lg:col-span-4 space-y-8">
              <Sidebar className="bg-lime-600/10 p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6">
                  {t("careers:details.sidebar_title")}
                </h3>

                {/* Sidebar Info (Perks) */}
                <div className="space-y-4 mb-8">
                  {career.sidebarInfo ? (
                    career.sidebarInfo.split("\n").map((line, index) => {
                      const trimmed = line.trim();
                      if (
                        !trimmed ||
                        (!trimmed.startsWith("-") && !trimmed.startsWith("*"))
                      )
                        return null;
                      const content = trimmed.replace(/^[-*]\s+/, "");
                      return (
                        <div key={index} className="flex items-start gap-3">
                          <div className="mt-1 shrink-0 w-5 h-5 rounded-full bg-[#b4d429] flex items-center justify-center">
                            <CheckCircle2 className="w-3 h-3 text-black" />
                          </div>
                          <span className="text-slate-700 text-base font-medium leading-snug">
                            {content}
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-slate-500">
                      {t("careers:details.no_sidebar_info")}
                    </p>
                  )}
                </div>

                <div className="pt-6 border-t border-slate-200/50">
                  <p className="text-xs text-slate-500 mb-4 text-center leading-relaxed">
                    {t("careers:details.apply_cta_text")}
                  </p>
                  <Button
                    href="/apply"
                    variant="primary"
                    fullWidth
                    className="!py-3 font-semibold"
                  >
                    {t("careers:details.apply_button")}
                  </Button>
                </div>
              </Sidebar>
            </div>
          </div>
        </Container>
      </Section>
    </TranslationsProvider>
  );
}
