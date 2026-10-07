@student @portal @FEAT-STU
Feature: Student Activity, Learning Locker & Academic Portal
  As a Student (Lucas Montgomery)
  I want to view my daily class schedule, submit coursework solutions, review academic performance, inspect my digital report card, and reserve library books
  So that I stay organized and excel in my academic studies

  Background:
    Given the user is authenticated as "student"
    And the user is on the Student Portal

  # -------------------------------------------------------
  # FEAT-STU-01: Student Activity Center & Daily Timetable
  # -------------------------------------------------------
  @smoke @FEAT-STU-01
  Scenario: Viewing the student daily activity hub
    When the user views the "Activity" tab
    Then a hero card highlighting the next scheduled class "Theoretical Physics" in "Room 206" should appear
    And summary StatCards should display:
      | Metric               | Expected Value |
      | Cumulative GPA       | 3.92           |
      | Attendance Rate      | 96.4%          |
      | Honor Status         | Honor Roll     |
    And recent school circulars from administration should be visible

  # -------------------------------------------------------
  # FEAT-STU-02: Coursework Locker & Digital Assignment Upload
  # -------------------------------------------------------
  @smoke @FEAT-STU-02
  Scenario: Uploading and submitting coursework solutions
    Given the user navigates to the "Locker" tab
    Then tabs for "Pending", "Submitted", and "Graded" should be displayed
    When the user selects the "Pending" tab
    And clicks on the pending task "Quadratic Equations Problem Set 4"
    Then the assignment submission modal should open
    When the student attaches file "Lucas_Math_Assignment_Final.pdf"
    And clicks "Confirm & Submit Work"
    Then the task status should update to "submitted"
    And the task should move from "Pending" to "Submitted" tab
    And a confirmation toast "Assignment submitted successfully" should appear
    And the task should appear in the educator's review queue

  @FEAT-STU-02
  Scenario: Viewing grades and teacher feedback on evaluated assignments
    Given the user is on the "Locker" tab
    When the user selects the "Graded" tab
    Then evaluated tasks should display their numeric score and letter grade
    And the instructor's written feedback should be displayed

  # -------------------------------------------------------
  # FEAT-STU-03: Weekly Interactive Timetable & Room Locations
  # -------------------------------------------------------
  @FEAT-STU-03
  Scenario Outline: Navigating weekday timetable tabs
    Given the user navigates to the "Timetable" tab
    When the student clicks on the "<day>" tab
    Then the schedule for "<day>" should display chronological periods
    And the first period should be "<expected_first_subject>"

    Examples:
      | day | expected_first_subject |
      | mon | English Literature     |
      | tue | Physical Education     |
      | wed | Theoretical Physics    |
      | thu | English Literature     |
      | fri | Theoretical Physics    |

  # -------------------------------------------------------
  # FEAT-STU-04: Academic Performance Analytics & Report Card
  # -------------------------------------------------------
  @FEAT-STU-04
  Scenario: Inspecting GPA breakdown and opening the official digital report card
    Given the user navigates to the "Report Card" tab
    Then GPA breakdown cards and subject grade tables should be displayed
    When the student clicks "View Official Term Report Card"
    Then a formatted report card modal should open with:
      | Section               | Content                              |
      | Institutional Header  | Merit Academy Official Academic Transcript |
      | Student Details       | Lucas Montgomery - Grade 8A         |
      | Cumulative GPA        | 3.92                                 |
      | Marks Table           | Math, Physics, English, History      |
      | Action Buttons        | "Download PDF", "Print"              |

  # -------------------------------------------------------
  # FEAT-STU-05: Digital Library Catalog & Book Reservation
  # -------------------------------------------------------
  @FEAT-STU-05
  Scenario: Searching and reserving a physical library book
    Given the user navigates to the "Library" tab
    When the student types "Physics" into the library catalog search input
    Then the library grid should only display physics-related books
    When the student finds "Fundamentals of Classical Mechanics" with available copies
    And clicks "Reserve Physical Copy"
    Then the reservation status should update to "Reserved"
    And the available copies count should decrement by 1
    And a confirmation toast "Book reserved successfully. Please collect from Library Desk." should be shown
