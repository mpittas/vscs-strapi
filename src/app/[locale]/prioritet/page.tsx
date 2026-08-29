import type { Metadata } from "next";
import {
  BatteryCharging,
  Clock3,
  Gauge,
  LineChart,
  Sparkles,
  Tags,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { Heading, Text } from "@/components/ui/Typography";
import PremiumWaitlistForm from "@/components/forms/PremiumWaitlistForm";
import PriorityHero from "@/components/sections/PriorityHero";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  const { t } = await initTranslations(locale, ["premium"]);

  return {
    title: t("premium:metadata.title"),
    description: t("premium:metadata.description"),
  };
};

const benefitIcons = {
  capacity: Gauge,
  sla: Clock3,
  rates: Tags,
  advanced: BatteryCharging,
  briefings: LineChart,
  founding: Sparkles,
} as const;

const benefitKeys = [
  "capacity",
  "sla",
  "rates",
  "advanced",
  "briefings",
  "founding",
] as const;

const stepKeys = ["step1", "step2", "step3"] as const;

export default async function PriorityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { t, resources } = await initTranslations(locale, [
    "premium",
    "common",
  ]);

  return (
    <TranslationsProvider
      locale={locale}
      resources={resources}
      namespaces={["premium", "common"]}
    >
      <PriorityHero />

      <Section className="py-20 md:py-24 bg-[#F4F4F4]" paddingY="none">
        <Container>
          <div className="max-w-2xl mb-14">
            <Text
              variant="body-14"
              className="text-brand-green uppercase tracking-widest font-medium mb-4"
            >
              {t("premium:benefits.subheader")}
            </Text>
            <Heading as="h2" className="text-3xl md:text-4xl font-normal">
              {t("premium:benefits.title")}
            </Heading>
          </div>

          <div data-reveal-group="" className="space-y-0 divide-y divide-slate-200 border-y border-slate-200">
            {benefitKeys.map((key) => {
              const Icon = benefitIcons[key];
              return (
                <div
                  key={key}
                  className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-5 md:gap-10 py-8 md:py-10"
                >
                  <div className="w-12 h-12 rounded-full bg-[#001D13] text-brand-green flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <Heading as="h3" className="text-xl md:text-2xl font-medium mb-2">
                      {t(`premium:benefits.items.${key}.title`)}
                    </Heading>
                    <Text variant="body-16" className="text-slate-600 max-w-2xl">
                      {t(`premium:benefits.items.${key}.description`)}
                    </Text>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section paddingY="lg" className="bg-white">
        <Container>
          <div className="max-w-2xl mb-12">
            <Text
              variant="body-14"
              className="text-brand-green uppercase tracking-widest font-medium mb-4"
            >
              {t("premium:steps.subheader")}
            </Text>
            <Heading as="h2" className="text-3xl md:text-4xl font-normal">
              {t("premium:steps.title")}
            </Heading>
          </div>

          <ol data-reveal-group="" className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {stepKeys.map((step, index) => (
              <li key={step} className="relative">
                <span className="block text-5xl md:text-6xl font-medium text-brand-green/40 mb-4">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Text variant="body-16" className="text-slate-700">
                  {t(`premium:steps.items.${step}`)}
                </Text>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section
        paddingY="xl"
        className="bg-[#001D13] relative overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: "url('/images/solar-bg-green-blur.jpg')",
          }}
        />

        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-7">
              <PremiumWaitlistForm />
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 text-white">
                <Text
                  variant="body-14"
                  className="text-brand-green uppercase tracking-wider mb-3"
                >
                  {t("premium:pricing.subheader")}
                </Text>
                <Heading as="h3" className="text-2xl text-white mb-4">
                  {t("premium:pricing.title")}
                </Heading>
                <Text variant="body-16" className="text-white/75 mb-6">
                  {t("premium:pricing.description")}
                </Text>
                <Text variant="body-14" className="text-white/50 mt-6">
                  {t("premium:pricing.note")}
                </Text>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </TranslationsProvider>
  );
}
