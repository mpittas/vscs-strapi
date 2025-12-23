import type { Metadata } from "next";
import PageTitle from "@/components/ui/PageTitle";

export const metadata: Metadata = {
  title: "За нас",
  description:
    "Learn about SolarTech Solutions - our mission to power a sustainable future with premium solar energy solutions. 15+ years of experience, 10,000+ installations.",
};

export default function AboutPage() {
  return (
    <>
      {/* Page Title Section */}
      <PageTitle
        title="За нас"
        breadcrumbs={[{ label: "НАЧАЛО", href: "/" }, { label: "ЗА НАС" }]}
      />
    </>
  );
}
