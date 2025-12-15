"use client";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  className?: string;
  speed?: "slow" | "normal" | "fast";
}

// Marquee items - these are the titles that will scroll
const marqueeItems = [
  "Инсталация",
  "Възобовяема енергия",
  "Солар ни инсталации",
  "Услуги до ключ",
  "Професионален монтаж",
  "Консултации",
  "Поддръжка",
  "Гаранция",
];

// Asterisk separator component
const AsteriskSeparator = () => (
  <span className="mx-6 text-brand-green text-4xl font-light select-none">
    ✳
  </span>
);

export default function Marquee({ className, speed = "normal" }: MarqueeProps) {
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
          <span className="text-white text-xl md:text-2xl tracking-wide">
            {item}
          </span>
          <AsteriskSeparator />
        </span>
      ))}
    </>
  );

  return (
    <section
      className={cn(
        "bg-dark-green py-5 overflow-hidden relative",
        className
      )}
    >
      {/* Marquee container */}
      <div className="flex">
        {/* First set - animates */}
        <div
          className={cn(
            "flex items-center shrink-0",
            speedClasses[speed]
          )}
        >
          {renderMarqueeItems()}
        </div>
        
        {/* Duplicate set for seamless loop */}
        <div
          className={cn(
            "flex items-center shrink-0",
            speedClasses[speed]
          )}
        >
          {renderMarqueeItems()}
        </div>
      </div>
    </section>
  );
}
