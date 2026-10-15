import nextEnv from '@next/env';
import { readFile, writeFile, rename } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { normalizeGoogleReviews } from '../utils/googleReviews.js';

const root = fileURLToPath(new URL('../', import.meta.url));
nextEnv.loadEnvConfig(root);
const target = new URL('../data/google-reviews.json', import.meta.url);
const placeId = process.env.GOOGLE_PLACE_ID?.trim();
const key = process.env.SERPAPI_API_KEY?.trim();
if (!placeId || !key) throw new Error('Configure GOOGLE_PLACE_ID and SERPAPI_API_KEY before downloading reviews.');

try {
  let place;
  let page = 0;
  const unique = new Map();
  for (const sortBy of ['qualityScore', 'newestFirst', 'ratingLow']) {
    if (sortBy !== 'qualityScore' && unique.size >= Number(place?.reviews || 0)) break;
    let nextToken;
    const seenTokens = new Set();
    do {
      const url = new URL('https://serpapi.com/search.json');
      const params = { engine: 'google_maps_reviews', place_id: placeId, sort_by: sortBy, hl: 'en', api_key: key };
      if (nextToken) { params.next_page_token = nextToken; params.num = '20'; }
      url.search = new URLSearchParams(params).toString();
      const response = await fetch(url, { signal: AbortSignal.timeout(25000) });
      if (!response.ok) throw new Error(`Review download failed (HTTP ${response.status}). Existing file unchanged.`);
      const data = await response.json();
      if (data.error) throw new Error('The review service could not complete the download. Existing file unchanged.');
      place ||= data.place_info;
      if (!place || !/glossy\s*glimpse/i.test(place.title || '')) throw new Error('The place ID did not return Glossy Glimpse. Existing file unchanged.');
      for (const review of data.reviews || []) {
        const id = review.review_id || review.link || JSON.stringify([review.user?.name, review.iso_date, review.snippet, review.rating]);
        if (!unique.has(id)) unique.set(id, review);
      }
      page++;
      console.log(`Downloaded ${sortBy} page ${page}: ${unique.size} unique reviews.`);
      nextToken = data.serpapi_pagination?.next_page_token;
      if (nextToken && seenTokens.has(nextToken)) throw new Error('The review service repeated a pagination token. Existing file unchanged.');
      if (nextToken) seenTokens.add(nextToken);
      if (page >= 100 && nextToken) throw new Error('Pagination limit reached. Existing file unchanged.');
      if (sortBy !== 'qualityScore' && unique.size >= Number(place.reviews)) break;
    } while (nextToken);
  }
  const normalized = normalizeGoogleReviews({ place_info: place, reviews: [...unique.values()] }, placeId);
  const snapshot = { updatedAt: new Date().toISOString(), placeId, total: normalized.reviews.length, ...normalized, sortBy: 'relevance_with_supplemental_recent' };
  if (!snapshot.reviews.length) throw new Error('No reviews returned. Existing file unchanged.');
  // Preserve the previous local snapshot before replacing the requested file.
  try { await writeFile(join(tmpdir(), 'glossy-glimpse-google-reviews-before-refresh.json'), await readFile(target)); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  const temporary = new URL('../data/google-reviews.download.json', import.meta.url);
  await writeFile(temporary, JSON.stringify(snapshot, null, 2) + '\n');
  await rename(temporary, target);
  console.log(`Saved ${snapshot.total} reviews to data/google-reviews.json (Google listing count: ${snapshot.count}).`);
} catch (error) {
  console.error(error.message || 'Review download failed.');
  process.exitCode = 1;
}
