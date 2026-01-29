"use client";

import Image from "next/image";
import { Heading, Text } from "@/components/ui/Typography";
import Container from "@/components/ui/Container";

const installationTypes = [
  {
    title: "Наземни централи",
    description: "Фиксиран наклон и едноосни тракери.",
    image: "/images/type-of-service-1.jpg",
  },
  {
    title: "Индустриални и покривни решения",
    description: "BIPV (интегрирани фотоволтаици) и покривни конструкции.",
    image: "/images/type-of-service-2.jpg",
  },
  {
    title: "Хибридни системи",
    description: "Островни системи и решения за съхранение на енергия.",
    image: "/images/type-of-service-3.jpg",
  },
];

export default function InstallationTypes() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <Heading as="h2" className="mb-6 text-slate-900">
            Видове инсталации и технологии
          </Heading>
          <Text className="text-slate-600">
            Ultrices gravida dictum fusce ut placerat orci nulla pellentesque.
            Aliquet porttitor lacus luctus accumsan tortor.
          </Text>
        </div>

        {/* Cards Row */}
        <div className="flex flex-col lg:flex-row gap-6">
          {installationTypes.map((type, index) => (
            <div key={index} className="flex-1 flex flex-col">
              {/* Image */}
              <div className="relative h-[240px] rounded-[20px] overflow-hidden mb-6">
                <Image
                  src={type.image}
                  alt={type.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div>
                <Heading
                  as="h4"
                  className="mb-2 text-[22px] font-bold text-slate-900"
                >
                  {type.title}
                </Heading>
                <Text className="text-slate-600 text-base">
                  {type.description}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
