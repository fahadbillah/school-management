import React, { createContext, useState, useEffect } from 'react';
import type {
  UserProfile,
  StudentRecord,
  FacultyRecord,
  ClassMaster,
  AttendanceRecord,
  AssessmentRecord,
  HomeworkTask,
  FeeInvoice,
  BusTransitRoute,
  ParentTeacherMessage,
  ConductIncident,
  LeaveRequest,
  LibraryBook,
  InstitutionNotification,
  UserRole,
} from '../types/models';
import {
  INITIAL_PROFILES,
  INITIAL_STUDENTS,
  INITIAL_FACULTY,
  INITIAL_CLASSES,
  INITIAL_ATTENDANCE,
  INITIAL_ASSESSMENTS,
  INITIAL_HOMEWORK,
  INITIAL_FEES,
  INITIAL_BUS_ROUTES,
  INITIAL_MESSAGES,
  INITIAL_INCIDENTS,
  INITIAL_LEAVE_REQUESTS,
  INITIAL_LIBRARY_BOOKS,
  INITIAL_NOTIFICATIONS,
} from '../data/mockData';

interface ToastState {
  id: string;
  message: string;
  type?: 'success' | 'error' | 'info';
}

interface SchoolStoreContextType {
  // Session & Auth
  currentUser: UserProfile | null;
  currentRole: UserRole | null;
  setCurrentUser: (user: UserProfile | null) => void;
  switchRole: (role: UserRole) => void;
  selectedWardId: string;
  setSelectedWardId: (id: string) => void;

  // Viewport
  isMobile: boolean;
  isTablet: boolean;

  // Entities
  profiles: UserProfile[];
  students: StudentRecord[];
  faculty: FacultyRecord[];
  classes: ClassMaster[];
  attendance: AttendanceRecord[];
  assessments: AssessmentRecord[];
  homework: HomeworkTask[];
  fees: FeeInvoice[];
  busRoutes: BusTransitRoute[];
  messages: ParentTeacherMessage[];
  incidents: ConductIncident[];
  leaveRequests: LeaveRequest[];
  libraryBooks: LibraryBook[];
  notifications: InstitutionNotification[];

  // Reactive operations
  markAttendance: (studentId: string, status: 'present' | 'absent' | 'late' | 'excused', remarks?: string) => void;
  batchMarkAttendance: (records: { studentId: string; status: 'present' | 'absent' | 'late' | 'excused' }[]) => void;
  addStudent: (student: Omit<StudentRecord, 'id' | 'enrollmentNo'>) => StudentRecord;
  addClass: (newClass: Omit<ClassMaster, 'id' | 'enrolled'>) => ClassMaster;
  disbursePayroll: (facultyId: string) => void;
  payFeeInvoice: (invoiceId: string, paymentMethod: string) => void;
  sendFeeReminder: (invoiceId: string) => void;
  addHomeworkTask: (task: Omit<HomeworkTask, 'id' | 'assignedDate' | 'status'>) => void;
  submitHomework: (taskId: string, fileName: string) => void;
  gradeHomework: (taskId: string, score: number, feedback: string) => void;
  saveAssessment: (assessment: Omit<AssessmentRecord, 'id'>) => void;
  sendMessage: (recipientId: string, studentId: string, content: string) => void;
  logIncident: (incident: Omit<ConductIncident, 'id' | 'date'>) => void;
  submitLeaveRequest: (request: Omit<LeaveRequest, 'id' | 'status'>) => void;
  updateLeaveStatus: (requestId: string, status: 'approved' | 'rejected') => void;
  reserveBook: (bookId: string) => void;
  addNotification: (title: string, content: string, priority: 'low' | 'normal' | 'high', targetRoles: UserRole[]) => void;

  // Feedback Toasts
  toast: ToastState | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  clearToast: () => void;
}

const SchoolStoreContext = createContext<SchoolStoreContextType | null>(null);

const STORAGE_KEY = 'merit_school_store_v1';

export const SchoolStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Viewport listener
  const [viewportWidth, setViewportWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = viewportWidth < 600;
  const isTablet = viewportWidth >= 600 && viewportWidth <= 1024;

  // Local storage rehydration or fallback to seeds
  const [profiles] = useState<UserProfile[]>(INITIAL_PROFILES);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_user`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return INITIAL_PROFILES[0]; // default admin for demo or unauthenticated
  });

  const [selectedWardId, setSelectedWardId] = useState<string>('student-1');

  const [students, setStudents] = useState<StudentRecord[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_students`);
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [faculty, setFaculty] = useState<FacultyRecord[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_faculty`);
    return saved ? JSON.parse(saved) : INITIAL_FACULTY;
  });

  const [classes, setClasses] = useState<ClassMaster[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_classes`);
    return saved ? JSON.parse(saved) : INITIAL_CLASSES;
  });

  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_attendance`);
    return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE;
  });

  const [assessments, setAssessments] = useState<AssessmentRecord[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_assessments`);
    return saved ? JSON.parse(saved) : INITIAL_ASSESSMENTS;
  });

  const [homework, setHomework] = useState<HomeworkTask[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_homework`);
    return saved ? JSON.parse(saved) : INITIAL_HOMEWORK;
  });

  const [fees, setFees] = useState<FeeInvoice[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_fees`);
    return saved ? JSON.parse(saved) : INITIAL_FEES;
  });

  const [busRoutes] = useState<BusTransitRoute[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_busRoutes`);
    return saved ? JSON.parse(saved) : INITIAL_BUS_ROUTES;
  });

  const [messages, setMessages] = useState<ParentTeacherMessage[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_messages`);
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  const [incidents, setIncidents] = useState<ConductIncident[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_incidents`);
    return saved ? JSON.parse(saved) : INITIAL_INCIDENTS;
  });

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_leaveRequests`);
    return saved ? JSON.parse(saved) : INITIAL_LEAVE_REQUESTS;
  });

  const [libraryBooks, setLibraryBooks] = useState<LibraryBook[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_libraryBooks`);
    return saved ? JSON.parse(saved) : INITIAL_LIBRARY_BOOKS;
  });

  const [notifications, setNotifications] = useState<InstitutionNotification[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_notifications`);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Toast feedback
  const [toast, setTo] = useState<ToastState | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setTo({ id, message, type });
    setTimeout(() => {
      setTo((current) => (current?.id === id ? null : current));
    }, 3500);
  };

  const clearToast = () => setTo(null);

  // Sync state to LocalStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`${STORAGE_KEY}_user`, JSON.stringify(currentUser));
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_students`, JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_faculty`, JSON.stringify(faculty));
  }, [faculty]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_classes`, JSON.stringify(classes));
  }, [classes]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_attendance`, JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_assessments`, JSON.stringify(assessments));
  }, [assessments]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_homework`, JSON.stringify(homework));
  }, [homework]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_fees`, JSON.stringify(fees));
  }, [fees]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_busRoutes`, JSON.stringify(busRoutes));
  }, [busRoutes]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_messages`, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_incidents`, JSON.stringify(incidents));
  }, [incidents]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_leaveRequests`, JSON.stringify(leaveRequests));
  }, [leaveRequests]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_libraryBooks`, JSON.stringify(libraryBooks));
  }, [libraryBooks]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_notifications`, JSON.stringify(notifications));
  }, [notifications]);

  // Role switching
  const switchRole = (role: UserRole) => {
    const target = profiles.find((p) => p.role === role) || profiles[0];
    setCurrentUser(target);
    showToast(`Switched persona to ${target.name} (${target.badge})`, 'info');
  };

  // Cross-role actions
  const markAttendance = (
    studentId: string,
    status: 'present' | 'absent' | 'late' | 'excused',
    remarks?: string
  ) => {
    const student = students.find((s) => s.id === studentId);
    if (!student) return;

    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, attendanceStatus: status } : s))
    );

    const newRecord: AttendanceRecord = {
      id: `att-${Date.now()}`,
      studentId,
      studentName: student.name,
      classId: student.section,
      date: new Date().toISOString().split('T')[0],
      status,
      remarks,
    };
    setAttendance((prev) => [newRecord, ...prev]);
    showToast(`Attendance updated: ${student.name} marked as ${status}`);
  };

  const batchMarkAttendance = (
    records: { studentId: string; status: 'present' | 'absent' | 'late' | 'excused' }[]
  ) => {
    setStudents((prev) =>
      prev.map((s) => {
        const item = records.find((r) => r.studentId === s.id);
        return item ? { ...s, attendanceStatus: item.status } : s;
      })
    );

    const now = new Date().toISOString().split('T')[0];
    const newRecords: AttendanceRecord[] = records.map((r, i) => {
      const student = students.find((s) => s.id === r.studentId);
      return {
        id: `att-batch-${Date.now()}-${i}`,
        studentId: r.studentId,
        studentName: student?.name || 'Student',
        classId: 'class-8a',
        date: now,
        status: r.status,
      };
    });

    setAttendance((prev) => [...newRecords, ...prev]);
    showToast(`Register submitted: updated ${records.length} students attendance`);
  };

  const addStudent = (studentData: Omit<StudentRecord, 'id' | 'enrollmentNo'>): StudentRecord => {
    const id = `student-${Date.now()}`;
    const enrollmentNo = `ENR-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newStudent: StudentRecord = {
      ...studentData,
      id,
      enrollmentNo,
    };
    setStudents((prev) => [newStudent, ...prev]);
    showToast(`Student admitted: ${newStudent.name} (${newStudent.enrollmentNo})`);
    return newStudent;
  };

  const addClass = (classData: Omit<ClassMaster, 'id' | 'enrolled'>): ClassMaster => {
    const id = `class-${Date.now()}`;
    const newClass: ClassMaster = {
      ...classData,
      id,
      enrolled: 0,
    };
    setClasses((prev) => [...prev, newClass]);
    showToast(`Academic section added: ${newClass.grade} - Section ${newClass.section}`);
    return newClass;
  };

  const disbursePayroll = (facultyId: string) => {
    setFaculty((prev) =>
      prev.map((f) => (f.id === facultyId ? { ...f, payrollStatus: 'disbursed' } : f))
    );
    showToast('Monthly salary disbursed successfully');
  };

  const payFeeInvoice = (invoiceId: string, paymentMethod: string) => {
    const receiptNo = `RCT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setFees((prev) =>
      prev.map((inv) =>
        inv.id === invoiceId
          ? {
              ...inv,
              status: 'paid',
              paidDate: new Date().toISOString().split('T')[0],
              receiptNo,
              paymentMethod,
            }
          : inv
      )
    );
    showToast(`Payment of invoice completed! Receipt #${receiptNo} generated.`);
  };

  const sendFeeReminder = (invoiceId: string) => {
    const invoice = fees.find((f) => f.id === invoiceId);
    if (!invoice) return;
    showToast(`Payment reminder dispatched to guardian of ${invoice.studentName}`);
  };

  const addHomeworkTask = (task: Omit<HomeworkTask, 'id' | 'assignedDate' | 'status'>) => {
    const newTask: HomeworkTask = {
      ...task,
      id: `hw-${Date.now()}`,
      assignedDate: new Date().toISOString().split('T')[0],
      status: 'pending',
    };
    setHomework((prev) => [newTask, ...prev]);
    showToast(`Homework published: ${newTask.title}`);
  };

  const submitHomework = (taskId: string, fileName: string) => {
    setHomework((prev) =>
      prev.map((hw) =>
        hw.id === taskId
          ? {
              ...hw,
              status: 'submitted',
              submissionFileName: fileName,
              submissionTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            }
          : hw
      )
    );
    showToast(`Assignment submitted: ${fileName}`);
  };

  const gradeHomework = (taskId: string, score: number, feedback: string) => {
    setHomework((prev) =>
      prev.map((hw) =>
        hw.id === taskId
          ? {
              ...hw,
              status: 'graded',
              score,
              feedback,
            }
          : hw
      )
    );
    showToast(`Assessment graded: ${score}/100 recorded`);
  };

  const saveAssessment = (assessment: Omit<AssessmentRecord, 'id'>) => {
    const newAss: AssessmentRecord = {
      ...assessment,
      id: `ass-${Date.now()}`,
    };
    setAssessments((prev) => [newAss, ...prev]);
    showToast(`Marks entered for ${newAss.studentName}: ${newAss.score}/${newAss.maxScore} (${newAss.letterGrade})`);
  };

  const sendMessage = (recipientId: string, studentId: string, content: string) => {
    if (!currentUser) return;
    const newMsg: ParentTeacherMessage = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentUser.role as 'parent' | 'teacher' | 'admin',
      recipientId,
      studentId,
      timestamp: 'Just now',
      content,
      unread: false,
    };
    setMessages((prev) => [...prev, newMsg]);
    showToast('Message sent');
  };

  const logIncident = (incident: Omit<ConductIncident, 'id' | 'date'>) => {
    const newInc: ConductIncident = {
      ...incident,
      id: `inc-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setIncidents((prev) => [newInc, ...prev]);
    showToast(`Incident recorded: ${newInc.category} note for ${newInc.studentName}`);
  };

  const submitLeaveRequest = (request: Omit<LeaveRequest, 'id' | 'status'>) => {
    const newReq: LeaveRequest = {
      ...request,
      id: `lvr-${Date.now()}`,
      status: 'pending',
    };
    setLeaveRequests((prev) => [newReq, ...prev]);
    showToast('Leave request submitted to educator review queue');
  };

  const updateLeaveStatus = (requestId: string, status: 'approved' | 'rejected') => {
    setLeaveRequests((prev) =>
      prev.map((lr) =>
        lr.id === requestId
          ? {
              ...lr,
              status,
              reviewedBy: currentUser?.name || 'Faculty Office',
            }
          : lr
      )
    );
    showToast(`Leave request ${status}`);
  };

  const reserveBook = (bookId: string) => {
    setLibraryBooks((prev) =>
      prev.map((b) =>
        b.id === bookId
          ? {
              ...b,
              isReserved: true,
              availableCopies: Math.max(0, b.availableCopies - 1),
            }
          : b
      )
    );
    showToast('Book reserved at library circulation desk');
  };

  const addNotification = (
    title: string,
    content: string,
    priority: 'low' | 'normal' | 'high',
    targetRoles: UserRole[]
  ) => {
    const newNotif: InstitutionNotification = {
      id: `notif-${Date.now()}`,
      title,
      content,
      date: new Date().toISOString().split('T')[0],
      priority,
      targetRoles,
    };
    setNotifications((prev) => [newNotif, ...prev]);
    showToast(`Circular broadcasted: "${title}"`);
  };

  return (
    <SchoolStoreContext.Provider
      value={{
        currentUser,
        currentRole: currentUser?.role || null,
        setCurrentUser,
        switchRole,
        selectedWardId,
        setSelectedWardId,
        isMobile,
        isTablet,
        profiles,
        students,
        faculty,
        classes,
        attendance,
        assessments,
        homework,
        fees,
        busRoutes,
        messages,
        incidents,
        leaveRequests,
        libraryBooks,
        notifications,
        markAttendance,
        batchMarkAttendance,
        addStudent,
        addClass,
        disbursePayroll,
        payFeeInvoice,
        sendFeeReminder,
        addHomeworkTask,
        submitHomework,
        gradeHomework,
        saveAssessment,
        sendMessage,
        logIncident,
        submitLeaveRequest,
        updateLeaveStatus,
        reserveBook,
        addNotification,
        toast,
        showToast,
        clearToast,
      }}
    >
      {children}
    </SchoolStoreContext.Provider>
  );
};

export { SchoolStoreContext };
export type { SchoolStoreContextType };
