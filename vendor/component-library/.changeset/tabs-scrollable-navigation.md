---
'react-component-library': minor
---

Enhanced Tabs component with Scrollable Navigation patterns, touch-target sizing, and WAI-ARIA roving tabindex:

- Added `scrollable` navigation container with left/right scroll action controls and gradient overflow indicators.
- Added `maxVisibleTabs` and `moreLabel` props with a right-aligned "More" overflow action button and dropdown popover menu.
- Added `size` variants (`sm`, `md`, `lg`) adhering to 8px spatial grid and mobile touch-target minimums.
- Implemented full WAI-ARIA keyboard navigation (ArrowLeft, ArrowRight, Home, End, roving `tabIndex`).
- Added `React.forwardRef` support for both `Tabs` and `TabPanel`.
- Added Storybook patterns for `ScrollableTabs`, `SegmentedContainedVariant`, `MoreDropdownOverflow`, and mobile viewport scenarios.
