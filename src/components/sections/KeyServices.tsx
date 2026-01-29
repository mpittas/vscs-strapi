"use client";

import Image from "next/image";
import { Heading, Text } from "@/components/ui/Typography";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

const services = [
  {
    title: "Подготовка и Конструкция",
    description:
      "Пълна подготовка на терена и механичен монтаж на съоръженията.",
    image: "/images/man-in-solar-panel-field.jpg",
    icon: "/icons/project-icon-dark.svg",
    items: [
      "Подготовка на терен, изкопни работи и фундаменти.",
      "Изграждане на вътрешни пътища и ограждане.",
      "Набиване на пилони и монтаж на тракери/конструкции.",
    ],
  },
  {
    title: "Електрически инсталации",
    description:
      "Професионално окабеляване и свързване на системата към мрежата.",
    image: "/images/team-crew-inspecting-panels.jpg",
    icon: "/icons/project-icon-dark.svg",
    items: [
      "Полагане и терминиране на кабелни трасета (DC/AC)",
      "Монтаж на инвертори, трафопостове и BESS системи",
      "Тестване и въвеждане в експлоатация (Commissioning)",
    ],
  },
  {
    title: "Електрически инсталации",
    description:
      "Професионално окабеляване и свързване на системата към мрежата.",
    image: "/images/panel-rows-outdoors.jpg",
    icon: "/icons/project-icon-dark.svg",
    items: [
      "Доставка на кабели, заземителни елементи и осветление",
      "Фотоволтаични модули, инвертори и табла",
      "Специализирани конструкции и монтажни елементи",
    ],
  },
];

export default function KeyServices() {
  return (
    <section className="bg-[#EDEDED] py-20 lg:py-28">
      <Container>
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <Heading as="h2" className="mb-6">
              Ключови услуги
            </Heading>
            <Text className="text-slate-600 max-w-xl">
              Пъл ен инженеринг, строителство и управление на проекти в България
              и чужбина.
            </Text>
          </div>
          <Button href="/kontakti" variant="primary" showIcon>
            Свържете се с нас
          </Button>
        </div>

        {/* Cards Grid */}
        <div className="flex flex-col lg:flex-row gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-[10px] rounded-[22px] flex flex-col h-full flex-1"
            >
              {/* Image Section */}
              <div className="relative h-[240px] rounded-[20px] mb-6">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover rounded-[20px]"
                />

                {/* Icon Badge */}
                <div className="absolute bottom-[-14] left-4 w-16 h-16 rounded-full bg-brand-green flex items-center justify-center">
                  <Image
                    src={service.icon}
                    alt=""
                    width={30}
                    height={30}
                    className="text-black" // The SVG is black by default as per request
                  />
                </div>
              </div>

              {/* Content */}
              <div className="px-4 pb-6 flex-grow flex flex-col">
                <Heading as="h4" className="mb-2 text-[22px] font-bold">
                  {service.title}
                </Heading>

                <Text className="text-slate-600 text-base pb-5">
                  {service.description}
                </Text>

                <div className="mt-auto space-y-5 pt-5 border-t border-slate-100">
                  {service.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="inline-flex items-start gap-3 text-dark-green text-sm"
                    >
                      <span className="shrink-0 w-5 h-5 rounded-full bg-black mt-0.5 bg-[url('/icons/small-chevron.svg')] bg-[length:5px] bg-[position:50%_50%] bg-no-repeat" />
                      <span className="font-medium text-black leading-snug">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
