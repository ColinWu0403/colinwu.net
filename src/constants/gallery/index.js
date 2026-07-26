import { peru_1_2026 } from "./2026-peru-1";
import { peru_2_2026 } from "./2026-peru-2";
import { guatemala2026 } from "./2026-guatemala";
import { washington2025 } from "./2025-washington";
import { oregon2025 } from "./2025-oregon";
import { tennessee2025 } from "./2025-tennessee";
import { france2025 } from "./2025-france";
import { italy2025 } from "./2025-italy";
import { taiwan_1_2024 } from "./2024-taiwan-1";
import { taiwan_2_2024 } from "./2024-taiwan-2";
import { taiwan_3_2024 } from "./2024-taiwan-3";
import { taiwan_4_2024 } from "./2024-taiwan-4";
import { belize2024 } from "./2024-belize";
import { nola2024 } from "./2024-nola";
import { mexico2023 } from "./2023-mexico";
import { panama2023 } from "./2023-panama";
import { taiwan2019 } from "./2019-taiwan";

// Cloudflare bucket link
const IMAGE_DOMAIN = "images.colinwu.net";

// import collections
const collections = [
  peru_1_2026,
  peru_2_2026,
  guatemala2026,
  washington2025,
  oregon2025,
  tennessee2025,
  france2025,
  italy2025,
  taiwan_1_2024,
  taiwan_2_2024,
  taiwan_3_2024,
  taiwan_4_2024,
  nola2024,
  mexico2023,
  belize2024,
  panama2023,
  taiwan2019,
];

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

// return image
export function imageUrl(photo, width, quality) {
  const path = photo.url;
  if (!width && quality) return `https://${IMAGE_DOMAIN}/${path}`;

  const transform = `width=${width},quality=${quality},format=auto`;
  return `https://${IMAGE_DOMAIN}/cdn-cgi/image/${transform}/${path}`;
}
