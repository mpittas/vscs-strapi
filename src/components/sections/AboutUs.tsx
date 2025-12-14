import Image from "next/image";
import { Heading, Text } from "@/components/ui/Typography";
import Button from "@/components/ui/Button";
import { Check } from "lucide-react";

const features = [
  "Иновативни решения",
  "Устойчиво развитие",
  "Експертен екип",
  "Гарантирано качество",
];

export default function AboutUs() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Images */}
          <div className="relative">
            {/* Main images container */}
            <div className="flex gap-4 pb-20 pr-24">
              {/* First image */}
              <div className="flex-1 rounded-[50px] overflow-hidden z-1">
                <Image
                  src="/images/Enpal-KIT-Ruler-Solar-scaled.webp"
                  alt="Solar panel installation"
                  width={600}
                  height={800}
                  unoptimized
                  className="w-full h-[560px] object-cover rounded-4xl"
                />
              </div>

              <div className="absolute bottom-5 right-0 w-[60%] pr-4">
                <Image
                  src="/images/solar-bg-green-blur.jpg"
                  alt="Blurred solar background"
                  width={600}
                  height={600}
                  quality={100}
                  unoptimized
                  className="w-full h-[460px] object-cover rounded-[50px] blur-[10px]"
                />
              </div>
            </div>

            <div className="absolute top-5 -left-[25px] w-[90px] h-[90px] z-2">
              <Image
                src="/icons/globe-yellow-circle.svg"
                alt="Blurred solar background"
                width={90}
                height={90}
                quality={100}
                unoptimized
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="pt-8 lg:pt-0">
            {/* Title */}
            <div className="mb-6">
              <Heading as="h2">
                <span className="text-brand-green">Чиста и Възобновяема</span>{" "}
                Енергия Достъпна за Всички Потребители
              </Heading>
            </div>

            {/* Description */}
            <Text
              variant="body-16"
              className="text-slate-600 mb-8 leading-relaxed"
            >
              Ние сме повече от просто една компания за монтаж на фотоволтаични
              централи. Ние сме история за страст и интерес към възобновяемата
              енергия, вдъхновени от нашия общ стремеж да променим света към
              по-зелени и устойчиви решения.
            </Text>

            {/* Features list - 2x2 grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-10">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-dark-green text-white shrink-0">
                    <Check className="w-4 h-4" strokeWidth={2.5} />
                  </span>
                  <Text
                    variant="body-16"
                    className="text-slate-800 font-medium"
                  >
                    {feature}
                  </Text>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Button variant="black" size="md" href="/za-nas" showIcon>
              Научи още за нас
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
