"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import type { ProjectGalleryImage } from "@/lib/strapi";

interface ProjectGalleryProps {
  images: ProjectGalleryImage[];
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
  const { t } = useTranslation("projects");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  const isOpen = activeIndex !== null;
  const activeImage = isOpen ? images[activeIndex] : null;

  const close = useCallback(() => setActiveIndex(null), []);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? null : (current - 1 + images.length) % images.length,
    );
  }, [images.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? null : (current + 1) % images.length,
    );
  }, [images.length]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "unset";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, close, showPrevious, showNext]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {images.map((image, index) => (
          <button
            key={`${image.url}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="aspect-[4/3] relative rounded-xl overflow-hidden group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
            aria-label={t("details.gallery.open_image", { number: index + 1 })}
          >
            <Image
              src={image.url || ""}
              alt={
                image.alt ||
                t("details.gallery.image_alt", { number: index + 1 })
              }
              fill
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="w-12 h-12 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-lg">
                <ZoomIn className="w-5 h-5" />
              </span>
            </div>
          </button>
        ))}
      </div>

      {mounted &&
        isOpen &&
        activeImage?.url &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={t("details.gallery.lightbox_label")}
          >
            <div
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
              onClick={close}
            />

            <button
              type="button"
              onClick={close}
              className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center justify-center"
              aria-label={t("details.gallery.close")}
            >
              <X className="w-6 h-6" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={showPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center justify-center"
                  aria-label={t("details.gallery.previous")}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center justify-center"
                  aria-label={t("details.gallery.next")}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <div className="relative z-10 w-full max-w-6xl h-[min(80vh,900px)]">
              <Image
                src={activeImage.url}
                alt={
                  activeImage.alt ||
                  t("details.gallery.image_alt", { number: activeIndex + 1 })
                }
                fill
                priority
                sizes="100vw"
                className="object-contain"
              />
            </div>

            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 rounded-full bg-black/50 px-4 py-2 text-sm text-white">
                {activeIndex + 1} / {images.length}
              </div>
            )}
          </div>,
          document.body,
        )}
    </>
  );
}
