@reactivity @cross-role @FEAT-SYNC
Feature: Cross-Role Real-Time Reactive State Synchronization
  As a stakeholder in the school ecosystem
  I want changes made in one portal to immediately reflect in connected portals without server calls or page reloads
  So that data consistency is preserved and all user personas see live updates

  Background:
    Given the Merit Academy frontend application is running with the shared reactive mock store

  @FEAT-SYNC
  Scenario: Teacher marks attendance and updates reflect across Parent and Admin
    Given the user is logged in as "teacher"
    And marks student "Lucas Montgomery" as "absent" on the attendance register
    When the user switches role to "parent"
    Then the parent's ward feed should immediately display "Absent" with an alert badge for "Lucas Montgomery"
    When the user switches role to "admin"
    Then the Daily Attendance Rate on the executive dashboard should automatically recalculate downwards

  @FEAT-SYNC
  Scenario: Student submits homework and appears in Teacher grading queue
    Given the user is logged in as "student"
    And submits coursework solution "Lucas_Math_Assignment_Final.pdf" for "Linear Algebra Problem Set"
    When the user switches role to "teacher"
    Then the teacher's "Homework" queue should list the submission under "submitted" status ready for grading

  @FEAT-SYNC
  Scenario: Teacher grades submission and updates Student report card
    Given the user is logged in as "teacher"
    And grades the submission for "Lucas Montgomery" with score "98" and feedback "Flawless proofs"
    When the user switches role to "student"
    Then the coursework task should appear under "Graded" with score "98" and the teacher's feedback
    When the student opens the "Report Card" tab
    Then the updated score should be reflected in the term transcript

  @FEAT-SYNC
  Scenario: Parent pays tuition invoice and Admin revenue collection increases
    Given the user is logged in as "parent"
    And pays the outstanding invoice of "$1,250" for "Lucas Montgomery"
    Then the invoice status on the parent fee ledger should change to "Paid"
    When the user switches role to "admin"
    Then the Total Collected Fees KPI on the Admin Finance screen should increase by "$1,250"
    And the Tuition Collection Rate percentage should update accordingly

  @FEAT-SYNC
  Scenario: Parent submits absence slip and Teacher approves it
    Given the user is logged in as "parent"
    And submits a medical leave slip for "Lucas Montgomery"
    When the user switches role to "teacher"
    Then the teacher's "Conduct & Leave" tab should display the pending leave slip
    When the teacher clicks "Approve Leave"
    And the user switches role back to "parent"
    Then the leave slip status in the parent portal should display "Approved"

  @FEAT-SYNC
  Scenario: Admin broadcasts institutional circular to all community members
    Given the user is logged in as "admin"
    And broadcasts an urgent circular titled "Campus Winter Closure Notice"
    When the user switches role to "student"
    Then the circular should appear on the student activity feed
    When the user switches role to "parent"
    Then the circular should appear on the parent ward overview

  @FEAT-SYNC
  Scenario: Resetting demo data restores pristine state across all roles
    Given mutations, payments, and submissions have occurred in the session
    When the user clicks the "Reset Demo Data" button in the sidebar footer
    Then all collections (students, fees, homework, attendance, notifications) should restore to their initial seed state
    And a confirmation toast "Demo data reset to defaults" should appear
