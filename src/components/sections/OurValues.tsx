"use client";

import { Heading } from "@/components/ui/Typography";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import IconTextBox from "@/components/ui/IconTextBox";
import Section from "@/components/ui/Section";
import BadgeDefault from "@/components/ui/BadgeDefault";
import { useTranslation } from "react-i18next";

import { HiUsers, HiShieldCheck, HiHeart } from "react-icons/hi2";
import { LuHandshake, LuShuffle } from "react-icons/lu";
import { BiSupport } from "react-icons/bi";

export default function OurValues() {
  const { t } = useTranslation("about");

  const values = [
    {
      icon: <HiUsers />,
      title: t("values.items.team_work.title"),
      description: t("values.items.team_work.description"),
    },
    {
      icon: <HiShieldCheck />,
      title: t("values.items.safety.title"),
      description: t("values.items.safety.description"),
    },
    {
      icon: <LuHandshake />,
      title: t("values.items.trust.title"),
      description: t("values.items.trust.description"),
    },
    {
      icon: <HiHeart />,
      title: t("values.items.respect.title"),
      description: t("values.items.respect.description"),
    },
    {
      icon: <BiSupport />,
      title: t("values.items.support.title"),
      description: t("values.items.support.description"),
    },
    {
      icon: <LuShuffle />,
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
          <div className="lg:max-w-3xl">
            <BadgeDefault className="mb-4">{t("values.badge")}</BadgeDefault>
            <Heading as="h2" className="mb-6">
              {t("values.title")}
            </Heading>
            <p className="text-slate-700 text-lg leading-relaxed max-w-3xl">
              {t("values.description")}
            </p>
          </div>

          {/* Right - CTA Button */}
          <div className="lg:pt-6">
            <Button variant="primary" size="md" href="/kontakti" showIcon>
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
              borderColor="border-slate-50"
              bgColor="bg-slate-50"
              hoverBgColor="hover:bg-slate-200"
              hoverBorderColor="hover:bg-slate-200"
              titleColor="text-slate-900"
              descriptionColor="text-slate-700"
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
