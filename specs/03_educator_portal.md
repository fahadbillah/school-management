# 03 - Educator Portal Specifications

## 1. Feature Identification Matrix

| Code | Title | Operational Scope | Components Used |
| :--- | :--- | :--- | :--- |
| **FEAT-EDU-01** | Educator Daily Workspace & Schedule Hub | Daily timetable, active teaching period countdown, fast links | `StatCard`, `Card`, `Badge`, `Button`, `Avatar` |
| **FEAT-EDU-02** | Rapid Tap-and-Mark Attendance Register | Instant single-tap student attendance status toggle (Present, Absent, Late, Excused) | `Card`, `Badge`, `Button`, `Dropdown`, `Toast` |
| **FEAT-EDU-03** | Digital Gradebook & Continuous Assessment | Spreadsheet marks entry, letter grade auto-calc, term publishing | `Table`, `Input`, `Dropdown`, `Button`, `Badge` |
| **FEAT-EDU-04** | Coursework & Homework Assignment Engine | Task creation, deadline setting, rubric instructions, submission grading | `Card`, `Modal`, `Input`, `Button`, `Badge`, `Table` |
| **FEAT-EDU-05** | Student Conduct & Commendation Logger | Behavioral tracking, positive commendations, parent notifications | `Modal`, `Input`, `Dropdown`, `Button`, `Badge` |
| **FEAT-EDU-06** | Absence Leave Requests & Parent Notes | Review guardian leave slips, approve/reject absence requests | `Table`, `Card`, `Badge`, `Button`, `Toast` |

---

## 2. Feature Deep-Dives

### FEAT-EDU-01: Educator Daily Workspace & Schedule Hub
- **Goal**: Give teachers an at-a-glance dashboard of their daily commitments.
- **Top Metrics**:
  - *Active Class Assignment*: e.g. "Grade 8A - Mathematics" (Room 204).
  - *Today's Attendance Status*: Marked vs Unmarked status indicator.
  - *Pending Homework to Grade*: Counter of submitted student assignments awaiting review.
  - *Unread Parent Messages*: Inbound inquiries count.
- **Daily Schedule Stack**:
  - Chronological schedule cards (Periods 1 through 5) displaying timing, course topic, room, and action button `Take Attendance`.

---

### FEAT-EDU-02: Rapid Tap-and-Mark Attendance Register
- **Goal**: Enable educators to take classroom attendance in under 15 seconds.
- **User Experience**:
  1. Teacher selects target class section (e.g. `Grade 8 - Section A`).
  2. Renders a responsive student card grid. By default, students initialize as **Present** (Green).
  3. Single-tap on any card cycles status in sequence:
     - `Present` (Green badge) -> `Absent` (Red badge) -> `Late` (Amber badge) -> `Excused` (Blue badge).
  4. Quick action buttons: `Mark All Present`, `Reset`.
  5. Clicking `Submit Attendance Register`:
     - Updates client mock store attendance records.
     - Automatically notifies parents whose child is marked `Absent` or `Late`.
     - Recalculates institutional attendance rate on the Admin Executive Dashboard.
     - Displays confirmation Toast: "Attendance recorded successfully for [Class]".

---

### FEAT-EDU-03: Digital Gradebook & Continuous Assessment
- **Goal**: Efficient marks recording and instant letter grade calculations.
- **Interface Structure**:
  - Filter bar: Subject (`Mathematics`), Academic Term (`Term 1` / `Term 2`), Assessment Type (`Midterm`, `Final`, `Quiz`, `Assignment`).
  - Spreadsheet Data Table:
    - Columns: Student Name, Enrollment No, Raw Score (editable number input out of 100), Calculated %, Letter Grade (`A+`, `A`, `B`, `C`), Remarks.
    - Real-time updates: Changing input score dynamically recalculates letter grade and pass/fail badge.
  - Action Button: `Publish Assessment to Report Cards` locks the entries and updates student/parent report cards.

---

### FEAT-EDU-04: Coursework & Homework Assignment Engine
- **Goal**: Distribute learning materials, set homework, and grade student submissions.
- **Homework Creation Flow**:
  - Modal with fields: *Task Title* (e.g. "Quadratic Equations Problem Set"), *Subject*, *Submission Deadline*, *Task Instructions*, *Simulated Attachment Upload*.
  - Publishing adds the task to Student Coursework Lockers in `pending` status.
- **Grading Queue**:
  - Lists submissions under `submitted` status.
  - Teacher clicks `Review & Grade`:
    - Views student submission filename (e.g. `Lucas_Math_Assignment_Final.pdf`).
    - Enters numeric grade (e.g. `95/100`) and written feedback (e.g. "Outstanding deductive proofs").
    - Submitting updates task to `graded` status and alerts the student and parent.

---

### FEAT-EDU-05: Student Conduct & Commendation Logger
- **Goal**: Log disciplinary notes or positive commendations for student records.
- **Incident Logger Flow**:
  - Fields: Target Student dropdown, Incident Category (`Commendation`, `Academic`, `Behavioral`, `Punctuality`), Date, Narrative description.
  - Submitting logs the incident to the student's profile and immediately surfaces on the Parent Portal overview.

---

### FEAT-EDU-06: Absence Leave Review & Approval
- **Goal**: Review and adjudicate leave requests submitted by parents.
- **Interface**:
  - List of pending leave requests with student name, parent contact, category (Medical/Personal), date range, and reason.
  - Action buttons: `Approve Leave` / `Reject`.
  - Action updates leave status in real-time, syncing to the parent view.
