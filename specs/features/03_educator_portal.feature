@educator @teacher @portal @FEAT-EDU
Feature: Educator Workspace, Attendance & Academic Evaluation
  As an Educator (Prof. Eleanor Vance)
  I want to review my daily schedule, take rapid attendance, record grades, issue homework assignments, log student incidents, and adjudicate leave requests
  So that I can effectively manage my classes and support student growth

  Background:
    Given the user is authenticated as "teacher"
    And the user is on the Educator Portal

  # -------------------------------------------------------
  # FEAT-EDU-01: Educator Daily Workspace & Schedule Hub
  # -------------------------------------------------------
  @smoke @FEAT-EDU-01
  Scenario: Viewing daily workspace overview and teaching schedule
    When the user views the "Workspace" tab
    Then StatCards should summarize:
      | Metric                 | Details                      |
      | Active Class           | Grade 8A - Mathematics       |
      | Attendance Status      | Marked / Complete            |
      | Pending Homework Review| Items awaiting grading       |
      | Unread Inquiries       | Parent messages              |
    And chronological schedule cards for Periods 1 through 5 should be displayed
    And the current period card should show a "Take Attendance" shortcut button

  # -------------------------------------------------------
  # FEAT-EDU-02: Rapid Tap-and-Mark Attendance Register
  # -------------------------------------------------------
  @smoke @FEAT-EDU-02
  Scenario: Rapidly toggling student attendance status in register
    Given the user navigates to the "Attendance" tab
    And the selected class is "Grade 8A"
    Then a grid of student attendance cards should be rendered
    When the user clicks the attendance card for "Lucas Montgomery"
    Then his status should cycle from "present" to "absent" and badge should turn red
    When the user clicks the card again
    Then his status should cycle to "late" and badge should turn amber
    When the user clicks "Submit Register"
    Then the attendance records in the client store should update
    And a toast notification "Attendance register submitted successfully" should be displayed
    And the parent of "Lucas Montgomery" should receive an attendance alert

  @FEAT-EDU-02
  Scenario: Quick mass-marking all students as Present
    Given the user is on the "Attendance" tab
    When the user clicks "Mark All Present"
    Then all student cards in the grid should display the "Present" badge
    When the user clicks "Submit Register"
    Then all students in the class should be recorded as "present" for today

  # -------------------------------------------------------
  # FEAT-EDU-03: Digital Gradebook & Continuous Assessment Engine
  # -------------------------------------------------------
  @FEAT-EDU-03
  Scenario: Entering marks and verifying dynamic letter grade calculation
    Given the user navigates to the "Gradebook" tab
    When the user selects subject "Mathematics" and assessment "Midterm"
    Then a grading table listing students and editable score inputs should appear
    When the educator updates the score for "Lucas Montgomery" to "95"
    Then the percentage should display "95%"
    And the letter grade should dynamically compute to "A+"
    When the user clicks "Publish Assessment to Report Cards"
    Then the assessment records should be locked
    And a confirmation toast "Assessment results published" should be shown
    And the updated grade should appear on the student and parent report cards

  # -------------------------------------------------------
  # FEAT-EDU-04: Coursework & Homework Assignment Engine
  # -------------------------------------------------------
  @FEAT-EDU-04
  Scenario: Creating and distributing a new homework task
    Given the user navigates to the "Homework" tab
    When the user clicks "Create Homework Task"
    Then the "New Homework Task" modal should open
    When the educator enters the assignment details:
      | Field        | Value                                          |
      | Title        | Quadratic Equations Problem Set 4              |
      | Subject      | Mathematics                                    |
      | Due Date     | 2026-10-18                                     |
      | Instructions | Complete questions 1 to 15 from Chapter 4 text |
    And clicks "Publish Homework"
    Then the modal should close
    And a confirmation toast "Homework task published" should appear
    And the new task should be visible in the Student Coursework Locker

  @FEAT-EDU-04
  Scenario: Reviewing and grading a student homework submission
    Given the user is viewing the "Homework" tab
    And a student submission with status "submitted" exists for "Lucas Montgomery"
    When the educator clicks "Review & Grade" on the submission
    Then the submission review modal should display the file "Lucas_Math_Assignment_Final.pdf"
    When the educator enters score "96" and feedback "Superb deductive proofs and working"
    And clicks "Submit Grade"
    Then the assignment status should update to "graded"
    And a confirmation toast should appear
    And the student should see the score and feedback in their coursework locker

  # -------------------------------------------------------
  # FEAT-EDU-05: Student Conduct & Commendation Logger
  # -------------------------------------------------------
  @FEAT-EDU-05
  Scenario: Logging an academic commendation for a student
    Given the user navigates to the "Conduct & Leave" tab
    When the user clicks "Log Behavioral Incident"
    Then the conduct modal should open
    When the educator enters:
      | Field          | Value                                                  |
      | Student        | Lucas Montgomery                                       |
      | Category       | Commendation                                           |
      | Description    | Exemplary leadership during the STEM robotics lab test |
    And clicks "Save Incident"
    Then the incident should be recorded on the student's profile
    And a toast "Conduct incident logged" should appear
    And a notification should be visible on the parent dashboard

  # -------------------------------------------------------
  # FEAT-EDU-06: Parent Leave Slip Adjudication
  # -------------------------------------------------------
  @FEAT-EDU-06
  Scenario: Approving a pending student absence leave slip
    Given the user is on the "Conduct & Leave" tab
    And a pending absence request exists from "Katherine Montgomery" for "Lucas Montgomery"
    When the educator clicks "Approve Leave"
    Then the leave request status should transition from "pending" to "approved"
    And a success toast "Leave request approved" should appear
    And the parent portal should reflect the "Approved" badge
