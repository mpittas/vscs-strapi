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

export const metadata: Metadata = {
  title: {
    default: "VSCS - Соларни панели",
    template: "%s | SolarTech Solutions",
  },
  description:
    "Transform your home with clean, renewable solar energy. SolarTech Solutions offers premium solar panel installation, maintenance, and consultation services. Save up to 70% on energy bills.",
  keywords: [
    "solar panels",
    "solar installation",
    "renewable energy",
    "solar power",
    "green energy",
    "solar savings",
  ],
  authors: [{ name: "SolarTech Solutions" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://solartech.com",
    siteName: "SolarTech Solutions",
    title: "VSCS - Соларни панели",
    description:
      "Transform your home with clean, renewable solar energy. Save up to 70% on energy bills.",
  },
  twitter: {
    card: "summary_large_image",
    title: "VSCS - Соларни панели",
    description:
      "Transform your home with clean, renewable solar energy. Save up to 70% on energy bills.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

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
