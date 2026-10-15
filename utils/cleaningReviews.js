import sourceData from "../data/google-reviews.json";

// Keep source reviews intact. Only show reviews belonging to this business
// and location; the inherited Wellington listing must not represent Fern.
const reviews = (sourceData.reviews || []).filter((review) =>
  review.title === "Fern Cleaning" && review.city === "Hamilton",
);
export const cleaningReviews = { reviews };
