"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { Heading, Text } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const selectClassName =
  "w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 text-slate-900 focus:ring-2 focus:ring-[#b4d429] focus:outline-none transition-all";

const interests = [
  "utility",
  "commercial",
  "bess",
  "agripv",
  "other",
] as const;

const initialFormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  interest: "",
  message: "",
};

export default function PremiumWaitlistForm() {
  const { t } = useTranslation("premium");
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
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          _gotcha: honeypot,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit waitlist form");
      }

      setFormData(initialFormState);
      form.reset();
      setIsSubmitted(true);
    } catch {
      setError(t("form.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div
        id="waitlist"
        className="bg-white rounded-2xl p-8 md:p-10 shadow-xl scroll-mt-28"
      >
        <Heading as="h2" className="text-2xl md:text-3xl font-normal mb-2">
          {t("form.title")}
        </Heading>
        <Text variant="body-16" className="text-green-700">
          {t("form.success")}
        </Text>
      </div>
    );
  }

  return (
    <div
      id="waitlist"
      className="bg-white rounded-2xl p-8 md:p-10 shadow-xl scroll-mt-28"
    >
      <Heading as="h2" className="text-2xl md:text-3xl font-normal mb-2">
        {t("form.title")}
      </Heading>
      <Text variant="body-16" className="text-slate-500 mb-8">
        {t("form.description")}
      </Text>

      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            id="priority-name"
            name="name"
            label={t("form.name")}
            placeholder={t("form.name_placeholder")}
            type="text"
            required
            value={formData.name}
            onChange={(event) => updateField("name", event.target.value)}
          />
          <Input
            id="priority-company"
            name="company"
            label={t("form.company")}
            placeholder={t("form.company_placeholder")}
            type="text"
            value={formData.company}
            onChange={(event) => updateField("company", event.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            id="priority-email"
            name="email"
            label={t("form.email")}
            placeholder={t("form.email_placeholder")}
            type="email"
            required
            value={formData.email}
            onChange={(event) => updateField("email", event.target.value)}
          />
          <Input
            id="priority-phone"
            name="phone"
            label={t("form.phone")}
            placeholder={t("form.phone_placeholder")}
            type="tel"
            required
            value={formData.phone}
            onChange={(event) => updateField("phone", event.target.value)}
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <label
            htmlFor="priority-interest"
            className="text-sm font-medium text-slate-900"
          >
            {t("form.interest")}
          </label>
          <select
            id="priority-interest"
            name="interest"
            className={selectClassName}
            value={formData.interest}
            onChange={(event) => updateField("interest", event.target.value)}
            required
          >
            <option value="" disabled>
              {t("form.interest_placeholder")}
            </option>
            {interests.map((interest) => (
              <option key={interest} value={interest}>
                {t(`form.interests.${interest}`)}
              </option>
            ))}
          </select>
        </div>

        <Textarea
          id="priority-message"
          name="message"
          label={t("form.message")}
          placeholder={t("form.message_placeholder")}
          value={formData.message}
          onChange={(event) => updateField("message", event.target.value)}
        />

        {error ? <p className="text-red-600 text-sm">{error}</p> : null}

        <div className="pt-2 space-y-4">
          <Button
            type="submit"
            variant="primary"
            size="md"
            showIcon
            fullWidth
            disabled={isSubmitting}
          >
            {isSubmitting ? t("form.submitting") : t("form.submit")}
          </Button>
          <Text variant="body-14" className={cn("text-slate-400 text-center")}>
            {t("form.privacy_note")}
          </Text>
        </div>
      </form>
    </div>
  );
}
