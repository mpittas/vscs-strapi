"use client";

import Link from "next/link";
import { Heading, Text } from "@/components/ui/Typography";

const services = [
  {
    title: "Разработка на проекти",
    description:
      "Цялостно проектиране и инженеринг на фотоволтаични централи, съобразени с вашите нужди и регулаторни изисквания.",
    href: "#",
    icon: (
      <svg
        className="w-16 h-16"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="12"
          y="8"
          width="40"
          height="48"
          rx="2"
          stroke="#B8D935"
          strokeWidth="2"
        />
        <path
          d="M20 16H44"
          stroke="#B8D935"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M20 24H44"
          stroke="#B8D935"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M20 32H32"
          stroke="#B8D935"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M40 40L50 50"
          stroke="#B8D935"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Услуги до ключ",
    description:
      "Пълно управление на инвестиционния процес – от първоначалния анализ и разрешителни до въвеждането в експлоатация.",
    href: "#",
    icon: (
      <svg
        className="w-16 h-16"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="24" cy="32" r="12" stroke="#B8D935" strokeWidth="2" />
        <path d="M36 32H56" stroke="#B8D935" strokeWidth="2" />
        <path d="M52 32V40" stroke="#B8D935" strokeWidth="2" />
        <path d="M44 32V40" stroke="#B8D935" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: "Строителни работи",
    description:
      "Професионално изпълнение на всички съпътстващи строителни дейности, подготовка на терена, ограждане и инфраструктура.",
    href: "#",
    icon: (
      <svg
        className="w-16 h-16"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 56H56"
          stroke="#B8D935"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M24 56V24L32 16L40 24V56"
          stroke="#B8D935"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <rect
          x="28"
          y="32"
          width="8"
          height="8"
          stroke="#B8D935"
          strokeWidth="2"
        />
        <path d="M24 24H40" stroke="#B8D935" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: "Електромеханични работи",
    description:
      "Прецизен монтаж на конструкции (тракери, покривни системи), инсталиране на панели и електрическо свързване.",
    href: "#",
    icon: (
      <svg
        className="w-16 h-16"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="32" cy="32" r="16" stroke="#B8D935" strokeWidth="2" />
        <path d="M32 16V8" stroke="#B8D935" strokeWidth="2" />
        <path d="M32 56V48" stroke="#B8D935" strokeWidth="2" />
        <path d="M48 32H56" stroke="#B8D935" strokeWidth="2" />
        <path d="M8 32H16" stroke="#B8D935" strokeWidth="2" />
        <path
          d="M32 24L36 28L30 34L34 38"
          stroke="#B8D935"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function WhatWeOffer() {
  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: "#0a1628" }}>
      <div className="container">
        {/* Header Section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-16 lg:mb-20">
          <div>
            <Text
              variant="body-14"
              className="font-semibold tracking-[0.25em] uppercase mb-4 block"
              style={{ color: "#94a3b8" }}
            >
              НАШИТЕ УСЛУГИ
            </Text>
            <Heading
              as="h2"
              className="text-4xl lg:text-5xl font-bold leading-tight"
              style={{ color: "#ffffff" }}
            >
              Какво Предлагаме
            </Heading>
          </div>
          <div className="lg:pt-8">
            <Text style={{ color: "#94a3b8" }} className="mb-4 leading-relaxed">
              Ние предлагаме комплексни решения за вашия соларен бизнес, от
              проектиране и доставка на материали до строителство, монтаж и
              поддръжка на най-високо качество.
            </Text>
            <Text style={{ color: "#94a3b8" }} className="leading-relaxed">
              Нашият екип от професионалисти е тук, за да осигури надеждност и
              дългосрочна ефективност на вашите фотоволтаични системи.
            </Text>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group flex flex-col items-start">
              {/* Icon */}
              <div className="mb-6">{service.icon}</div>

              {/* Title */}
              <Heading
                as="h3"
                className="text-lg font-semibold mb-4 leading-snug"
                style={{ color: "#ffffff" }}
              >
                {service.title}
              </Heading>

              {/* Description */}
              <Text
                style={{ color: "#94a3b8" }}
                className="mb-6 leading-relaxed text-sm"
              >
                {service.description}
              </Text>

              {/* Arrow Link */}
              <Link
                href={service.href}
                className="mt-auto inline-flex items-center transition-transform group-hover:translate-x-1"
                style={{ color: "#B8D935" }}
              >
                <span className="sr-only">Научете повече</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
