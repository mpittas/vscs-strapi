import Image from "next/image";
import { Heading, Text } from "@/components/ui/Typography";

interface ServiceIconBoxProps {
  icon: string;
  title: string;
  description: string;
  iconAlt?: string;
}

export default function ServiceIconBox({
  icon,
  title,
  description,
  iconAlt = "Service icon",
}: ServiceIconBoxProps) {
  return (
    <div className="bg-white/2 rounded-3xl p-6 flex flex-col h-full">
      {/* Icon */}
      <div className="mb-4">
        <div className="w-14 h-14 flex items-center justify-center">
          <Image
            src={icon}
            alt={iconAlt}
            width={48}
            height={48}
            className="w-10 h-10"
          />
        </div>
      </div>

      {/* Title */}
      <Heading
        as="h4"
        className="text-lg lg:text-xl font-medium mb-3 text-white leading-tight"
      >
        {title}
      </Heading>

      {/* Description */}
      <Text variant="body-14" className="text-slate-400 leading-relaxed">
        {description}
      </Text>
    </div>
  );
}
