"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "./Hero";

export default function HeroHeader() {
  return (
    <>
      {/* Navbar is fixed, so it sits outside the wrapper */}
      <Navbar />
      
      <div className="relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/solar-panels-landscape-min.jpg"
            alt="Solar panels background"
            fill
            priority
            quality={85}
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(5,21,17,0.85)] to-[rgba(4,9,15,1)]" />
        </div>

        <div className="relative z-10">
          <Hero />
        </div>
      </div>
    </>
  );
}
