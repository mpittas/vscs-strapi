"use client";

import { useState, useCallback } from "react";
import ProjectPostCard from "@/components/ui/ProjectPostCard";
import Button from "@/components/ui/Button";

interface Project {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  location: string;
  category: string;
  projectStatus: string;
  year: string;
  country: string;
  energy: string;
  services: string;
  publishedAt: string;
  featuredImage: string | null;
}

interface PaginationMeta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

interface ProjectsFilterProps {
  initialProjects: Project[];
  initialMeta: PaginationMeta;
}

type FilterOption = "all" | "България" | "Чужбина";

const filterOptions: { value: FilterOption; label: string }[] = [
  { value: "all", label: "Всички" },
  { value: "България", label: "България" },
  { value: "Чужбина", label: "Чужбина" },
];

export default function ProjectsFilter({
  initialProjects,
  initialMeta,
}: ProjectsFilterProps) {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("all");
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [meta, setMeta] = useState<PaginationMeta>(initialMeta);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const hasMore = meta.pagination.page < meta.pagination.pageCount;

  // Fetch projects from API
  const fetchProjects = useCallback(
    async (page: number, country: FilterOption, append = false) => {
      if (append) {
        setIsLoadingMore(true);
      } else {
        setIsLoading(true);
      }

      try {
        const countryParam =
          country === "all" ? "" : `&country=${encodeURIComponent(country)}`;
        const response = await fetch(
          `/api/projects?page=${page}&pageSize=6${countryParam}`,
        );
        const result = await response.json();

        if (append) {
          setProjects((prev) => [...prev, ...result.data]);
        } else {
          setProjects(result.data);
        }
        setMeta(result.meta);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    [],
  );

  // Handle filter change
  const handleFilterChange = useCallback(
    (filter: FilterOption) => {
      if (filter === activeFilter) return;
      setActiveFilter(filter);
      fetchProjects(1, filter, false);
    },
    [activeFilter, fetchProjects],
  );

  // Handle load more
  const handleLoadMore = useCallback(() => {
    if (hasMore && !isLoadingMore) {
      fetchProjects(meta.pagination.page + 1, activeFilter, true);
    }
  }, [
    hasMore,
    isLoadingMore,
    meta.pagination.page,
    activeFilter,
    fetchProjects,
  ]);

  return (
    <>
      {/* Filter Bar */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex items-center bg-neutral-100 rounded-full p-1.5">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleFilterChange(option.value)}
              disabled={isLoading}
              className={`px-6 py-2.5 rounded-full cursor-pointer font-normal transition-all duration-300 ${
                activeFilter === option.value
                  ? "bg-[#b4d429] text-[#0a0f0a]"
                  : "text-slate-600 hover:text-slate-900"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#b4d429]"></div>
        </div>
      ) : projects.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectPostCard
                key={project.id}
                title={project.title}
                location={project.location || "България"}
                image={project.featuredImage || "/images/type-of-service-1.jpg"}
                href={`/proekti/${project.slug}`}
              />
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="flex justify-center mt-10">
              <Button
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                variant="primary"
                size="lg"
              >
                {isLoadingMore ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#0a0f0a]"></div>
                    Зареждане...
                  </>
                ) : (
                  "Зареди още"
                )}
              </Button>
            </div>
          )}

          {/* Projects count */}
          <div className="text-center mt-6 text-slate-500 text-sm">
            Показани {projects.length} от {meta.pagination.total} проекта
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-slate-500 text-lg">
            Няма проекти в избраната категория.
          </p>
        </div>
      )}
    </>
  );
}
