import type { Metadata } from "next";
import PageTitle from "@/components/ui/PageTitle";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { Heading } from "@/components/ui/Typography";
import { MapPin, Clock, Phone, Mail, Facebook, Linkedin } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Контакти | VSCS",
  description: "Свържете се с нас за консултация или запитване.",
};

export default function ContactsPage() {
  return (
    <>
      <PageTitle
        title="Контакти"
        breadcrumbs={[{ label: "Начало", href: "/" }, { label: "Контакти" }]}
        // The image shows a subtitle as well, but PageTitle component might not support it yet.
        // Ill double check PageTitle component. It handles breadcrumbs and title.
        // If I need subtitle, I might need to modify PageTitle or add it below.
        // Image text: "Свържете се с нас за консултация, запитване или сътрудничество. Нашият екип е на разположение."
      />

      <Section className="py-24 bg-white" paddingY="none">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            {/* Left Column - Contact Form */}
            <div className="lg:col-span-8">
              <ContactForm />
            </div>

            {/* Right Column - Contact Info */}
            <div className="lg:col-span-4 space-y-10 lg:pl-4">
              <div>
                <Heading as="h3" className="text-xl font-medium mb-8">
                  Друга информация
                </Heading>

                <div className="space-y-8">
                  {/* Address */}
                  <div className="flex gap-4">
                    <div className="shrink-0 text-[#b4d429]">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                        АДРЕС
                      </div>
                      <div className="text-slate-900 font-medium leading-snug">
                        ж.к. Подбалканска, ул. "Петропавловска" 6, Враца,
                        България
                      </div>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex gap-4">
                    <div className="shrink-0 text-[#b4d429]">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                        РАБОТНО ВРЕМЕ
                      </div>
                      <div className="text-slate-900 font-medium leading-snug">
                        Понеделник - Петък: 09:00 - 18:00 часа
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-4">
                    <div className="shrink-0 text-[#b4d429]">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                        ТЕЛЕФОН
                      </div>
                      <div className="text-slate-900 font-medium leading-snug">
                        +359 877 15 98 58
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-4">
                    <div className="shrink-0 text-[#b4d429]">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                        ИМЕЙЛ
                      </div>
                      <div className="text-slate-900 font-medium leading-snug">
                        office@vscs-bg.com
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div className="pt-6 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                  ПОСЛЕДВАЙТЕ НИ:
                </div>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-[#b4d429] hover:text-black transition-all"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-[#b4d429] hover:text-black transition-all"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
