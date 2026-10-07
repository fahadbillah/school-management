import React, { useState } from 'react';
import {
  StatCard,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Badge,
  Button,
  Input,
  Select,
  Modal,
  Tabs,
} from 'react-component-library';
import { useSchoolStore } from '../../context/useSchoolStore';
import type { StudentRecord } from '../../types/models';

export const AdminPortal: React.FC = () => {
  const {
    students,
    faculty,
    classes,
    fees,
    attendance,
    busRoutes,
    addStudent,
    addClass,
    disbursePayroll,
    sendFeeReminder,
    addNotification,
    showToast,
  } = useSchoolStore();

  const [activeTab, setActiveTab] = useState('overview');
  const [revenuePeriod, setRevenuePeriod] = useState<'monthly' | 'quarterly' | 'annual'>('monthly');

  // Modals
  const [isNewStudentModalOpen, setIsNewStudentModalOpen] = useState(false);
  const [isNewClassModalOpen, setIsNewClassModalOpen] = useState(false);
  const [isCircularModalOpen, setIsCircularModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);

  // Search & Filters
  const [studentSearch, setStudentSearch] = useState('');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [feeStatusFilter, setFeeStatusFilter] = useState('all');

  // Forms
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentGrade, setNewStudentGrade] = useState('Grade 8');
  const [newStudentSection, setNewStudentSection] = useState('A');
  const [newStudentGender, setNewStudentGender] = useState('Male');
  const [newGuardianName, setNewGuardianName] = useState('');
  const [newGuardianPhone, setNewGuardianPhone] = useState('');
  const [newGuardianEmail, setNewGuardianEmail] = useState('');

  const [newClassGrade, setNewClassGrade] = useState('Grade 9');
  const [newClassSection, setNewClassSection] = useState('A');
  const [newClassCapacity, setNewClassCapacity] = useState(30);
  const [newClassTeacher, setNewClassTeacher] = useState('Prof. Eleanor Vance');
  const [newClassRoom, setNewClassRoom] = useState('Science Wing 101');

  const [circularTitle, setCircularTitle] = useState('');
  const [circularContent, setCircularContent] = useState('');
  const [circularPriority, setCircularPriority] = useState<'low' | 'normal' | 'high'>('normal');

  // Calculation helpers
  const totalStudents = students.length;
  const totalFaculty = faculty.length;
  const presentStudents = attendance.filter((a) => a.status === 'present').length;
  const attendanceRate = Math.round((presentStudents / (attendance.length || 1)) * 100);

  const totalCollectedFees = fees
    .filter((f) => f.status === 'paid')
    .reduce((sum, f) => sum + f.totalAmount, 0);

  const totalPendingFees = fees
    .filter((f) => f.status !== 'paid')
    .reduce((sum, f) => sum + f.totalAmount, 0);

  const collectionRate = Math.round(
    (totalCollectedFees / (totalCollectedFees + totalPendingFees || 1)) * 100
  );

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.enrollmentNo.toLowerCase().includes(studentSearch.toLowerCase());
    const matchesGrade = gradeFilter === 'all' || s.grade === gradeFilter;
    const matchesFee = feeStatusFilter === 'all' || s.feeStatus === feeStatusFilter;
    return matchesSearch && matchesGrade && matchesFee;
  });

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName || !newGuardianName) {
      showToast('Please fill in student and guardian names', 'error');
      return;
    }

    addStudent({
      name: newStudentName,
      grade: newStudentGrade,
      section: newStudentSection,
      gender: newStudentGender,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      guardianName: newGuardianName,
      guardianPhone: newGuardianPhone || '+1 (555) 000-0000',
      guardianEmail: newGuardianEmail || 'guardian@example.com',
      attendanceStatus: 'present',
      feeStatus: 'pending',
      gpa: 3.5,
      dob: '2012-01-01',
    });

    setIsNewStudentModalOpen(false);
    setNewStudentName('');
    setNewGuardianName('');
  };

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    addClass({
      grade: newClassGrade,
      section: newClassSection,
      capacity: Number(newClassCapacity),
      leadTeacherId: 'faculty-1',
      leadTeacherName: newClassTeacher,
      roomNo: newClassRoom,
    });
    setIsNewClassModalOpen(false);
  };

  const handleCreateCircular = (e: React.FormEvent) => {
    e.preventDefault();
    if (!circularTitle || !circularContent) {
      showToast('Please enter title and content', 'error');
      return;
    }
    addNotification(circularTitle, circularContent, circularPriority, [
      'admin',
      'teacher',
      'student',
      'parent',
    ]);
    setIsCircularModalOpen(false);
    setCircularTitle('');
    setCircularContent('');
  };

  const adminTabs = [
    { id: 'overview', label: 'Dashboard & KPI' },
    { id: 'academics', label: 'Academic Structure' },
    { id: 'students', label: 'Admissions & Directory' },
    { id: 'payroll', label: 'Faculty Payroll' },
    { id: 'finance', label: 'Financial Operations' },
    { id: 'logistics', label: 'Transport & Fleet' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Tab Navigation Strip */}
      <Tabs
        tabs={adminTabs}
        activeTab={activeTab}
        onChange={setActiveTab}
        variant="pill"
        scrollable
      />

      {/* 1. Executive Dashboard View */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* StatCards Row */}
          <div className="grid-4col">
            <StatCard
              title="Enrolled Students"
              value={totalStudents.toString()}
              trend={{ direction: 'up', value: '+8% vs last year' }}
            />
            <StatCard
              title="Faculty Count"
              value={totalFaculty.toString()}
              trend={{ direction: 'neutral', value: '100% staffed' }}
            />
            <StatCard
              title="Fee Collection Rate"
              value={`${collectionRate}%`}
              trend={{ direction: 'up', value: '+$3.9k this week' }}
            />
            <StatCard
              title="Daily Attendance Rate"
              value={`${attendanceRate}%`}
              trend={{ direction: 'up', value: 'Average 96%' }}
            />
          </div>

          {/* Revenue Analytics & Quick Action Bar */}
          <div className="grid-2col">
            <Card elevation={1}>
              <CardHeader bordered>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <CardTitle>Institutional Revenue Trends</CardTitle>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <Button
                      variant={revenuePeriod === 'monthly' ? 'primary' : 'ghost'}
                      size="sm"
                      onClick={() => setRevenuePeriod('monthly')}
                    >
                      Monthly
                    </Button>
                    <Button
                      variant={revenuePeriod === 'quarterly' ? 'primary' : 'ghost'}
                      size="sm"
                      onClick={() => setRevenuePeriod('quarterly')}
                    >
                      Quarterly
                    </Button>
                    <Button
                      variant={revenuePeriod === 'annual' ? 'primary' : 'ghost'}
                      size="sm"
                      onClick={() => setRevenuePeriod('annual')}
                    >
                      Annual
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div style={{ padding: '16px 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '14px', color: '#64748b' }}>Tuition & Aux Dues Collected:</span>
                    <strong style={{ fontSize: '16px', color: '#10b981' }}>
                      ${totalCollectedFees.toLocaleString()}
                    </strong>
                  </div>
                  <div style={{ width: '100%', height: '12px', background: '#e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${collectionRate}%`,
                        height: '100%',
                        background: '#3b82f6',
                        borderRadius: '6px',
                        transition: 'width 0.4s ease',
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '12px', color: '#64748b' }}>
                    <span>Pending Dues: ${totalPendingFees.toLocaleString()}</span>
                    <span>Fiscal Projection: $125,000</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card elevation={1}>
              <CardHeader bordered>
                <CardTitle>Administrative Rapid Action Console</CardTitle>
                <Badge variant="info">Fast Dispatch</Badge>
              </CardHeader>
              <CardContent>
                <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
                  Execute high-priority operational workflows directly from the executive control center:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => setIsNewStudentModalOpen(true)}
                  >
                    + Register New Student Admission
                  </Button>
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={() => setIsNewClassModalOpen(true)}
                  >
                    + Setup Class / Section Allocation
                  </Button>
                  <Button
                    variant="ghost"
                    size="md"
                    onClick={() => setIsCircularModalOpen(true)}
                  >
                    📢 Broadcast Institutional Circular
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* 2. Academic Structure & Class Setup */}
      {activeTab === 'academics' && (
        <Card elevation={1}>
          <CardHeader bordered>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <div>
                <CardTitle>Academic Class & Section Master Engine</CardTitle>
                <p style={{ fontSize: '13px', color: '#64748b' }}>
                  Configure classrooms, maximum student quotas, and appointed faculty leads.
                </p>
              </div>
              <Button variant="primary" size="sm" onClick={() => setIsNewClassModalOpen(true)}>
                + Add Class Section
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Grade & Section</TableHead>
                  <TableHead>Facility Room</TableHead>
                  <TableHead>Lead Faculty Advisor</TableHead>
                  <TableHead>Enrollment Capacity</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classes.map((cls) => (
                  <TableRow key={cls.id}>
                    <TableCell>
                      <strong>{cls.grade}</strong> - Section {cls.section}
                    </TableCell>
                    <TableCell>{cls.roomNo}</TableCell>
                    <TableCell>{cls.leadTeacherName}</TableCell>
                    <TableCell>
                      {cls.enrolled} / {cls.capacity} students
                    </TableCell>
                    <TableCell>
                      <Badge variant={cls.enrolled >= cls.capacity ? 'warning' : 'success'}>
                        {cls.enrolled >= cls.capacity ? 'Full' : 'Available'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* 3. Student Admission & Directory */}
      {activeTab === 'students' && (
        <Card elevation={1}>
          <CardHeader bordered>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <CardTitle>Student Registry & Admission Directory</CardTitle>
                <p style={{ fontSize: '13px', color: '#64748b' }}>
                  Complete multi-parameter searchable database of all enrolled pupils.
                </p>
              </div>
              <Button variant="primary" size="sm" onClick={() => setIsNewStudentModalOpen(true)}>
                + New Student Admission
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filter toolbar */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '16px' }}>
              <Input
                placeholder="Search by student name or ID..."
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
              />
              <Select
                value={gradeFilter}
                onChange={(e) => setGradeFilter(e.target.value)}
                options={[
                  { value: 'all', label: 'All Grade Levels' },
                  { value: 'Grade 8', label: 'Grade 8' },
                  { value: 'Grade 5', label: 'Grade 5' },
                ]}
              />
              <Select
                value={feeStatusFilter}
                onChange={(e) => setFeeStatusFilter(e.target.value)}
                options={[
                  { value: 'all', label: 'All Fee Standings' },
                  { value: 'paid', label: 'Fees Cleared' },
                  { value: 'pending', label: 'Fees Pending' },
                  { value: 'overdue', label: 'Fees Overdue' },
                ]}
              />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Enrollment ID</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Grade & Sec</TableHead>
                  <TableHead>Attendance Today</TableHead>
                  <TableHead>Fee Standing</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((st) => (
                  <TableRow key={st.id}>
                    <TableCell><code>{st.enrollmentNo}</code></TableCell>
                    <TableCell>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <img
                          src={st.avatar}
                          alt={st.name}
                          style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <span>{st.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{st.grade} - {st.section}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          st.attendanceStatus === 'present'
                            ? 'success'
                            : st.attendanceStatus === 'late'
                            ? 'warning'
                            : 'danger'
                        }
                      >
                        {st.attendanceStatus.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          st.feeStatus === 'paid'
                            ? 'success'
                            : st.feeStatus === 'pending'
                            ? 'warning'
                            : 'danger'
                        }
                      >
                        {st.feeStatus.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedStudent(st)}
                      >
                        View Profile
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* 4. Faculty and Staff Payroll */}
      {activeTab === 'payroll' && (
        <Card elevation={1}>
          <CardHeader bordered>
            <div>
              <CardTitle>Faculty Roster & Monthly Payroll Ledger</CardTitle>
              <p style={{ fontSize: '13px', color: '#64748b' }}>
                Track monthly teacher attendance, salary computation breakdown, and disbursement status.
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee No</TableHead>
                  <TableHead>Faculty Name & Subject</TableHead>
                  <TableHead>Monthly Attendance</TableHead>
                  <TableHead>Net Salary</TableHead>
                  <TableHead>Disbursement State</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {faculty.map((fac) => (
                  <TableRow key={fac.id}>
                    <TableCell><code>{fac.employeeNo}</code></TableCell>
                    <TableCell>
                      <div>
                        <strong>{fac.name}</strong>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>{fac.subject}</div>
                      </div>
                    </TableCell>
                    <TableCell>{fac.monthlyAttendance}% Present</TableCell>
                    <TableCell><strong>${fac.netSalary.toLocaleString()}</strong></TableCell>
                    <TableCell>
                      <Badge variant={fac.payrollStatus === 'disbursed' ? 'success' : 'warning'}>
                        {fac.payrollStatus.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {fac.payrollStatus !== 'disbursed' ? (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => disbursePayroll(fac.id)}
                        >
                          Disburse Salary
                        </Button>
                      ) : (
                        <Badge variant="neutral">Cleared</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* 5. Financial Operations & Fee Ledger */}
      {activeTab === 'finance' && (
        <Card elevation={1}>
          <CardHeader bordered>
            <div>
              <CardTitle>Financial Operations & Accounts Receivable Ledger</CardTitle>
              <p style={{ fontSize: '13px', color: '#64748b' }}>
                Monitor fee collection progress, issue payment reminders, and reconcile invoices.
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Term Fee Description</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fees.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell><code>{inv.id}</code></TableCell>
                    <TableCell>{inv.studentName}</TableCell>
                    <TableCell>{inv.title}</TableCell>
                    <TableCell>{inv.dueDate}</TableCell>
                    <TableCell><strong>${inv.totalAmount.toLocaleString()}</strong></TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          inv.status === 'paid'
                            ? 'success'
                            : inv.status === 'pending'
                            ? 'warning'
                            : 'danger'
                        }
                      >
                        {inv.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {inv.status !== 'paid' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => sendFeeReminder(inv.id)}
                        >
                          Send Reminder
                        </Button>
                      )}
                      {inv.status === 'paid' && (
                        <span style={{ fontSize: '12px', color: '#10b981' }}>
                          ✓ {inv.receiptNo}
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* 6. Transport & Fleet Logistics */}
      {activeTab === 'logistics' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Card elevation={1}>
            <CardHeader bordered>
              <div>
                <CardTitle>Transit Fleet Operations & Bus Route Control</CardTitle>
                <p style={{ fontSize: '13px', color: '#64748b' }}>
                  Live tracking coordinates, passenger rosters, and active driver assignments.
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid-2col">
                {busRoutes.map((bus) => (
                  <div
                    key={bus.id}
                    style={{
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '16px',
                      background: '#ffffff',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <strong style={{ fontSize: '15px' }}>{bus.vehicleNo}</strong>
                        <div style={{ fontSize: '13px', color: '#64748b' }}>{bus.routeName}</div>
                      </div>
                      <Badge variant="success">Active Route</Badge>
                    </div>

                    <div style={{ margin: '14px 0', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div>🧑‍✈️ Driver: <strong>{bus.driverName}</strong> ({bus.driverPhone})</div>
                      <div>🛑 Current Stop: <strong>{bus.currentStop}</strong></div>
                      <div>🏁 Next Stop: <strong>{bus.nextStop}</strong></div>
                      <div>⏱️ ETA to Gate: <strong>{bus.etaMinutes} minutes</strong></div>
                      <div>👥 Enrolled Passengers: <strong>{bus.passengersEnrolled} / {bus.capacity}</strong></div>
                    </div>

                    <Button
                      variant="secondary"
                      size="sm"
                      style={{ width: '100%' }}
                      onClick={() => showToast(`Simulated Route Map opened for ${bus.vehicleNo}`)}
                    >
                      View Live Map Overlay
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal: New Student Registration */}
      <Modal
        isOpen={isNewStudentModalOpen}
        onClose={() => setIsNewStudentModalOpen(false)}
        title="Register New Student Admission"
        size="md"
      >
        <form onSubmit={handleCreateStudent} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Input
            label="Full Name of Student"
            value={newStudentName}
            onChange={(e) => setNewStudentName(e.target.value)}
            required
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <Select
              label="Grade Level"
              value={newStudentGrade}
              onChange={(e) => setNewStudentGrade(e.target.value)}
              options={[
                { value: 'Grade 8', label: 'Grade 8' },
                { value: 'Grade 5', label: 'Grade 5' },
                { value: 'Grade 9', label: 'Grade 9' },
              ]}
            />
            <Select
              label="Section"
              value={newStudentSection}
              onChange={(e) => setNewStudentSection(e.target.value)}
              options={[
                { value: 'A', label: 'Section A' },
                { value: 'B', label: 'Section B' },
                { value: 'C', label: 'Section C' },
              ]}
            />
          </div>
          <Select
            label="Gender"
            value={newStudentGender}
            onChange={(e) => setNewStudentGender(e.target.value)}
            options={[
              { value: 'Male', label: 'Male' },
              { value: 'Female', label: 'Female' },
              { value: 'Other', label: 'Other' },
            ]}
          />
          <Input
            label="Guardian / Parent Full Name"
            value={newGuardianName}
            onChange={(e) => setNewGuardianName(e.target.value)}
            required
          />
          <Input
            label="Guardian Emergency Telephone"
            value={newGuardianPhone}
            onChange={(e) => setNewGuardianPhone(e.target.value)}
            placeholder="+1 (555) 000-0000"
          />
          <Input
            label="Guardian Email"
            value={newGuardianEmail}
            onChange={(e) => setNewGuardianEmail(e.target.value)}
            placeholder="guardian@example.com"
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
            <Button variant="ghost" size="md" type="button" onClick={() => setIsNewStudentModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="md" type="submit">
              Confirm Admission
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Setup Class */}
      <Modal
        isOpen={isNewClassModalOpen}
        onClose={() => setIsNewClassModalOpen(false)}
        title="Setup Class & Section Allocation"
        size="md"
      >
        <form onSubmit={handleCreateClass} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <Input
              label="Grade Level Name"
              value={newClassGrade}
              onChange={(e) => setNewClassGrade(e.target.value)}
              required
            />
            <Input
              label="Section Identifier"
              value={newClassSection}
              onChange={(e) => setNewClassSection(e.target.value)}
              required
            />
          </div>
          <Input
            label="Student Capacity Limit"
            type="number"
            value={newClassCapacity}
            onChange={(e) => setNewClassCapacity(Number(e.target.value))}
            required
          />
          <Input
            label="Lead Faculty Teacher"
            value={newClassTeacher}
            onChange={(e) => setNewClassTeacher(e.target.value)}
            required
          />
          <Input
            label="Room Location"
            value={newClassRoom}
            onChange={(e) => setNewClassRoom(e.target.value)}
            required
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
            <Button variant="ghost" size="md" type="button" onClick={() => setIsNewClassModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="md" type="submit">
              Create Section
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Broadcast Circular */}
      <Modal
        isOpen={isCircularModalOpen}
        onClose={() => setIsCircularModalOpen(false)}
        title="Issue Institutional Circular"
        size="md"
      >
        <form onSubmit={handleCreateCircular} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Input
            label="Announcement Title"
            value={circularTitle}
            onChange={(e) => setCircularTitle(e.target.value)}
            placeholder="e.g. Science Fair Registration"
            required
          />
          <Input
            label="Announcement Content"
            value={circularContent}
            onChange={(e) => setCircularContent(e.target.value)}
            placeholder="Detailed description of the circular..."
            required
          />
          <Select
            label="Priority Level"
            value={circularPriority}
            onChange={(e) => setCircularPriority(e.target.value as 'low' | 'normal' | 'high')}
            options={[
              { value: 'normal', label: 'Normal Bulletin' },
              { value: 'high', label: 'High Priority Alert' },
              { value: 'low', label: 'Low Priority Informational' },
            ]}
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
            <Button variant="ghost" size="md" type="button" onClick={() => setIsCircularModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="md" type="submit">
              Broadcast Circular
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Student Detail Sheet */}
      {selectedStudent && (
        <Modal
          isOpen={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
          title={`Student Profile: ${selectedStudent.name}`}
          size="md"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img
                src={selectedStudent.avatar}
                alt={selectedStudent.name}
                style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <h3 style={{ fontSize: '18px', margin: 0 }}>{selectedStudent.name}</h3>
                <div style={{ fontSize: '13px', color: '#64748b' }}>
                  Enrollment: <code>{selectedStudent.enrollmentNo}</code>
                </div>
                <div style={{ marginTop: '4px' }}>
                  <Badge variant="info">{selectedStudent.grade} - Section {selectedStudent.section}</Badge>
                </div>
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div><strong>Guardian:</strong> {selectedStudent.guardianName}</div>
              <div><strong>Phone:</strong> {selectedStudent.guardianPhone}</div>
              <div><strong>Email:</strong> {selectedStudent.guardianEmail}</div>
              <div><strong>Cumulative GPA:</strong> {selectedStudent.gpa} / 4.0</div>
              <div><strong>Fee Standing:</strong> {selectedStudent.feeStatus.toUpperCase()}</div>
              <div><strong>Current Attendance:</strong> {selectedStudent.attendanceStatus.toUpperCase()}</div>
            </div>

            <Button
              variant="primary"
              size="md"
              style={{ width: '100%' }}
              onClick={() => setSelectedStudent(null)}
            >
              Close Record
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};
