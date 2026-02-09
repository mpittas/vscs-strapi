import type { Metadata } from "next";
import PageTitle from "@/components/ui/PageTitle";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { Heading } from "@/components/ui/Typography";
import { MapPin, Clock, Phone, Mail } from "lucide-react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import ContactForm from "@/components/forms/ContactForm";
import ContactInfoItem from "@/components/ui/ContactInfoItem";
import Sidebar from "@/components/ui/Sidebar";

export const metadata: Metadata = {
  title: "Контакти | VSCS",
  description: "Свържете се с нас за консултация или запитване.",
};

const contactInfoItems = [
  {
    icon: MapPin,
    label: "АДРЕС",
    value: 'ж.к. Подбалканска, ул. "Петропавловска" 6, Враца, България',
  },
  {
    icon: Clock,
    label: "РАБОТНО ВРЕМЕ",
    value: "Понеделник - Петък: 09:00 - 18:00 часа",
  },
  {
    icon: Phone,
    label: "ТЕЛЕФОН",
    value: "+359 877 15 98 58",
  },
  {
    icon: Mail,
    label: "ИМЕЙЛ",
    value: "office@vscs-bg.com",
  },
];

const socialLinks = [
  {
    icon: FaFacebookF,
    href: "#",
    label: "Facebook",
  },
  {
    icon: FaLinkedinIn,
    href: "#",
    label: "LinkedIn",
  },
];

export default function ContactsPage() {
  return (
    <>
      <PageTitle
        title="Контакти"
        breadcrumbs={[{ label: "Начало", href: "/" }, { label: "Контакти" }]}
      />

      <Section className="py-24 bg-white" paddingY="none">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column - Contact Form */}
            <div className="lg:col-span-8">
              <ContactForm />
            </div>

            {/* Right Column - Contact Info */}
            <div className="lg:col-span-4 lg:pl-4">
              <Sidebar className="p-6 bg-slate-50 border border-slate-100">
                <div className="space-y-10">
                  <div>
                    <Heading as="h3" className="text-xl font-medium mb-8">
                      Друга информация
                    </Heading>

                    <div className="space-y-8">
                      {contactInfoItems.map((item) => (
                        <ContactInfoItem
                          key={item.label}
                          icon={item.icon}
                          label={item.label}
                          value={item.value}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Socials */}
                  <div className="pt-6 border-t border-slate-200">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                      ПОСЛЕДВАЙТЕ НИ:
                    </div>
                    <div className="flex gap-4">
                      {socialLinks.map((social) => (
                        <a
                          key={social.label}
                          href={social.href}
                          aria-label={social.label}
                          className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-[#b4d429] hover:text-black transition-all"
                        >
                          <social.icon className="w-5 h-5" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </Sidebar>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
