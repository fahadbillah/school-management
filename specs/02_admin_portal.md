# 02 - Administrator Portal Specifications

## 1. Feature Identification Matrix

| Code | Title | Operational Scope | Components Used |
| :--- | :--- | :--- | :--- |
| **FEAT-ADM-01** | Executive Dashboard & Health KPI Analytics | Institutional overview, attendance rate, fee collection %, fast-actions | `StatCard`, `Card`, `Button`, `Badge`, `Dropdown` |
| **FEAT-ADM-02** | Academic Structure & Class Master Setup | Grade levels, sections, lead teacher assignments, room allocation | `Table`, `Badge`, `Button`, `Modal`, `Input` |
| **FEAT-ADM-03** | Student Admission & Directory Management | Enrolled student registry, multi-parameter search, student detail card, new admission flow | `Table`, `Input`, `Dropdown`, `Modal`, `Badge`, `Avatar` |
| **FEAT-ADM-04** | Faculty & Staff Payroll Management | Staff directory, compensation breakdown, 1-click payroll disbursement | `Table`, `StatCard`, `Badge`, `Button`, `Modal` |
| **FEAT-ADM-05** | Financial Operations, Fee Structure & Invoices | Fee ledgers, payment tracking, automated reminder dispatch | `Table`, `StatCard`, `Badge`, `Button`, `Modal`, `Input` |
| **FEAT-ADM-06** | Logistics, Bus Transit Fleet & Route Tracking | Bus routes, vehicle telemetry, passenger rosters, driver contact | `Card`, `Badge`, `Button`, `Modal`, `Table` |
| **FEAT-ADM-07** | Institutional Circulars & Announcement Dispatch | Institution-wide notices, priority tagging, role-targeting | `Modal`, `Input`, `Button`, `Badge` |

---

## 2. Feature Deep-Dives

### FEAT-ADM-01: Executive Dashboard & Institutional Health
- **Goal**: Provide the Super Administrator with immediate operational visibility.
- **Key Metrics (StatCards)**:
  1. *Total Enrolled Students*: Calculated count of active student records.
  2. *Active Faculty Members*: Calculated count of active teaching staff.
  3. *Daily Attendance Rate*: Real-time percentage of students marked present today.
  4. *Tuition Fee Collection Rate*: Percentage of paid vs outstanding tuition fees.
- **Interactive Revenue Analysis**:
  - Filter toggle: *Monthly* ($184,200), *Quarterly* ($548,600), *Annual* ($2,140,000).
- **Floating Quick-Action Menu**:
  - `+ New Student Admission`: Launches step-by-step admission modal.
  - `📢 Issue Circular`: Launches institutional notification publisher.
  - `💵 Run Payroll`: Direct shortcut to faculty payroll module.

---

### FEAT-ADM-02: Academic Structure & Class Master Setup
- **Goal**: Maintain grades, sections, class capacities, and assigned teachers.
- **Workflow**:
  1. Admin navigates to **Academics** tab.
  2. Displays data table of registered classes (`Grade 8 - Section A`, `Grade 10 - Section B`, etc.).
  3. Table columns: Class Identifier, Grade & Section, Enrolled / Capacity, Room No, Lead Teacher, Status.
  4. Clicking `+ Add New Class` opens `Modal`:
     - Fields: Grade Level (e.g., Grade 9), Section (A/B/C), Student Capacity (e.g., 32), Room Number (e.g., Science Wing 101), Lead Teacher selector.
     - Submitting appends the class to the reactive store and raises a success Toast notification.

---

### FEAT-ADM-03: Student Admission & Directory Management
- **Goal**: Manage active student enrollment records with fast filtering and admission form.
- **Search & Filter Controls**:
  - Full-text search matching student name and unique enrollment number (e.g., `ENR-2026-081`).
  - Grade filter dropdown (All, Grade 8, Grade 9, Grade 10).
  - Fee standing filter dropdown (All, Paid, Pending, Overdue).
- **Student Profile Inspection**:
  - Tapping any row opens the **Student Detail Modal**:
    - Displays avatar, enrollment code, guardian contacts, GPA score, and fee status.
- **New Admission Workflow**:
  - Modal with student full name, grade selection, section, gender, guardian name, phone, and email.
  - Generates auto-sequenced enrollment ID and assigns default tuition invoice.

---

### FEAT-ADM-04: Faculty & Staff Payroll Management
- **Goal**: Maintain faculty directory, attendance performance, and salary disbursement.
- **Key Indicators**:
  - Total Monthly Payroll Obligation ($34,800/mo).
  - Disbursed Count vs Pending Count.
- **Payroll Table**:
  - Columns: Faculty Member, Subject Specialization, Attendance Rate, Basic Salary, Deductions/Allowances, Net Pay, Status.
  - Action button: `Disburse Salary` / `Disburse All Monthly Salaries`.
  - Disbursing updates faculty record to `disbursed` and logs expenditure in client state.

---

### FEAT-ADM-05: Financial Operations & Fee Management
- **Goal**: Supervise institutional accounts, fee structures, and delinquent dues.
- **Fee Ledger**:
  - Columns: Invoice ID, Student Name, Grade, Due Date, Breakdown (Tuition + Bus + Activity), Total Dues, Status.
  - Interactive Action: `Send Reminder` button on pending or overdue invoices:
    - Triggers automated simulated push notification to the linked parent account.
    - Displays Toast: "Automated payment reminder dispatched to [Parent Name]".

---

### FEAT-ADM-06: Logistics, Bus Transit Fleet & Route Tracking
- **Goal**: Monitor school transit bus routes, vehicle health, driver contact, and passenger safety.
- **Route Cards**:
  - Bus identifier (e.g., `BUS-04 - Blue Route`), assigned vehicle model, driver name, driver telephone.
  - Current location stop, next stop, and real-time ETA in minutes.
  - Status badge: `On Schedule` (green), `Delayed` (amber), `Completed` (neutral).
  - Capacity gauge (e.g., `28/34 Students onboard`).

---

### FEAT-ADM-07: Institutional Circulars & Announcement Dispatch
- **Goal**: Broadcast urgent school notices across students, parents, and educators.
- **Workflow**:
  - Modal opens requesting: *Title*, *Content*, *Priority Level* (`Low`, `Normal`, `High`).
  - Target audience flags: *All*, *Educators*, *Parents*, *Students*.
  - Broadcasting creates an `InstitutionNotification` in mock store that appears immediately in Student Activity feed and Parent Notification trays.
