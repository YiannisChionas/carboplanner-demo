import { filterByQueryAndType } from '../app/lib/filter';
import type { PlanItem } from '../app/lib/types';
import { describe, it, expect } from 'vitest';

const items: PlanItem[] = [
  { id: 1, type: 'meal',     title: 'Chicken & Rice',   kcal: 650, tags: ['high-protein','simple'] },
  { id: 2, type: 'training', title: 'Intervals 6x400m', kcal: 450, tags: ['running','track'] },
  { id: 3, type: 'meal',     title: 'Oats & Berries',   kcal: 420, tags: ['breakfast','fiber'] },
];

describe('filterByQueryAndType', () => {
  it('returns all when no query/type', () => {
    expect(filterByQueryAndType(items, '', 'all')).toHaveLength(3);
  });

  it('filters by type only', () => {
    const r = filterByQueryAndType(items, '', 'meal');
    expect(r.map(i => i.id)).toEqual([1, 3]);
  });

  it('filters by query (case-insensitive) in title/tags', () => {
    const r1 = filterByQueryAndType(items, 'rice', 'all');
    expect(r1.map(i => i.id)).toEqual([1]);

    const r2 = filterByQueryAndType(items, 'RUNNING', 'all');
    expect(r2.map(i => i.id)).toEqual([2]);
  });

  it('combines query + type', () => {
    const r = filterByQueryAndType(items, 'berries', 'meal');
    expect(r.map(i => i.id)).toEqual([3]);
  });
});
