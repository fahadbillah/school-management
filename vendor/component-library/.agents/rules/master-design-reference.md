# Master Design System Reference

> **CRITICAL INSTRUCTION FOR AGENTS**:
> DO NOT call `list_projects` or `list_screens` to locate the design system. Jump **directly** to the exact resource names and MCP calls documented below.

---

## 1. Exact Stitch Identifiers

- **Project ID**: `12635430573370270229`
- **Screen ID**: `9f41c22f65334e1f88c8741bbc796641`
- **Full Screen Resource Name**: `projects/12635430573370270229/screens/9f41c22f65334e1f88c8741bbc796641`
- **Screen Title**: `CampusPulse - Figma Master Component Library`
- **Device Type**: `DESKTOP` (2560 x 5532 px)

---

## 2. Direct MCP Tool Invocation

When asked to fetch or inspect the master component library, call `get_screen` directly:

```json
{
  "ServerName": "stitch",
  "ToolName": "get_screen",
  "Arguments": {
    "name": "projects/12635430573370270229/screens/9f41c22f65334e1f88c8741bbc796641"
  }
}
```

---

## 3. Latest Assets & Direct Download URLs

- **Screenshot File Resource**: `projects/12635430573370270229/files/8835648179682492729`
- **Screenshot Direct URL**:
  `https://lh3.googleusercontent.com/aida/AEtjO1W5bAng_LxlLE0EN7tOMLbEiv1sk4Pof81LXGERuo_W-zlURIg5tkwbAYIOgF3XlbsUqYPFXekG3ZWjoYPFOl48csRyETXAri_pqVcEHxhcEASFPSpJfJqvdYaQs7rz7rWIoeE-9AZw1bHbisPeMwszYYljDNuqewckmubjfhjn2H3YCAXPqSkgTAZZ3a-WfyLBkyOumYk4oIpumuHHKk399PhxZThuGwv70KxA7bX95A`

- **HTML File Resource**: `projects/12635430573370270229/files/8420294154884693093`
- **HTML Direct Download URL** (fetch using `read_url_content`):
  `https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJyEgxzdGl0Y2hfZmlsZXMaYgosc3RpdGNoX2h0bWxfMDAwNjVkM2YyZGU4OGQ3MjA0NWFkYjRkN2IyOGY4ZmUSCxIHEMD80JKbERgBkgEkCgpwcm9qZWN0X2lkEhZCFDEyNjM1NDMwNTczMzcwMjcwMjI5&filename=&opi=89354086`

---

## 4. Design System & Implementation Rules

1. **Brand-Agnostic Naming**:
   - Always use generic component and token naming (never use "CampusPulse" in code, component names, prop types, or CSS class names).
2. **8px Grid & Touch Ergonomics**:
   - Touch targets must adhere strictly to minimum heights: `44px` (standard `md`), `36px` (compact `sm`), `52px` (prominent `lg`).
   - Spacing cadence: `--ui-space-4` (4px), `--ui-space-8` (8px), `--ui-space-12` (12px), `--ui-space-16` (16px), `--ui-space-24` (24px), `--ui-space-32` (32px), `--ui-space-48` (48px).
   - Component size coupling: never use arbitrary integer pixel spacing (no 5px, 7px, 11px, 13px, etc.).
3. **Typography Standards**:
   - Headers: `Plus Jakarta Sans`.
   - Body & dense data: `Inter`.
   - Tabular numeric alignment: `font-variant-numeric: tabular-nums`.
