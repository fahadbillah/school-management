# 05 - Parent & Guardian Portal Specifications

## 1. Feature Identification Matrix

| Code | Title | Operational Scope | Components Used |
| :--- | :--- | :--- | :--- |
| **FEAT-PAR-01** | Multi-Ward Switcher & Holistic Student Summary | Multi-child dropdown selector, attendance badge, live GPA | `StatCard`, `Card`, `Badge`, `Avatar`, `Dropdown`, `Button` |
| **FEAT-PAR-02** | Real-Time Bus GPS Tracker & Transit Alerts | Fleet transit telemetry, ETA countdown, vehicle stop map | `Card`, `Badge`, `Button`, `Modal` |
| **FEAT-PAR-03** | Fee Ledger & Online Payment Gateway Simulator | Itemized fee breakdown, dues settlement, PDF digital receipt | `StatCard`, `Table`, `Badge`, `Button`, `Modal`, `Dropdown` |
| **FEAT-PAR-04** | Educator Direct Messaging & Conference Scheduler | Chat thread with class teachers, parent-teacher appointment booking | `Card`, `Input`, `Button`, `Avatar`, `Modal`, `Badge` |
| **FEAT-PAR-05** | Digital Absence Request & Leave Approval Status | Medical / personal absence request submission, status tracker | `Card`, `Modal`, `Input`, `Dropdown`, `Button`, `Badge` |

---

## 2. Feature Deep-Dives

### FEAT-PAR-01: Multi-Ward Switcher & Holistic Student Summary
- **Target Parent Persona**: Katherine Montgomery (Guardian to Lucas Montgomery - Grade 8A, and Maya Montgomery - Grade 3B).
- **Multi-Ward Selector**:
  - Prominent ward picker dropdown at the top of the interface:
    - `Lucas Montgomery (Grade 8A)`
    - `Maya Montgomery (Grade 3B)`
  - Selecting a child immediately swaps the data context across the entire portal:
    - Today's attendance status updates (e.g. `Present` vs `Late`).
    - Active GPA metric and conduct badges re-render.
    - Assigned bus route and fee invoice schedule dynamically switch.

---

### FEAT-PAR-02: Real-Time School Bus GPS Tracker
- **Goal**: Provide parents with peace of mind regarding school transit safety.
- **Transit Card**:
  - Vehicle details: `BUS-04 (Blue Route)`, Driver: Robert Martinez (`+1 (555) 431-9988`).
  - Real-time ETA: e.g. `7 minutes to North Gate Stop`.
  - Live Status Badge: `On Schedule` (Green).
- **Interactive Bus Route Map Simulation**:
  - Tapping `View Live Route Map` opens `Modal`:
    - Simulated visual map overlay showing the bus pin advancing along stops:
      1. *Central Campus Terminal* (Departed)
      2. *Elm Street Station* (Completed)
      3. *North Gate Residential Stop* (Approaching)
    - Student boarding alert card: "Lucas boarded Bus 04 at 07:42 AM".

---

### FEAT-PAR-03: Fee Ledger & Online Payment Gateway Simulator
- **Goal**: Transparent fee tracking and simulated online dues payment.
- **Financial Status Cards**:
  - Total Outstanding Tuition Dues (e.g. `$2,450.00`).
  - Next payment deadline.
- **Invoices Table**:
  - Columns: Invoice Description, Term, Due Date, Tuition Fee, Bus Transit Fee, Activity Fee, Total Amount, Status (`Paid` / `Pending` / `Overdue`).
- **Payment Gateway Simulation**:
  - Tapping `Pay Dues Online` launches itemized checkout modal.
  - Parent selects payment method: `Credit Card (Visa •••• 4410)`, `ACH Bank Transfer`, or `Apple Pay`.
  - Clicking `Confirm & Authorize Payment`:
    - Simulates gateway processing.
    - Updates invoice status to `paid`.
    - Generates unique receipt code (`RCP-2026-9812`).
    - Updates Admin fee collection rates instantaneously.
    - Enables `Download Tax Receipt` button.

---

### FEAT-PAR-04: Educator Direct Messaging & Conference Scheduler
- **Goal**: Seamless two-way communication between parents and educators.
- **Direct Messaging Thread**:
  - Target teacher selector (e.g. `Prof. Eleanor Vance - Lead STEM Faculty`).
  - Scrollable chat history showing incoming messages and parent replies.
  - Text composer input with instant `Send Message` action.
- **Parent-Teacher Conference Booking**:
  - Tapping `Request Conference` opens scheduling modal:
    - Date picker (e.g. `2026-10-22`).
    - Available time slots (e.g. `03:30 PM - 04:00 PM`).
    - Notes topic field.
    - Confirmed booking logs in educator and parent calendars.

---

### FEAT-PAR-05: Digital Absence Request & Leave Approval Status
- **Goal**: Streamline absence notifications without paper notes or calls.
- **Submission Workflow**:
  - Parent clicks `Submit Absence Leave Slip`.
  - Modal with fields:
    - *Child Name* (pre-selected ward).
    - *Absence Category* (`Medical Illness`, `Family Event`, `Emergency`).
    - *Start Date* & *End Date*.
    - *Reason Narrative*.
  - Submitting sets status to `pending` and immediately notifies the class teacher's approval queue.
  - Status transitions to `approved` when adjudicated by the educator.
