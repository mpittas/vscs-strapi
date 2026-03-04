"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import i18nConfig from "@/i18nConfig";

export default function LanguageSwitcher({
  isDarkBg = false,
}: {
  isDarkBg?: boolean;
}) {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = (newLocale: string) => {
    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    // redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push("/" + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`),
      );
    }

    router.refresh();
  };

  return (
    <div className="flex items-center gap-2 text-sm font-medium">
      <button
        onClick={() => handleChange("bg")}
        className={`transition-colors ${
          currentLocale === "bg"
            ? "text-brand-green"
            : isDarkBg
              ? "text-white/80 hover:text-white"
              : "text-slate-500 hover:text-slate-700"
        }`}
      >
        BG
      </button>
      <span className={isDarkBg ? "text-white/30" : "text-slate-300"}>|</span>
      <button
        onClick={() => handleChange("en")}
        className={`transition-colors ${
          currentLocale === "en"
            ? "text-brand-green"
            : isDarkBg
              ? "text-white/80 hover:text-white"
              : "text-slate-500 hover:text-slate-700"
        }`}
      >
        EN
      </button>
    </div>
  );
}
