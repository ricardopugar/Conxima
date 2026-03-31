import type { Metadata } from "next";

export const SITE_NAME = "CONXIMA";
export const SITE_URL = "https://www.conxima.com";
export const DEFAULT_OG_IMAGE = "/images/hero-poster.jpg";

type BuildMetadataInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

function normalizePath(path: string): string {
  if (!path || path === "/") {
    return "/";
  }

  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;

  return withLeadingSlash.endsWith("/")
    ? withLeadingSlash
    : `${withLeadingSlash}/`;
}

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  noIndex = false
}: BuildMetadataInput): Metadata {
  const canonicalPath = normalizePath(path);
  const absoluteUrl = new URL(canonicalPath, SITE_URL).toString();

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalPath
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl,
      siteName: SITE_NAME,
      locale: "es_EC",
      type,
      images: [
        {
          url: image
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image]
    },
    robots: noIndex
      ? {
          index: false,
          follow: true
        }
      : undefined
  };
}
