type Props = {
  query: string;
  onQueryChange: (v: string) => void;
  type: 'all' | 'meal' | 'training';
  onTypeChange: (v: 'all' | 'meal' | 'training') => void;
};

export default function FiltersBar({ query, onQueryChange, type, onTypeChange }: Props) {
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
      <input
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search title or tags…"
        aria-label="Search plans"
        style={{ padding: 8, flex: 1 }}
      />
      <select
        value={type}
        onChange={(e) => onTypeChange(e.target.value as any)}
        aria-label="Filter by type"
        style={{ padding: 8 }}
      >
        <option value="all">All</option>
        <option value="meal">Meal</option>
        <option value="training">Training</option>
      </select>
    </div>
  );
}
