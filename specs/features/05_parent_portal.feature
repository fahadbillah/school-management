@parent @guardian @portal @FEAT-PAR
Feature: Parent & Guardian Multi-Ward Monitoring & School Engagement
  As a Parent / Guardian (Katherine Montgomery)
  I want to switch between my enrolled children, monitor live bus transit, settle tuition invoices online, communicate with teachers, and submit absence slips
  So that I stay informed and actively support my children's education

  Background:
    Given the user is authenticated as "parent"
    And the user is on the Parent Portal

  # -------------------------------------------------------
  # FEAT-PAR-01: Multi-Ward Switcher & Holistic Student Summary
  # -------------------------------------------------------
  @smoke @FEAT-PAR-01
  Scenario Outline: Switching between multiple enrolled children
    When the user views the "Ward Feed" tab
    And selects "<child_name>" from the ward selector dropdown
    Then the entire overview should refresh to display:
      | Field            | Expected Value        |
      | Student Name     | <child_name>          |
      | Grade            | <grade>               |
      | Today Attendance | <attendance_status>   |
      | Active GPA       | <gpa>                 |

    Examples:
      | child_name       | grade   | attendance_status | gpa  |
      | Lucas Montgomery | Grade 8 | present           | 3.92 |
      | Maya Montgomery  | Grade 3 | present           | 3.85 |

  # -------------------------------------------------------
  # FEAT-PAR-02: Real-Time School Bus GPS Tracker
  # -------------------------------------------------------
  @smoke @FEAT-PAR-02
  Scenario: Tracking school bus transit and inspecting route details
    Given the user navigates to the "Bus GPS" tab
    Then the transit card for the child's bus "BUS-04" should be visible
    And it should display:
      | Attribute        | Value                             |
      | Route            | North Route                       |
      | Driver           | Robert Martinez (+1 555 431-9988) |
      | Status           | on_schedule                       |
      | ETA              | 7 minutes                         |
    When the user clicks "View Live Route Map"
    Then the bus route simulation modal should open
    And the current boarding progress and stops should be visible

  # -------------------------------------------------------
  # FEAT-PAR-03: Fee Ledger & Online Payment Gateway Simulator
  # -------------------------------------------------------
  @FEAT-PAR-03
  Scenario: Settling an outstanding tuition invoice via the simulated payment gateway
    Given the user navigates to the "Tuition Fees" tab
    Then the fee ledger should list invoices for the selected child
    When an invoice with status "pending" exists
    And the user clicks "Pay Dues Online" on the invoice
    Then the payment gateway checkout modal should open
    When the parent selects payment method "Credit Card (Visa •••• 4410)"
    And clicks "Confirm & Authorize Payment"
    Then simulated processing should succeed
    And the invoice status badge should update to "Paid"
    And a receipt number like "RCP-2026-" should be generated
    And a toast notification "Payment processed successfully" should appear
    And the Admin finance ledger should instantly reflect the increased collection

  # -------------------------------------------------------
  # FEAT-PAR-04: Educator Direct Messaging & Conference Scheduler
  # -------------------------------------------------------
  @FEAT-PAR-04
  Scenario: Sending a direct message to a class teacher
    Given the user navigates to the "Teachers" tab
    When the user selects teacher "Prof. Eleanor Vance"
    And types message "Good morning, just checking on Lucas's science project timeline."
    And clicks "Send Message"
    Then the message should appear in the conversation thread
    And a confirmation toast "Message sent" should appear

  @FEAT-PAR-04
  Scenario: Scheduling a parent-teacher conference
    Given the user is on the "Teachers" tab
    When the user clicks "Request Conference"
    Then the conference appointment scheduler modal should open
    When the parent chooses date "2026-10-22" and time slot "03:30 PM - 04:00 PM"
    And clicks "Confirm Booking"
    Then the conference booking should be saved
    And a confirmation toast "Conference appointment scheduled" should appear

  # -------------------------------------------------------
  # FEAT-PAR-05: Digital Absence Request & Leave Approval Status
  # -------------------------------------------------------
  @FEAT-PAR-05
  Scenario: Submitting an absence leave slip for a child
    Given the user navigates to the "Absence Slips" tab
    When the user clicks "Submit Absence Leave Slip"
    Then the leave request modal should open
    When the parent fills in:
      | Field      | Value                       |
      | Category   | Medical                     |
      | Start Date | 2026-10-14                  |
      | End Date   | 2026-10-15                  |
      | Reason     | Dental surgery appointment  |
    And clicks "Submit Leave Slip"
    Then the new leave request should be listed with status "Pending"
    And a toast "Absence slip submitted for teacher review" should appear
    And the request should appear in the educator's leave approval queue
