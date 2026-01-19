"use client";

import { useState } from "react";
import ProjectPostCard from "@/components/ui/ProjectPostCard";

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

interface ProjectsFilterProps {
  projects: Project[];
}

type FilterOption = "all" | "България" | "Чужбина";

const filterOptions: { value: FilterOption; label: string }[] = [
  { value: "all", label: "Всички" },
  { value: "България", label: "България" },
  { value: "Чужбина", label: "Чужбина" },
];

export default function ProjectsFilter({ projects }: ProjectsFilterProps) {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("all");

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.country === activeFilter);

  return (
    <>
      {/* Filter Bar */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex items-center bg-neutral-100 rounded-full p-1.5">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setActiveFilter(option.value)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === option.value
                  ? "bg-[#b4d429] text-[#0a0f0a] shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectPostCard
              key={project.id}
              title={project.title}
              location={project.location || "България"}
              image={project.featuredImage || "/images/type-of-service-1.jpg"}
              href={`/proekti/${project.slug}`}
            />
          ))}
        </div>
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
