import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  className = "",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={`flex justify-center items-center gap-2 ${className}`}>
      {/* Previous Button */}
      {currentPage > 1 && (
        <Link
          href={`${baseUrl}?page=${currentPage - 1}`}
          className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
      )}

      {/* Page Numbers */}
      {pages.map((page) => {
        const isCurrent = page === currentPage;
        return (
          <Link
            key={page}
            href={`${baseUrl}?page=${page}`}
            className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-colors ${
              isCurrent
                ? "bg-dark-green text-white border-dark-green"
                : "border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-primary"
            }`}
          >
            {page}
          </Link>
        );
      })}

      {/* Next Button */}
      {currentPage < totalPages && (
        <Link
          href={`${baseUrl}?page=${currentPage + 1}`}
          className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors"
          aria-label="Next page"
        >
          <ChevronRight className="w-5 h-5" />
        </Link>
      )}
    </div>
  );
}
