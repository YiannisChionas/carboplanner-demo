import type { PlanItem, PlanType } from './types';

// Filters items by free-text query and type.
export function filterByQueryAndType(
  // items Full list of plan items.
  items: PlanItem[],
  // query Free-text search (case-insensitive); empty string disables text filtering.
  query: string,
  // type  Type filter; pass 'all' to disable type filtering.
  type: PlanType | 'all'
  // Returns items that match the type filter and whose title or tags include the query.
): PlanItem[] {
   // Normalize the query: trim whitespace and lowercase for case-insensitive matching.
  const q = query.trim().toLowerCase();
  return items.filter((i) => {
    // Type predicate: true if 'all' or the item's type matches.
    const matchesType = type === 'all' ? true : i.type === type;
    // If the query is empty after trimming, only apply the type filter.
    if (!q) return matchesType;
    // Build a search haystack from title + tags (tags may be undefined).
    // Example hay: "Chicken & Rice high-protein simple"
    const hay = `${i.title} ${(i.tags ?? []).join(' ')}`.toLowerCase();
    // Example: q="protein" matches the hay above because "protein" is a substring of "high-protein".
    return matchesType && hay.includes(q);
  });
}