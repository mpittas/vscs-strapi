import { Heading } from "@/components/ui/Typography";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import IconTextBox from "@/components/ui/IconTextBox";
import Section from "@/components/ui/Section";
import BadgeDefault from "@/components/ui/BadgeDefault";

const values = [
  {
    icon: "/icons/plug-solar-icon-green.svg",
    title: "Екипна работа",
    description:
      "високо ниво на отдаденост и професионализъм, опит и разнообразие както на управленски, така и на изпълнителни нива",
  },
  {
    icon: "/icons/plug-solar-icon-green.svg",
    title: "Безопасност и надеждност",
    description:
      "Работа в стриктно съответствие с приложимите регулации за здраве, безопасност и опазване околната среда",
  },
  {
    icon: "/icons/plug-solar-icon-green.svg",
    title: "Безопасност и надеждност",
    description:
      "Работа в стриктно съответствие с приложимите регулации за здраве, безопасност и опазване околната среда",
  },
  {
    icon: "/icons/plug-solar-icon-green.svg",
    title: "Уважение",
    description:
      "Уважение, опит и професионализъм в отношенията със служителите и клиентите на дружеството",
  },
  {
    icon: "/icons/plug-solar-icon-green.svg",
    title: "Подкрепа",
    description:
      "Подкрепа за клиентите чрез оптимизиране на работата и предоставяне на разходно-ефективни решения за инсталиране на ФВЕЦ.",
  },
  {
    icon: "/icons/plug-solar-icon-green.svg",
    title: "Гъвкавост",
    description: "Ние сме тук когато и където клиентът има нужда от нас",
  },
];

export default function OurValues() {
  return (
    <Section paddingY="xl" className="bg-white">
      <Container>
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-16 mb-16 lg:mb-20">
          {/* Left - Badge and Title */}
          <div className="lg:max-w-2xl">
            <BadgeDefault className="mb-4">НАШИТЕ ЦЕННОСТИ</BadgeDefault>
            <Heading as="h2">
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

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <IconTextBox
              key={index}
              icon={value.icon}
              title={value.title}
              description={value.description}
              iconAlt={value.title}
              borderColor="border-slate-200"
              bgColor="bg-white"
              titleColor="text-slate-900"
              descriptionColor="text-slate-600"
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
