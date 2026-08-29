import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import ConditionalNavbar from "@/components/ConditionalNavbar";
import Footer from "@/components/Footer";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";

const stolzl = localFont({
  src: [
    {
      path: "../../../public/fonts/Stolzl-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Stolzl-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Stolzl-Book.woff2",
      weight: "350",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Stolzl-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Stolzl-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Stolzl-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-stolzl",
  display: "swap",
});

export function generateStaticParams() {
  return [{ locale: "bg" }, { locale: "en" }, { locale: "fr" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await initTranslations(locale, ["common"]);

  return {
    title: {
      default: t("metadata.title"),
      template: "%s | VS Construction Services",
    },
    description: t("metadata.description"),
    keywords: [
      "solar panels",
      "solar installation",
      "renewable energy",
      "solar power",
      "green energy",
      "solar savings",
      "соларни панели",
      "фотоволтаици",
    ],
    authors: [{ name: "VS Construction Services" }],
    openGraph: {
      type: "website",
      locale: locale === "bg" ? "bg_BG" : locale === "fr" ? "fr_FR" : "en_US",
      url: "https://vscs-bg.com", // Updated to a placeholder that looks more real or keep existing if known
      siteName: "VS Construction Services",
      title: t("metadata.title"),
      description: t("metadata.description"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("metadata.title"),
      description: t("metadata.description"),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const { resources } = await initTranslations(locale, ["common"]);

  return (
    <html lang={locale}>
      <body
        className={`${stolzl.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <noscript>
          <style>{`[data-reveal],[data-reveal-hero] [data-reveal],[data-reveal-group] > *{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
        <TranslationsProvider
          locale={locale}
          resources={resources}
          namespaces={["common"]}
        >
          <ConditionalNavbar />
          <SmoothScrollProvider>
            <main className="flex-1">{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </TranslationsProvider>
      </body>
    </html>
  );
}
