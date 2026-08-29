export const MOTION_EASE = "power2.out";
export const MOTION_START = "top 90%";

export const MOTION = {
  title: { duration: 0.9, y: 28 },
  rise: { duration: 0.8, y: 24 },
  fade: { duration: 0.65 },
  zoom: { duration: 1.05, y: 36, scaleFrom: 0.96, settleFrom: 1.1 },
  stagger: { each: 0.1, cap: 0.5 },
} as const;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
