"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MoveRight, X } from "lucide-react";
import { Heading, Text } from "@/components/ui/Typography";
import Button from "@/components/ui/Button";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { markdownComponents } from "@/lib/markdownStyles";
import type { ComponentProps } from "react";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  icon?: string;
  href?: string;
  ctaText?: string;
}

export default function ServiceModal({
  isOpen,
  onClose,
  title,
  description,
  icon,
  href = "/kontakti",
  ctaText,
}: ServiceModalProps) {
  const { t } = useTranslation("services");
  const displayCtaText = ctaText || t("key_services.contact_us");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  // Render via portal to ensure it stays on top of everything
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-[700px] bg-white rounded-[24px] p-6 md:p-8 max-h-[85vh] md:max-h-none overflow-y-auto transform transition-all duration-300 animate-in fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 transition-colors rounded-full hover:bg-slate-100"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header with Icon */}
        <div className="flex flex-col gap-4 md:gap-6 mb-4">
          {/* Icon Box */}
          <div className="w-13 h-13 bg-black rounded-[14px] flex items-center justify-center text-white shrink-0">
            {/* If custom icon provided use it, else default solar panel icon */}
            {icon ? (
              <Image
                src={icon}
                alt=""
                width={28}
                height={28}
                className="brightness-0 invert" // Make icon white if it's black
              />
            ) : (
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 14.5L12 3L20 14.5" />
                <path d="M4 14.5L12 11.5L20 14.5" />
                <path d="M4 14.5V21" />
                <path d="M20 14.5V21" />
                <path d="M12 11.5V21" />
              </svg>
            )}
          </div>

          <Heading
            as="h3"
            className="text-[28px] md:text-[32px] leading-tight font-bold"
          >
            {title}
          </Heading>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-100 w-full mb-6 md:mb-8" />

        {/* Description */}
        <div className="mb-6 md:mb-10">
          <div className="prose prose-slate max-w-none">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              components={{
                ...markdownComponents,
                p: ({ children, ...props }: ComponentProps<"p">) => (
                  <p
                    className="text-slate-600 leading-relaxed mb-4 last:mb-0"
                    {...props}
                  >
                    {children}
                  </p>
                ),
              }}
            >
              {description}
            </ReactMarkdown>
          </div>
        </div>

        {/* CTA Button */}
        <div>
          <Button
            href={href}
            variant="primary"
            size="lg"
            showIcon
            icon={MoveRight} // Or strict Arrow default
            className="w-auto px-8"
          >
            {displayCtaText}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
