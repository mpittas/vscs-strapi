import { contactInfo } from "@/data/homepage";
import { LocationIcon, PhoneIcon, EmailIcon } from "@/components/ui/Icons";
import { Heading, Text } from "@/components/ui/Typography";
import Section from "@/components/ui/Section";

export default function Contact() {
  return (
    <Section paddingY="xl" bgColor="white">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Text
            variant="body-14-sb"
            className="text-solar-orange font-semibold uppercase tracking-wider"
          >
            Контакти
          </Text>
          <Heading as="h2" className="text-slate-900 mt-2">
            Свържете се с нас
          </Heading>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-solar-orange/10 flex items-center justify-center text-solar-orange flex-shrink-0">
                <LocationIcon />
              </div>
              <div>
                <Heading as="h3" className="font-bold text-slate-900 text-lg">
                  Адрес
                </Heading>
                <Text className="text-slate-600">{contactInfo.address}</Text>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-solar-orange/10 flex items-center justify-center text-solar-orange flex-shrink-0">
                <PhoneIcon />
              </div>
              <div>
                <Heading as="h3" className="font-bold text-slate-900 text-lg">
                  Телефон
                </Heading>
                <Text className="text-slate-600">{contactInfo.phone}</Text>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-solar-orange/10 flex items-center justify-center text-solar-orange flex-shrink-0">
                <EmailIcon />
              </div>
              <div>
                <Heading as="h3" className="font-bold text-slate-900 text-lg">
                  Имейл
                </Heading>
                <Text className="text-slate-600">{contactInfo.email}</Text>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="aspect-[4/3] lg:aspect-auto lg:h-full rounded-xl overflow-hidden bg-slate-200 min-h-[300px]">
            <iframe
              src={contactInfo.mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "300px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
