# Merit Academy — Multi-Role School Management System

A responsive, frontend-only multi-role mobile and tablet School Management application built with **React 19**, **TypeScript**, and `@fahadbillah/component-library`.

## 🌟 Key Features

### 1. Responsive Viewports & Layout System
- **Mobile (<600px)**: Single-column stacked layouts with a fixed `BottomNavigation` bar for quick thumb-reach access.
- **Tablet & Desktop (600px–1024px+)**: Split-pane master-detail presentation with fixed vertical sidebar, live role switcher pills, and multi-column grid surfaces.

### 2. Multi-Role Authentication & Onboarding
- **Institutional Splash Screen** featuring school crest emblem, mission tagline, and quick demo access.
- **4-Persona Role Switcher** (`Admin`, `Teacher`, `Student`, `Parent`).
- **Pre-populated Mock Credentials** with demo persona quick-fill selector and feedback toast notifications.

### 3. Administrator Control Tower
- **Executive KPI Dashboard**: Enrolled students, faculty roster strength, fee collection rate, daily attendance rate.
- **Revenue Analytics**: Monthly, quarterly, and annual progress bars.
- **Academic Class Master**: Grade and section management with room assignments and student quotas.
- **Student Admissions Directory**: Instant multi-parameter search (Name, ID, Grade Level, Fee Status) and student profile modal.
- **Faculty Payroll**: Attendance records, salary computation breakdown, and one-click disbursement.
- **Fee Ledger**: Accounts receivable with automated reminder dispatch.
- **Transit & Logistics**: Bus route monitoring, driver details, and live satellite map overlay simulation.

### 4. Educator Workspace
- **Daily Teaching Schedule**: Scheduled periods with active period indicators.
- **Rapid Attendance Register**: Tap-and-mark state cycling (`Present` ➔ `Absent` ➔ `Late` ➔ `Excused`) with batch synchronization.
- **Digital Gradebook**: Marks entry with real-time percentage and letter grade calculation.
- **Homework & Resources**: Curriculum assignment distribution with student submission grading modal.
- **Conduct & Leave Queue**: Behavioral commendations/infractions logger and parent absence slip approvals.

### 5. Student Portal
- **Activity Center**: Next-up class hero card, GPA metrics, approaching deadlines, and school circulars.
- **Coursework Locker**: Assignment status tabs (`Pending`, `Submitted`, `Graded`), document upload modal, and teacher grade feedback.
- **Interactive Timetable**: 5-day weekly class schedule with room and teacher allocations.
- **Academic Analytics**: Term marks breakdown and official printable digital report card modal.
- **Digital Library**: Searchable catalog with physical copy reservation and instant e-book reader actions.

### 6. Parent Portal
- **Multi-Ward Switcher**: Dynamic child switcher (Lucas Montgomery vs Maya Montgomery) refreshing attendance, fee, and transit views.
- **Real-Time Bus GPS Tracker**: Vehicle status, telemetry highlights, safety boarding telemetry, and satellite map modal.
- **Fee Payment Center**: Itemized fee breakdown (Tuition, Bus Fare, Activity) and payment gateway simulator with instant receipt generation.
- **Direct Educator Messaging**: Communication thread with message composer.
- **Leave Application & Conference Scheduler**: Absence slip submission and parent-teacher meeting request modal.

## 🛠️ Technology Stack
- **Framework**: React 19, Vite, TypeScript
- **Component Suite**: `@fahadbillah/component-library`
- **Linting & Testing**: Oxlint, Vitest, Testing Library
- **State Store**: Centralized reactive React Context with LocalStorage persistence

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run unit and integration tests
npm test

# Build production bundle
npm run build
```
