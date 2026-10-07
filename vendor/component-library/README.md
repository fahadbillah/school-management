# React Component Library

A high-performance, accessible React component library built on the **Core Adaptive Design System** (modern functionalist aesthetic, 8px spatial grid, crystalline palettes, and soft ambient elevation).

Designed to be consumed seamlessly across modern web projects with zero configuration and zero global style collisions.

---

## Features

- 🎨 **Crystalline Design Tokens**: Oceanic blues, glacial foam surfaces (`#F4FBFA`), and crisp structural outlines (`#A1E3F9`).
- 📏 **Strict 8px Grid Cadence**: Predictable mathematical spacing and touch-compliant (44px+) ergonomics.
- 📦 **Dual Module Formats**: Distributes clean ESM (`.mjs`), CommonJS (`.cjs`), TypeScript type declarations (`.d.ts`), and pre-bundled stylesheet (`style.css`).
- ⚡ **Zero Runtime Overhead**: Styled with CSS Custom Properties and CSS Modules for zero style leaks.
- 🧩 **Zero Icon Lock-in**: Internal SVG icons for core controls (chevron, checkmark, spinner, close); full support for custom `ReactNode` icons.
- 🧪 **Independent Browser Testing**: Storybook (Vite-powered) with CSF stories, live prop controls, and viewport inspection.
- ✅ **Automated CLI Testing**: Vitest and React Testing Library test suites.

---

## Installation & Consumption

Install directly from your GitHub repository into any consumer application (zero npm registry publish required):

```bash
# Using HTTPS / GitHub shorthand:
npm install github:fahadbillah/component-library

# Or using SSH:
npm install git+ssh://git@github.com:fahadbillah/component-library.git
```

In your consumer app's `package.json`, it will look like:

```json
"dependencies": {
  "react-component-library": "github:fahadbillah/component-library"
}
```

### Import Components & Styles

```tsx
import React from 'react';
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Table,
  Input,
} from 'react-component-library';

// Import the bundled stylesheet once in your app's root entrypoint (e.g., main.tsx or App.tsx):
import 'react-component-library/style.css';

export function Dashboard() {
  return (
    <Card elevation={2}>
      <CardHeader bordered>
        <CardTitle>System Overview</CardTitle>
        <Badge variant="success" withDot>
          Operational
        </Badge>
      </CardHeader>
      <CardContent>
        <Button variant="primary" size="md">
          Run Diagnostics
        </Button>
      </CardContent>
    </Card>
  );
}
```

---

## Component Suite

| Component                  | Description                                             | Key Props / Variants                                                                                                                                                        |
| :------------------------- | :------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`Button`**               | Standard interactive action button                      | `variant` (`primary`, `secondary`, `outline`, `ghost`, `danger`), `size` (`sm`, `md`, `lg`), `isLoading`, `leftIcon`, `rightIcon`, `fullWidth`                              |
| **`Badge`**                | Compact status indicator pill                           | `variant` (`success`, `warning`, `danger`, `info`, `neutral`), `withDot`, `size` (`sm`, `md`)                                                                               |
| **`Input`**                | Form text input with focus halo                         | `label`, `helperText`, `errorMessage`, `inputSize` (`sm`, `md`, `lg`), `leftIcon`, `rightIcon`, `isRequired`                                                                |
| **`Textarea`**             | Multi-line text field                                   | `label`, `helperText`, `errorMessage`, `showCharCount`, `maxLength`                                                                                                         |
| **`Select`**               | Native dropdown with integrated SVG chevron             | `label`, `options`, `helperText`, `errorMessage`, `selectSize`                                                                                                              |
| **`Dropdown`**             | Rich custom select with Avatars & descriptions          | `label`, `options` (with `avatar`, `description`, `icon`), `placeholder`, `size`, `errorMessage`                                                                            |
| **`Checkbox`**             | 20px x 20px custom checkmark                            | `label`, `description`, `indeterminate`, `checked`, `disabled`                                                                                                              |
| **`Card`**                 | Tonal surface container                                 | `elevation` (`1`, `2`, `3`), `padding`, `isInteractive`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`                                          |
| **`Table`**                | Data table with tabular figures                         | `TableHeader`, `TableBody`, `TableRow` (`isHoverable`), `TableHead` (`align`), `TableCell` (`isNumeric`, `align`)                                                           |
| **`Modal`**                | Accessible dialog with backdrop blur                    | `isOpen`, `onClose`, `title`, `size`, `closeOnEsc`, `closeOnOverlayClick`, `ModalFooter`                                                                                    |
| **`Avatar`**               | User profile chip with auto initials                    | `src`, `name`, `size` (`xs`, `sm`, `md`, `lg`, `xl`), `status` (`online`, `busy`, `away`, `offline`)                                                                        |
| **`Tabs`**                 | Segmented pill or underline navigation                  | `tabs` (with `id`, `label`, `icon`, `badge`), `activeTab`, `variant` (`pill`, `underline`), `fullWidth`, `TabPanel`                                                         |
| **`Switch`**               | Smooth iOS/M3 style toggle                              | `label`, `description`, `checked`, `disabled`, `onChange`                                                                                                                   |
| **`Radio` / `RadioGroup`** | 20px concentric selection control                       | `name`, `value`, `label`, `description`, `RadioGroup`, `Radio`                                                                                                              |
| **`SearchInput`**          | Quick access search with shortcut badge                 | `placeholder`, `shortcutHint` (e.g. `⌘K`), `onClear`, `defaultValue`                                                                                                        |
| **`StatCard`**             | KPI card with primary container highlight               | `title`, `value`, `trend` (`up`, `down`, `neutral`), `highlighted`, `icon`                                                                                                  |
| **`Drawer`**               | Slide-over panel with backdrop blur                     | `isOpen`, `onClose`, `title`, `placement` (`left`, `right`), `size`, `footer`                                                                                               |
| **`Chip`**                 | Interactive pill tag with avatar, count badge, & states | `label`, `avatar`, `icon`, `variant` (`neutral`, `primary`, `tonal`, `outline`, `success`, `warning`, `danger`), `size` (`sm`, `md`, `lg`), `selected`, `count`, `onRemove` |
| **`MultiSelect`**          | Multi-item select with Avatars, filter & tonal chips    | `label`, `options` (with `avatar`, `badge`, `badgeVariant`, `description`), `value`, `placeholder`, `isSearchable`, `maxDisplayedChips`                                     |
| **`Combobox`**             | Searchable autocomplete filter with category groups     | `label`, `placeholder`, `options` (with `group`, `badge`, `icon`), `value`, `onChange`, `helperText`, `errorMessage`                                                        |
| **`BottomNavigation`**     | Mobile bottom tab bar (80px M3 baseline)                | `value`, `onChange`, `items` (with `id`, `label`, `icon`, `activeIcon`, `badge`), `BottomNavigationItem`                                                                    |
| **`NavigationRail`**       | Adaptive tablet & desktop 80px navigation rail          | `theme` (`dark`, `light`), `orientation` (`vertical`, `horizontal`), `brand`, `brandTitle`, `value`, `onChange`, `items`, `footer`                                          |
| **`Breadcrumb`**           | Hierarchical wayfinding & deep-linking trail            | `variant` (`primary`, `subtle`, `plain`), `separator`, `items` (with `id`, `label`, `href`, `icon`, `isCurrent`, `onClick`)                                                 |
| **`MobileWayfinding`**     | 48px compressed mobile header with path drawer popover  | `parentLabel`, `onBack`, `currentLabel`, `path`, `currentStepIndex`, `totalSteps`, `onStepClick`                                                                            |
| **`AppNavbar`**            | Full desktop & mobile responsive app navigation bar     | `brandLogo`, `brandName`, `brandSubtitle`, `brandHref`, `menuItems` (with `subItems`), `activeItemId`, `onItemClick`, `actions`                                             |

---

## Development & Browser Testing

### 1. Interactive Browser Testing (Storybook)

To inspect, develop, and test components independently in your browser:

```bash
npm run storybook
```

Storybook starts at `http://localhost:6006` with live component controls, responsive viewports, and autodocs.

To build the static Storybook site:

```bash
npm run build-storybook
```

### 2. Automated CLI Unit Tests (Vitest)

To run the unit test suite:

```bash
npm test
```

To run in watch mode:

```bash
npm run test:watch
```

### 3. Production Build

To build the component library distribution bundle:

```bash
npm run build
```

Build outputs:

- `dist/index.mjs` (ES Module bundle)
- `dist/index.cjs` (CommonJS bundle)
- `dist/index.d.ts` (TypeScript type declarations)
- `dist/style.css` (Bundled CSS tokens and module classes)

---

## Design System Tokens Reference

All design tokens are defined in [design.md](file:///Users/fahadbillah/projects/component-library/design.md) and exported as CSS variables in [tokens.css](file:///Users/fahadbillah/projects/component-library/src/styles/tokens.css).
