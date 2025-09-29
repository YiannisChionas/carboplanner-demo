import type { PlanItem, SortKey, SortOrder } from './types';
// Sort a PlanItem[] by the given key and order; returns a new array (input is not mutated).
export function sortBy(items: PlanItem[], key: SortKey, order: SortOrder): PlanItem[] {
  // Direction multiplier: 1 for ascending, -1 for descending.
  const dir = order === 'asc' ? 1 : -1;
  // Create a shallow copy before sorting to avoid mutating the input array.
  return [...items].sort((a, b) => {
    // Put nullish values (null/undefined) at the end regardless of sort order.
    const va = a[key] as any;
    const vb = b[key] as any;
    if (va == null && vb == null) return 0;
    if (va == null) return 1;
    if (vb == null) return -1;
    // Numeric compare.
    if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * dir;
    // Lexicographic compare (locale-aware) for all other types.
    return String(va).localeCompare(String(vb)) * dir;
  });
}