import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";
import { Text } from "@/components/ui/Typography";

interface ProjectPostCardProps {
  image: string;
  location: string;
  title: string;
  href?: string;
}

export default function ProjectPostCard({
  image,
  location,
  title,
  href = "#",
}: ProjectPostCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col h-full w-full p-4 rounded-2xl border border-neutral-200 hover:bg-neutral-100/70 transition-colors duration-300"
    >
      {/* Image Container */}
      <div className="relative h-[280px] rounded-2xl overflow-hidden mb-4">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex items-start justify-between gap-3 flex-grow">
        <div className="flex-1">
          {/* Location */}
          <div className="flex items-center gap-1.5 text-slate-500 mb-2">
            <MapPin className="w-4 h-4" />
            <Text variant="body-14" className="text-slate-500">
              {location}
            </Text>
          </div>

          {/* Title */}
          <Text variant="body-18" className="font-normal leading-[1.425]">
            {title}
          </Text>
        </div>

        {/* Arrow Icon */}
        <div className="flex-shrink-0 w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center transition-all duration-300 group-hover:border-brand-green group-hover:bg-brand-green">
          <ArrowUpRight className="w-5 h-5 text-slate-600 transition-colors group-hover:text-dark-green" />
        </div>
      </div>
    </Link>
  );
}
