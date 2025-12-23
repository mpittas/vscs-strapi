"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { Heading, Text } from "@/components/ui/Typography";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import Container from "@/components/ui/Container";
import ProjectPostCard from "@/components/ui/ProjectPostCard";
import Section from "@/components/ui/Section";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import slick carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Stats data
const stats = [
  { value: 50, suffix: "+", label: "Завършени проекта" },
  { value: 12, suffix: "+", label: "Държави" },
  { value: 300, suffix: " MW", label: "Инсталирана мощност" },
  { value: 100, suffix: "%", label: "Спестени въглеродни емисии" },
];

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
  const [activeLocation, setActiveLocation] = useState<number | null>(null);
  const sliderRef = useRef<Slider>(null);

  // Slick carousel settings
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
    ],
  };

  const handlePrev = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  return (
    <Section paddingY="xl" bgColor="white" className="overflow-hidden">
      <Container>
        {/* Title + Stats + Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Left Side - Title + Stats */}
          <div>
            {/* Title */}
            <div className="mb-10 lg:mb-12">
              <Heading as="h2" className="text-brand-green font-normal">
                Професионализъм
              </Heading>
              <Heading as="h2" className="text-slate-900 font-normal">
                във всеки проект
              </Heading>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="flex items-baseline">
                    <AnimatedCounter
                      end={stat.value}
                      suffix={stat.suffix}
                      className="text-4xl lg:text-5xl font-normal text-slate-900"
                      suffixClassName="text-2xl lg:text-3xl text-slate-400 ml-1"
                    />
                  </div>
                  <Text variant="body-14" className="text-slate-500 mt-1">
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
                      activeLocation === location.id ? null : location.id
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
          {/* Slick Carousel */}
          <div className="slick-carousel-container">
            <Slider ref={sliderRef} {...sliderSettings}>
              {blogPosts.map((post, index) => (
                <div key={index} className="px-3  ">
                  <ProjectPostCard
                    image={post.image}
                    location={post.location}
                    title={post.title}
                  />
                </div>
              ))}
            </Slider>
          </div>

          {/* Carousel Navigation */}
          <div className="flex mt-8 gap-2">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:border-brand-green hover:bg-brand-green transition-all group cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600 group-hover:text-dark-green" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:border-brand-green hover:bg-brand-green transition-all group cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-dark-green" />
            </button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
