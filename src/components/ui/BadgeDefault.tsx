interface BadgeDefaultProps {
  children: React.ReactNode;
  className?: string;
}

export default function BadgeDefault({
  children,
  className = "",
}: BadgeDefaultProps) {
  return (
    <div
      className={`inline-flex items-center px-4 py-2 rounded-full border border-slate-300 text-sm text-slate-700 ${className}`}
    >
      {children}
    </div>
  );
}
