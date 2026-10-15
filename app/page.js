import LandingPage from "@/Components/Glossy/LandingPage";
import snapshot from "@/data/google-reviews.json";
import { selectSavedGoogleReviews } from "@/utils/reviewSnapshot";

export default function Home() {
  return <LandingPage reviewsData={selectSavedGoogleReviews(snapshot)} />;
}
