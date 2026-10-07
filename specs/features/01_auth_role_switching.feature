@auth @onboarding @roles
Feature: Authentication, Onboarding, and Multi-Persona Demo Switching
  As a demonstrator or school community member (Administrator, Educator, Student, Parent)
  I want to access an institutional splash screen, select my role, auto-fill credentials, and switch personas seamlessly
  So that I can experience role-tailored dashboards and verify cross-role reactivity without backend dependencies

  Background:
    Given the Merit Academy frontend application is initialized
    And the client mock store is loaded with baseline institutional seed data

  @smoke @FEAT-AUTH-00
  Scenario: Launching the app to the Splash and Onboarding screen
    When the user navigates to the application root
    Then the Splash Screen should be displayed
    And the institutional crest "🏫" and title "Merit Academy" should be visible
    And the tagline "Integrated K-12 Institutional Management Platform" should be displayed
    And feature highlight pills for "Administrative Tower", "Educator Workspace", and "Student & Parent Portals" should be visible
    And a primary action button "Get Started" should be present
    And a secondary quick action button "Explore Demo Environment" should be present

  @FEAT-AUTH-00
  Scenario: Rapid entry via the Explore Demo Environment bypass
    Given the user is on the Splash Screen
    When the user clicks the "Explore Demo Environment" button
    Then the session should immediately authenticate as default administrator "Dr. Arthur Sterling"
    And a toast message "Entered demo environment as Dr. Arthur Sterling (Super Administrator)" should be displayed
    And the user should be redirected to the Administrator Executive Dashboard

  @FEAT-AUTH-00
  Scenario Outline: Selecting a role from the 2x2 persona selection grid
    Given the user is on the Splash Screen
    When the user clicks the "Get Started" button
    Then the Role Selector Screen should be displayed
    And cards for "Administrator", "Educator", "Student", and "Parent" should be displayed
    When the user selects the "<role>" card
    Then the "<role>" card should be highlighted with an active badge
    And the action button should display "Continue as <button_label>"
    When the user clicks the "Continue as <button_label>" button
    Then the Authentication Form should be displayed
    And the email field should be pre-populated with "<expected_email>"
    And the institution code field should be pre-populated with "MERIT-2026"

    Examples:
      | role          | button_label  | expected_email                     |
      | Administrator | Administrator | admin@meritacademy.edu             |
      | Educator      | Educator      | e.vance@meritacademy.edu           |
      | Student       | Student       | lucas.m@students.meritacademy.edu  |
      | Parent        | Parent        | katherine.montgomery@outlook.com   |

  @FEAT-AUTH-00
  Scenario: Switching demo personas via the Quick-Fill dropdown
    Given the user is on the Authentication Form Screen
    When the user selects "Prof. Eleanor Vance - Lead Faculty - STEM" from the persona quick-fill dropdown
    Then the email input should update to "e.vance@meritacademy.edu"
    When the user clicks "Sign In"
    Then the sign in button should show a loading indicator
    And after authentication completes, a toast notification "Authenticated as Lead Faculty - STEM: Prof. Eleanor Vance" should appear
    And the Educator Workspace Dashboard should be displayed

  @session @FEAT-AUTH-00
  Scenario Outline: Seamless in-session persona switching via the navigation layout
    Given the user is logged in as "<initial_role>"
    When the user clicks the "<target_role>" quick-switch pill in the navigation panel
    Then the active user role should immediately change to "<target_role>"
    And the navigation items should update to match "<target_role>" views
    And any mutations made during "<initial_role>" should remain intact in client memory

    Examples:
      | initial_role | target_role |
      | admin        | teacher     |
      | teacher      | parent      |
      | parent       | student     |
      | student      | admin       |

  @session @FEAT-AUTH-00
  Scenario: Logging out from the application
    Given the user is logged into any portal
    When the user clicks the "Sign Out" button
    Then the current session should be terminated
    And the user should be returned to the Splash Screen
