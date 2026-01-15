import Image from "next/image";
import { Heading, Text } from "@/components/ui/Typography";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import BadgeDefault from "@/components/ui/BadgeDefault";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Георги Димитров",
    role: "Главен изпълнителен директор",
    image: "/images/team-image-01.jpg",
  },
  {
    name: "Мария Иванова",
    role: "Инженер соларни системи",
    image: "/images/team-image-02.jpg",
  },
  {
    name: "Николай Петров",
    role: "Технически специалист",
    image: "/images/team-image-03.jpg",
  },
  {
    name: "Елена Тодорова",
    role: "Консултант продажби",
    image: "/images/team-image-04.jpg",
  },
];

function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="flex flex-col items-center text-center p-4 rounded-2xl transition-colors duration-300 bg-white hover:bg-[#EBF8DA]">
      {/* Photo Container */}
      <div className="relative w-full aspect-square mb-4 rounded-2xl overflow-hidden bg-gray-100">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover object-top"
        />
      </div>

      {/* Name */}
      <h3 className="text-xl font-normal text-slate-900 mb-1">{member.name}</h3>

      {/* Role */}
      <Text variant="body-14" className="text-brand-green">
        {member.role}
      </Text>
    </div>
  );
}

interface OurTeamProps {
  contentMaxWidth?: string;
}

export default function OurTeam({ contentMaxWidth = "400px" }: OurTeamProps) {
  return (
    <Section paddingY="xl" className="bg-[#EDEDED]">
      <Container>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-22 items-start">
          {/* Left - Text Content */}
          <div
            className="w-full lg:w-auto lg:shrink-0"
            style={{ flexBasis: contentMaxWidth, maxWidth: contentMaxWidth }}
          >
            <BadgeDefault className="mb-4">НАШИЯТ ЕКИП</BadgeDefault>

            <Heading as="h2" className="mb-6">
              Нашият екип от експерти
            </Heading>

            <Text variant="body-16" className="text-slate-600">
              Нашият екип от сертифицирани специалисти е посветен на
              предоставянето на най-добрите соларни решения за вашия дом и
              бизнес.
            </Text>
          </div>

          {/* Right - Team Grid */}
          <div className="flex-1 grid grid-cols-2 gap-4">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={index} member={member} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
