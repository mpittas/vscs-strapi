"use client";

import { useState } from "react";
import { FaFacebook, FaLinkedin, FaLink, FaCheck } from "react-icons/fa";
import type { IconType } from "react-icons";

interface ShareButtonProps {
  icon: IconType;
  label: string;
  onClick: () => void;
  isCopied?: boolean;
}

function ShareButton({
  icon: Icon,
  label,
  onClick,
  isCopied,
}: ShareButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
        isCopied
          ? "bg-[#b4d429] text-[#0a0f0a]"
          : "bg-slate-100 text-slate-700 hover:bg-[#b4d429] hover:text-[#0a0f0a]"
      }`}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}

interface ShareButtonsProps {
  title: string;
}

export default function ShareButtons({ title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const getCurrentUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return "";
  };

  const handleFacebookShare = () => {
    const url = getCurrentUrl();
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  const handleLinkedInShare = () => {
    const url = getCurrentUrl();
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  const handleCopyLink = () => {
    const url = getCurrentUrl();
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex gap-2">
      <ShareButton
        icon={FaFacebook}
        label="Share on Facebook"
        onClick={handleFacebookShare}
      />
      <ShareButton
        icon={FaLinkedin}
        label="Share on LinkedIn"
        onClick={handleLinkedInShare}
      />
      <ShareButton
        icon={copied ? FaCheck : FaLink}
        label={copied ? "Link copied!" : "Copy link"}
        onClick={handleCopyLink}
        isCopied={copied}
      />
    </div>
  );
}
