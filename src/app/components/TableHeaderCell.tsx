import type { SortKey, SortOrder } from '@/app/lib/types';

type Props = {
  label: string;
  column: SortKey;
  activeKey: SortKey;
  order: SortOrder;
  onSort: (col: SortKey) => void;
  onToggleOrder: () => void;
};

export default function TableHeaderCell({ label, column, activeKey, order, onSort, onToggleOrder }: Props) {
  const isActive = activeKey === column;
  const ariaSort = isActive ? (order === 'asc' ? 'ascending' : 'descending') : 'none';
  const indicator = isActive ? (order === 'asc' ? '▲' : '▼') : '↕';

  return (
    <th scope="col" aria-sort={ariaSort as any} style={{ textAlign: 'left', padding: 8 }}>
      <button
        onClick={() => (isActive ? onToggleOrder() : onSort(column))}
        aria-pressed={isActive}
        style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
      >
        {label} {indicator}
      </button>
    </th>
  );
}
