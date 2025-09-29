// PlanTable — controlled, presentational table for PlanItem rows.
import type { PlanItem, SortKey, SortOrder } from '@/app/lib/types';
import TableHeaderCell from './TableHeaderCell';

type Props = {
  // Current sort/filter inputs from the parent.
  items: PlanItem[];
  sortKey: SortKey;
  sortOrder: SortOrder;
  onSortChange: (key: SortKey) => void;
  onToggleOrder: () => void;
  onRowClick: (item: PlanItem) => void;
};
// Presentational component; controlled by the parent (stateless).
export default function PlanTable({
  items, sortKey, sortOrder, onSortChange, onToggleOrder, onRowClick,
}: Props) {
  if (items.length === 0) return <p>No results. Try adjusting filters.</p>;  // Empty state message.

  return (
    // Enables horizontal scrolling on small screens.
    <div style={{ overflowX: 'auto' }}> 
        {/* Simple full-width table. */}
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            {/* Visually hidden caption for screen readers. */}
            <caption className="sr-only">Filterable and sortable list of plans</caption>
            <thead style={{ borderBottom: '1px solid #ddd' }}>
                {/* Three sortable columns: Title Type Kcal.  */}
                <tr>
                {/* activeKey + order indicate the active column and sort direction (asc/desc). */}
                {/* onSort selects a new column; onToggleOrder flips the direction. */}
                <TableHeaderCell label="Title" column="title" activeKey={sortKey} order={sortOrder} onSort={onSortChange} onToggleOrder={onToggleOrder} />
                <TableHeaderCell label="Type" column="type" activeKey={sortKey} order={sortOrder} onSort={onSortChange} onToggleOrder={onToggleOrder} />
                <TableHeaderCell label="kcal" column="kcal" activeKey={sortKey} order={sortOrder} onSort={onSortChange} onToggleOrder={onToggleOrder} />
                {/* scope="col" for correct table semantics. */}
                <th scope="col" style={{ textAlign: 'left', padding: 8 }}>Tags</th>
                </tr>
            </thead>
            <tbody>
                {items.map((i) => (
                <tr
                    // Necessary for react list diffing.
                    key={i.id}
                    // Focusable for keyboard navigation.
                    tabIndex={0}
                    // onRowClick is provided by parent.
                    onClick={() => onRowClick(i)}
                    // Keyboard accessible: trigger onRowClick on Enter or Space.
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onRowClick(i)}
                    // Visual affordance: pointer cursor on hover.
                    style={{ borderTop: '1px solid #eee', cursor: 'pointer' }}
                >
                    <td style={{ padding: 8 }}>{i.title}</td>
                    <td style={{ padding: 8 }}>{i.type}</td>
                    <td style={{ padding: 8 }}>{i.kcal}</td>
                    {/* Assumes tags is an array. */}
                    <td style={{ padding: 8 }}>{i.tags.join(', ')}</td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
}