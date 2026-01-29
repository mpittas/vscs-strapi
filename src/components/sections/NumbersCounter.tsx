"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";

interface CounterItem {
  icon: string;
  value: number;
  suffix: string;
  label: string;
}

const counterData: CounterItem[] = [
  {
    icon: "/icons/trophy-icon-green.svg",
    value: 50,
    suffix: "+",
    label: "Завършени проекта",
  },
  {
    icon: "/icons/globe-icon-green.svg",
    value: 12,
    suffix: "",
    label: "Държави",
  },
  {
    icon: "/icons/bolt-icon-green.svg",
    value: 300,
    suffix: "MW",
    label: "Инсталирана мощност",
  },
  {
    icon: "/icons/users-icon-green.svg",
    value: 100,
    suffix: "%",
    label: "Доволни клиенти",
  },
];

function useCountUp(
  target: number,
  isVisible: boolean,
  duration: number = 2000,
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [target, isVisible, duration]);

  return count;
}

function CounterCard({
  item,
  isVisible,
  isLast,
}: {
  item: CounterItem;
  isVisible: boolean;
  isLast: boolean;
}) {
  const count = useCountUp(item.value, isVisible);

  return (
    <div
      className={`flex flex-col items-center text-center px-6 py-5 md:py-10 ${
        !isLast ? "md:border-r md:border-black/5" : ""
      }`}
    >
      <div className="w-8 h-8 md:w-10 md:h-10 mb-4 relative">
        <Image src={item.icon} alt="" fill className="object-contain" />
      </div>
      <div className="text-4xl font-normal text-slate-900 mb-2">
        {count}
        <span className="text-2xl md:text-4xl">{item.suffix}</span>
      </div>
      <div className="text-sm md:text-base text-slate-600">{item.label}</div>
    </div>
  );
}

export default function NumbersCounter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.3,
        rootMargin: "0px",
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{ backgroundColor: "#EBF8DA" }}>
      <Container>
        <div className="rounded-2xl grid grid-cols-2 md:grid-cols-4 bg-[#EBF8DA] py-6 md:py-0">
          {counterData.map((item, index) => (
            <CounterCard
              key={index}
              item={item}
              isVisible={isVisible}
              isLast={index === counterData.length - 1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
