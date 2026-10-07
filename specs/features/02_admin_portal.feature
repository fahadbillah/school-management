@admin @portal @FEAT-ADM
Feature: Administrator Portal Operations & Institutional Control
  As an Administrator (Dr. Arthur Sterling)
  I want to monitor institutional KPIs, configure academic structures, manage student admissions, process faculty payroll, handle fee collections, monitor logistics, and broadcast circulars
  So that the entire institution operates smoothly, transparently, and securely

  Background:
    Given the user is authenticated as "admin"
    And the user is on the Administrator Portal

  # -------------------------------------------------------
  # FEAT-ADM-01: Executive Dashboard & Institutional Health
  # -------------------------------------------------------
  @smoke @FEAT-ADM-01
  Scenario: Viewing executive KPIs on the dashboard
    When the user views the "Dashboard" tab
    Then four StatCards should display the core metrics:
      | Metric                     | Indicator Type |
      | Total Enrolled Students    | numeric count  |
      | Active Faculty Members     | numeric count  |
      | Daily Attendance Rate      | percentage %   |
      | Tuition Collection Rate    | percentage %   |
    And an interactive Revenue Trend chart should be visible
    And a floating "+ Quick Action" button should be available

  @FEAT-ADM-01
  Scenario Outline: Toggling revenue perspective timeframe
    Given the user is on the "Dashboard" tab
    When the user selects the "<timeframe>" revenue period filter
    Then the revenue summary metric should display "<expected_amount>"

    Examples:
      | timeframe  | expected_amount |
      | Monthly    | $184,200        |
      | Quarterly  | $548,600        |
      | Annual     | $2,140,000      |

  # -------------------------------------------------------
  # FEAT-ADM-02: Academic Structure & Class Master Setup
  # -------------------------------------------------------
  @FEAT-ADM-02
  Scenario: Adding a new academic class and section
    Given the user navigates to the "Academics" tab
    Then a table listing existing classes and sections should be visible
    When the user clicks the "Add New Class" button
    Then the "New Class Master" modal should open
    When the user enters the following class details:
      | Field          | Value                  |
      | Grade          | Grade 9                |
      | Section        | B                      |
      | Capacity       | 32                     |
      | Lead Teacher   | Prof. Eleanor Vance    |
      | Room Number    | Room 302               |
    And clicks the "Create Class" button
    Then the modal should close
    And a success toast "Class Grade 9-B registered successfully" should appear
    And the class table should list "Grade 9 - Section B" with room "Room 302" and capacity "32"

  # -------------------------------------------------------
  # FEAT-ADM-03: Student Admission & Directory Management
  # -------------------------------------------------------
  @FEAT-ADM-03
  Scenario: Filtering and searching the student directory
    Given the user navigates to the "Directory" tab
    When the user types "Lucas" into the student search input
    Then the student registry table should only display students matching "Lucas"
    When the user clears search and selects grade filter "Grade 8"
    Then all visible student records should belong to "Grade 8"

  @FEAT-ADM-03
  Scenario: Inspecting a student detail card
    Given the user is viewing the student directory table
    When the user clicks on the row for student "Lucas Montgomery"
    Then the "Student Profile Details" modal should open
    And the modal should display:
      | Attribute       | Expected Value                  |
      | Name            | Lucas Montgomery                |
      | Enrollment No   | ENR-2026-081                    |
      | Grade & Section | Grade 8 - A                     |
      | Guardian        | Katherine Montgomery            |
      | Guardian Email  | katherine.montgomery@outlook.com|
      | Attendance      | Present                         |
      | Fee Status      | Paid                            |
      | GPA             | 3.92                            |

  @FEAT-ADM-03
  Scenario: Admitting a new student with automated enrollment number
    Given the user is on the "Directory" tab
    When the user clicks "New Admission"
    Then the "Student Admission Form" modal should open
    When the user fills in the admission fields:
      | Field          | Value                  |
      | Student Name   | Julian Castillo        |
      | Grade          | Grade 9                |
      | Section        | A                      |
      | Gender         | Male                   |
      | Guardian Name  | Marco Castillo         |
      | Guardian Phone | +1 (555) 672-8821      |
      | Guardian Email | m.castillo@example.com  |
    And clicks "Complete Admission"
    Then a new student record with an auto-generated "ENR-2026-" code should be created
    And the Total Enrolled Students KPI should increment by 1
    And a confirmation toast should indicate successful student registration

  # -------------------------------------------------------
  # FEAT-ADM-04: Faculty & Staff Payroll Management
  # -------------------------------------------------------
  @FEAT-ADM-04
  Scenario: Disbursing faculty monthly salary
    Given the user navigates to the "Payroll" tab
    Then the payroll ledger should display faculty members, salary breakdown, and statuses
    And a faculty member with status "pending" should be present
    When the user clicks "Disburse Salary" for "Prof. Eleanor Vance"
    Then the status badge for "Prof. Eleanor Vance" should update to "Disbursed"
    And a success toast "Salary disbursed for Prof. Eleanor Vance" should appear
    And the overall disbursed payroll metric should reflect the updated payment

  # -------------------------------------------------------
  # FEAT-ADM-05: Financial Operations, Fee Structure & Invoices
  # -------------------------------------------------------
  @FEAT-ADM-05
  Scenario: Sending automated fee reminder for overdue invoice
    Given the user navigates to the "Finance" tab
    Then the fee ledger table should display all student tuition invoices
    When the user locates an invoice with status "overdue" or "pending" for "Maya Montgomery"
    And clicks "Send Reminder"
    Then an automated reminder notification should be dispatched to the parent
    And a toast notification "Automated fee reminder sent to Katherine Montgomery" should appear

  # -------------------------------------------------------
  # FEAT-ADM-06: Logistics, Bus Transit Fleet & Route Tracking
  # -------------------------------------------------------
  @FEAT-ADM-06
  Scenario: Inspecting school bus fleet transit routes
    Given the user navigates to the "Fleet GPS" tab
    Then the bus route overview cards should display:
      | Route Name   | Vehicle No | Status      | Driver Name     |
      | North Route  | BUS-04     | on_schedule | Robert Martinez |
      | South Route  | BUS-07     | on_schedule | Angela Davis    |
    And each card should display current stop, next stop, and ETA minutes

  # -------------------------------------------------------
  # FEAT-ADM-07: Institutional Circulars & Announcement Dispatch
  # -------------------------------------------------------
  @FEAT-ADM-07
  Scenario: Broadcasting an urgent institutional circular
    Given the user is on the Administrator Portal
    When the user clicks the "Issue Circular" button
    Then the "Publish Institutional Circular" modal should open
    When the user enters:
      | Field    | Value                                       |
      | Title    | Annual STEM Science Fair 2026               |
      | Priority | high                                        |
      | Content  | Submissions for the STEM exhibition close on Friday. |
    And clicks "Broadcast Circular"
    Then the circular should be published to the institution newsfeed
    And a confirmation toast "Circular broadcast successfully" should be shown
    And the circular should become visible to Students, Teachers, and Parents
