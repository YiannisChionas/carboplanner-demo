'use client';
import rawData from '@/app/data/intern-case-2.json';
import type { PlanItem, PlanType, SortKey, SortOrder } from '@/app/lib/types';
import { filterByQueryAndType } from '@/app/lib/filter';
import { sortBy } from '@/app/lib/sort';
import FiltersBar from '@/app/components/FiltersBar';
import PlanTable from '@/app/components/PlanTable';
import DetailDialog from '@/app/components/DetailDialog';
import { useMemo, useRef, useState } from 'react';

export default function PlanExplorerPage() {
  const baseItems = rawData.items as PlanItem[];

  const [query, setQuery] = useState('');
  const [type, setType] = useState<PlanType | 'all'>('all');
  const [sortKey, setSortKey] = useState<SortKey>('title');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [selected, setSelected] = useState<PlanItem | null>(null);

  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const filtered = useMemo(() => filterByQueryAndType(baseItems, query, type), [baseItems, query, type]);
  const visible = useMemo(() => sortBy(filtered, sortKey, sortOrder), [filtered, sortKey, sortOrder]);

  return (
    <main style={{ padding: 16 }}>
      <h1 style={{ margin: '0 0 12px' }}>Plan Explorer</h1>

      <FiltersBar
        query={query}
        onQueryChange={setQuery}
        type={type === 'all' ? 'all' : type}
        onTypeChange={(v) => setType(v)}
      />

      <PlanTable
        items={visible}
        sortKey={sortKey}
        sortOrder={sortOrder}
        onSortChange={(key) => setSortKey(key)}
        onToggleOrder={() => setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'))}
        onRowClick={(item) => {
          lastFocusedRef.current = document.activeElement as HTMLElement;
          setSelected(item);
        }}
      />

      {selected && (
        <DetailDialog
          item={selected}
          onClose={() => {
            setSelected(null);
            lastFocusedRef.current?.focus();
          }}
        />
      )}
    </main>
  );
}
