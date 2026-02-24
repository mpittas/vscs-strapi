import { Text } from "@/components/ui/Typography";

interface InfoItemProps {
  title: string;
  description: string;
}

export default function InfoItem({ title, description }: InfoItemProps) {
  return (
    <div className="flex flex-col">
      <Text variant="body-18-sb" className="text-white mb-1 md:mb-2">
        {title}
      </Text>
      <Text variant="body-16" className="text-white/80">
        {description}
      </Text>
    </div>
  );
}
