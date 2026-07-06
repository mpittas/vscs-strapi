"use client";

import LocalizedLink from "@/components/LocalizedLink";
import { MapPin, Briefcase, ArrowUpRight } from "lucide-react";
import { Heading, Text } from "@/components/ui/Typography";
import { useTranslation } from "react-i18next";
import { truncateText } from "@/lib/utils";

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
    <LocalizedLink
      href={`/karieri/${slug}`}
      prefetch
      className="group bg-lime-600/10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-6 hover:bg-lime-600/20 transition-colors no-underline"
    >
      <div className="flex-1">
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

        <Heading as="h3" className="text-xl md:text-2xl font-normal mb-3">
          {title}
        </Heading>

        {shortDescription && (
          <Text variant="body-14" className="text-slate-700 leading-relaxed">
            {truncateText(shortDescription, 200)}
          </Text>
        )}
      </div>

      <div className="flex-shrink-0">
        <span className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-green bg-brand-green text-dark py-3 pl-6 pr-1.5 text-base font-normal transition-all duration-300 group-hover:bg-brand-green/90">
          {t("view_details")}
          <span className="flex items-center justify-center w-[38px] h-[38px] rounded-full bg-dark-green text-white">
            <ArrowUpRight className="w-5 h-5" strokeWidth={2} />
          </span>
        </span>
      </div>
    </LocalizedLink>
  );
}
