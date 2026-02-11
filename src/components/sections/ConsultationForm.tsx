"use client";

import { Heading, Text } from "@/components/ui/Typography";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { useTranslation } from "react-i18next";

export default function ConsultationForm() {
  const { t } = useTranslation("about");

  return (
    <Section paddingY="xl" className="bg-[#001D13] relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-5"
        style={{
          backgroundImage: "url('/images/solar-panels-landscape-min.jpg')",
        }}
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Text Content */}
          <div className="lg:max-w-lg">
            <Heading as="h2" className="text-white mb-6">
              {t("consultation.title_part1")}{" "}
              <span className="text-brand-green">
                {t("consultation.title_part2")}
              </span>{" "}
              {t("consultation.title_part3")}
            </Heading>

            <Text variant="body-16" className="text-white/70">
              {t("consultation.description")}
            </Text>
          </div>

          {/* Right - Form */}
          <div className="bg-white rounded-2xl p-8">
            <form className="flex flex-col gap-6">
              {/* Email Field */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-normal text-slate-700"
                >
                  {t("consultation.form.email_label")}
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder={t("consultation.form.email_placeholder")}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
                />
              </div>

              {/* Phone Field */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-normal text-slate-700"
                >
                  {t("consultation.form.phone_label")}
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder={t("consultation.form.phone_placeholder")}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
                />
              </div>

              {/* Message Field */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-sm font-normal text-slate-700"
                >
                  {t("consultation.form.message_label")}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder={t("consultation.form.email_placeholder")} // Fallback or separate placeholder if needed
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent resize-none"
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" variant="primary" size="md" fullWidth>
                {t("consultation.form.submit_btn")}
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </Section>
  );
}
