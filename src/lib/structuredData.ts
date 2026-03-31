import { SITE_NAME, SITE_URL } from "@/lib/seo";

type BreadcrumbItem = {
  name: string;
  path: string;
};

type ServiceJsonLdInput = {
  name: string;
  description: string;
  path: string;
  areaServed?: string[];
};

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo-conxima.png`,
    image: `${SITE_URL}/images/hero-poster.jpg`,
    email: "mailto:info@conxima.com",
    telephone: "+593939011017",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Cdla. Simón Bolívar Mz.5 V.18",
      addressLocality: "Guayaquil",
      addressCountry: "EC"
    },
    areaServed: [
      {
        "@type": "City",
        name: "Guayaquil"
      },
      {
        "@type": "Country",
        name: "Ecuador"
      }
    ],
    sameAs: [
      "https://www.facebook.com/conxima.ec",
      "https://www.instagram.com/conximaec/"
    ]
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "es-EC"
  };
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "/" : `${item.path}/`}`
    }))
  };
}

export function buildServiceJsonLd({
  name,
  description,
  path,
  areaServed = ["Guayaquil", "Ecuador"]
}: ServiceJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${SITE_URL}${path === "/" ? "/" : `${path}/`}`,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL
    },
    areaServed: areaServed.map((place) => ({
      "@type": place === "Ecuador" ? "Country" : "City",
      name: place
    }))
  };
}

export function serializeJsonLd(data: object) {
  return JSON.stringify(data);
}
