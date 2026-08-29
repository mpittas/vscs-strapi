"use client";

import Image from "next/image";
import { Heading, Text } from "@/components/ui/Typography";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import ReadMoreButton from "@/components/ui/ReadMoreButton";
import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import ServiceModal from "@/components/ServiceModal";

interface ProcessStep {
  title: string;
  description?: string; // Add description for modal
  icon: string;
  href?: string;
  key?: string; // Used for translation key if needed for dynamic lookup
}

function ProcessCard({
  step,
  onClick,
}: {
  step: ProcessStep;
  onClick: () => void;
}) {
  const { t } = useTranslation("services");
  return (
    <div
      onClick={onClick}
      className="flex flex-col justify-between bg-brand-green rounded-2xl p-6 min-h-[220px] transition-all duration-300 hover:bg-brand-green-dark cursor-pointer"
    >
      {/* Icon */}
      <div className="mb-6">
        <Image
          src={step.icon}
          alt=""
          width={40}
          height={40}
          className="opacity-80"
        />
      </div>

      {/* Title */}
      <div>
        <Heading as="h6" className="text-dark-green mb-4">
          {step.title}
        </Heading>

        {/* Read More Link (now just visual since card is clickable) */}
        <ReadMoreButton
          text={t("work_process.read_more")}
          className="text-dark-green hover:underline"
          textColor="text-dark-green"
          textHoverColor="group-hover:text-black"
          circleColor="bg-black/70"
          circleHoverColor="bg-dark-green/70"
          iconColor="text-white"
        />
      </div>
    </div>
  );
}

export default function WorkProcess() {
  const { t } = useTranslation("services");
  const [selectedStep, setSelectedStep] = useState<ProcessStep | null>(null);

  const processSteps: ProcessStep[] = useMemo(
    () => [
      {
        title: t("work_process.steps.ground"),
        description: t("work_process.steps.ground_desc"),
        icon: "/icons/service-icon-solar.svg",
        href: "#",
      },
      {
        title: t("work_process.steps.rooftop"),
        description: t("work_process.steps.rooftop_desc"),
        icon: "/icons/service-icon-house-roof.svg",
        href: "#",
      },
      {
        title: t("work_process.steps.carport"),
        description: t("work_process.steps.carport_desc"),
        icon: "/icons/service-icon-battery-charge.svg",
        href: "#",
      },
      {
        title: t("work_process.steps.floating"),
        description: t("work_process.steps.floating_desc"),
        icon: "/icons/service-icon-globe-solar.svg",
        href: "#",
      },
    ],
    [t],
  );

  return (
    <Section paddingY="xl" className="bg-white">
      <Container>
        {/* Header */}
        {/* Two-column Intro Text - Added intro keys */}
        <div data-reveal-group="" className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
          <Text className="text-slate-700 leading-relaxed">
            {t("work_process.intro_left")}
          </Text>
          <Text className="text-slate-700 leading-relaxed">
            {t("work_process.intro_right")}
          </Text>
        </div>

        {/* Section Heading */}
        <div className="mb-8">
          <Heading as="h2" className="mb-4 text-3xl md:text-4xl font-bold">
            {t("work_process.title")}
          </Heading>
        </div>

        {/* Process Cards Grid */}
        <div data-reveal-group="" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {processSteps.map((step, index) => (
            <ProcessCard
              key={index}
              step={step}
              onClick={() => setSelectedStep(step)}
            />
          ))}
        </div>
      </Container>

      {/* Service Details Modal */}
      <ServiceModal
        isOpen={!!selectedStep}
        onClose={() => setSelectedStep(null)}
        title={selectedStep?.title || ""}
        description={selectedStep?.description || ""}
        icon={selectedStep?.icon}
        ctaText={t("key_services.contact_us")}
        href="/kontakti"
      />
    </Section>
  );
}
