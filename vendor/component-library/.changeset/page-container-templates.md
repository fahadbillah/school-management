---
'react-component-library': minor
---

Introduced responsive Page Container architecture and Blank Page Templates based on Stitch design specifications:

- Added layout spatial tokens to `tokens.css` (`--ui-container-max`, `--ui-container-narrow`, `--ui-container-compact`, responsive horizontal guardrails, and vertical gutters).
- Created pure CSS layout utilities in `layout.css` (`.ui-page-shell`, `.ui-container`, `.ui-page-body`, `.ui-page-header`, `.ui-subnav-strip`, `.ui-page-hero`, `.ui-card-slot`, `.ui-page-footer`) exported as `./layout.css` in `package.json`.
- Implemented lightweight polymorphic React layout components in `src/components/Layout/` (`PageShell`, `PageContainer`, `PageBody`, `PageHeader`, `SubNavStrip`, `PageHero`, `CardSlot`, `PageFooter`) with `React.forwardRef` and clean TypeScript typing.
- Added comprehensive Storybook templates in `Templates/PageContainers` demonstrating:
  - **StandardHubTemplate** (Variant A: persistent sticky header, 1280px standard container, central wireframe card body, pinned footer).
  - **DetailSubPageTemplate** (Variant B: 48px subnav breadcrumb strip with back CTA, hero title strip with CTAs, nested card slot).
  - **MobileBlankViewportTemplate** (Variant C: 390px mobile viewport frame with edge-safe 16px padding and touch ergonomics).
