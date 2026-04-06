"use client";

import { cn } from "@/lib/utils";
import { Text } from "@/components/ui/Typography";

interface MarqueeProps {
  className?: string;
  speed?: "slow" | "normal" | "fast";
}

import { useTranslation } from "react-i18next";

// Marquee items - these are the titles that will scroll

// Asterisk separator component
const AsteriskSeparator = () => (
  <span className="mx-6 text-brand-green text-4xl font-light select-none">
    ✳
  </span>
);

export default function Marquee({ className, speed = "normal" }: MarqueeProps) {
  const { t } = useTranslation("marquee");
  const items = t("items", { returnObjects: true });
  const marqueeItems = Array.isArray(items) ? (items as string[]) : [];

  // Speed classes for the animation
  const speedClasses = {
    slow: "animate-marquee-slow",
    normal: "animate-marquee",
    fast: "animate-marquee-fast",
  };

  // Render the list of items twice for seamless infinite scroll
  const renderMarqueeItems = () => (
    <>
      {marqueeItems.map((item, index) => (
        <span key={index} className="flex items-center whitespace-nowrap">
          <Text variant="body-22" className="text-white tracking-wide">
            {item}
          </Text>
          <AsteriskSeparator />
        </span>
      ))}
    </>
  );

  return (
    <section
      className={cn("bg-dark-green py-5 overflow-hidden relative", className)}
    >
      {/* Marquee container */}
      <div className="flex">
        {/* First set - animates */}
        <div className={cn("flex items-center shrink-0", speedClasses[speed])}>
          {renderMarqueeItems()}
        </div>

        {/* Duplicate set for seamless loop */}
        <div className={cn("flex items-center shrink-0", speedClasses[speed])}>
          {renderMarqueeItems()}
        </div>
      </div>
    </section>
  );
}
