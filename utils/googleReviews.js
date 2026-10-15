const googleUrl = value => {
  if (typeof value !== "string") return "";
  try {
    const url = new URL(value);
    return url.protocol === "https:" && (url.hostname === "google.com" || url.hostname.endsWith(".google.com") || url.hostname === "maps.app.goo.gl" || url.hostname.endsWith(".googleusercontent.com")) ? url.href : "";
  } catch { return ""; }
};

export function normalizeGoogleReviews(data, placeId) {
  const place = data?.place_info;
  if (!place || !/glossy\s*glimpse/i.test(place.title || "")) throw new Error("The place ID did not return Glossy Glimpse.");
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=Glossy+Glimpse&query_place_id=${encodeURIComponent(placeId)}`;
  const rating = Number(place.rating);
  const count = Number(place.reviews);
  const reviews = (Array.isArray(data.reviews) ? data.reviews : []).flatMap((review, index) => {
    const text = review.extracted_snippet?.translated || review.extracted_snippet?.original || review.snippet || "";
    const name = review.user?.name;
    const score = Number(review.rating);
    if (typeof text !== "string" || typeof name !== "string" || !name.trim() || !Number.isFinite(score) || score < 1 || score > 5) return [];
    return [{ id: String(review.review_id || `review-${index}`), name, text, rating: score, date: typeof review.date === "string" ? review.date : "", publishedAt: review.iso_date || "", authorUrl: googleUrl(review.user?.link), photo: googleUrl(review.user?.thumbnail), url: googleUrl(review.link) || mapsUrl, translated: Boolean(review.extracted_snippet?.translated && review.extracted_snippet.translated !== review.extracted_snippet.original) }];
  });
  return { name: place.title, rating: Number.isFinite(rating) && rating >= 1 && rating <= 5 ? rating : null, count: Number.isInteger(count) && count >= 0 ? count : null, url: mapsUrl, reviews };
}

