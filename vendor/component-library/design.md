# Core Adaptive Design System

<!--
Stitch Design Source:
- Project ID: 12635430573370270229
- Screen Resource Name: projects/12635430573370270229/screens/9f41c22f65334e1f88c8741bbc796641
- Screen Title: Master Component Library
-->

---

name: Core Adaptive Ecosystem
colors:
surface: '#f4fbfa'
surface-dim: '#d4dbdb'
surface-bright: '#f4fbfa'
surface-container-lowest: '#ffffff'
surface-container-low: '#eef5f4'
surface-container: '#e8efee'
surface-container-high: '#e2eae9'
surface-container-highest: '#dde4e3'
on-surface: '#161d1d'
on-surface-variant: '#414750'
inverse-surface: '#2b3231'
inverse-on-surface: '#ebf2f1'
outline: '#727781'
outline-variant: '#c1c7d2'
surface-tint: '#1b61a0'
primary: '#115b9b'
on-primary: '#ffffff'
primary-container: '#3674b5'
on-primary-container: '#f5f7ff'
inverse-primary: '#a1c9ff'
secondary: '#226199'
on-secondary: '#ffffff'
secondary-container: '#89bffe'
on-secondary-container: '#004e83'
tertiary: '#3c5f59'
on-tertiary: '#ffffff'
tertiary-container: '#547871'
on-tertiary-container: '#d9fff6'
error: '#ba1a1a'
on-error: '#ffffff'
error-container: '#ffdad6'
on-error-container: '#93000a'
primary-fixed: '#d2e4ff'
primary-fixed-dim: '#a1c9ff'
on-primary-fixed: '#001c37'
on-primary-fixed-variant: '#004880'
secondary-fixed: '#d1e4ff'
secondary-fixed-dim: '#9dcaff'
on-secondary-fixed: '#001d36'
on-secondary-fixed-variant: '#00497c'
tertiary-fixed: '#c4eae2'
tertiary-fixed-dim: '#a8cec6'
on-tertiary-fixed: '#00201c'
on-tertiary-fixed-variant: '#2a4d47'
background: '#f4fbfa'
on-background: '#161d1d'
surface-variant: '#dde4e3'
typography:
display-lg:
fontFamily: Plus Jakarta Sans
fontSize: 40px
fontWeight: '700'
lineHeight: 48px
letterSpacing: -0.02em
display-lg-mobile:
fontFamily: Plus Jakarta Sans
fontSize: 30px
fontWeight: '700'
lineHeight: 36px
letterSpacing: -0.015em
headline-lg:
fontFamily: Plus Jakarta Sans
fontSize: 28px
fontWeight: '600'
lineHeight: 36px
letterSpacing: -0.01em
headline-md:
fontFamily: Plus Jakarta Sans
fontSize: 22px
fontWeight: '600'
lineHeight: 28px
letterSpacing: -0.01em
headline-sm:
fontFamily: Plus Jakarta Sans
fontSize: 18px
fontWeight: '600'
lineHeight: 24px
body-lg:
fontFamily: Inter
fontSize: 16px
fontWeight: '400'
lineHeight: 24px
body-md:
fontFamily: Inter
fontSize: 14px
fontWeight: '400'
lineHeight: 20px
body-sm:
fontFamily: Inter
fontSize: 12px
fontWeight: '400'
lineHeight: 16px
label-lg:
fontFamily: Inter
fontSize: 14px
fontWeight: '600'
lineHeight: 20px
letterSpacing: 0.01em
label-md:
fontFamily: Inter
fontSize: 12px
fontWeight: '500'
lineHeight: 16px
letterSpacing: 0.02em
label-sm:
fontFamily: Inter
fontSize: 11px
fontWeight: '600'
lineHeight: 14px
letterSpacing: 0.03em
rounded:
sm: 0.25rem
DEFAULT: 0.5rem
md: 0.75rem
lg: 1rem
xl: 1.5rem
full: 9999px
spacing:
gutter: 1rem
gutter-md: 1.5rem
gutter-lg: 2rem
margin: 1rem
margin-md: 2rem
margin-lg: 3rem
space-xs: 0.25rem
space-sm: 0.5rem
space-md: 1rem
space-lg: 1.5rem
space-xl: 2rem
---

## Brand & Style

The design system powers an adaptive, cross-platform enterprise and operational command center for mission-critical applications. It balances institutional authority with an approachable, daylight-clear interface atmosphere.

### Personality & Emotional Resonance

The interface conveys organized calm, effortless legibility, and high-efficiency precision. It rejects dense legacy software in favor of an airy, uplifting editorial experience. Visual weight is deliberately balanced to prevent cognitive fatigue during extended operational sessions.

### Design Movement: Modern Functionalist with Soft Ambient Glass

Drawing inspiration from cross-platform convergence (tactile clarity and tonal containment), the visual identity features:

- High-contrast typography set on crystalline, cool-tinted canvas backdrops (`#F4FBFA`).
- Crisp 1px structural outlines tinted with icy maritime hues (`#A1E3F9`) to delineate structural cards without heavy drop shadows.
- Micro-pill metadata tags, deliberate status indicators, and clean ergonomic touch targets.

## Colors

The palette leverages high-order oceanic blues alongside pale mint and glacial ice foams, providing credibility without visual heaviness.

### Core Roles

- **Primary Accent (`#3674B5`)**: Interactive focal points, primary action buttons, active navigation markers, and prominent data peaks.
- **Secondary Accent (`#578FCA`)**: Subordinate controls, contextual links, category tags, and secondary action highlights.
- **Primary Container / Tint (`#D1F8EF`)**: High-contrast, friendly highlight container used behind key badges, active metric cards, and callout sections.
- **Secondary Tint / Structural Outline (`#A1E3F9`)**: Crisp 1px borders, subtle partition dividers, and hover-state focus indicators.
- **Background Surface (`#F4FBFA`)**: Ultra-light glacial foam canvas that eliminates harsh pure-white glare across desktop and tablet dashboards.
- **Surface Container (`#FFFFFF`)**: Pure-white elevation cards and modals resting crisp against the `#F4FBFA` background canvas.

### Typography & Content Tokens

- **High-Emphasis Text (`#0F172A`)**: Headings, critical data values, and default body text (deep slate).
- **Muted Text / Secondary Labels (`#64748B`)**: Captions, timestamp metadata, inactive icons, and helper text.
- **Interactive Secondary Text (`#578FCA`)**: Tappable secondary labels and inline links.

### Semantic Status Tokens

- **Success (`#15803D`)**: Positive confirmation, verified state, active sync. Container: `#DCFCE7`, Border: `#BBF7D0`.
- **Warning (`#B45309`)**: Pending deadlines, schedule clashes, warnings. Container: `#FEF3C7`, Border: `#FDE68A`.
- **Danger (`#B91C1C`)**: Critical alerts, failed assertions, security flags. Container: `#FEE2E2`, Border: `#FECACA`.
- **Info (`#2563EB`)**: Informational updates, scheduled events. Container: `#DBEAFE`, Border: `#BFDBFE`.

## Typography

Typography pairs **Plus Jakarta Sans** for expressive, humanistic headers with **Inter** for disciplined administrative data tables, lists, and dense record forms.

### Structural Hierarchy

- **Display & Headlines (`Plus Jakarta Sans`)**: Delivers open counters and soft geometrical shapes that project modern approachability. Apply tighter letter-spacing on `display-lg` to retain cohesion across widescreen dashboards.
- **Body & Labels (`Inter`)**: Serves dense tabular views, rosters, real-time metrics, and long-form feedback reports with neutral, tall x-height legibility.
- **Numerics & Academic Data**: Numerical entries in rosters and data tables must leverage tabular lining figures (`font-variant-numeric: tabular-nums`) to maintain column verticality.

## Layout & Spacing

The layout is grounded in a modular 8px spatial grid, scaling responsively across handheld devices, hybrid tablets, and dual-monitor administrative stations.

### Grid Framework

- **Mobile (< 768px)**: 4-column fluid layout with `margin: 1rem` and `gutter: 1rem`. Bottom bars manage navigation, cards take full horizontal width.
- **Tablet (768px - 1024px)**: 8-column layout with `margin-md: 2rem` and `gutter-md: 1.5rem`. Navigational rail collapses to icon badges; split panes activate side-by-side.
- **Desktop (> 1024px)**: 12-column layout with max-width container set to `1440px`, centered with `margin-lg: 3rem` and `gutter-lg: 2rem`. Sidebar navigation expands to 260px fixed width with persistent drawers.

### Spacing Cadence

- **Component Size Coupling Rule**:
  - `space-xs` (4px / 0.25rem): Restricted strictly to compact / `sm` parent sizes (e.g. 36px inputs, 22px micro badges, or tight sub-label microcopy).
  - `space-sm` (8px / 0.5rem): The default minimum internal gap, icon-to-label separation, and container-element gap for standard `md` (44px) and prominent `lg` (52px) components.
- Internal component card padding standardizes to `space-md` (16px) on mobile and `space-lg` (24px) on desktop.
- Unrelated structural content sections separate using `space-xl` (32px).

## Elevation & Depth

Visual depth is achieved through **tonal separation with low-contrast structural outlines**, minimizing reliance on heavy drop shadows to sustain an uncluttered dashboard.

### Tonal Stratification

- **Canvas Base**: `#F4FBFA` operates as the primary background foundation.
- **Surface Elevation 1 (Cards, Modules)**: Pure `#FFFFFF` resting directly on the canvas, bounded by a 1px solid border of `#A1E3F9` at 50% opacity (`rgba(161, 227, 249, 0.5)`).
- **Surface Elevation 2 (Dropdowns, Floating Palettes, Popovers)**: `#FFFFFF` paired with a delicate, diffuse maritime shadow:
  - `box-shadow: 0 4px 16px -2px rgba(54, 116, 181, 0.08), 0 2px 6px -1px rgba(15, 23, 42, 0.04)`
- **Surface Elevation 3 (Modals, Dialogs, Persistent Action Sheets)**: Backdrop utilizes a soft blur (`backdrop-filter: blur(8px)`) over an ice-tinted mask (`rgba(15, 23, 42, 0.3)`), with container shadows anchored at:
  - `box-shadow: 0 12px 32px -4px rgba(54, 116, 181, 0.14), 0 4px 12px -2px rgba(15, 23, 42, 0.06)`

## Shapes

The design uses balanced, rounded geometry aligned with cross-platform patterns.

### Shape Tiers

- **Base Components (`8px` / `rounded-md`)**: Checkboxes, select popovers, inline text fields, table cell badges, and button groups.
- **Containers & Surfaces (`12px` - `16px` / `rounded-lg` & `rounded-xl`)**: Primary content cards, profile headers, scheduling tiles, modal sheets, and drawer panels.
- **Pills (`9999px` / `rounded-full`)**: Status indicators, primary floating buttons, avatar containers, and contextual chips.

## Components

### Buttons

- **Primary**: Solid background `#3674B5`, label text `#FFFFFF` (`label-lg`), height `44px` (touch compliant), border-radius `8px`. Active state shifts to `#2A5A8C`. Focus outline: 2px offset with `#A1E3F9`.
- **Secondary / Soft**: Background `#D1F8EF`, label `#3674B5` (`label-lg`), border `1px solid transparent`. Hover applies a 1px border of `#A1E3F9`.
- **Outline / Ghost**: Background transparent, border `1px solid #A1E3F9`, text `#0F172A`. On hover, background transitions to `#F4FBFA`.
- **Danger**: Solid background `#BA1A1A`, label `#FFFFFF`, border-radius `8px`.

### Form Fields & Inputs

- **Base Styling**: Height `44px`, background `#FFFFFF`, border `1px solid #A1E3F9`, border-radius `8px`, font `body-md` in `#0F172A`. Placeholder text `#64748B`.
- **Focus State**: Border color activates to `#3674B5` with a concentric `0 0 0 3px rgba(87, 143, 202, 0.2)` halo.
- **Validation**: Error states swap border to `#B91C1C` with supporting microcopy in `label-sm` danger color.

### Attendance & Semantic Chips / Badges

- **Geometry**: Compact pill `rounded-full`, height `28px`, padding `0 12px`, typography `label-sm`.
- **Success**: Background `#DCFCE7`, text `#15803D`, border `1px solid #BBF7D0`.
- **Warning**: Background `#FEF3C7`, text `#B45309`, border `1px solid #FDE68A`.
- **Danger**: Background `#FEE2E2`, text `#B91C1C`, border `1px solid #FECACA`.
- **Neutral**: Background `#E8EFEE`, text `#414750`, border `1px solid #C1C7D2`.

### Cards & Modules

- Structured on `#FFFFFF` surfaces with `12px` or `16px` radius.
- Outlined by a crisp 1px `#A1E3F9` border (40-60% opacity) against the `#F4FBFA` background canvas.
- Header bands integrate clean metadata labels (`label-md`) and contextual action buttons with clear 16px internal padding.

### Checkboxes & Selection Controls

- **Size**: 20px x 20px with `rounded-sm` (4px) corners.
- **Unselected**: 1.5px border `#A1E3F9`, background `#FFFFFF`.
- **Selected**: Fill `#3674B5`, border `#3674B5`, crisp `#FFFFFF` checkmark icon.

### Rosters & Data Tables

- Alternating row interaction: Clean white cards or table rows separated by 1px horizontal rules in `#F4FBFA`.
- Hover triggers background transition to `#F4FBFA` at 100% opacity.
- Left-aligned primary identifiers with right-aligned tabular metrics or pill badges.
- `font-variant-numeric: tabular-nums` for precise alignment of numerical records.
