---
'react-component-library': patch
---

Moved More overflow dropdown button inside tab nav bar and updated story scenario:

- Nested `moreWrapper` directly inside `<div role="tablist">` so the More button lives inside the tab nav bar track across all variants (pill, underline, segmented).
- Refined `.moreButton` CSS styling to seamlessly align with `.tab` dimensions, active states, and focus rings.
- Updated `MoreDropdownOverflow` Storybook scenario to display `maxVisibleTabs={2}`.
- Added unit test assertion verifying the More overflow button is contained within the `tablist` element.
