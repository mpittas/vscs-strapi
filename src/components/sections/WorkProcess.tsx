import Image from "next/image";
import { Heading, Text } from "@/components/ui/Typography";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

interface ProcessStep {
  title: string;
  icon: string;
  href?: string;
}

const processSteps: ProcessStep[] = [
  {
    title: "Проектиране и Инженеринг",
    icon: "/icons/page-ruler-black-icon.svg",
    href: "#",
  },
  {
    title: "Доставка и Логистика",
    icon: "/icons/page-ruler-black-icon.svg",
    href: "#",
  },
  {
    title: "Строителство и Монтаж",
    icon: "/icons/page-ruler-black-icon.svg",
    href: "#",
  },
  {
    title: "Тестване и Пуск",
    icon: "/icons/page-ruler-black-icon.svg",
    href: "#",
  },
  {
    title: "Поддръжка",
    icon: "/icons/page-ruler-black-icon.svg",
    href: "#",
  },
];

function ProcessCard({ step }: { step: ProcessStep }) {
  return (
    <div className="flex flex-col justify-between bg-brand-green rounded-2xl p-6 min-h-[220px] transition-all duration-300 hover:bg-brand-green-dark">
      {/* Icon */}
      <div className="mb-6">
        <Image
          src={step.icon}
          alt=""
          width={40}
          height={40}
          className="opacity-80"
        />
      </div>

      {/* Title */}
      <div>
        <Heading as="h6" className="text-dark-green mb-4">
          {step.title}
        </Heading>

        {/* Read More Link */}
        <a
          href={step.href || "#"}
          className="inline-flex items-center gap-2 text-dark-green text-sm group"
        >
          <span className="w-5 h-5 rounded-full bg-black/70 group-hover:bg-dark-green/70 transition-colors bg-[url('/icons/small-chevron.svg')] bg-[length:5px] bg-[position:50%_50%] bg-no-repeat" />
          <span className="group-hover:underline font-medium text-black/70 relative top-[1px]">
            Прочети още
          </span>
        </a>
      </div>
    </div>
  );
}

export default function WorkProcess() {
  return (
    <Section paddingY="xl" className="bg-white">
      <Container>
        {/* Header */}
        <div className="mb-12">
          <Heading as="h2" className="mb-4">
            Процес на работа
          </Heading>

          <Text variant="body-16" className="text-slate-600 max-w-xl">
            Пълен инженеринг, строителство и управление на проекти в България и
            чужбина.
          </Text>
        </div>

        {/* Process Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {processSteps.map((step, index) => (
            <ProcessCard key={index} step={step} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
