"use client";

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
  createContext,
  useContext,
} from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Create Lenis context to share instance across components
const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export default function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const blurOverlayRef = useRef<HTMLDivElement | null>(null);
  const currentSkew = useRef(0);
  const currentBlur = useRef(0);

  useEffect(() => {
    // Initialize Lenis with smooth scrolling settings
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    setLenis(lenisInstance);

    // Coordinate Lenis with GSAP ScrollTrigger
    lenisInstance.on("scroll", ScrollTrigger.update);

    // Use GSAP ticker to drive Lenis
    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Skew settings
    const maxSkew = 7; // Maximum skew in degrees
    const skewSmoothness = 1; // How smoothly the skew interpolates (0-1)

    // Blur settings
    const maxBlur = 20; // Maximum blur in pixels
    const blurSmoothness = 0.5; // How smoothly the blur interpolates

    // Animation frame loop with skew and blur effects (driven by GSAP ticker)
    const skewTicker = () => {
      if (lenisInstance && wrapperRef.current) {
        // Get scroll velocity from Lenis
        const velocity = lenisInstance.velocity;

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
    };

    gsap.ticker.add(skewTicker);

    // Cleanup on unmount
    return () => {
      gsap.ticker.remove(skewTicker);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      lenisInstance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
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
    </LenisContext.Provider>
  );
}
