"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { Heading, Text } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const selectClassName =
  "w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 text-slate-900 focus:ring-2 focus:ring-[#b4d429] focus:outline-none transition-all";

export default function ConsultationPageForm() {
  const { t } = useTranslation("consultation");

  const projectTypes = [
    "residential",
    "commercial",
    "industrial",
    "other",
  ] as const;

  const interests = [
    "installation",
    "design",
    "maintenance",
    "consulting",
  ] as const;

  return (
    <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl">
      <Heading as="h2" className="text-2xl md:text-3xl font-normal mb-2">
        {t("form.title")}
      </Heading>
      <Text variant="body-16" className="text-slate-500 mb-8">
        {t("form.description")}
      </Text>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            id="consultation-name"
            label={t("form.name")}
            placeholder={t("form.name_placeholder")}
            type="text"
            required
          />
          <Input
            id="consultation-company"
            label={t("form.company")}
            placeholder={t("form.company_placeholder")}
            type="text"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            id="consultation-email"
            label={t("form.email")}
            placeholder={t("form.email_placeholder")}
            type="email"
            required
          />
          <Input
            id="consultation-phone"
            label={t("form.phone")}
            placeholder={t("form.phone_placeholder")}
            type="tel"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="consultation-project-type"
              className="text-sm font-medium text-slate-900"
            >
              {t("form.project_type")}
            </label>
            <select
              id="consultation-project-type"
              className={selectClassName}
              defaultValue=""
              required
            >
              <option value="" disabled>
                {t("form.project_type_placeholder")}
              </option>
              {projectTypes.map((type) => (
                <option key={type} value={type}>
                  {t(`form.project_types.${type}`)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="consultation-interest"
              className="text-sm font-medium text-slate-900"
            >
              {t("form.interest")}
            </label>
            <select
              id="consultation-interest"
              className={selectClassName}
              defaultValue=""
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
        </div>

        <Textarea
          id="consultation-message"
          label={t("form.message")}
          placeholder={t("form.message_placeholder")}
        />

        <div className="pt-2 space-y-4">
          <Button type="submit" variant="primary" size="md" showIcon fullWidth>
            {t("form.submit")}
          </Button>
          <Text variant="body-14" className={cn("text-slate-400 text-center")}>
            {t("form.privacy_note")}
          </Text>
        </div>
      </form>
    </div>
  );
}
