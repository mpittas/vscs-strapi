"use client";

import { useState, useCallback, useEffect } from "react";
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

// Location dots on the map (positions as percentages)
const locations = [
  { id: 1, name: "София, България", x: 54, y: 28 },
  { id: 2, name: "Букурещ, Румъния", x: 56, y: 26 },
  { id: 3, name: "Атина, Гърция", x: 53, y: 34 },
  { id: 4, name: "Берлин, Германия", x: 48, y: 24 },
  { id: 5, name: "Виена, Австрия", x: 50, y: 26 },
  { id: 6, name: "Варшава, Полша", x: 52, y: 22 },
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
            {/* Map Background */}
            <div className="absolute inset-0">
              <Image
                src="/images/map-dots.png"
                alt="World Map"
                fill
                className="object-contain object-right opacity-80"
              />
            </div>

            {/* Location Dots */}
            {locations.map((location) => (
              <div
                key={location.id}
                className="absolute z-10"
                style={{
                  left: `${location.x}%`,
                  top: `${location.y}%`,
                }}
              >
                {/* Dot Button */}
                <button
                  onClick={() =>
                    setActiveLocation(
                      activeLocation === location.id ? null : location.id,
                    )
                  }
                  className="relative w-4 h-4 cursor-pointer group"
                >
                  {/* Pulse Animation */}
                  <span className="absolute inset-0 rounded-full bg-brand-green/30 animate-ping" />
                  {/* Solid Dot */}
                  <span className="absolute inset-1 rounded-full bg-brand-green shadow-lg transition-transform group-hover:scale-125" />
                </button>

                {/* Tooltip */}
                {activeLocation === location.id && (
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1.5 bg-dark-green text-white text-sm rounded-lg whitespace-nowrap shadow-lg z-20">
                    {location.name}
                    {/* Arrow */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-dark-green" />
                  </div>
                )}
              </div>
            ))}
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
