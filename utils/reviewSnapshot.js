export function selectSavedGoogleReviews(snapshot, limit = 5) {
  if (!snapshot || !/glossy\s*glimpse/i.test(snapshot.name || "")) return null;
  const dateLabel = value => {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? "" : new Intl.DateTimeFormat("en-NZ", { day: "numeric", month: "short", year: "numeric", timeZone: "Pacific/Auckland" }).format(date);
  };
  return {
    name: snapshot.name,
    rating: snapshot.rating,
    count: snapshot.count,
    url: snapshot.url,
    savedAt: dateLabel(snapshot.updatedAt),
    reviews: (snapshot.reviews || []).filter(review => typeof review.text === "string" && review.text.trim()).slice(0, limit).map(review => ({ ...review, date: review.publishedAt ? dateLabel(review.publishedAt) : "" })),
  };
}
