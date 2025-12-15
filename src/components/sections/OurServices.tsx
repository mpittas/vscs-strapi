import { Heading, Text } from "@/components/ui/Typography";
import Button from "@/components/ui/Button";
import ServiceIconBox from "@/components/ui/ServiceIconBox";

const services = [
  {
    icon: "/icons/project-tools-icon-green.svg",
    title: "Разработка на проекти",
    description:
      "Изготвяме пълен инженеринг на фотоволтаичната система, съобразен с вашите енергийни нужди и спецификата на обекта.",
  },
  {
    icon: "/icons/truck-worldwide-icon-green.svg",
    title: "Доставка на материали",
    description:
      "Осигуряваме доставка на висок клас соларни панели, инвертори и монтажни конструкции от водещи световни производители.",
  },
  {
    icon: "/icons/hand-tool-icon-green.svg",
    title: "Строителни работи",
    description:
      "Извършваме подготовка на терена и професионален монтаж на носещите конструкции.",
  },
  {
    icon: "/icons/plug-solar-icon-green.svg",
    title: "Електромеханични работи",
    description:
      "Изпълняваме цялостното окабеляване, монтаж на инвертори, табла и защити.",
  },
];

export default function OurServices() {
  return (
    <section
      className="py-20 lg:py-28"
      style={{
        background: "linear-gradient(180deg, #001D13 0%, #022D1E 100%)",
      }}
    >
      <div className="container">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-16 mb-16 lg:mb-20">
          {/* Left - Title */}
          <div className="lg:max-w-2xl">
            <Text variant="small-title" className="mb-4 block text-brand-green">
              НАШИТЕ УСЛУГИ
            </Text>
            <Heading as="h2" className="text-white">
              Иновации в технологиите и екологичните решения
            </Heading>
          </div>

          {/* Right - CTA Button */}
          <div className="lg:pt-6">
            <Button variant="primary" size="md" href="/kontakt" showIcon>
              Свържете се с нас
            </Button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceIconBox
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              iconAlt={service.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
