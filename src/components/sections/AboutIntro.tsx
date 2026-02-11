"use client";

import Image from "next/image";
import BadgeDefault from "@/components/ui/BadgeDefault";
import { useTranslation } from "react-i18next";

export default function AboutIntro() {
  const { t } = useTranslation("about");

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Badge */}
          <BadgeDefault>{t("intro.badge")}</BadgeDefault>

          <div>
            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-slate-900 mb-8 max-w-3xl">
              {t("intro.title")}
            </h2>

            {/* Description paragraphs */}
            <div className="max-w-4xl mb-12 space-y-6">
              <p className="text-slate-600 text-lg leading-relaxed">
                {t("intro.description_1")}
              </p>
              <p className="text-slate-600 text-lg leading-relaxed">
                {t("intro.description_2")}
              </p>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {/* Image */}
          <div className="lg:col-span-2 relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80"
              alt="Solar panel installation team"
              fill
              className="object-cover"
            />
          </div>

          {/* Feature Cards */}
          <div className="flex flex-col gap-4">
            {/* Trust Card */}
            <div className="bg-[#022519] text-white p-6 rounded-2xl flex-1">
              <h4 className="text-xl text-white font-normal mb-4">
                {t("intro.cards.trust.title")}
              </h4>
              <p className="text-white/90 leading-relaxed">
                {t("intro.cards.trust.description")}
              </p>
            </div>

            {/* Innovation Card */}
            <div className="bg-[#9DE044] p-6 rounded-2xl flex-1">
              <h4 className="text-xl text-black font-normal mb-4">
                {t("intro.cards.innovation.title")}
              </h4>
              <p className="text-black/90 leading-relaxed">
                {t("intro.cards.innovation.description")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
