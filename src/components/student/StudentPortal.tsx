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
  Modal,
} from 'react-component-library';
import { useSchoolStore } from '../../context/useSchoolStore';
import type { HomeworkTask } from '../../types/models';

export interface StudentPortalProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({
  activeTab: externalTab,
  onTabChange,
}) => {
  const {
    students,
    homework,
    assessments,
    libraryBooks,
    notifications,
    submitHomework,
    reserveBook,
    showToast,
  } = useSchoolStore();

  const [internalTab, setInternalTab] = useState('overview');
  const activeTab = externalTab || internalTab;
  const handleTabChange = onTabChange || setInternalTab;

  // Homework submission state
  const [selectedHomework, setSelectedHomework] = useState<HomeworkTask | null>(null);
  const [submissionFileName, setSubmissionFileName] = useState('Lucas_Math_Assignment_Final.pdf');

  // Timetable day
  const [timetableDay, setTimetableDay] = useState('wed');

  // Digital Report Card Modal
  const [isReportCardOpen, setIsReportCardOpen] = useState(false);

  // Library search
  const [librarySearch, setLibrarySearch] = useState('');

  // Current student context (Lucas Montgomery)
  const currentStudent = students[0];

  const filteredBooks = libraryBooks.filter(
    (b) =>
      b.title.toLowerCase().includes(librarySearch.toLowerCase()) ||
      b.author.toLowerCase().includes(librarySearch.toLowerCase()) ||
      b.category.toLowerCase().includes(librarySearch.toLowerCase())
  );

  const pendingHomework = homework.filter((h) => h.status === 'pending');

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedHomework) return;
    submitHomework(selectedHomework.id, submissionFileName);
    setSelectedHomework(null);
  };

  const timetableSchedule: Record<string, { time: string; subject: string; room: string; teacher: string }[]> = {
    mon: [
      { time: '08:30 - 09:30', subject: 'English Literature', room: 'Hall 12', teacher: 'Sarah Henderson' },
      { time: '09:45 - 10:45', subject: 'Mathematics (Algebra)', room: 'Room 204', teacher: 'Prof. Eleanor Vance' },
      { time: '11:00 - 12:00', subject: 'Theoretical Physics', room: 'Room 206', teacher: 'Dr. Jonathan Ross' },
      { time: '01:30 - 02:30', subject: 'World History', room: 'Room 105', teacher: 'Mark Gable' },
    ],
    tue: [
      { time: '08:30 - 09:30', subject: 'Physical Education', room: 'Gymnasium', teacher: 'Coach Roberts' },
      { time: '09:45 - 10:45', subject: 'Computer Science Lab', room: 'Lab 3', teacher: 'David Sterling' },
      { time: '11:00 - 12:00', subject: 'Mathematics (Algebra)', room: 'Room 204', teacher: 'Prof. Eleanor Vance' },
      { time: '01:30 - 02:30', subject: 'Chemistry Lab', room: 'Lab 2', teacher: 'Dr. Anita Patel' },
    ],
    wed: [
      { time: '08:30 - 09:30', subject: 'Theoretical Physics', room: 'Room 206', teacher: 'Dr. Jonathan Ross' },
      { time: '09:45 - 10:45', subject: 'Mathematics (Quadratics)', room: 'Room 204', teacher: 'Prof. Eleanor Vance' },
      { time: '11:00 - 12:00', subject: 'Art & Design', room: 'Studio 4', teacher: 'Elena Rostova' },
      { time: '01:30 - 02:30', subject: 'Robotics Workshop', room: 'STEM Hub', teacher: 'Prof. Eleanor Vance' },
    ],
    thu: [
      { time: '08:30 - 09:30', subject: 'English Literature', room: 'Hall 12', teacher: 'Sarah Henderson' },
      { time: '09:45 - 10:45', subject: 'World History', room: 'Room 105', teacher: 'Mark Gable' },
      { time: '11:00 - 12:00', subject: 'Mathematics Seminar', room: 'Room 204', teacher: 'Prof. Eleanor Vance' },
      { time: '01:30 - 02:30', subject: 'Study Hall & Library', room: 'Library', teacher: 'Mrs. Gable' },
    ],
    fri: [
      { time: '08:30 - 09:30', subject: 'Theoretical Physics Lab', room: 'Room 206', teacher: 'Dr. Jonathan Ross' },
      { time: '09:45 - 10:45', subject: 'Mathematics Quiz', room: 'Room 204', teacher: 'Prof. Eleanor Vance' },
      { time: '11:00 - 12:00', subject: 'Debate & Public Speaking', room: 'Auditorium', teacher: 'Sarah Henderson' },
      { time: '01:30 - 02:30', subject: 'Weekly Assembly', room: 'Main Hall', teacher: 'Dr. Arthur Sterling' },
    ],
  };

  return (
    <div className="portal-root-view">
      {/* 1. Student Activity Center Overview */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Quick at-a-glance student operational shortcuts */}
          <div className="quick-glance-strip">
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Quick Locker:
            </span>
            <button className="quick-glance-pill" onClick={() => handleTabChange('schedule')}>
              🗓️ Full Timetable
            </button>
            <button className="quick-glance-pill" onClick={() => handleTabChange('homework')}>
              📁 Submit Homework
            </button>
            <button className="quick-glance-pill" onClick={() => setIsReportCardOpen(true)}>
              🎓 Report Card Preview
            </button>
            <button className="quick-glance-pill" onClick={() => handleTabChange('library')}>
              📖 Digital Library
            </button>
          </div>

          {/* Hero Card - Compact */}
          <Card elevation={2} style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)', color: '#ffffff' }}>
            <CardContent style={{ padding: '16px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.85 }}>
                    Up Next Right Now
                  </span>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '2px 0' }}>
                    Mathematics: Polynomial Factorization
                  </h3>
                  <p style={{ fontSize: '13px', opacity: 0.9 }}>
                    Period 2 (09:45 AM) • Room 204 • Prof. Eleanor Vance
                  </p>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleTabChange('schedule')}
                >
                  View Timetable
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid-4col">
            <StatCard
              title="Cumulative GPA"
              value={`${currentStudent.gpa} / 4.0`}
              trend={{ direction: 'up', value: 'Top 5% of Grade' }}
            />
            <StatCard
              title="Attendance Record"
              value="98.5%"
              trend={{ direction: 'neutral', value: '42 / 43 Days' }}
            />
            <StatCard
              title="Pending Homework"
              value={pendingHomework.length.toString()}
              trend={{ direction: pendingHomework.length > 0 ? 'down' : 'up', value: 'Due This Week' }}
            />
            <StatCard
              title="Credits Completed"
              value="28 / 32"
              trend={{ direction: 'up', value: '87.5% Progress' }}
            />
          </div>

          <div className="grid-2col">
            {/* Approaching Deadlines */}
            <Card elevation={1}>
              <CardHeader bordered>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <CardTitle>Approaching Coursework Deadlines</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => handleTabChange('homework')}>
                    Open Locker
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {homework.slice(0, 3).map((hw) => (
                    <div
                      key={hw.id}
                      style={{
                        padding: '12px',
                        background: '#f8fafc',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div>
                        <strong>{hw.title}</strong>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>
                          {hw.subject} • Due: {hw.dueDate}
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
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Institutional Announcements */}
            <Card elevation={1}>
              <CardHeader bordered>
                <CardTitle>School Circulars & Bulletins</CardTitle>
                <Badge variant="info">Broadcasts</Badge>
              </CardHeader>
              <CardContent>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      style={{
                        padding: '12px',
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong>{notif.title}</strong>
                        <Badge variant={notif.priority === 'high' ? 'danger' : 'neutral'}>
                          {notif.date}
                        </Badge>
                      </div>
                      <p style={{ fontSize: '13px', color: '#475569', marginTop: '6px' }}>
                        {notif.content}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* 2. Coursework Locker & Assignment Submission Engine */}
      {activeTab === 'homework' && (
        <Card elevation={1}>
          <CardHeader bordered>
            <CardTitle>Coursework Locker & Digital Submission Hub</CardTitle>
            <p style={{ fontSize: '13px', color: '#64748b' }}>
              View curriculum tasks, review instructions, and upload completed work.
            </p>
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
                      <strong style={{ fontSize: '16px' }}>{hw.title}</strong>
                      <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
                        Subject: {hw.subject} • Deadline: {hw.dueDate} • Assigned by: {hw.assignedBy}
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

                  <p style={{ fontSize: '13px', color: '#334155', margin: '12px 0' }}>
                    {hw.instructions}
                  </p>

                  {hw.submissionFileName && (
                    <div style={{ fontSize: '12px', background: '#f8fafc', padding: '10px 14px', borderRadius: '6px', marginBottom: '12px' }}>
                      📁 Submitted Attachment: <code>{hw.submissionFileName}</code> (Timestamp: {hw.submissionTimestamp})
                      {hw.score !== undefined && (
                        <div style={{ marginTop: '4px', color: '#10b981', fontWeight: 600 }}>
                          ⭐ Teacher Grade: {hw.score} / 100 • Feedback: &quot;{hw.feedback}&quot;
                        </div>
                      )}
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '10px' }}>
                    {hw.status === 'pending' && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => setSelectedHomework(hw)}
                      >
                        Submit Assignment Work
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => showToast(`Resource attachment downloaded for ${hw.title}`)}
                    >
                      Download Lesson Materials
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 3. Interactive Schedule & Weekly Timetable */}
      {activeTab === 'schedule' && (
        <Card elevation={1}>
          <CardHeader bordered>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <CardTitle>Interactive Weekly Class Timetable</CardTitle>
                <p style={{ fontSize: '13px', color: '#64748b' }}>
                  Daily period allocation with room assignments and designated faculty teachers.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                {(['mon', 'tue', 'wed', 'thu', 'fri'] as const).map((day) => (
                  <Button
                    key={day}
                    variant={timetableDay === day ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setTimetableDay(day)}
                  >
                    {day.toUpperCase()}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time Interval</TableHead>
                  <TableHead>Subject Course</TableHead>
                  <TableHead>Classroom / Facility</TableHead>
                  <TableHead>Instructor</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(timetableSchedule[timetableDay] || []).map((slot, i) => (
                  <TableRow key={i}>
                    <TableCell><code>{slot.time}</code></TableCell>
                    <TableCell><strong>{slot.subject}</strong></TableCell>
                    <TableCell>{slot.room}</TableCell>
                    <TableCell>{slot.teacher}</TableCell>
                    <TableCell>
                      <Badge variant="info">Scheduled</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* 4. Academic Performance Analytics & Report Cards */}
      {activeTab === 'analytics' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="grid-2col">
            <Card elevation={1}>
              <CardHeader bordered>
                <CardTitle>Academic Term Grade Breakdown</CardTitle>
                <Button variant="primary" size="sm" onClick={() => setIsReportCardOpen(true)}>
                  View Digital Report Card
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>Assessment</TableHead>
                      <TableHead>Marks</TableHead>
                      <TableHead>Grade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assessments
                      .filter((a) => a.studentId === 'student-1')
                      .map((ass) => (
                        <TableRow key={ass.id}>
                          <TableCell><strong>{ass.subject}</strong></TableCell>
                          <TableCell>{ass.assessmentType} ({ass.term})</TableCell>
                          <TableCell>{ass.score} / {ass.maxScore}</TableCell>
                          <TableCell>
                            <Badge variant={ass.score >= 90 ? 'success' : 'info'}>
                              {ass.letterGrade}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card elevation={1}>
              <CardHeader bordered>
                <CardTitle>Progress & Honors Summary</CardTitle>
                <Badge variant="success">Honor Roll</Badge>
              </CardHeader>
              <CardContent>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>
                    <strong>Distinction in STEM Disciplines</strong>
                    <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
                      Ranked 1st in Advanced Mathematics Polynomial Module with an average of 96%.
                    </p>
                  </div>
                  <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>
                    <strong>Attendance Commendation</strong>
                    <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
                      Zero unexcused absences recorded across the active Fall 2026 academic term.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* 5. Digital Library & Learning Resource Hub */}
      {activeTab === 'library' && (
        <Card elevation={1}>
          <CardHeader bordered>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <CardTitle>Digital Library & Media Center</CardTitle>
                <p style={{ fontSize: '13px', color: '#64748b' }}>
                  Search physical library stacks and access instant downloadable e-book editions.
                </p>
              </div>
              <div style={{ width: '280px' }}>
                <Input
                  placeholder="Search books, authors, topics..."
                  value={librarySearch}
                  onChange={(e) => setLibrarySearch(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
              {filteredBooks.map((bk) => (
                <div
                  key={bk.id}
                  style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    background: '#ffffff',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Badge variant="neutral">{bk.category}</Badge>
                      <Badge variant={bk.availableCopies > 0 ? 'success' : 'warning'}>
                        {bk.availableCopies > 0 ? `${bk.availableCopies} Available` : 'Reserved'}
                      </Badge>
                    </div>

                    <h4 style={{ fontSize: '15px', fontWeight: 700, margin: '10px 0 4px 0' }}>{bk.title}</h4>
                    <div style={{ fontSize: '13px', color: '#64748b' }}>Author: {bk.author}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>ISBN: {bk.isbn}</div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                    {bk.isEbookAvailable && (
                      <Button
                        variant="secondary"
                        size="sm"
                        style={{ flex: 1 }}
                        onClick={() => showToast(`Opening Digital E-Book: ${bk.title}`)}
                      >
                        Read E-Book
                      </Button>
                    )}
                    {bk.availableCopies > 0 && !bk.isReserved && (
                      <Button
                        variant="primary"
                        size="sm"
                        style={{ flex: 1 }}
                        onClick={() => reserveBook(bk.id)}
                      >
                        Reserve
                      </Button>
                    )}
                    {bk.isReserved && (
                      <Badge variant="info">On Hold</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modal: Homework Submission Upload */}
      {selectedHomework && (
        <Modal
          isOpen={!!selectedHomework}
          onClose={() => setSelectedHomework(null)}
          title={`Submit Work: ${selectedHomework.title}`}
          size="md"
        >
          <form onSubmit={handleUploadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <p style={{ fontSize: '13px', color: '#475569' }}>
              {selectedHomework.instructions}
            </p>

            <Input
              label="Selected Document / Attachment Name"
              value={submissionFileName}
              onChange={(e) => setSubmissionFileName(e.target.value)}
              required
            />

            <div style={{ padding: '16px', border: '2px dashed #cbd5e1', borderRadius: '8px', textAlign: 'center', background: '#f8fafc' }}>
              <div style={{ fontSize: '24px' }}>📄</div>
              <div style={{ fontSize: '13px', fontWeight: 600, marginTop: '4px' }}>File Ready for Submission</div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Simulated client-side file picker bound</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
              <Button variant="ghost" size="md" type="button" onClick={() => setSelectedHomework(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="md" type="submit">
                Upload & Confirm Submission
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Modal: Official Digital Report Card */}
      <Modal
        isOpen={isReportCardOpen}
        onClose={() => setIsReportCardOpen(false)}
        title="Official Term Report Card Preview"
        size="lg"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
            <div>
              <h3 style={{ margin: 0 }}>Merit Academy • Fall Semester 2026</h3>
              <p style={{ fontSize: '13px', color: '#64748b' }}>Student: Lucas Montgomery (ENR-2026-081) • Grade 8A</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <Badge variant="success">GPA: 3.92 / 4.0</Badge>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Letter</TableHead>
                <TableHead>Remarks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assessments
                .filter((a) => a.studentId === 'student-1')
                .map((a) => (
                  <TableRow key={a.id}>
                    <TableCell><strong>{a.subject}</strong></TableCell>
                    <TableCell>Prof. Eleanor Vance</TableCell>
                    <TableCell>{a.score} / {a.maxScore}</TableCell>
                    <TableCell><Badge variant="success">{a.letterGrade}</Badge></TableCell>
                    <TableCell>{a.remarks}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
            <Button
              variant="secondary"
              size="md"
              onClick={() => showToast('Printing simulated PDF report card...')}
            >
              Print / Export PDF
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => setIsReportCardOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
