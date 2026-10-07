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
  Dropdown,
  Modal,
} from 'react-component-library';
import { useSchoolStore } from '../../context/useSchoolStore';

export interface EducatorPortalProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const EducatorPortal: React.FC<EducatorPortalProps> = ({
  activeTab: externalTab,
  onTabChange,
}) => {
  const {
    students,
    classes,
    homework,
    incidents,
    leaveRequests,
    batchMarkAttendance,
    addHomeworkTask,
    gradeHomework,
    saveAssessment,
    logIncident,
    updateLeaveStatus,
    showToast,
  } = useSchoolStore();

  const [internalTab, setInternalTab] = useState('workspace');
  const activeTab = externalTab || internalTab;
  const handleTabChange = onTabChange || setInternalTab;

  // Attendance local marking state
  const [selectedClassId, setSelectedClassId] = useState('class-8a');
  const [attendanceState, setAttendanceState] = useState<
    Record<string, 'present' | 'absent' | 'late' | 'excused'>
  >(() => {
    const map: Record<string, 'present' | 'absent' | 'late' | 'excused'> = {};
    students.forEach((s) => {
      map[s.id] = s.attendanceStatus;
    });
    return map;
  });

  // Gradebook State
  const [gradebookSubject, setGradebookSubject] = useState('Mathematics');
  const [gradebookTerm, setGradebookTerm] = useState('Term 1');
  const [gradebookAssessment, setGradebookAssessment] = useState<'Midterm' | 'Final' | 'Quiz' | 'Assignment'>('Midterm');
  const [gradeScores, setGradeScores] = useState<Record<string, number>>({
    'student-1': 94,
    'student-3': 78,
    'student-4': 98,
    'student-5': 82,
  });

  // Homework creation modal
  const [isNewHomeworkModalOpen, setIsNewHomeworkModalOpen] = useState(false);
  const [hwTitle, setHwTitle] = useState('');
  const [hwSubject, setHwSubject] = useState('Mathematics');
  const [hwDueDate, setHwDueDate] = useState('2026-10-18');
  const [hwInstructions, setHwInstructions] = useState('');

  // Homework grading modal
  const [selectedHomeworkId, setSelectedHomeworkId] = useState<string | null>(null);
  const [gradeScoreInput, setGradeScoreInput] = useState<number>(90);
  const [gradeFeedbackInput, setGradeFeedbackInput] = useState<string>('Well executed work.');

  // Conduct incident modal
  const [isIncidentModalOpen, setIsIncidentModalOpen] = useState(false);
  const [incidentStudentId, setIncidentStudentId] = useState('student-1');
  const [incidentCategory, setIncidentCategory] = useState<'Academic' | 'Behavioral' | 'Punctuality' | 'Commendation'>('Commendation');
  const [incidentNotes, setIncidentNotes] = useState('');

  const handleToggleAttendance = (studentId: string) => {
    setAttendanceState((prev) => {
      const current = prev[studentId] || 'present';
      const sequence: ('present' | 'absent' | 'late' | 'excused')[] = [
        'present',
        'absent',
        'late',
        'excused',
      ];
      const nextIndex = (sequence.indexOf(current) + 1) % sequence.length;
      return { ...prev, [studentId]: sequence[nextIndex] };
    });
  };

  const handleSaveAttendance = () => {
    const payload = Object.entries(attendanceState).map(([studentId, status]) => ({
      studentId,
      status,
    }));
    batchMarkAttendance(payload);
  };

  const handleCreateHomework = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hwTitle || !hwInstructions) {
      showToast('Please specify homework title and instructions', 'error');
      return;
    }
    addHomeworkTask({
      title: hwTitle,
      subject: hwSubject,
      classId: selectedClassId,
      assignedBy: 'Prof. Eleanor Vance',
      dueDate: hwDueDate,
      instructions: hwInstructions,
      attachments: ['Worksheet_Resource_Pack.pdf'],
    });
    setIsNewHomeworkModalOpen(false);
    setHwTitle('');
    setHwInstructions('');
  };

  const handleGradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedHomeworkId) {
      gradeHomework(selectedHomeworkId, gradeScoreInput, gradeFeedbackInput);
      setSelectedHomeworkId(null);
    }
  };

  const handleRecordGrade = (studentId: string, studentName: string) => {
    const score = gradeScores[studentId] || 85;
    const letterGrade =
      score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 60 ? 'D' : 'F';

    saveAssessment({
      studentId,
      studentName,
      subject: gradebookSubject,
      term: gradebookTerm,
      assessmentType: gradebookAssessment,
      score,
      maxScore: 100,
      letterGrade,
      remarks: score >= 90 ? 'Demonstrates advanced mastery' : 'Satisfactory conceptual understanding',
    });
  };

  const handleLogIncidentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!incidentNotes) {
      showToast('Please enter observation notes', 'error');
      return;
    }
    const student = students.find((s) => s.id === incidentStudentId);
    logIncident({
      studentId: incidentStudentId,
      studentName: student?.name || 'Student',
      reportedBy: 'Prof. Eleanor Vance',
      category: incidentCategory,
      description: incidentNotes,
    });
    setIsIncidentModalOpen(false);
    setIncidentNotes('');
  };

  return (
    <div className="portal-root-view">
      {/* 1. Daily Workspace Dashboard */}
      {activeTab === 'workspace' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Quick at-a-glance operational dispatch pills */}
          <div className="quick-glance-strip">
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Quick Dispatch:
            </span>
            <button className="quick-glance-pill" onClick={() => handleTabChange('attendance')}>
              📋 Take Class Attendance
            </button>
            <button className="quick-glance-pill" onClick={() => setIsNewHomeworkModalOpen(true)}>
              📝 + Assign Homework
            </button>
            <button className="quick-glance-pill" onClick={() => setIsIncidentModalOpen(true)}>
              ⚖️ Log Student Conduct
            </button>
            <button className="quick-glance-pill" onClick={() => handleTabChange('gradebook')}>
              📊 Open Gradebook
            </button>
            <button className="quick-glance-pill" onClick={() => handleTabChange('conduct')}>
              📬 Review Absence Queue
            </button>
          </div>

          <div className="grid-4col">
            <StatCard
              title="Today's Classes"
              value="4 Periods"
              trend={{ direction: 'neutral', value: 'Active: Period 2' }}
            />
            <StatCard
              title="Class 8A Strength"
              value={`${students.length} Students`}
              trend={{ direction: 'up', value: '4 Present Today' }}
            />
            <StatCard
              title="Pending Submissions"
              value={homework.filter((h) => h.status === 'submitted').length.toString()}
              trend={{ direction: 'down', value: 'Requires Review' }}
            />
            <StatCard
              title="Leave Requests"
              value={leaveRequests.filter((l) => l.status === 'pending').length.toString()}
              trend={{ direction: 'neutral', value: 'Awaiting Sign-off' }}
            />
          </div>

          <div className="grid-2col">
            {/* Daily Schedule Card */}
            <Card elevation={1}>
              <CardHeader bordered>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <CardTitle>Daily Teaching Schedule (Wednesday)</CardTitle>
                  <Badge variant="success">In Progress</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ padding: '12px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ color: '#1e40af' }}>Period 2 (Current): Grade 8A - Mathematics</strong>
                      <Badge variant="info">Room 204</Badge>
                    </div>
                    <div style={{ fontSize: '13px', color: '#3b82f6', marginTop: '4px' }}>
                      09:45 AM - 10:45 AM • Topic: Polynomial Factorization & Real Roots
                    </div>
                    <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
                      <Button variant="primary" size="sm" onClick={() => handleTabChange('attendance')}>
                        Take Register
                      </Button>
                      <Button variant="secondary" size="sm" onClick={() => setIsNewHomeworkModalOpen(true)}>
                        + Class Homework
                      </Button>
                    </div>
                  </div>

                  <div style={{ padding: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong>Period 3: Grade 8B - Theoretical Physics</strong>
                      <Badge variant="neutral">Room 206</Badge>
                    </div>
                    <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
                      11:00 AM - 12:00 PM • Topic: Inclined Planes & Friction Lab
                    </div>
                  </div>

                  <div style={{ padding: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong>Period 5: Grade 9A - Advanced Calculus</strong>
                      <Badge variant="neutral">Hall 14</Badge>
                    </div>
                    <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
                      01:30 PM - 02:30 PM • Topic: Limits & Continuous Functions
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions & Notes */}
            <Card elevation={1}>
              <CardHeader bordered>
                <CardTitle>Classroom Operations & Quick Shortcuts</CardTitle>
                <Badge variant="info">Shortcuts</Badge>
              </CardHeader>
              <CardContent>
                <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
                  Quick links for daily classroom administrative management:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <Button variant="primary" size="md" onClick={() => handleTabChange('attendance')}>
                    📋 Open Rapid Attendance Register
                  </Button>
                  <Button variant="secondary" size="md" onClick={() => setIsNewHomeworkModalOpen(true)}>
                    📝 Publish New Homework / Resource
                  </Button>
                  <Button variant="ghost" size="md" onClick={() => setIsIncidentModalOpen(true)}>
                    ⚖️ Log Student Conduct / Commendation Note
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* 2. Rapid Attendance Register */}
      {activeTab === 'attendance' && (
        <Card elevation={1}>
          <CardHeader bordered>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <CardTitle>Rapid Tap-and-Mark Attendance Register</CardTitle>
                <p style={{ fontSize: '13px', color: '#64748b' }}>
                  Tap any student card to cycle states: Present ➔ Absent ➔ Late ➔ Excused.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ minWidth: '180px' }}>
                  <Dropdown
                    value={selectedClassId}
                    onChange={(val) => setSelectedClassId(val)}
                    options={classes.map((c) => ({
                      value: c.id,
                      label: `${c.grade} - Section ${c.section}`,
                    }))}
                  />
                </div>
                <Button variant="primary" size="md" onClick={handleSaveAttendance}>
                  Submit Register & Sync
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
              {students.map((st) => {
                const currentStatus = attendanceState[st.id] || 'present';
                return (
                  <div
                    key={st.id}
                    onClick={() => handleToggleAttendance(st.id)}
                    style={{
                      padding: '14px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      border: `2px solid ${
                        currentStatus === 'present'
                          ? '#10b981'
                          : currentStatus === 'absent'
                          ? '#ef4444'
                          : currentStatus === 'late'
                          ? '#f59e0b'
                          : '#6366f1'
                      }`,
                      background:
                        currentStatus === 'present'
                          ? '#f0fdf4'
                          : currentStatus === 'absent'
                          ? '#fef2f2'
                          : currentStatus === 'late'
                          ? '#fffbeb'
                          : '#eef2ff',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img
                        src={st.avatar}
                        alt={st.name}
                        style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <strong style={{ fontSize: '14px', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {st.name}
                        </strong>
                        <span style={{ fontSize: '11px', color: '#64748b' }}>{st.enrollmentNo}</span>
                      </div>
                    </div>
                    <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>Tap to toggle</span>
                      <Badge
                        variant={
                          currentStatus === 'present'
                            ? 'success'
                            : currentStatus === 'absent'
                            ? 'danger'
                            : currentStatus === 'late'
                            ? 'warning'
                            : 'info'
                        }
                      >
                        {currentStatus.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 3. Digital Gradebook & Assessment Engine */}
      {activeTab === 'gradebook' && (
        <Card elevation={1}>
          <CardHeader bordered>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <CardTitle>Digital Gradebook & Assessment Ledger</CardTitle>
                <p style={{ fontSize: '13px', color: '#64748b' }}>
                  Enter numeric scores out of 100 with automated letter grade calculation.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <div style={{ minWidth: '140px' }}>
                  <Dropdown
                    value={gradebookSubject}
                    onChange={(val) => setGradebookSubject(val)}
                    options={[
                      { value: 'Mathematics', label: 'Mathematics' },
                      { value: 'Physics', label: 'Physics' },
                      { value: 'Chemistry', label: 'Chemistry' },
                    ]}
                  />
                </div>
                <div style={{ minWidth: '150px' }}>
                  <Dropdown
                    value={gradebookAssessment}
                    onChange={(val) => setGradebookAssessment(val as 'Midterm' | 'Final' | 'Quiz' | 'Assignment')}
                    options={[
                      { value: 'Midterm', label: 'Midterm Exam' },
                      { value: 'Final', label: 'Final Exam' },
                      { value: 'Quiz', label: 'Continuous Quiz' },
                    ]}
                  />
                </div>
                <div style={{ minWidth: '120px' }}>
                  <Dropdown
                    value={gradebookTerm}
                    onChange={(val) => setGradebookTerm(val)}
                    options={[
                      { value: 'Term 1', label: 'Term 1' },
                      { value: 'Term 2', label: 'Term 2' },
                    ]}
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Score (out of 100)</TableHead>
                  <TableHead>Percentage</TableHead>
                  <TableHead>Letter Grade</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((st) => {
                  const score = gradeScores[st.id] ?? 85;
                  const letterGrade =
                    score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 60 ? 'D' : 'F';
                  return (
                    <TableRow key={st.id}>
                      <TableCell>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <img
                            src={st.avatar}
                            alt={st.name}
                            style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                          />
                          <div>
                            <strong>{st.name}</strong>
                            <div style={{ fontSize: '11px', color: '#64748b' }}>{st.enrollmentNo}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={score}
                          onChange={(e) =>
                            setGradeScores({
                              ...gradeScores,
                              [st.id]: Number(e.target.value),
                            })
                          }
                          style={{
                            width: '80px',
                            padding: '6px 10px',
                            borderRadius: '6px',
                            border: '1px solid #cbd5e1',
                            fontSize: '14px',
                            fontWeight: 600,
                          }}
                        />
                      </TableCell>
                      <TableCell>{score}%</TableCell>
                      <TableCell>
                        <Badge variant={score >= 80 ? 'success' : score >= 65 ? 'warning' : 'danger'}>
                          Grade {letterGrade}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRecordGrade(st.id, st.name)}
                        >
                          Lock & Record Mark
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* 4. Homework & Resource Distribution Engine */}
      {activeTab === 'homework' && (
        <Card elevation={1}>
          <CardHeader bordered>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <div>
                <CardTitle>Coursework & Assignment Distribution</CardTitle>
                <p style={{ fontSize: '13px', color: '#64748b' }}>
                  Publish curriculum assignments and assess student submissions.
                </p>
              </div>
              <Button variant="primary" size="sm" onClick={() => setIsNewHomeworkModalOpen(true)}>
                + Create Homework Task
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {homework.map((hw) => (
                <div
                  key={hw.id}
                  style={{
                    padding: '16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    background: '#ffffff',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <strong style={{ fontSize: '15px' }}>{hw.title}</strong>
                      <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
                        Subject: {hw.subject} • Due: {hw.dueDate} • Assigned by: {hw.assignedBy}
                      </div>
                    </div>
                    <Badge
                      variant={
                        hw.status === 'graded'
                          ? 'success'
                          : hw.status === 'submitted'
                          ? 'warning'
                          : 'info'
                      }
                    >
                      {hw.status.toUpperCase()}
                    </Badge>
                  </div>

                  <p style={{ fontSize: '13px', color: '#334155', margin: '10px 0' }}>
                    {hw.instructions}
                  </p>

                  {hw.submissionFileName && (
                    <div style={{ fontSize: '12px', background: '#f8fafc', padding: '8px 12px', borderRadius: '6px', marginBottom: '10px' }}>
                      📄 Submitted File: <code>{hw.submissionFileName}</code> (Timestamp: {hw.submissionTimestamp})
                      {hw.score !== undefined && (
                        <span style={{ marginLeft: '12px', color: '#10b981', fontWeight: 600 }}>
                          Score: {hw.score}/100 • Feedback: {hw.feedback}
                        </span>
                      )}
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '8px' }}>
                    {hw.status === 'submitted' && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          setSelectedHomeworkId(hw.id);
                          setGradeScoreInput(95);
                          setGradeFeedbackInput('Exemplary submission.');
                        }}
                      >
                        Grade Submission
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => showToast(`Resource attachment downloaded for ${hw.title}`)}
                    >
                      Download Attachments
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 5. Conduct & Leave Approvals Queue */}
      {activeTab === 'conduct' && (
        <div className="grid-2col">
          {/* Conduct Incidents */}
          <Card elevation={1}>
            <CardHeader bordered>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <CardTitle>Behavioral & Commendation Log</CardTitle>
                <Button variant="primary" size="sm" onClick={() => setIsIncidentModalOpen(true)}>
                  + Log Incident
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {incidents.map((inc) => (
                  <div
                    key={inc.id}
                    style={{
                      padding: '12px',
                      background: '#f8fafc',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong>{inc.studentName}</strong>
                      <Badge variant={inc.category === 'Commendation' ? 'success' : 'warning'}>
                        {inc.category}
                      </Badge>
                    </div>
                    <p style={{ fontSize: '13px', color: '#334155', marginTop: '6px' }}>
                      {inc.description}
                    </p>
                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
                      Date: {inc.date} • Logged by: {inc.reportedBy}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Student Leave Request Approvals */}
          <Card elevation={1}>
            <CardHeader bordered>
              <CardTitle>Parent Leave Requests</CardTitle>
              <Badge variant="warning">{leaveRequests.filter((l) => l.status === 'pending').length} Pending</Badge>
            </CardHeader>
            <CardContent>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {leaveRequests.map((lvr) => (
                  <div
                    key={lvr.id}
                    style={{
                      padding: '12px',
                      background: '#ffffff',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong>{lvr.studentName}</strong>
                      <Badge variant={lvr.status === 'approved' ? 'success' : lvr.status === 'rejected' ? 'danger' : 'warning'}>
                        {lvr.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748b', margin: '4px 0' }}>
                      Category: {lvr.category} • Range: {lvr.startDate} to {lvr.endDate}
                    </div>
                    <p style={{ fontSize: '13px', color: '#334155' }}>
                      &quot;{lvr.reason}&quot; — Guardian: {lvr.parentName}
                    </p>
                    {lvr.status === 'pending' && (
                      <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => updateLeaveStatus(lvr.id, 'approved')}
                        >
                          Approve Leave
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateLeaveStatus(lvr.id, 'rejected')}
                        >
                          Decline
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal: New Homework Task */}
      <Modal
        isOpen={isNewHomeworkModalOpen}
        onClose={() => setIsNewHomeworkModalOpen(false)}
        title="Publish Homework & Resource Task"
        size="md"
      >
        <form onSubmit={handleCreateHomework} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Input
            label="Homework Task Title"
            value={hwTitle}
            onChange={(e) => setHwTitle(e.target.value)}
            placeholder="e.g. Quadratic Roots Problem Set"
            required
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>Subject</span>
              <Dropdown
                value={hwSubject}
                onChange={(val) => setHwSubject(val)}
                options={[
                  { value: 'Mathematics', label: 'Mathematics' },
                  { value: 'Physics', label: 'Physics' },
                  { value: 'English Literature', label: 'English Literature' },
                ]}
              />
            </div>
            <Input
              label="Submission Due Date"
              type="date"
              value={hwDueDate}
              onChange={(e) => setHwDueDate(e.target.value)}
              required
            />
          </div>
          <Input
            label="Detailed Assignment Instructions"
            value={hwInstructions}
            onChange={(e) => setHwInstructions(e.target.value)}
            placeholder="Provide instructions and problem set details..."
            required
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
            <Button variant="ghost" size="md" type="button" onClick={() => setIsNewHomeworkModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="md" type="submit">
              Publish to Student Feeds
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Grade Submission */}
      {selectedHomeworkId && (
        <Modal
          isOpen={!!selectedHomeworkId}
          onClose={() => setSelectedHomeworkId(null)}
          title="Grade Student Assignment Submission"
          size="md"
        >
          <form onSubmit={handleGradeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Input
              label="Score (out of 100)"
              type="number"
              min="0"
              max="100"
              value={gradeScoreInput}
              onChange={(e) => setGradeScoreInput(Number(e.target.value))}
              required
            />
            <Input
              label="Faculty Feedback Notes"
              value={gradeFeedbackInput}
              onChange={(e) => setGradeFeedbackInput(e.target.value)}
              placeholder="Constructive feedback comments..."
              required
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
              <Button variant="ghost" size="md" type="button" onClick={() => setSelectedHomeworkId(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="md" type="submit">
                Confirm & Record Grade
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Modal: Log Conduct Incident */}
      <Modal
        isOpen={isIncidentModalOpen}
        onClose={() => setIsIncidentModalOpen(false)}
        title="Log Student Conduct / Commendation"
        size="md"
      >
        <form onSubmit={handleLogIncidentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>Select Student</span>
            <Dropdown
              value={incidentStudentId}
              onChange={(val) => setIncidentStudentId(val)}
              options={students.map((s) => ({
                value: s.id,
                label: `${s.name} (${s.enrollmentNo})`,
              }))}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>Incident Category</span>
            <Dropdown
              value={incidentCategory}
              onChange={(val) => setIncidentCategory(val as 'Academic' | 'Behavioral' | 'Punctuality' | 'Commendation')}
              options={[
                { value: 'Commendation', label: 'Commendation / Academic Praise' },
                { value: 'Academic', label: 'Academic Concern' },
                { value: 'Punctuality', label: 'Punctuality / Attendance Incident' },
                { value: 'Behavioral', label: 'Behavioral Report' },
              ]}
            />
          </div>
          <Input
            label="Incident Narrative / Observations"
            value={incidentNotes}
            onChange={(e) => setIncidentNotes(e.target.value)}
            placeholder="Detailed narrative of the incident..."
            required
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
            <Button variant="ghost" size="md" type="button" onClick={() => setIsIncidentModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="md" type="submit">
              Log to Student File
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
