import type { AnchorHTMLAttributes } from "react";
import { Link } from "@tanstack/react-router";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/**
 * Internal paths navigate in-app (no full reload) and preload on hover or
 * touch, so page switches are near-instant. Everything else (tel:, mailto:,
 * #hash, external) stays a plain anchor.
 */
export function SiteLink({ href, children, ...rest }: Props) {
  if (href.startsWith("/") && !href.startsWith("//")) {
    return (
      <Link to={href as "/"} preload="intent" activeOptions={{ exact: true }} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}
