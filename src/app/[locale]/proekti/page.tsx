import type { Metadata } from "next";
import PageTitle from "@/components/ui/PageTitle";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import ProjectPostCard from "@/components/ui/ProjectPostCard";
import { getProjects } from "@/lib/strapi";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  const { t } = await initTranslations(locale, ["projects"]);

  return {
    title: t("projects:metadata.title"),
    description: t("projects:metadata.description"),
  };
};

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { t, resources } = await initTranslations(locale, [
    "projects",
    "common",
  ]);
  const projects = await getProjects(locale);

  return (
    <TranslationsProvider
      locale={locale}
      resources={resources}
      namespaces={["projects", "common"]}
    >
      <PageTitle
        title={t("projects:page_title")}
        breadcrumbs={[
          { label: t("common:nav.home"), href: "/" },
          { label: t("projects:breadcrumbs.projects") },
        ]}
      />

      <Section paddingY="sm" bgColor="white">
        <Container>
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project: any) => (
                <ProjectPostCard
                  key={project.id}
                  title={project.title}
                  location={project.location || t("projects:filter.bulgaria")}
                  image={
                    project.featuredImage || "/images/type-of-service-1.jpg"
                  }
                  href={`/proekti/${project.slug}`}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">
                {t("projects:filter.no_projects")}
              </p>
            </div>
          )}
        </Container>
      </Section>
    </TranslationsProvider>
  );
}
