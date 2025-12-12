import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "SolarTech Solutions | Premium Solar Panel Installation",
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
    title: "SolarTech Solutions | Premium Solar Panel Installation",
    description:
      "Transform your home with clean, renewable solar energy. Save up to 70% on energy bills.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SolarTech Solutions | Premium Solar Panel Installation",
    description:
      "Transform your home with clean, renewable solar energy. Save up to 70% on energy bills.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${raleway.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
