import { cn } from "@/lib/utils";

interface SidebarProps {
  children: React.ReactNode;
  className?: string;
}

export default function Sidebar({ children, className }: SidebarProps) {
  return (
    <aside className={cn("sticky top-24 rounded-2xl", className)}>
      {children}
    </aside>
  );
}
