"use client";

import { Heading } from "@/components/ui/Typography";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import IconTextBox from "@/components/ui/IconTextBox";
import Section from "@/components/ui/Section";
import BadgeDefault from "@/components/ui/BadgeDefault";
import { useTranslation } from "react-i18next";

export default function OurValues() {
  const { t } = useTranslation("about");

  const values = [
    {
      icon: "/icons/plug-solar-icon-green.svg",
      title: t("values.items.team_work.title"),
      description: t("values.items.team_work.description"),
    },
    {
      icon: "/icons/plug-solar-icon-green.svg",
      title: t("values.items.safety.title"),
      description: t("values.items.safety.description"),
    },
    {
      icon: "/icons/plug-solar-icon-green.svg",
      title: t("values.items.trust.title"),
      description: t("values.items.trust.description"),
    },
    {
      icon: "/icons/plug-solar-icon-green.svg",
      title: t("values.items.respect.title"),
      description: t("values.items.respect.description"),
    },
    {
      icon: "/icons/plug-solar-icon-green.svg",
      title: t("values.items.support.title"),
      description: t("values.items.support.description"),
    },
    {
      icon: "/icons/plug-solar-icon-green.svg",
      title: t("values.items.flexibility.title"),
      description: t("values.items.flexibility.description"),
    },
  ];

  return (
    <Section paddingY="xl" className="bg-white">
      <Container>
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-16 mb-14">
          {/* Left - Badge and Title */}
          <div className="lg:max-w-2xl">
            <BadgeDefault className="mb-4">{t("values.badge")}</BadgeDefault>
            <Heading as="h2">{t("values.title")}</Heading>
          </div>

          {/* Right - CTA Button */}
          <div className="lg:pt-6">
            <Button variant="primary" size="md" href="/kontakt" showIcon>
              {t("intro.cta") || "Свържете се с нас"}
            </Button>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <IconTextBox
              key={index}
              icon={value.icon}
              title={value.title}
              description={value.description}
              iconAlt={value.title}
              borderColor="border-slate-200"
              bgColor="bg-white"
              titleColor="text-slate-900"
              descriptionColor="text-slate-600"
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
