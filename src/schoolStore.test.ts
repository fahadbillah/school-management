import { describe, it, expect } from 'vitest';
import {
  INITIAL_PROFILES,
  INITIAL_STUDENTS,
  INITIAL_FACULTY,
  INITIAL_CLASSES,
  INITIAL_FEES,
  INITIAL_HOMEWORK,
  INITIAL_BUS_ROUTES,
} from './data/mockData';

describe('School Management Mock Data Store & Entities', () => {
  it('contains pre-configured profiles for all 4 roles', () => {
    const roles = INITIAL_PROFILES.map((p) => p.role);
    expect(roles).toContain('admin');
    expect(roles).toContain('teacher');
    expect(roles).toContain('student');
    expect(roles).toContain('parent');
  });

  it('contains populated student records with valid grades and sections', () => {
    expect(INITIAL_STUDENTS.length).toBeGreaterThanOrEqual(4);
    const lucas = INITIAL_STUDENTS.find((s) => s.id === 'student-1');
    expect(lucas).toBeDefined();
    expect(lucas?.name).toBe('Lucas Montgomery');
    expect(lucas?.gpa).toBeGreaterThanOrEqual(3.0);
    expect(lucas?.attendanceStatus).toBe('present');
  });

  it('contains faculty records with salary and payroll status', () => {
    expect(INITIAL_FACULTY.length).toBeGreaterThanOrEqual(3);
    const prof = INITIAL_FACULTY[0];
    expect(prof.basicSalary).toBeGreaterThan(0);
    expect(prof.payrollStatus).toMatch(/pending|disbursed|processing/);
  });

  it('has valid academic classes linked to teachers', () => {
    expect(INITIAL_CLASSES.length).toBeGreaterThanOrEqual(2);
    const class8a = INITIAL_CLASSES.find((c) => c.id === 'class-8a');
    expect(class8a?.leadTeacherName).toContain('Eleanor Vance');
    expect(class8a?.enrolled).toBeLessThanOrEqual(class8a?.capacity || 100);
  });

  it('contains structured fee invoices with status and dues', () => {
    expect(INITIAL_FEES.length).toBeGreaterThanOrEqual(3);
    const paid = INITIAL_FEES.filter((f) => f.status === 'paid');
    const pending = INITIAL_FEES.filter((f) => f.status !== 'paid');
    expect(paid.length).toBeGreaterThan(0);
    expect(pending.length).toBeGreaterThan(0);
  });

  it('contains curriculum homework tasks with submission lifecycles', () => {
    expect(INITIAL_HOMEWORK.length).toBeGreaterThanOrEqual(3);
    const statuses = INITIAL_HOMEWORK.map((h) => h.status);
    expect(statuses).toContain('pending');
    expect(statuses).toContain('submitted');
    expect(statuses).toContain('graded');
  });

  it('contains active bus routes with telemetry GPS data', () => {
    expect(INITIAL_BUS_ROUTES.length).toBeGreaterThanOrEqual(2);
    const route = INITIAL_BUS_ROUTES[0];
    expect(route.driverName).toBeDefined();
    expect(route.etaMinutes).toBeGreaterThan(0);
    expect(route.coordinates.lat).toBeDefined();
    expect(route.coordinates.lng).toBeDefined();
  });
});
