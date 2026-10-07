# 04 - Student Portal Specifications

## 1. Feature Identification Matrix

| Code | Title | Operational Scope | Components Used |
| :--- | :--- | :--- | :--- |
| **FEAT-STU-01** | Student Activity Feed & Daily Timetable | Daily overview, upcoming lesson countdown, circular alerts | `StatCard`, `Card`, `Badge`, `Avatar`, `Button` |
| **FEAT-STU-02** | Coursework Locker & Digital Assignment Upload | Homework tracking (`Pending`, `Submitted`, `Graded`), submission modal | `Card`, `Badge`, `Button`, `Modal`, `Input` |
| **FEAT-STU-03** | Interactive Weekly Schedule & Timetable | Daily period breakdown (Mon-Fri), room locations, instructor info | `Card`, `Badge`, `Button`, `Dropdown` |
| **FEAT-STU-04** | Academic Performance Analytics & Report Cards | GPA overview, subject breakdown, digital printable report card | `StatCard`, `Card`, `Table`, `Badge`, `Button`, `Modal` |
| **FEAT-STU-05** | Digital Library Catalog, Search & Book Hold Engine | Resource discovery, physical book reserve simulator, e-book download | `Card`, `Input`, `Badge`, `Button`, `Modal` |

---

## 2. Feature Deep-Dives

### FEAT-STU-01: Student Activity Feed & Daily Timetable
- **Target Student Persona**: Lucas Montgomery (`Grade 8A`).
- **Hero Card**:
  - Highlights *Next Scheduled Class*: "Theoretical Physics" - 11:00 AM in Room 206 with Dr. Jonathan Ross.
- **Metric Cards**:
  - *Cumulative GPA*: `3.92 / 4.00` (`Honor Roll` badge).
  - *Current Attendance*: `96.4%` (Present streak).
  - *Pending Tasks*: Active homework countdown.
- **Institutional News Feed**:
  - Displays circulars issued by administration (e.g. Science Fair schedules, Sports Day signups).

---

### FEAT-STU-02: Coursework Locker & Assignment Upload
- **Goal**: Facilitate homework inspection, file submission, and teacher feedback review.
- **Tabbed Status Segments**:
  1. **Pending**: Tasks requiring completion.
  2. **Submitted**: Assignments awaiting teacher grading.
  3. **Graded**: Reviewed assignments showing score and teacher feedback.
- **Submission Workflow**:
  - Student selects a pending assignment card (e.g. "Linear Algebra Problem Set").
  - Taps `Upload & Submit Solution`.
  - Modal opens with simulated file picker, displaying pre-filled filename (`Lucas_Math_Assignment_Final.pdf`).
  - Clicking `Confirm & Submit Work`:
    - Updates assignment status to `submitted`.
    - Logs submission timestamp.
    - Moves task into the educator's grading queue.
    - Shows confirmation Toast: "Assignment submitted successfully!"

---

### FEAT-STU-03: Interactive Weekly Schedule & Timetable
- **Goal**: Weekly planner with instant weekday navigation.
- **Controls**:
  - Horizontal weekday tabs (`Mon`, `Tue`, `Wed`, `Thu`, `Fri`).
- **Period Cards**:
  - Chronological time range (e.g. `09:45 - 10:45`).
  - Subject title with color-coded dot badge.
  - Classroom location (e.g. `Room 204`) and Instructor name (`Prof. Eleanor Vance`).
  - Quick action: `View Syllabus & Materials`.

---

### FEAT-STU-04: Academic Performance Analytics & Report Card
- **Goal**: In-depth academic evaluation and term report generation.
- **Subject Scores Table**:
  - Mathematics: `94%` (Grade A, Pass)
  - Theoretical Physics: `91%` (Grade A, Pass)
  - English Literature: `88%` (Grade B+, Pass)
  - World History: `85%` (Grade B, Pass)
- **Digital Report Card Preview**:
  - Clicking `View Official Term Report Card` opens full-screen `Modal`:
    - Displays official academy header, student photo, cumulative GPA, subject scores, teacher remarks, and simulated `Download PDF` and `Print` buttons.

---

### FEAT-STU-05: Digital Library Catalog & Book Hold Engine
- **Goal**: Search physical books, reserve copies, or access e-books.
- **Search & Filters**:
  - Keyword search across book title, author, and category (`Science`, `Literature`, `History`).
- **Book Availability Cards**:
  - Cover placeholder icon, Title, Author, ISBN, Copies Available.
  - Interactive Action:
    - If physical copies available: `Reserve Physical Copy` puts temporary hold on book and decrements available count.
    - If e-book available: `Read E-Book Now` opens digital reader preview.
