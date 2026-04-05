"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Heading, Text } from "@/components/ui/Typography";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import Container from "@/components/ui/Container";
import ProjectPostCard from "@/components/ui/ProjectPostCard";
import Section from "@/components/ui/Section";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

// European locations with coordinates [lng, lat]
const locations = [
  { id: 1, name: "София, България", coordinates: [23.3219, 42.6977] },
  { id: 2, name: "Букурещ, Румъния", coordinates: [26.1025, 44.4268] },
  { id: 3, name: "Атина, Гърция", coordinates: [23.7275, 37.9838] },
  { id: 4, name: "Берлин, Германия", coordinates: [13.405, 52.52] },
  { id: 5, name: "Виена, Австрия", coordinates: [16.3738, 48.2082] },
];

// Blog posts data
const blogPosts = [
  {
    image: "/images/blog-img-1.jpg",
    location: "Враца, България",
    title: "Инсталация на индустриален покрив",
  },
  {
    image: "/images/blog-img-2.jpg",
    location: "София, България",
    title: "Соларен парк за бизнес клиенти",
  },
  {
    image: "/images/blog-img-3.jpg",
    location: "Пловдив, България",
    title: "Фотоволтаична система за жилищна сграда",
  },
  {
    image: "/images/blog-img-1.jpg",
    location: "Варна, България",
    title: "Монтаж на покривна инсталация",
  },
  {
    image: "/images/blog-img-2.jpg",
    location: "Бургас, България",
    title: "Индустриална соларна система",
  },
];

export default function ProjectsOverview() {
  const { t } = useTranslation("home");
  const [activeLocation, setActiveLocation] = useState<number | null>(null);

  // Embla Carousel Setup
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

  // Keep track of canScroll state (optional but good for UX)
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

  const flyToLocation = useCallback((locationId: number) => {
    const location = locations.find((l) => l.id === locationId);
    if (!location || !map.current) return;

    setActiveLocation(locationId);
    map.current.flyTo({
      center: location.coordinates as [number, number],
      zoom: 10,
      speed: 1.2,
    });
  }, []);

  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(
    null,
  ) as React.MutableRefObject<mapboxgl.Map | null>;

  useEffect(() => {
    if (map.current || !mapContainer.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [20, 45], // Centered on Europe [lng, lat]
      zoom: 3,
      cooperativeGestures: true, // Require Ctrl/Cmd key for scroll zoom
    });

    // Add custom markers for each location
    map.current.on("load", () => {
      locations.forEach((location) => {
        // Create custom marker element
        const markerEl = document.createElement("div");
        markerEl.className = "custom-marker";
        markerEl.style.width = "24px";
        markerEl.style.height = "24px";
        markerEl.style.backgroundColor = "#22c55e"; // Green color matching brand
        markerEl.style.borderRadius = "50%";
        markerEl.style.border = "3px solid white";
        markerEl.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
        markerEl.style.cursor = "pointer";

        // Create popup
        const popup = new mapboxgl.Popup({ offset: 25 }).setText(location.name);

        // Add marker to map
        const marker = new mapboxgl.Marker(markerEl)
          .setLngLat(location.coordinates as [number, number])
          .setPopup(popup)
          .addTo(map.current!);

        markerEl.addEventListener("click", () => {
          flyToLocation(location.id);
        });
      });

      // Add navigation controls (zoom buttons + compass)
      map.current!.addControl(new mapboxgl.NavigationControl(), "top-right");

      // Add fullscreen control
      map.current!.addControl(new mapboxgl.FullscreenControl(), "top-right");
    });
  }, []);

  return (
    <Section paddingY="xl" bgColor="white" className="overflow-hidden">
      <Container className="pr-0 sm:pr-8">
        {/* Title + Stats + Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-0 lg:mb-16">
          {/* Left Side - Title + Stats */}
          <div>
            {/* Title */}
            <div className="mb-10 lg:mb-12">
              <Heading as="h2" className="text-brand-green">
                {t("projects.subheader_highlight")}
              </Heading>
              <Heading as="h2" className="text-slate-900">
                {t("projects.subheader_rest")}
              </Heading>
            </div>

            {/* Stats Grid */}
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
                  <Text variant="body-14" className="mt-1 text-slate-900">
                    {stat.label}
                  </Text>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - World Map */}
          <div className="relative min-h-[300px] lg:min-h-[350px]">
            {/* Add mapbox with 3 location markers */}
            <div
              ref={mapContainer}
              style={{ height: "300px" }}
              className="rounded-2xl"
            />
          </div>
        </div>

        {/* Blog Posts Carousel */}
        <div className="relative">
          {/* Embla Carousel Viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4 touch-pan-y">
              {blogPosts.map((post, index) => (
                <div
                  key={index}
                  className="flex-[0_0_85%] md:flex-[0_0_50%] lg:flex-[0_0_33.333333%] min-w-0 pl-4 transition-opacity duration-300 flex"
                >
                  <ProjectPostCard
                    image={post.image}
                    location={post.location}
                    title={post.title}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Navigation */}
          <div className="flex mt-6 lg:mt-8 gap-2">
            <button
              onClick={scrollPrev}
              type="button"
              className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:border-brand-green hover:bg-brand-green transition-all group cursor-pointer active:scale-95"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600 group-hover:text-dark-green" />
            </button>
            <button
              onClick={scrollNext}
              type="button"
              className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:border-brand-green hover:bg-brand-green transition-all group cursor-pointer active:scale-95"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-dark-green" />
            </button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
