// Presentational, stateless sortable table header cell component.
import type { SortKey, SortOrder } from '@/app/lib/types';

type Props = {
  // Column header label.
  label: string;
  // Column sort key (SortKey).
  column: SortKey;
  // Currently active sort key.
  activeKey: SortKey;
  // Sorting order ('asc' | 'desc').
  order: SortOrder;
  // Callback to sort by a new column.
  onSort: (col: SortKey) => void;
  // Callback to toggle the sort order ('asc' ↔ 'desc') for the active column.
  onToggleOrder: () => void;
};

export default function TableHeaderCell({ label, column, activeKey, order, onSort, onToggleOrder }: Props) {
  // Whether this column is currently the active sort key.
  const isActive = activeKey === column;
  // Set aria-sort on <th> ('ascending' | 'descending' | 'none') for screen readers.
  const ariaSort = isActive ? (order === 'asc' ? 'ascending' : 'descending') : 'none';
  // Show ▲/▼ when active; otherwise ↕.
  const indicator = isActive ? (order === 'asc' ? '▲' : '▼') : '↕';

  return (
    // Use <th scope="col"> for proper table semantics; aria-sort conveys sorting to assistive tech.
    <th scope="col" aria-sort={ariaSort as any} style={{ textAlign: 'left', padding: 8 }}>
      <button
        // If inactive: sort by this column; if active: toggle the order.
        onClick={() => (isActive ? onToggleOrder() : onSort(column))}
        // Helps assistive technologies understand the active sort control.
        aria-pressed={isActive}
        style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
      >
        {label} {indicator}
      </button>
    </th>
  );
}
