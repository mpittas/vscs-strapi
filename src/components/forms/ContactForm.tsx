"use client";

import React from "react";
import Button from "@/components/ui/Button";
import { Heading } from "@/components/ui/Typography";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { useTranslation } from "react-i18next";

export default function ContactForm() {
  const { t } = useTranslation("contacts");

  return (
    <div className="">
      <Heading as="h2" className="text-2xl md:text-3xl font-normal mb-2">
        {t("form.title")}
      </Heading>
      <p className="text-slate-500 mb-8">{t("form.description")}</p>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            id="name"
            label={t("form.name")}
            placeholder={t("form.name_placeholder")}
            type="text"
          />
          <Input
            id="company"
            label={t("form.company")}
            placeholder={t("form.company_placeholder")}
            type="text"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            id="email"
            label={t("form.email")}
            placeholder={t("form.email_placeholder")}
            type="email"
          />
          <Input
            id="phone"
            label={t("form.phone")}
            placeholder={t("form.phone_placeholder")}
            type="tel"
          />
        </div>

        <Textarea
          id="message"
          label={t("form.message")}
          placeholder={t("form.message_placeholder")}
        />

        <div className="pt-2">
          <Button variant="black" className="px-8 py-3 rounded-full">
            {t("form.submit")}
          </Button>
        </div>
      </form>
    </div>
  );
}
