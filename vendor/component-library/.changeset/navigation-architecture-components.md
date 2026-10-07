---
'react-component-library': minor
---

Added App Navigation Architecture & Navigation Menus directly from Stitch Master Component Library:

- Added `BottomNavigation` & `BottomNavigationItem` for mobile viewports (80px M3 baseline height, `#D1F8EF` active pill container, `#3674B5` highlight, notification count badges, and touch-target compliance).
- Added `NavigationRail` & `NavigationRailItem` for tablet and desktop adaptive navigation (80px width, dark and light shell themes, brand logo slot, active indicator states).
- Added `Breadcrumb` wayfinding trail (primary card container with `#A1E3F9` border, subtle border variant, and active node highlight badge).
- Added `MobileWayfinding` compressed 48px header pattern (single-tap back-step pill + current node sheet/popover trigger with contextual hierarchy path jump).
- Added `AppNavbar` desktop header with brand slot, horizontal menus, interactive dropdown submenus, quick search trigger (`⌘K`), notification bell, user profile avatar, and responsive mobile drawer.
- Added comprehensive unit test suites (11 tests in `Navigation.test.tsx`, 81 total tests passing) and interactive Storybook CSF stories.
- Exported all components and types in `src/index.ts` and updated documentation.
