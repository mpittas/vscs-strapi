"use client";

import Link from "next/link";
import { MapPin, Briefcase } from "lucide-react";
import { Heading, Text } from "@/components/ui/Typography";
import Button from "@/components/ui/Button";
import { useTranslation } from "react-i18next";

interface CareerItemProps {
  title: string;
  slug: string;
  location: string;
  shortDescription: string;
}

export default function CareerItem({
  title,
  slug,
  location,
  shortDescription,
}: CareerItemProps) {
  const { t } = useTranslation("careers");

  return (
    <div className="bg-lime-600/10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
      {/* Content */}
      <div className="flex-1">
        {/* Meta info */}
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-1.5 text-slate-700">
            <MapPin className="w-4 h-4" />
            <Text variant="body-14" className="text-slate-700">
              {location}
            </Text>
          </div>
          <div className="flex items-center gap-1.5 text-slate-700">
            <Briefcase className="w-4 h-4" />
            <Text variant="body-14" className="text-slate-700">
              {t("job_type_full")}
            </Text>
          </div>
        </div>

        {/* Title */}
        <Heading as="h3" className="text-xl md:text-2xl font-normal mb-3">
          {title}
        </Heading>

        {/* Description */}
        <Text variant="body-14" className="text-slate-700 leading-relaxed">
          {shortDescription}
        </Text>
      </div>

      {/* Button */}
      <div className="flex-shrink-0">
        <Button variant="primary" size="md" showIcon href={`/karieri/${slug}`}>
          {t("view_details")}
        </Button>
      </div>
    </div>
  );
}
