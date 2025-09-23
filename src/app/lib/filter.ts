import type { PlanItem, PlanType } from './types';

export function filterByQueryAndType(
  items: PlanItem[],
  query: string,
  type: PlanType | 'all'
): PlanItem[] {
  const q = query.trim().toLowerCase();
  return items.filter((i) => {
    const matchesType = type === 'all' ? true : i.type === type;
    if (!q) return matchesType;
    const hay = `${i.title} ${(i.tags ?? []).join(' ')}`.toLowerCase();
    return matchesType && hay.includes(q);
  });
}