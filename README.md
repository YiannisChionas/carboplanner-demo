# Carboplanner Demo — Intern Case 2 (Plan Explorer)

A small React (Next.js 13+, App Router) + TypeScript application implementing a **Plan Explorer**:  
a filterable / sortable table that loads data from a local JSON file.

---

## Features
- Load data from local JSON (`intern-case-2.json`)
- Strong typing with `PlanItem`, `PlanType`, `SortKey`, `SortOrder`
- Filtering (text search + type filter)
- Sorting (by column asc/desc)
- Table view with clickable rows → inline modal detail view
- Pure functions for filter/sort with unit tests (Vitest)
- Minimal but clean UI/UX

---

## Architecture

The project is structured in phases/layers:

1. **Data layer**  
   - `src/app/data/intern-case-2.json`: static dataset  
   - `src/app/lib/types.ts`: strong typing

2. **Business logic (pure utils)**  
   - `src/app/lib/filter.ts`: `filterByQueryAndType`  
   - `src/app/lib/sort.ts`: `sortBy`  
   - Tests located in `src/test/` (using Vitest + jsdom)

3. **UI Components**  
   - `PlanExplorerPage`: main entry point  
   - `PlanTable`: table with sortable headers and rows  
   - `FiltersBar`: text search + type dropdown  
   - `PlanDetailModal`: inline modal for item details

4. **State management**  
   - Local React state (`useState`) inside page component  
   - No external global state (kept simple for demo purposes)

5. **Accessibility & UX (Phase 5, optional)**  
   - Sortable headers with `aria-sort`  
   - Focus trap in modal  
   - Keyboard navigability

---

## Testing

The project uses **Vitest**:

- Unit tests for filter/sort utils (`src/test/*.test.ts`)  
- jsdom environment (ready for component tests in the future)  
- All tests pass 

npm run test

---

## Credits
The base idea and dataset come from the Intern Case.
I used ChatGPT (AI assistance) to help with the project structure, file blueprints, and phase breakdown.
The actual implementation, integration, styling, and debugging were done manually.

---

## Extension ideas
If there was more time, this could be extended with:

Pagination / Virtualized table for large datasets

Persistent filters (e.g. query params in the URL)

Tag-based filtering (beyond type)

Export to CSV/Excel

Favorites (save selected items in localStorage)

Server-side mode: API route serving dynamic data instead of static JSON

UI polish using Tailwind or shadcn/ui components

---

## Run locally
clone project from git
npm install
npm run dev
Visit: http://localhost:3000/plan-explorer