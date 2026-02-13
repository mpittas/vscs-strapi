"use client";

import Image from "next/image";
import { Heading, Text } from "@/components/ui/Typography";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

interface ProcessStep {
  title: string;
  icon: string;
  href?: string;
}

function ProcessCard({ step }: { step: ProcessStep }) {
  const { t } = useTranslation("services");
  return (
    <div className="flex flex-col justify-between bg-brand-green rounded-2xl p-6 min-h-[220px] transition-all duration-300 hover:bg-brand-green-dark">
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

        {/* Read More Link */}
        <a
          href={step.href || "#"}
          className="inline-flex items-center gap-2 text-dark-green text-sm group"
        >
          <span className="w-5 h-5 rounded-full bg-black/70 group-hover:bg-dark-green/70 transition-colors bg-[url('/icons/small-chevron.svg')] bg-[length:5px] bg-[position:50%_50%] bg-no-repeat" />
          <span className="group-hover:underline font-medium text-black/70 relative top-[1px]">
            {t("work_process.read_more")}
          </span>
        </a>
      </div>
    </div>
  );
}

export default function WorkProcess() {
  const { t } = useTranslation("services");

  const processSteps: ProcessStep[] = useMemo(
    () => [
      {
        title: t("work_process.steps.design"),
        icon: "/icons/page-ruler-black-icon.svg",
        href: "#",
      },
      {
        title: t("work_process.steps.delivery"),
        icon: "/icons/page-ruler-black-icon.svg",
        href: "#",
      },
      {
        title: t("work_process.steps.construction"),
        icon: "/icons/page-ruler-black-icon.svg",
        href: "#",
      },
      {
        title: t("work_process.steps.testing"),
        icon: "/icons/page-ruler-black-icon.svg",
        href: "#",
      },
      {
        title: t("work_process.steps.maintenance"),
        icon: "/icons/page-ruler-black-icon.svg",
        href: "#",
      },
    ],
    [t],
  );

  return (
    <Section paddingY="xl" className="bg-white">
      <Container>
        {/* Header */}
        <div className="mb-12">
          <Heading as="h2" className="mb-4">
            {t("work_process.title")}
          </Heading>

          <Text variant="body-16" className="text-slate-600 max-w-xl">
            {t("work_process.description")}
          </Text>
        </div>

        {/* Process Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {processSteps.map((step, index) => (
            <ProcessCard key={index} step={step} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
