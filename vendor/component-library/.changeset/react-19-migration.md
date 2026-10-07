---
'react-component-library': minor
---

Migrate component library to React 19, standardize packaging, eliminate global CSS bleed, and configure release automation:

- Upgraded dependencies and peerDependencies to React 19 (`react@^19.0.0`, `react-dom@^19.0.0`, `@types/react@^19.0.0`, `@types/react-dom@^19.0.0`).
- Isolated global CSS reset into opt-in `reset.css` and scoped `index.css` root tokens to prevent polluting consumer document styles.
- Added explicit `sideEffects: ["**/*.css"]`, modern export subpaths (`.`, `./style.css`, `./reset.css`), and `engines.node` specification in `package.json`.
- Configured `@changesets/cli` for automated versioning and release management.
- Integrated `publint` into the build and CI workflow to validate package distribution standards.
