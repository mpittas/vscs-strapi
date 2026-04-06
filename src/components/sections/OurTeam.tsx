"use client";

import Image from "next/image";
import { Heading, Text } from "@/components/ui/Typography";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import BadgeDefault from "@/components/ui/BadgeDefault";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import ReadMoreButton from "@/components/ui/ReadMoreButton";
import { cn } from "@/lib/utils";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  description: string;
}

function TeamMemberCard({ member }: { member: TeamMember }) {
  const { t } = useTranslation("about");
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col text-left rounded-2xl transition-colors duration-300 bg-white border border-slate-100 hover:border-brand-green/30 hover:shadow-lg group h-full overflow-hidden">
      {/* Photo Container - Full width */}
      <div className="relative w-full aspect-[2/1.9] border-b-4 border-slate-50 group-hover:border-brand-green/20 transition-colors shrink-0">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover object-top"
        />
      </div>

      <div className="flex flex-col flex-1 p-6">
        {/* Name */}
        <Heading as="h4" className="font-medium text-slate-900 mb-1">
          {member.name}
        </Heading>

        {/* Role */}
        <div className="inline-block text-green-800 text-sm font-normal mb-4">
          {member.role}
        </div>

        {/* Description with Read More */}
        <div className="relative w-full flex flex-col gap-2">
          <div
            className={cn(
              "overflow-hidden transition-all duration-500 ease-in-out",
              isExpanded ? "max-h-[500px]" : "max-h-[6rem]",
            )}
          >
            <Text
              variant="body-14"
              className={cn(
                "text-slate-700 leading-relaxed block",
                !isExpanded && "line-clamp-4",
              )}
            >
              {member.description}
            </Text>
          </div>

          <div className="mt-2 flex justify-start">
            <ReadMoreButton
              onClick={() => setIsExpanded(!isExpanded)}
              isExpanded={isExpanded}
              text={isExpanded ? t("team.read_less") : t("team.read_more")}
              circleColor="bg-brand-green"
              textColor="text-slate-900"
              textHoverColor="hover:text-brand-green"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OurTeam() {
  const { t } = useTranslation("about");

  // Get members data from translation
  const membersData = t("team.members", { returnObjects: true }) as Array<{
    name: string;
    role: string;
    description: string;
  }>;

  // Combine with images
  const teamMembers: TeamMember[] = Array.isArray(membersData)
    ? [
        {
          ...membersData[0],
          image: "/images/taem-member-stefan.jpg",
        },
        {
          ...membersData[1],
          image: "/images/taem-member-vesela.jpg",
        },
      ]
    : [];

  return (
    <Section paddingY="xl" className="bg-[#EDEDED]">
      <Container>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          {/* Left - Text Content */}
          <div className="w-full lg:shrink-0 lg:basis-[450px] lg:max-w-[450px] pb-6 md:pb-0">
            <BadgeDefault className="mb-4">{t("team.badge")}</BadgeDefault>

            <Heading as="h2" className="mb-6">
              {t("team.title")}
            </Heading>

            {/* Description - Full Text */}
            <Text variant="body-16" className="text-slate-700">
              {t("team.description")}
            </Text>
          </div>

          {/* Right - Team Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={index} member={member} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
