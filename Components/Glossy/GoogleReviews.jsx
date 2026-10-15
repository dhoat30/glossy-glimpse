"use client";

import { useState } from "react";
import { business } from "@/utils/glossy";
import styles from "./LandingPage.module.scss";

function Stars({ rating }) {
  return <span className={styles.reviewStars} role="img" aria-label={`${rating} out of 5 stars`}><span aria-hidden="true">★★★★★</span><span aria-hidden="true" style={{ width: `${rating / 5 * 100}%` }}>★★★★★</span></span>;
}

function ReviewCard({ review }) {
  const [expanded, setExpanded] = useState(false);
  const [photoFailed, setPhotoFailed] = useState(false);
  const long = review.text.length > 250;
  const content = long && !expanded ? `${review.text.slice(0, 250)}…` : review.text;
  const author = <><span className={styles.avatar}>{review.photo && !photoFailed ? <img src={review.photo} alt="" width="40" height="40" loading="lazy" referrerPolicy="no-referrer" onError={() => setPhotoFailed(true)} /> : review.name.charAt(0)}</span><span className={styles.reviewAuthorDetails}><strong>{review.name}</strong><small>{review.date || "Google Maps reviewer"}</small></span></>;
  return <figure className={`${styles.review} ${styles.liveReview}`}>
    <figcaption>{review.authorUrl ? <a href={review.authorUrl} target="_blank" rel="noreferrer" className={styles.reviewAuthor}>{author}</a> : <div className={styles.reviewAuthor}>{author}</div>}</figcaption>
    <Stars rating={review.rating} />
    <blockquote>{content}</blockquote>
    {long && <button type="button" className={styles.reviewExpand} onClick={() => setExpanded(!expanded)} aria-expanded={expanded}>{expanded ? "Read less" : "Read full review"}</button>}
    {review.translated && <small className={styles.reviewTranslation}>Translated by Google</small>}
    <a className={styles.reviewSource} href={review.url} target="_blank" rel="noreferrer">View review on Google Maps ↗</a>
  </figure>;
}

export default function GoogleReviews({ data }) {
  return <section id="reviews" className={styles.reviewsSection} aria-labelledby="reviews-title">
    <div className={styles.reviewIntro}>
      <p className={styles.eyebrow}>FROM OUR CUSTOMERS</p><h2 id="reviews-title">Happy cars.<br /><span>Happier owners.</span></h2>
      <span className={styles.googleAttribution} translate="no">Google Maps</span>
      {data?.rating !== null && data?.rating !== undefined && <p className={styles.liveReviewSummary}><Stars rating={data.rating} /><strong>{data.rating.toFixed(1)} / 5{data.count !== null ? ` · ${data.count} reviews` : ""}</strong></p>}
      <a href={data?.url || business.maps} target="_blank" rel="noreferrer" className={styles.textLink}>Read reviews on Google Maps ↗</a>
      {data?.reviews?.length > 0 && <p className={styles.reviewNotice}>Showing {data.reviews.length} customer reviews with written feedback.{data.savedAt ? ` Updated ${data.savedAt}.` : ""}</p>}
      {!data?.reviews?.length && <p className={styles.reviewNotice}>Read our customer feedback directly on Google Maps.</p>}
    </div>
    {data?.reviews?.map(review => <ReviewCard key={review.id} review={review} />)}
  </section>;
}
