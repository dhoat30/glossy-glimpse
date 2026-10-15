import { getSinglePostData } from "./fetchData";

// The service layouts are shared CMS templates. Adapt their copy locally while
// preserving media URLs and identifiers needed to load the original assets.
function adaptCopy(value, key = "") {
  if (typeof value === "string") {
    if (/^(https?:\/\/)/i.test(value)) return value;
    return value
      .replace(/k cleaning solutions?/gi, "Fern Cleaning")
      .replace(/Wellington/g, "Hamilton")
      .replace(/\/(move-(?:in|out)-cleaning|carpet-shampoo)-wellington/g, "/$1-hamilton");
  }
  if (Array.isArray(value)) return value.map((item) => adaptCopy(item, key));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([field, item]) => [
      field, ["image", "before_image", "after_image", "placeholder_image", "reviews_pics", "testimonials"].includes(field)
        ? item : adaptCopy(item, field),
    ]));
  }
  return value;
}

// Fern has no reviews yet. Remove inherited social proof from the shared CMS
// layouts as well as the carousel so it cannot reappear after a CMS refresh.
function withoutReviews(section) {
  if (section.acf_fc_layout === "local_faq") {
    return {
      ...section,
      items: section.items?.map((item) =>
        /not happy/i.test(item.question) && /reviews|rating/i.test(item.answer)
          ? { ...item, answer: "<p>Tell us within 24 hours and we’ll come back and fix it at no extra cost.</p>" }
          : item),
    };
  }
  if (section.acf_fc_layout === "cta_section") {
    return {
      ...section,
      description: section.description?.replace(/Hamilton['’]s most[- ]reviewed cleaning team/gi, "your local Hamilton cleaning team"),
    };
  }
  return section;
}

export async function getCleaningPage(slug, apiRoute) {
  const data = await getSinglePostData(slug, apiRoute);
  return data?.map((page) => ({
    ...page,
    acf: {
      ...page.acf,
      layout: adaptCopy(page.acf?.layout)
        ?.filter((section) => !["show_reviews", "testimonials", "show_stats", "stats_section"].includes(section.acf_fc_layout))
        .map(withoutReviews),
    },
  }));
}

export function cleaningMetadata(title, description, path = "/") {
  return {
    title,
    description,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || process.env.siteUrl || "https://www.ferncleaning.co.nz"),
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: "Fern Cleaning", type: "website" },
  };
}
