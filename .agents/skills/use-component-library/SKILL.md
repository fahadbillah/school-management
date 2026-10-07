---
name: use-component-library
description: >-
  Enforce using UI components from @fahadbillah/component-library (react-component-library) when building or modifying frontends. Trigger whenever writing UI layouts, forms, tables, modals, cards, buttons, badges, navigation, or data displays.
---

# Use Component Library (`@fahadbillah/component-library`)

Rules and enforcement patterns for consuming components from [`react-component-library`](file:///Users/fahadbillah/projects/school-management/vendor/component-library) (`@fahadbillah/component-library`).

When developing web interfaces, **never build raw unstyled or ad-hoc custom UI primitives** (`<button>`, `<input>`, `<select>`, raw `<table>`, custom unstyled dialogs, floating divs) when a matching component exists in the library.

---

## 1. Golden Rules of Consumption

1. **Mandatory Import**: Import all UI primitives exclusively from `react-component-library`:
   ```tsx
   import {
     Button,
     Badge,
     Input,
     Select,
     Dropdown,
     Card,
     CardHeader,
     CardTitle,
     CardContent,
     Table,
     TableHeader,
     TableBody,
     TableRow,
     TableHead,
     TableCell,
     Modal,
     Avatar,
     Tabs,
     StatCard,
     Drawer,
     Chip,
     BottomNavigation,
   } from 'react-component-library';
   ```
2. **Style Bundle Requirement**: Verify the bundled stylesheet is imported in the app root (`main.tsx` or `App.tsx`):
   ```tsx
   import 'react-component-library/style.css';
   ```
3. **No Raw HTML Equivalents**:
   - Instead of `<button>`: use `<Button variant="..." size="...">`.
   - Instead of `<input type="text">`: use `<Input label="..." />` or `<SearchInput />`.
   - Instead of `<select>`: use `<Select options={...} />` or `<Dropdown options={...} />`.
   - Instead of raw `<table>`: use `<Table>`, `<TableHeader>`, `<TableBody>`, `<TableRow>`, `<TableHead>`, `<TableCell>`.
   - Instead of custom dialogs/overlays: use `<Modal isOpen={...} onClose={...}>` or `<Drawer>`.
   - Instead of status spans/chips: use `<Badge variant="..." withDot>` or `<Chip>`.
   - Instead of custom metric blocks: use `<StatCard title="..." value="..." trend="..." />`.
   - Instead of raw tab buttons: use `<Tabs tabs={...} activeTab={...} onChange={...} />`.

---

## 2. Component Primitive Mapping Catalog

Consult this catalog to pick the right library component for each UI requirement:

| UI Need | Library Component | Key Variants & Props |
| :--- | :--- | :--- |
| **Actions & Triggers** | `Button` | `variant` (`primary`, `secondary`, `outline`, `ghost`, `danger`), `size` (`sm`, `md`, `lg`), `isLoading`, `leftIcon`, `rightIcon`, `fullWidth` |
| **Status Indicators** | `Badge` | `variant` (`success`, `warning`, `danger`, `info`, `neutral`), `withDot`, `size` (`sm`, `md`) |
| **Form Inputs** | `Input` | `label`, `helperText`, `errorMessage`, `inputSize`, `leftIcon`, `rightIcon`, `isRequired` |
| **Long Text** | `Textarea` | `label`, `helperText`, `errorMessage`, `showCharCount`, `maxLength` |
| **Simple Selection** | `Select` | `label`, `options`, `helperText`, `errorMessage`, `selectSize` |
| **Rich Selection** | `Dropdown` | Rich items with `avatar`, `description`, `icon`, `placeholder` |
| **Autocomplete / Search Filter** | `Combobox`, `MultiSelect` | Filterable options with badges, avatars, and chip selection |
| **Quick Search** | `SearchInput` | `placeholder`, `shortcutHint` (e.g. `⌘K`), `onClear` |
| **Checkboxes & Radios** | `Checkbox`, `Radio`, `RadioGroup` | Controlled checkboxes, radio groups with descriptive labels |
| **Toggles** | `Switch` | `label`, `description`, `checked`, `onChange` |
| **Content Containers** | `Card` | `elevation` (`1`, `2`, `3`), `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` |
| **Metric Highlights** | `StatCard` | `title`, `value`, `trend` (`up`, `down`, `neutral`), `highlighted`, `icon` |
| **Data Grids & Records** | `Table` | `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell` (`isNumeric`) |
| **Dialogs & Forms** | `Modal` | `isOpen`, `onClose`, `title`, `size`, `closeOnEsc`, `ModalFooter` |
| **Slide-over Drawers** | `Drawer` | `isOpen`, `onClose`, `placement` (`left`, `right`), `size`, `footer` |
| **Personas & Profiles** | `Avatar` | `src`, `name`, `size` (`xs`, `sm`, `md`, `lg`, `xl`), `status` |
| **In-Page Navigation** | `Tabs` | `tabs` (with `id`, `label`, `icon`, `badge`), `variant` (`pill`, `underline`) |
| **Interactive Tags** | `Chip` | `label`, `variant`, `size`, `avatar`, `count`, `selected`, `onRemove` |
| **Mobile Bottom Bar** | `BottomNavigation` | `items` (with `id`, `label`, `icon`, `badge`), `value`, `onChange` |
| **Tablet/Desktop Sidebar** | `NavigationRail`, `AppNavbar` | Responsive rail with brand crest, menu items, and orientation |

---

## 3. Step-by-Step Implementation Workflow

When generating or refactoring UI components in a project:

### Step 1: Inventory the UI Requirements
Break down the screen into core patterns:
- KPI displays -> `StatCard`
- Data tables -> `Table` family
- Controls & filters -> `Input`, `SearchInput`, `Select`, `Dropdown`, `Tabs`
- Actions -> `Button`
- Modals & sheets -> `Modal`, `Drawer`

### Step 2: Import from `react-component-library`
Verify existing imports in the target file. Consolidate all UI components into a single import statement from `react-component-library`.

### Step 3: Implement Proper Props and States
Always supply designated props rather than ad-hoc inline styles:
- Use `variant="primary"` instead of custom background colors.
- Use `elevation={2}` on `<Card>` instead of custom `box-shadow`.
- Use `withDot` and semantic variants (`success`, `warning`, `danger`, `info`) on `<Badge>` instead of manual colored spans.
- Use built-in `isLoading` on `<Button>` instead of custom spinners.

### Step 4: Validate Build & Visual Consistency
Run verification commands:
```bash
npm run lint
npm test
npm run build
```
Verify there are no TypeScript prop mismatches or missing imports.
