import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";
import { Text } from "@/components/ui/Typography";

interface BlogPostCardProps {
  image: string;
  location: string;
  title: string;
  href?: string;
}

export default function BlogPostCard({
  image,
  location,
  title,
  href = "#",
}: BlogPostCardProps) {
  return (
    <div className="group w-full p-2 rounded-2xl border border-slate-200">
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
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          {/* Location */}
          <div className="flex items-center gap-1.5 text-slate-500 mb-2">
            <MapPin className="w-4 h-4" />
            <Text variant="body-14" className="text-slate-500">
              {location}
            </Text>
          </div>

          {/* Title */}
          <Text
            variant="body-18"
            className="text-slate-900 group-hover:text-brand-green transition-colors line-clamp-2"
          >
            {title}
          </Text>
        </div>

        {/* Arrow Button */}
        <Link
          href={href}
          className="flex-shrink-0 w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center transition-all duration-300 group-hover:border-brand-green group-hover:bg-brand-green"
        >
          <ArrowUpRight className="w-5 h-5 text-slate-600 transition-colors group-hover:text-dark-green" />
        </Link>
      </div>
    </div>
  );
}
