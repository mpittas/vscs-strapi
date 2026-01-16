import type { Metadata } from "next";
import PageTitle from "@/components/ui/PageTitle";
import WorkProcess from "@/components/sections/WorkProcess";
import KeyServices from "@/components/sections/KeyServices";

export const metadata: Metadata = {
  title: "Услуги",
  description:
    "Learn about SolarTech Solutions - our mission to power a sustainable future with premium solar energy solutions. 15+ years of experience, 10,000+ installations.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Page Title Section */}
      <PageTitle
        title="Услуги"
        breadcrumbs={[{ label: "НАЧАЛО", href: "/" }, { label: "УСЛУГИ" }]}
      />

      <WorkProcess />

      <KeyServices />
    </>
  );
}
