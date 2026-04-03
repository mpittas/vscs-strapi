"use client";

import { I18nextProvider, initReactI18next } from "react-i18next";
import { createInstance, type i18n as I18nType } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { ReactNode, useMemo, useRef } from "react";
import i18nConfig from "@/i18nConfig";

/**
 * Lazily creates and caches a single i18next instance per (locale + namespaces
 * + resources) combination. This avoids the costly `createInstance()` call on
 * every render that was causing the lag when switching languages.
 */
function buildI18nInstance(
  locale: string,
  namespaces: string[],
  resources: any,
): I18nType {
  const instance = createInstance();

  instance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`@/locales/${language}/${namespace}.json`),
      ),
    )
    .init({
      lng: locale,
      resources,
      fallbackLng: i18nConfig.defaultLocale,
      supportedLngs: i18nConfig.locales,
      defaultNS: namespaces[0],
      fallbackNS: namespaces[0],
      ns: namespaces,
      preload: resources ? [] : i18nConfig.locales,
      // Prevent i18next from doing any async work on the client since
      // resources are already pre-loaded by the server component.
      initImmediate: false,
    });

  return instance;
}

export default function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources,
}: {
  children: ReactNode;
  locale: string;
  namespaces: string[];
  resources: any;
}) {
  // Keep track of the previous key so we only rebuild the instance when
  // the locale or namespace set genuinely changes.
  const cacheKey = `${locale}::${namespaces.join(",")}`;
  const cacheRef = useRef<{ key: string; instance: I18nType } | null>(null);

  // useMemo alone isn't enough because React can discard memos at will.
  // We use a ref as a stable, imperative cache.
  if (!cacheRef.current || cacheRef.current.key !== cacheKey) {
    cacheRef.current = {
      key: cacheKey,
      instance: buildI18nInstance(locale, namespaces, resources),
    };
  }

  return (
    <I18nextProvider i18n={cacheRef.current.instance}>
      {children}
    </I18nextProvider>
  );
}
