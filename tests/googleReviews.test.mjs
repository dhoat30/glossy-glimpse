import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeGoogleReviews } from '../utils/googleReviews.js';
import { selectSavedGoogleReviews } from '../utils/reviewSnapshot.js';
const listing = { place_info: { title: 'Glossy Glimpse Auto Studio | Nelson | NZ', rating: 4.9, reviews: 86 }, reviews: [
  { review_id: 'one', user: { name: 'Reviewer One', link: 'https://www.google.com/maps/contrib/1', thumbnail: 'https://lh3.googleusercontent.com/avatar' }, rating: 5, date: 'a month ago', iso_date:'2026-09-01T00:00:00Z', snippet: 'Excellent care.', link: 'https://www.google.com/maps/reviews/one' },
  { review_id: 'two', user: { name: 'Reviewer Two' }, rating: 3, snippet: 'A different experience.' },
  { review_id: 'three', user: { name: '文字' }, rating: 4, snippet: 'Helpful service.' },
  { review_id: 'empty', user: { name: 'No text' }, rating: 5, snippet: '' },
] };
test('saves every returned review including ratings without text, preserving names and ratings', () => {
  const data=normalizeGoogleReviews(listing,'place-example-123');
  assert.equal(data.rating,4.9); assert.equal(data.count,86);
  assert.deepEqual(data.reviews.map(r=>r.name),['Reviewer One','Reviewer Two','文字','No text']);
  assert.deepEqual(data.reviews.map(r=>r.rating),[5,3,4,5]);
  assert.equal(data.reviews[0].text,'Excellent care.');
});
test('does not truncate the downloaded review collection to five cards', () => {
  const data=normalizeGoogleReviews({...listing,reviews:Array.from({length:30},(_,i)=>({...listing.reviews[0],review_id:String(i)}))},'place-example-123');
  assert.equal(data.reviews.length,30);
});
test('rejects another business and removes unsafe attribution links', () => {
  assert.throws(()=>normalizeGoogleReviews({...listing,place_info:{title:'Another business'}},'place-example-123'));
  const data=normalizeGoogleReviews({...listing,reviews:[{...listing.reviews[0],link:'javascript:alert(1)',user:{name:'Reviewer One',link:'https://unrelated.example',thumbnail:'https://unrelated.example/avatar'}}]},'place-example-123');
  assert.equal(data.reviews[0].authorUrl,''); assert.equal(data.reviews[0].photo,'');
  assert.match(data.reviews[0].url,/^https:\/\/www.google.com\/maps\//);
});
test('selects written reviews from the file without mutating it, and uses fixed calendar dates', () => {
  const snapshot={updatedAt:'2026-10-15T00:00:00Z',...normalizeGoogleReviews(listing,'place-example-123')};
  const data=selectSavedGoogleReviews(snapshot,2);
  assert.equal(data.reviews.length,2); assert.equal(snapshot.reviews.length,4);
  assert.equal(data.reviews[0].date,'1 Sept 2026'); assert.equal(snapshot.reviews[0].date,'a month ago');
  assert.equal(data.savedAt,'15 Oct 2026');
  assert.equal(selectSavedGoogleReviews({name:'Another business',reviews:[]}),null);
});
