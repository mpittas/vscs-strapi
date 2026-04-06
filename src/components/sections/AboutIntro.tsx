"use client";
import Image from "next/image";
import BadgeDefault from "@/components/ui/BadgeDefault";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import ReadMoreButton from "@/components/ui/ReadMoreButton";

export default function AboutIntro() {
  const { t } = useTranslation("about");
  const [isExpanded, setIsExpanded] = useState(false);

  const moreParagraphs = t("intro.more_paragraphs", {
    returnObjects: true,
  }) as string[];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Badge */}
          <BadgeDefault>{t("intro.badge")}</BadgeDefault>

          <div className="flex-1">
            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-slate-900 mb-8 max-w-3xl">
              {t("intro.title")}
            </h2>

            {/* Description paragraphs */}
            <div className="max-w-4xl mb-12">
              <p className="text-slate-700 text-lg leading-relaxed mb-6">
                {t("intro.description_1")}
              </p>
              <p className="text-slate-700 text-lg leading-relaxed mb-6">
                {t("intro.description_2")}
              </p>

              {/* Revealable content */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isExpanded
                    ? "max-h-[2000px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="space-y-6 pt-0 pb-6">
                  {Array.isArray(moreParagraphs) &&
                    moreParagraphs.map((paragraph, index) => (
                      <p
                        key={index}
                        className="text-slate-700 text-lg leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
                </div>
              </div>

              <div className="mt-2">
                <ReadMoreButton
                  onClick={() => setIsExpanded(!isExpanded)}
                  isExpanded={isExpanded}
                  text={
                    isExpanded ? t("intro.read_less") : t("intro.read_more")
                  }
                  circleColor="bg-brand-green"
                  circleHoverColor="bg-dark-green"
                  textColor="text-slate-900"
                  iconColor="text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Image */}
          <div className="lg:col-span-6 relative min-h-[400px] rounded-2xl overflow-hidden">
            <Image
              src="/images/vscs-solar-panels-field_converted.avif"
              alt="Solar panel installation team"
              fill
              className="object-cover"
            />
          </div>

          {/* Feature Cards */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* Trust Card */}
            <div className="bg-[#022519] text-white p-8 rounded-2xl flex-1 flex flex-col justify-center">
              <h4 className="text-xl md:text-2xl text-white font-normal mb-4">
                {t("intro.cards.trust.title")}
              </h4>
              <p className="text-white/90 leading-relaxed text-lg">
                {t("intro.cards.trust.description")}
              </p>
            </div>

            {/* Innovation Card */}
            <div className="bg-[#9DE044] p-8 rounded-2xl flex-1 flex flex-col justify-center">
              <h4 className="text-xl md:text-2xl text-black font-normal mb-4">
                {t("intro.cards.innovation.title")}
              </h4>
              <p className="text-black/90 leading-relaxed text-lg">
                {t("intro.cards.innovation.description")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
