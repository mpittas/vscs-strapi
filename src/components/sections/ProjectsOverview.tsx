"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Heading, Text } from "@/components/ui/Typography";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import Container from "@/components/ui/Container";
import ProjectPostCard from "@/components/ui/ProjectPostCard";
import Section from "@/components/ui/Section";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { ProjectMapMarker } from "@/lib/strapi";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

export interface HomeProject {
  id: number;
  title: string;
  location: string;
  image: string;
  href: string;
}

interface ProjectsOverviewProps {
  projects?: HomeProject[];
  mapMarkers?: ProjectMapMarker[];
}

function createMarkerElement(isActive: boolean) {
  const markerEl = document.createElement("div");
  markerEl.className = "custom-marker";
  markerEl.style.width = "24px";
  markerEl.style.height = "24px";
  markerEl.style.backgroundColor = isActive ? "#16a34a" : "#22c55e";
  markerEl.style.borderRadius = "50%";
  markerEl.style.border = "3px solid white";
  markerEl.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
  markerEl.style.cursor = "pointer";
  markerEl.style.transition = "background-color 0.2s ease";
  return markerEl;
}

export default function ProjectsOverview({
  projects = [],
  mapMarkers = [],
}: ProjectsOverviewProps) {
  const { t } = useTranslation("home");
  const [activeMarkerId, setActiveMarkerId] = useState<number | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      loop: true,
      skipSnaps: false,
      dragFree: false,
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false })],
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback((api: any) => {
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const flyToMarker = useCallback(
    (marker: ProjectMapMarker) => {
      if (!map.current) return;
      setActiveMarkerId(marker.id);
      map.current.flyTo({
        center: marker.coordinates,
        zoom: 10,
        speed: 1.2,
      });
    },
    [],
  );

  useEffect(() => {
    if (!mapContainer.current || !mapboxgl.accessToken) return;

    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [20, 45],
        zoom: 3,
        cooperativeGestures: true,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
      map.current.addControl(new mapboxgl.FullscreenControl(), "top-right");
    }

    const mapInstance = map.current;

    const renderMarkers = () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      if (mapMarkers.length === 0) return;

      const bounds = new mapboxgl.LngLatBounds();

      mapMarkers.forEach((markerData) => {
        const isActive = markerData.id === activeMarkerId;
        const markerEl = createMarkerElement(isActive);

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<strong>${markerData.title}</strong><br/>${markerData.location}`,
        );

        const marker = new mapboxgl.Marker(markerEl)
          .setLngLat(markerData.coordinates)
          .setPopup(popup)
          .addTo(mapInstance);

        markerEl.addEventListener("click", () => flyToMarker(markerData));
        markersRef.current.push(marker);
        bounds.extend(markerData.coordinates);
      });

      if (mapMarkers.length === 1) {
        mapInstance.flyTo({ center: mapMarkers[0].coordinates, zoom: 8, speed: 1.2 });
      } else {
        mapInstance.fitBounds(bounds, { padding: 48, maxZoom: 8, duration: 0 });
      }
    };

    if (mapInstance.isStyleLoaded()) {
      renderMarkers();
    } else {
      mapInstance.once("load", renderMarkers);
    }
  }, [mapMarkers, activeMarkerId, flyToMarker]);

  useEffect(() => {
    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      map.current?.remove();
      map.current = null;
    };
  }, []);

  return (
    <Section paddingY="xl" bgColor="white" className="overflow-hidden">
      <Container className="pr-0 sm:pr-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-0 lg:mb-16">
          <div>
            <div className="mb-10 lg:mb-12">
              <Heading as="h2" className="text-brand-green">
                {t("projects.subheader_highlight")}
              </Heading>
              <Heading as="h2" className="text-slate-900">
                {t("projects.subheader_rest")}
              </Heading>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {[
                {
                  value: 50,
                  suffix: "+",
                  label: t("projects.stats.completed"),
                },
                {
                  value: 12,
                  suffix: "+",
                  label: t("projects.stats.countries"),
                },
                {
                  value: 300,
                  suffix: " MW",
                  label: t("projects.stats.capacity"),
                },
                {
                  value: 100,
                  suffix: "%",
                  label: t("projects.stats.emissions"),
                },
              ].map((stat, index) => (
                <div key={index}>
                  <div className="flex items-baseline">
                    <AnimatedCounter
                      end={stat.value}
                      suffix={stat.suffix}
                      className="text-4xl lg:text-5xl text-slate-900"
                      suffixClassName="text-2xl lg:text-3xl text-slate-500 ml-1"
                    />
                  </div>
                  <Text variant="body-16" className="mt-1 text-slate-900">
                    {stat.label}
                  </Text>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[300px] lg:min-h-[350px]">
            {mapboxgl.accessToken ? (
              <div
                ref={mapContainer}
                style={{ height: "330px" }}
                className="rounded-2xl"
              />
            ) : (
              <div className="flex h-[330px] items-center justify-center rounded-2xl bg-slate-100">
                <Text variant="body-16" className="text-slate-500 px-6 text-center">
                  {t("projects.map_unavailable")}
                </Text>
              </div>
            )}
          </div>
        </div>

        <div className="relative">
          {projects.length === 0 ? (
            <Text variant="body-18" className="text-slate-500 text-center py-12">
              {t("projects.no_projects")}
            </Text>
          ) : (
            <>
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex -ml-4 touch-pan-y">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="flex-[0_0_85%] md:flex-[0_0_50%] lg:flex-[0_0_33.333333%] min-w-0 pl-4 transition-opacity duration-300 flex"
                    >
                      <ProjectPostCard
                        image={project.image}
                        location={project.location}
                        title={project.title}
                        href={project.href}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex mt-6 lg:mt-8 gap-2">
                <button
                  onClick={scrollPrev}
                  type="button"
                  disabled={!canScrollPrev}
                  className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:border-brand-green hover:bg-brand-green transition-all group cursor-pointer active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5 text-slate-700 group-hover:text-dark-green" />
                </button>
                <button
                  onClick={scrollNext}
                  type="button"
                  disabled={!canScrollNext}
                  className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:border-brand-green hover:bg-brand-green transition-all group cursor-pointer active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5 text-slate-700 group-hover:text-dark-green" />
                </button>
              </div>
            </>
          )}
        </div>
      </Container>
    </Section>
  );
}
