import Image from "next/image";
import { Heading, Text } from "@/components/ui/Typography";
import Container from "@/components/ui/Container";
import InfoItem from "@/components/ui/InfoItem";
import Section from "@/components/ui/Section";

const infoItems = [
  {
    title: "Професионален Екип",
    description: "Сертифицирани специалисти с дългогодишен опит",
  },
  {
    title: "Персонализирани Решения",
    description: "Системи, съобразени с вашите енергийни нужди",
  },
  {
    title: "Достъпни Планове",
    description: "Гъвкаво финансиране и насоки за максимизиране",
  },
  {
    title: "Текуща Поддръжка",
    description: "Пълна поддръжка и системен мониторинг след монтажа",
  },
  {
    title: "Качествено Оборудване",
    description: "Използваме първокласни слънчеви панели и инвертори",
  },
  {
    title: "Бърза Инсталация",
    description: "Ефективно изпълнение на проекта без компромис с качеството",
  },
];

export default function WhyUs() {
  return (
    <Section paddingY="xl" bgColor="dark">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Images */}
          <div className="relative pr-12 pb-12">
            {/* Main Image */}
            <div className="relative h-[300px] lg:h-[580px] rounded-4xl overflow-hidden ">
              <Image
                src="/images/why-us-big.jpg"
                alt="Solar panels installation"
                fill
                unoptimized
                className="object-cover"
              />

              {/* Stats Badge */}
              <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md rounded-3xl px-5 py-5 text-center">
                <Text className="text-white text-3xl lg:text-4xl font-normal mb-1">
                  325%
                </Text>
                <Text className="text-white/80 text-xs leading-tight">
                  Average increase
                  <br />
                  in solar panel
                </Text>
              </div>
            </div>

            {/* Overlapping Image with Badge */}
            <div className="absolute bottom-0 right-0 w-[200px] lg:w-[280px] h-[160px] lg:h-[360px] rounded-4xl overflow-hidden">
              <Image
                src="/images/why-us-sm.jpg"
                alt="Solar installation close-up"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Column - Content */}
          <div>
            {/* Subheading */}
            <Text variant="small-title" className="mb-4 block text-white/70">
              НАДЕЖДНИ И ДОСТЪПНИ
            </Text>

            {/* Title */}
            <Heading as="h2" className="text-white mb-12">
              Защо да
              <br />
              <span className="text-brand-green">изберете нас</span>?
            </Heading>

            {/* Info Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
              {infoItems.map((item, index) => (
                <InfoItem
                  key={index}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
