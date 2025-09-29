import { sortBy } from '../app/lib/sort';
import type { PlanItem } from '../app/lib/types';
import { describe, it, expect } from 'vitest';

// Test data
const base: PlanItem[] = [
  { id: 1, type: 'meal',     title: 'Chicken & Rice',   kcal: 650, tags: [] },
  { id: 2, type: 'training', title: 'Intervals 6x400m', kcal: 450, tags: [] },
  { id: 3, type: 'meal',     title: 'Oats & Berries',   kcal: 420, tags: [] },
];

// Groups all tests for the sort function
describe('sortBy', () => {
  // Sorts by 'title' (lexicographic) in asc/desc and asserts the expected order.
  it('sorts by title asc/desc', () => {
    const asc = sortBy(base, 'title', 'asc').map(i => i.title);
    expect(asc).toEqual(['Chicken & Rice', 'Intervals 6x400m', 'Oats & Berries']);

    const desc = sortBy(base, 'title', 'desc').map(i => i.title);
    expect(desc).toEqual(['Oats & Berries', 'Intervals 6x400m', 'Chicken & Rice']);
  });
  // Sorts by kcal asc/desc and confirms the expected result)
  it('sorts by kcal (numeric) asc/desc', () => {
    const asc = sortBy(base, 'kcal', 'asc').map(i => i.kcal);
    expect(asc).toEqual([420, 450, 650]);

    const desc = sortBy(base, 'kcal', 'desc').map(i => i.kcal);
    expect(desc).toEqual([650, 450, 420]);
  });
  // Keeps nullish values (undefined/null) at the end regardless of sort order.
  it('keeps undefined values at the end', () => {
    const withUndef: any = [
      { ...base[0], kcal: undefined },
      { ...base[1] },
      { ...base[2], kcal: undefined },
    ];
    const asc = sortBy(withUndef, 'kcal', 'asc').map((i: any) => i.kcal);
    expect(asc.slice(-2)).toEqual([undefined, undefined]);
  });
});
