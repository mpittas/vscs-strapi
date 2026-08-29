"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, MOTION_EASE, MOTION_START, prefersReducedMotion } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function isSkipped(el: Element): boolean {
  return Boolean(el.closest("[data-motion='skip']"));
}

function isMarked(el: Element): boolean {
  return el.hasAttribute("data-revealed") || isSkipped(el);
}

function mark(el: Element): void {
  el.setAttribute("data-revealed", "");
}

function clearWillChange(targets: gsap.TweenTarget): void {
  gsap.utils.toArray<HTMLElement>(targets).forEach((el) => {
    el.style.willChange = "auto";
  });
}

function setWillChange(targets: gsap.TweenTarget): void {
  gsap.utils.toArray<HTMLElement>(targets).forEach((el) => {
    el.style.willChange = "transform, opacity";
  });
}

function scrollTween(
  el: gsap.TweenTarget,
  from: gsap.TweenVars,
  to: gsap.TweenVars,
  trigger: Element,
): void {
  gsap.fromTo(el, from, {
    ease: MOTION_EASE,
    ...to,
    scrollTrigger: {
      trigger,
      start: MOTION_START,
      once: true,
    },
    onStart() {
      setWillChange(el);
    },
    onComplete() {
      clearWillChange(el);
    },
  });
}

function revealRise(el: Element, duration: number = MOTION.rise.duration, delay = 0): void {
  if (isMarked(el)) return;
  mark(el);
  scrollTween(
    el,
    { y: MOTION.rise.y, opacity: 0 },
    { y: 0, opacity: 1, duration, delay },
    el,
  );
}

function revealTitle(el: Element, duration: number = MOTION.title.duration, delay = 0): void {
  if (isMarked(el)) return;
  mark(el);
  scrollTween(
    el,
    { y: MOTION.title.y, opacity: 0 },
    { y: 0, opacity: 1, duration, delay },
    el,
  );
}

/** Soft fade-up with a gentle scale-in — no clip-path masking. */
function revealZoom(el: Element, duration: number = MOTION.zoom.duration, delay = 0): void {
  if (isMarked(el)) return;
  mark(el);
  scrollTween(
    el,
    { y: MOTION.zoom.y, opacity: 0, scale: MOTION.zoom.scaleFrom },
    { y: 0, opacity: 1, scale: 1, duration, delay },
    el,
  );
}

/** Photo reveal: zoom settles inside clipped frames; standalone images fade up. */
function revealImage(img: HTMLImageElement): void {
  const frame = imageTarget(img);
  if (isMarked(frame) || isMarked(img)) return;
  mark(frame);
  mark(img);

  if (frame !== img) {
    scrollTween(
      img,
      { opacity: 0, scale: MOTION.zoom.settleFrom },
      { opacity: 1, scale: 1, duration: MOTION.zoom.duration },
      frame,
    );
    return;
  }

  revealZoom(img);
}

function revealFade(el: Element, duration: number = MOTION.fade.duration, delay = 0): void {
  if (isMarked(el)) return;
  mark(el);
  scrollTween(el, { opacity: 0 }, { opacity: 1, duration, delay }, el);
}

function imageTarget(img: HTMLImageElement): HTMLElement {
  const parent = img.parentElement;
  if (!parent) return img;

  const cls = parent.className.toString();
  if (
    cls.includes("overflow-hidden") ||
    cls.includes("rounded") ||
    parent.style.overflow === "hidden"
  ) {
    return parent;
  }

  return img;
}

function isContentImage(img: HTMLImageElement): boolean {
  if (isMarked(img) || isSkipped(img)) return false;
  if (img.closest("[data-reveal-group]")) return false;
  if (img.closest("[data-reveal-hero]")) return false;

  const src = img.getAttribute("src") || "";
  if (
    src.includes("/icons/") ||
    src.includes("icon-") ||
    src.includes("/logo/") ||
    src.includes("clients-logos")
  ) {
    return false;
  }

  const cls = img.className.toString();
  if (src.includes("/images/") || cls.includes("object-cover")) return true;

  const width = img.naturalWidth || img.width || 0;
  return width >= 160;
}

function setupHero(root: HTMLElement): void {
  const items = Array.from(
    root.querySelectorAll<HTMLElement>("[data-reveal]"),
  ).filter((el) => !isSkipped(el) && !isMarked(el));

  if (!items.length) return;

  const tl = gsap.timeline({
    defaults: { ease: MOTION_EASE },
    onStart() {
      setWillChange(items);
    },
    onComplete() {
      clearWillChange(items);
    },
  });

  items.forEach((el, index) => {
    mark(el);
    const type = el.getAttribute("data-reveal");
    const at = index === 0 ? 0.08 : "-=0.48";

    if (type === "title") {
      gsap.set(el, { y: 32, opacity: 0 });
      tl.to(el, { y: 0, opacity: 1, duration: 0.95 }, at);
      return;
    }

    if (type === "fade") {
      gsap.set(el, { opacity: 0, y: 12 });
      tl.to(el, { opacity: 1, y: 0, duration: 0.65 }, at);
      return;
    }

    gsap.set(el, { opacity: 0, y: 20 });
    tl.to(el, { opacity: 1, y: 0, duration: 0.75 }, at);
  });
}

function setupGroup(group: HTMLElement): void {
  if (isSkipped(group)) return;

  const children = Array.from(group.children).filter(
    (el) => !isMarked(el),
  ) as HTMLElement[];

  if (!children.length) return;
  children.forEach(mark);

  const each = Math.min(
    MOTION.stagger.each,
    MOTION.stagger.cap / Math.max(children.length - 1, 1),
  );

  scrollTween(
    children,
    { y: 28, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: MOTION.rise.duration,
      stagger: { each, from: "start" },
    },
    group,
  );
}

function setupExplicit(el: HTMLElement): void {
  if (isMarked(el) || isSkipped(el)) return;
  if (el.closest("[data-reveal-hero]")) return;
  if (el.closest("[data-reveal-group]") && el.parentElement?.hasAttribute("data-reveal-group")) {
    return;
  }

  const type = el.getAttribute("data-reveal") || "rise";
  const delay = Number(el.getAttribute("data-reveal-delay") || 0);

  if (type === "title") {
    revealTitle(el, MOTION.title.duration, delay);
    return;
  }
  if (type === "zoom" || type === "wipe") {
    revealZoom(el, MOTION.zoom.duration, delay);
    return;
  }
  if (type === "fade") {
    revealFade(el, MOTION.fade.duration, delay);
    return;
  }

  revealRise(el, MOTION.rise.duration, delay);
}

function setupSection(section: HTMLElement): void {
  if (isSkipped(section)) return;

  const header = section.querySelector<HTMLElement>("h1, h2");
  if (
    header &&
    !isMarked(header) &&
    !header.closest("[data-reveal-group]")
  ) {
    const parent = header.parentElement;
    const isolated = Boolean(
      parent &&
        parent !== section &&
        parent.children.length <= 2 &&
        !parent.hasAttribute("data-reveal-group"),
    );

    revealTitle(header);

    const lead = isolated
      ? header.previousElementSibling || parent?.previousElementSibling
      : header.previousElementSibling;

    if (
      lead instanceof HTMLElement &&
      !isMarked(lead) &&
      !lead.closest("[data-reveal-group]") &&
      !lead.querySelector("img, video, canvas")
    ) {
      revealRise(lead, 0.65);
    }

    const follow =
      isolated && !header.nextElementSibling
        ? parent?.nextElementSibling
        : header.nextElementSibling;

    if (
      follow instanceof HTMLElement &&
      !isMarked(follow) &&
      !follow.closest("[data-reveal-group]") &&
      !follow.matches("h1, h2, h3") &&
      !follow.hasAttribute("data-reveal-group") &&
      !follow.querySelector("[data-reveal-group], img.object-cover")
    ) {
      revealRise(follow, 0.75, 0.08);
    }
  }

  const seen = new Set<HTMLElement>();
  section.querySelectorAll<HTMLImageElement>("img").forEach((img) => {
    if (!isContentImage(img)) return;
    const frame = imageTarget(img);
    if (seen.has(frame)) return;
    seen.add(frame);
    revealImage(img);
  });
}

function setupAll(): void {
  document
    .querySelectorAll<HTMLElement>("[data-reveal-hero]")
    .forEach(setupHero);
  document
    .querySelectorAll<HTMLElement>("[data-reveal-group]")
    .forEach(setupGroup);
  document
    .querySelectorAll<HTMLElement>("[data-reveal]")
    .forEach(setupExplicit);
  document
    .querySelectorAll<HTMLElement>("[data-reveal-section]")
    .forEach(setupSection);
}

export default function PageReveals() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (prefersReducedMotion()) {
      document.documentElement.classList.add("reduce-motion");
      document
        .querySelectorAll(
          "[data-reveal], [data-reveal-hero] [data-reveal], [data-reveal-group] > *",
        )
        .forEach((el) => el.setAttribute("data-revealed", ""));
      return;
    }

    document.documentElement.classList.remove("reduce-motion");

    const ctx = gsap.context(() => {
      setupAll();
    });

    const refresh = () => ScrollTrigger.refresh();
    const frame = requestAnimationFrame(refresh);
    window.addEventListener("load", refresh, { once: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
