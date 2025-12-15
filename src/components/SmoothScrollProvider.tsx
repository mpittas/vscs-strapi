"use client";

import { useEffect, useRef, ReactNode } from "react";
import Lenis from "lenis";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export default function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const blurOverlayRef = useRef<HTMLDivElement | null>(null);
  const currentSkew = useRef(0);
  const currentBlur = useRef(0);

  useEffect(() => {
    // Initialize Lenis with smooth scrolling settings
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    // Skew settings
    const maxSkew = 7; // Maximum skew in degrees
    const skewSmoothness = 1; // How smoothly the skew interpolates (0-1)

    // Blur settings
    const maxBlur = 20; // Maximum blur in pixels
    const blurSmoothness = 0.5; // How smoothly the blur interpolates

    // Animation frame loop with skew effect
    function raf(time: number) {
      lenisRef.current?.raf(time);

      if (lenisRef.current && wrapperRef.current) {
        // Get scroll velocity from Lenis
        const velocity = lenisRef.current.velocity;

        // Calculate target skew based on velocity
        // Clamp velocity to prevent extreme skewing
        const clampedVelocity = Math.max(-150, Math.min(150, velocity));
        const targetSkew = (clampedVelocity / 150) * maxSkew;

        // Smoothly interpolate current skew towards target
        currentSkew.current +=
          (targetSkew - currentSkew.current) * skewSmoothness;

        // Apply transform with skewY and slight translateY for movement feel
        const translateY = currentSkew.current * 2;
        wrapperRef.current.style.transform = `skewY(${currentSkew.current}deg) translateY(${translateY}px)`;

        // Calculate blur based on absolute velocity
        const absVelocity = Math.abs(clampedVelocity);
        const targetBlur = (absVelocity / 100) * maxBlur;

        // Smoothly interpolate blur
        currentBlur.current +=
          (targetBlur - currentBlur.current) * blurSmoothness;

        // Apply blur to overlay
        if (blurOverlayRef.current) {
          blurOverlayRef.current.style.backdropFilter = `blur(${currentBlur.current}px)`;
          // Much higher opacity - visible even at low scroll speeds
          blurOverlayRef.current.style.opacity = `${Math.min(1, currentBlur.current / 8)}`;
        }
      }

      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup on unmount
    return () => {
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <div className="relative">
      <div
        ref={wrapperRef}
        style={{
          willChange: "transform",
          transformOrigin: "center center",
        }}
      >
        {children}
      </div>
      {/* Blur overlay at bottom */}
      <div
        ref={blurOverlayRef}
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "50vh",
          background: "transparent",
          pointerEvents: "none",
          zIndex: 40,
          opacity: 0,
          willChange: "backdrop-filter, opacity",
          // Mask creates gradient blur: transparent at top, full effect at bottom
          maskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 100%)",
        }}
      />
    </div>
  );
}
