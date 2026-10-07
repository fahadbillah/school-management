# AGENTS.md — Development Guidelines for Merit Academy Frontend

Welcome to the **Merit Academy** frontend repository. This codebase is an entirely client-side, multi-role (Admin, Educator, Student, Parent) school management application built from architectural specifications and Gherkin feature definitions.

All AI coding assistants and developers contributing to this repository MUST strictly follow the directives below.

---

## 1. Specification & Gherkin Single Source of Truth

1. **Build Strictly from Specs**:
   - Every view, workflow, and user interaction is specified in [`specs/`](specs/) and [`specs/features/`](specs/features/).
   - Always reference the corresponding feature file (`.feature`) before creating or modifying UI components.
2. **Accurate User Flows**:
   - Maintain end-to-end user journeys exactly as described in scenarios (e.g. Splash -> Role Selection -> Auto-filled Auth -> Role Dashboard).
   - Ensure role-specific actions flow cleanly without broken states (e.g. Taking Attendance -> toast & state update; Paying Fee -> receipt modal & status change).

---

## 2. Frontend-Only Mock Data Architecture

1. **No External Backend**:
   - The application runs purely client-side in browser memory, powered by `SchoolStoreProvider` and cached in `localStorage`.
   - Never introduce real HTTP API calls, network fetch loops, or backend dependencies.
2. **Cross-Role Reactive Persistence**:
   - Actions taken in one role must immediately propagate across connected roles (see [`specs/06_cross_role_data_sync.md`](specs/06_cross_role_data_sync.md)).
   - Always update the shared store (`useSchoolStore`) so that switching roles reflects changes immediately.

---

## 3. Strict Component Library Enforcement

1. **Zero Ad-Hoc / Raw HTML Primitives**:
   - Always use components provided by [`react-component-library`](vendor/component-library) (`@fahadbillah/component-library`).
   - Do NOT write raw `<button>`, `<input>`, `<select>`, `<textarea>`, unstyled `<table>`, or custom overlay `<div>` elements when an equivalent library component exists.
2. **Component Mapping Reference**:
   - **Buttons & Triggers**: `<Button variant="..." size="...">`
   - **Status Badges & Tags**: `<Badge variant="..." withDot>` and `<Chip>`
   - **Inputs & Filters**: `<Input>`, `<SearchInput>`, `<Textarea>`, `<Select>`, `<Dropdown>`, `<Combobox>`, `<MultiSelect>`
   - **Toggles & Selectors**: `<Switch>`, `<Checkbox>`, `<Radio>`, `<RadioGroup>`
   - **Containers & Surfaces**: `<Card elevation={...}>`, `<CardHeader>`, `<CardTitle>`, `<CardContent>`
   - **Metrics & KPIs**: `<StatCard title="..." value="..." trend="..." />`
   - **Data Displays**: `<Table>`, `<TableHeader>`, `<TableBody>`, `<TableRow>`, `<TableHead>`, `<TableCell>`
   - **Modals & Drawers**: `<Modal isOpen={...} onClose={...}>` and `<Drawer>`
   - **Navigation**: `<Tabs>`, `<BottomNavigation>`, `<NavigationRail>`, `<AppNavbar>`
   - **Profiles**: `<Avatar src="..." name="..." size="..." />`
3. **Reference Skill**:
   - Read and adhere to the [`use-component-library`](.agents/skills/use-component-library/SKILL.md) skill when developing or refactoring UI components.

---

## 4. Verification & Quality Gates

Before finalizing any changes or submitting work:
- Run the linter: `npm run lint` (ensure 0 errors and 0 warnings)
- Run test suites: `npm test` (ensure all tests pass)
- Run typecheck & build: `npm run build` (ensure clean TypeScript compilation and Vite bundling)
