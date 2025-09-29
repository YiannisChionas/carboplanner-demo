/** Client-side page that loads JSON data, manages search/filter/sort/selection state,
 * memoizes filtering/sorting with useMemo,
 * and renders PlanTable plus a details modal with proper focus management.
*/
'use client';
// Expects rawData.items: PlanItem[].
import rawData from '@/app/data/intern-case-2.json';
// Domain types.
import type { PlanItem, PlanType, SortKey, SortOrder } from '@/app/lib/types';
// Business-logic helpers.
import { filterByQueryAndType } from '@/app/lib/filter';
import { sortBy } from '@/app/lib/sort';
// UI components.
import FiltersBar from '@/app/components/FiltersBar';
import PlanTable from '@/app/components/PlanTable';
import DetailDialog from '@/app/components/DetailDialog';
// React hooks.
import { useMemo, useRef, useState } from 'react';

export default function PlanExplorerPage() {
  // Static dataset from JSON; stable across renders.
  const baseItems = rawData.items as PlanItem[];
  // Search text.
  const [query, setQuery] = useState('');
  // Type filter; 'all' disables the filter.
  const [type, setType] = useState<PlanType | 'all'>('all');
  // Sorting key and direction.
  const [sortKey, setSortKey] = useState<SortKey>('title');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  // Selected item (opens the details modal).
  const [selected, setSelected] = useState<PlanItem | null>(null);
  // Used to restore focus after the modal closes.
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  // Filtered list (query + type), memoized.
  const filtered = useMemo(() => filterByQueryAndType(baseItems, query, type), [baseItems, query, type]);
  // Sorted list; memoized to avoid unnecessary recomputation.
  const visible = useMemo(() => sortBy(filtered, sortKey, sortOrder), [filtered, sortKey, sortOrder]);

  return (
    <main style={{ padding: 16 }}>
      <h1 style={{ margin: '0 0 12px' }}>Plan Explorer</h1>
      {/* Controlled filters: pass state down; receive changes via callbacks. */}
      <FiltersBar
        query={query}
        onQueryChange={setQuery}
        // Keeps the literal union aligned with FiltersBar’s type prop.
        type={type === 'all' ? 'all' : type}
        onTypeChange={(v) => setType(v)}
      />
      {/* Presentational table: header clicks call onSortChange/onToggleOrder; visible is recomputed. */}
      <PlanTable
        items={visible}
        sortKey={sortKey}
        sortOrder={sortOrder}
        onSortChange={(key) => setSortKey(key)}
        // Inline arrow function using React's functional state update.
        onToggleOrder={() => setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'))}
        // Row click/Enter/Space opens the modal and records the previously focused element.
        onRowClick={(item) => {
          lastFocusedRef.current = document.activeElement as HTMLElement;
          setSelected(item);
        }}
      />
      {/* Details modal: rendered only when an item is selected. */}
      {selected && (
        <DetailDialog
          item={selected}
          // onClose clears selection and restores focus (lastFocusedRef).
          onClose={() => {
            setSelected(null);
            lastFocusedRef.current?.focus();
          }}
        />
      )}
    </main>
  );
}
