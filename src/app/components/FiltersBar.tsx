// Controlled filter bar for plans (search + type filter).
type Props = {
  // Current search query.
  query: string;
  // Invoked on every input change (each keystroke).
  onQueryChange: (v: string) => void;
  // Active type filter (literal union: 'all' | 'meal' | 'training').
  type: 'all' | 'meal' | 'training';
  // Invoked on every select change.
  onTypeChange: (v: 'all' | 'meal' | 'training') => void;
};
// Presentational component; controlled by the parent (stateless).
export default function FiltersBar({ query, onQueryChange, type, onTypeChange }: Props) {
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
      <input
        // Controlled value provided by the parent.
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        // Placeholder is visual hint only; it does not replace a label for a11y.
        placeholder="Search title or tags…"
        // aria-label provides an accessible name since there’s no visible <label>.
        aria-label="Search plans"
        style={{ padding: 8, flex: 1 }}
      />
      <select
        // Controlled value provided by the parent.
        value={type}
        // Casts e.target.value to satisfy the compiler; safe because options are constrained.
        onChange={(e) => onTypeChange(e.target.value as any)}
        // aria-label provides an accessible name since there’s no visible <label>.
        aria-label="Filter by type"
        style={{ padding: 8 }}
      >
        {/* Options match the type’s literal union 1:1. */}
        <option value="all">All</option>
        <option value="meal">Meal</option>
        <option value="training">Training</option>
      </select>
    </div>
  );
}
