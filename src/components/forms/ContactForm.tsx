"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import { Heading } from "@/components/ui/Typography";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { useTranslation } from "react-i18next";

const initialFormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  message: "",
};

export default function ContactForm() {
  const { t } = useTranslation("contacts");
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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, _gotcha: honeypot }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit contact form");
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
      <div>
        <Heading as="h2" className="text-2xl md:text-3xl font-normal mb-2">
          {t("form.title")}
        </Heading>
        <p className="text-green-700">{t("form.success")}</p>
      </div>
    );
  }

  return (
    <div className="">
      <Heading as="h2" className="text-2xl md:text-3xl font-normal mb-2">
        {t("form.title")}
      </Heading>
      <p className="text-slate-500 mb-8">{t("form.description")}</p>

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
            id="name"
            name="name"
            label={t("form.name")}
            placeholder={t("form.name_placeholder")}
            type="text"
            required
            value={formData.name}
            onChange={(event) => updateField("name", event.target.value)}
          />
          <Input
            id="company"
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
            id="email"
            name="email"
            label={t("form.email")}
            placeholder={t("form.email_placeholder")}
            type="email"
            required
            value={formData.email}
            onChange={(event) => updateField("email", event.target.value)}
          />
          <Input
            id="phone"
            name="phone"
            label={t("form.phone")}
            placeholder={t("form.phone_placeholder")}
            type="tel"
            value={formData.phone}
            onChange={(event) => updateField("phone", event.target.value)}
          />
        </div>

        <Textarea
          id="message"
          name="message"
          label={t("form.message")}
          placeholder={t("form.message_placeholder")}
          required
          value={formData.message}
          onChange={(event) => updateField("message", event.target.value)}
        />

        {error ? <p className="text-red-600 text-sm">{error}</p> : null}

        <div className="pt-2">
          <Button
            type="submit"
            variant="black"
            className="px-8 py-3 rounded-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? t("form.submitting") : t("form.submit")}
          </Button>
        </div>
      </form>
    </div>
  );
}
