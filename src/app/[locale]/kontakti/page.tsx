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
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  const { t } = await initTranslations(locale, ["contacts"]);

  return {
    title: t("contacts:metadata.title"),
    description: t("contacts:metadata.description"),
  };
};

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

export default async function ContactsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { t, resources } = await initTranslations(locale, [
    "contacts",
    "common",
  ]);

  const contactInfoItems = [
    {
      icon: MapPin,
      label: t("contacts:info_labels.address"),
      value: t("contacts:info_values.address"),
    },
    {
      icon: Clock,
      label: t("contacts:info_labels.working_hours"),
      value: t("contacts:info_values.working_hours"),
    },
    {
      icon: Phone,
      label: t("contacts:info_labels.phone"),
      value: t("contacts:info_values.phone"), // Assuming phone doesn't need translation, but structure supports it
    },
    {
      icon: Mail,
      label: t("contacts:info_labels.email"),
      value: t("contacts:info_values.email"), // Assuming email doesn't need translation
    },
  ];

  return (
    <TranslationsProvider
      locale={locale}
      resources={resources}
      namespaces={["contacts", "common"]}
    >
      <PageTitle
        title={t("contacts:page_title")}
        breadcrumbs={[
          { label: t("common:nav.home"), href: "/" },
          { label: t("contacts:breadcrumbs.contacts") },
        ]}
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
                      {t("contacts:sidebar.other_info")}
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
                      {t("contacts:sidebar.follow_us")}
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
    </TranslationsProvider>
  );
}
