"use client";

import { useState } from "react";
import { Heading, Text } from "@/components/ui/Typography";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { useTranslation } from "react-i18next";

const initialFormState = {
  email: "",
  phone: "",
  message: "",
};

export default function ConsultationForm() {
  const { t } = useTranslation("about");
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = (field: keyof typeof initialFormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const form = event.currentTarget;
    const honeypot = (
      form.elements.namedItem("_gotcha") as HTMLInputElement
    )?.value;

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "section",
          ...formData,
          _gotcha: honeypot,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit consultation form");
      }

      setFormData(initialFormState);
      form.reset();
      setIsSubmitted(true);
    } catch {
      setError(t("consultation.form.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section paddingY="xl" className="bg-[#001D13] relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-5"
        style={{
          backgroundImage: "url('/images/solar-panels-landscape-min.jpg')",
        }}
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
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

          <div className="bg-white rounded-2xl p-8">
            {isSubmitted ? (
              <p className="text-green-700">{t("consultation.form.success")}</p>
            ) : (
              <form
                className="flex flex-col gap-6"
                onSubmit={handleSubmit}
                noValidate
              >
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

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
                    name="email"
                    required
                    placeholder={t("consultation.form.email_placeholder")}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
                    value={formData.email}
                    onChange={(event) =>
                      updateField("email", event.target.value)
                    }
                  />
                </div>

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
                    name="phone"
                    required
                    placeholder={t("consultation.form.phone_placeholder")}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
                    value={formData.phone}
                    onChange={(event) =>
                      updateField("phone", event.target.value)
                    }
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-normal text-slate-700"
                  >
                    {t("consultation.form.message_label")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder={t("consultation.form.message_placeholder")}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent resize-none"
                    value={formData.message}
                    onChange={(event) =>
                      updateField("message", event.target.value)
                    }
                  />
                </div>

                {error ? <p className="text-red-600 text-sm">{error}</p> : null}

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? t("consultation.form.submitting")
                    : t("consultation.form.submit_btn")}
                </Button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
