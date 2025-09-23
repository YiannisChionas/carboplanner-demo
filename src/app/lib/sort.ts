import type { PlanItem, SortKey, SortOrder } from './types';

export function sortBy(items: PlanItem[], key: SortKey, order: SortOrder): PlanItem[] {
  const dir = order === 'asc' ? 1 : -1;
  return [...items].sort((a, b) => {
    const va = a[key] as any;
    const vb = b[key] as any;
    if (va == null && vb == null) return 0;
    if (va == null) return 1;
    if (vb == null) return -1;
    if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * dir;
    return String(va).localeCompare(String(vb)) * dir;
  });
}