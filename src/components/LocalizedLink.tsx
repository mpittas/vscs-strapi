"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localizedPath, localeFromPathname } from "@/lib/i18n-path";

type LocalizedLinkProps = React.ComponentProps<typeof Link>;

export default function LocalizedLink({
  href,
  ...props
}: LocalizedLinkProps) {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);

  const resolvedHref =
    typeof href === "string"
      ? localizedPath(href, locale)
      : href;

  return <Link href={resolvedHref} {...props} />;
}
