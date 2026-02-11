import { Text } from "@/components/ui/Typography";

interface InfoItemProps {
  title: string;
  description: string;
}

export default function InfoItem({ title, description }: InfoItemProps) {
  return (
    <div className="flex flex-col">
      <Text variant="body-18" className="font-medium text-white mb-1 md:mb-2">
        {title}
      </Text>
      <Text variant="body-14" className="text-slate-400 leading-relaxed">
        {description}
      </Text>
    </div>
  );
}
