"use client";

import Image from "next/image";
import { Heading, Text } from "@/components/ui/Typography";
import Button from "@/components/ui/Button";
import ReadMoreButton from "@/components/ui/ReadMoreButton";
import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

interface ServiceStep {
  title: string;
  description: string;
  image: string;
}

interface ServiceCardProps {
  step: ServiceStep;
  readMoreText: string;
  isActive: boolean;
  onToggle: () => void;
}

function ServiceCard({
  step,
  readMoreText,
  isActive,
  onToggle,
}: ServiceCardProps) {
  return (
    <div className="flex flex-col h-full bg-white rounded-[20px] p-4 border border-slate-200 transition-all duration-300 hover:bg-slate-100">
      {/* Image */}
      <div className="relative h-[240px] rounded-[16px] overflow-hidden mb-6 w-full shrink-0">
        <Image
          src={step.image}
          alt={step.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        <Heading as="h4" className="mb-3 text-[20px] font-bold text-slate-900">
          {step.title}
        </Heading>

        <div className="relative mb-4">
          <Text
            className={cn(
              "text-slate-600 text-base transition-all duration-300",
              isActive ? "" : "line-clamp-3",
            )}
          >
            {step.description}
          </Text>
        </div>

        <div className="mt-auto">
          <ReadMoreButton
            onClick={onToggle}
            text={readMoreText}
            isExpanded={isActive}
            className="hover:underline"
            textColor="text-slate-900"
            circleColor="bg-black"
            iconColor="text-white"
            circleHoverColor="bg-brand-green"
          />
        </div>
      </div>
    </div>
  );
}

export default function ServiceSteps() {
  const { t } = useTranslation("services");
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);

  const steps = useMemo(
    () => [
      {
        title: t("project_lifecycle.items.projecting.title"),
        description: t("project_lifecycle.items.projecting.description"),
        image: "/images/service-box-3-img-1.jpg",
      },
      {
        title: t("project_lifecycle.items.delivery.title"),
        description: t("project_lifecycle.items.delivery.description"),
        image: "/images/service-box-3-img-2.jpg",
      },
      {
        title: t("project_lifecycle.items.construction.title"),
        description: t("project_lifecycle.items.construction.description"),
        image: "/images/service-box-3-img-3.jpg",
      },
      {
        title: t("project_lifecycle.items.testing.title"),
        description: t("project_lifecycle.items.testing.description"),
        image: "/images/service-box-3-img-4.jpg",
      },
      {
        title: t("project_lifecycle.items.maintenance.title"),
        description: t("project_lifecycle.items.maintenance.description"),
        image: "/images/service-box-3-img-5.jpg",
      },
    ],
    [t],
  );

  const handleToggle = (index: number) => {
    setActiveStepIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
      {steps.map((step, index) => (
        <ServiceCard
          key={index}
          step={step}
          readMoreText={t("work_process.read_more")}
          isActive={activeStepIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}

      {/* CTA Card (6th slot) */}
      <div className="flex flex-col h-full bg-[#A3E635] rounded-[20px] p-8 justify-center items-center text-center relative overflow-hidden min-h-[460px]">
        {/* Use existing typography */}
        <Heading
          as="h3"
          className="mb-6 text-[28px] leading-tight font-bold text-slate-900 z-10 w-full"
        >
          {t("project_lifecycle.items.cta.title")}
        </Heading>

        <Text className="text-slate-800 text-base mb-8 z-10 w-full max-w-sm">
          {t("project_lifecycle.items.cta.description")}
        </Text>

        <div className="z-10">
          <Button href="/kontakti" variant="white" showIcon>
            {t("project_lifecycle.items.cta.btn")}
          </Button>
        </div>
      </div>
    </div>
  );
}
