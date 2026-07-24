import { france2025 } from "./2025-france";
// import new collections here as you add them, e.g.:
// import { newYork2025 } from "./2025-new-york";

const CLOUD_NAME = "p0y4sdwd";

const collections = [france2025 /*, newYork2025 */];

// Global chronological order (for prev/next navigation)
export const orderedCollections = [...collections].sort(
  (a, b) => new Date(a.sortDate) - new Date(b.sortDate),
);

// Group collections by year, newest year first
export function byYear() {
  const map = new Map();
  for (const c of orderedCollections) {
    if (!map.has(c.year)) map.set(c.year, []);
    map.get(c.year).push(c);
  }
  return [...map.entries()].sort((a, b) => b[0] - a[0]);
}

// Find the collection matching a /gallery/:year/:slug URL — this is the
// lookup that makes ONE dynamic route work for every collection.
export function findCollection(year, slug) {
  return orderedCollections.find(
    (c) => String(c.year) === String(year) && c.slug === slug,
  );
}

export function highlightPhoto(collection) {
  return collection.photos.find((p) => p.highlight) || collection.photos[0];
}

// Takes a photo's stored URL and inserts a resize transform
export function imageUrl(photo, width) {
  const transform = width ? `w_${width},q_auto,f_auto` : "q_auto,f_auto";
  return photo.url.replace("/upload/", `/upload/${transform}/`);
}
