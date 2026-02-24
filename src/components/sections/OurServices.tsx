"use client";

import { Heading, Text } from "@/components/ui/Typography";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import IconTextBox from "@/components/ui/IconTextBox";
import Section from "@/components/ui/Section";

import { useTranslation } from "react-i18next";

export default function OurServices() {
  const { t } = useTranslation("home");

  const services = [
    {
      icon: "/icons/project-tools-icon-green.svg",
      title: t("services.items.development.title"),
      description: t("services.items.development.description"),
    },
    {
      icon: "/icons/truck-worldwide-icon-green.svg",
      title: t("services.items.delivery.title"),
      description: t("services.items.delivery.description"),
    },
    {
      icon: "/icons/hand-tool-icon-green.svg",
      title: t("services.items.construction.title"),
      description: t("services.items.construction.description"),
    },
    {
      icon: "/icons/plug-solar-icon-green.svg",
      title: t("services.items.electrical.title"),
      description: t("services.items.electrical.description"),
    },
  ];

  return (
    <Section
      paddingY="lg"
      className="bg-gradient-to-b from-[#001D13] to-[#022D1E]"
    >
      <Container>
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-16 mb-14">
          {/* Left - Title */}
          <div className="lg:max-w-2xl">
            <Text variant="small-title" className="mb-4">
              {t("services.subheader")}
            </Text>
            <Heading as="h2" className="text-white">
              {t("services.title")}
            </Heading>
          </div>

          {/* Right - CTA Button */}
          <div className="lg:pt-6">
            <Button variant="primary" size="md" href="/kontakt" showIcon>
              {t("services.cta")}
            </Button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <IconTextBox
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              iconAlt={service.title}
              variant="dark"
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
