import { LucideIcon } from "lucide-react";

interface ContactInfoItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export default function ContactInfoItem({
  icon: Icon,
  label,
  value,
}: ContactInfoItemProps) {
  return (
    <div className="flex gap-4">
      <div className="shrink-0 text-[#b4d429]">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <div className="text-xs font-normal text-slate-400 uppercase tracking-wider mb-1">
          {label}
        </div>
        <div className="text-slate-900 font-normal leading-snug">{value}</div>
      </div>
    </div>
  );
}
