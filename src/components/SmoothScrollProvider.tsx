"use client";

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
  createContext,
  useContext,
  useCallback,
} from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const rafIdRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  // Stable raf callback using useCallback
  const raf = useCallback((time: number) => {
    lenisRef.current?.raf(time * 1000);
  }, []);

  // Scroll to top when pathname changes
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  useEffect(() => {
    // Initialize Lenis with optimized settings
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      lerp: 0.1, // Smooth interpolation
      infinite: false,
    });

    lenisRef.current = lenisInstance;
    setLenis(lenisInstance);

    // Coordinate Lenis with GSAP ScrollTrigger
    const onScroll = () => ScrollTrigger.update();
    lenisInstance.on("scroll", onScroll);

    // Use GSAP ticker to drive Lenis (more efficient than rAF)
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Handle resize for ScrollTrigger refresh (debounced)
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // Cleanup on unmount
    return () => {
      // Remove GSAP ticker
      gsap.ticker.remove(raf);

      // Cancel any pending raf
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }

      // Remove resize listener
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);

      // Kill all ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      // Destroy Lenis instance
      lenisInstance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, [raf]);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
