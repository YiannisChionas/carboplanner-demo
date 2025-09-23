import type { PlanItem, SortKey, SortOrder } from '@/app/lib/types';
import TableHeaderCell from './TableHeaderCell';

type Props = {
  items: PlanItem[];
  sortKey: SortKey;
  sortOrder: SortOrder;
  onSortChange: (key: SortKey) => void;
  onToggleOrder: () => void;
  onRowClick: (item: PlanItem) => void;
};

export default function PlanTable({
  items, sortKey, sortOrder, onSortChange, onToggleOrder, onRowClick,
}: Props) {
  if (items.length === 0) return <p>No results. Try adjusting filters.</p>;

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <caption className="sr-only">Filterable and sortable list of plans</caption>
        <thead style={{ borderBottom: '1px solid #ddd' }}>
          <tr>
            <TableHeaderCell label="Title" column="title" activeKey={sortKey} order={sortOrder} onSort={onSortChange} onToggleOrder={onToggleOrder} />
            <TableHeaderCell label="Type" column="type" activeKey={sortKey} order={sortOrder} onSort={onSortChange} onToggleOrder={onToggleOrder} />
            <TableHeaderCell label="kcal" column="kcal" activeKey={sortKey} order={sortOrder} onSort={onSortChange} onToggleOrder={onToggleOrder} />
            <th scope="col" style={{ textAlign: 'left', padding: 8 }}>Tags</th>
          </tr>
        </thead>
        <tbody>
          {items.map((i) => (
            <tr
              key={i.id}
              tabIndex={0}
              onClick={() => onRowClick(i)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onRowClick(i)}
              style={{ borderTop: '1px solid #eee', cursor: 'pointer' }}
            >
              <td style={{ padding: 8 }}>{i.title}</td>
              <td style={{ padding: 8 }}>{i.type}</td>
              <td style={{ padding: 8 }}>{i.kcal}</td>
              <td style={{ padding: 8 }}>{i.tags.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
