export type UserRole = 'admin' | 'teacher' | 'student' | 'parent';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  avatar: string;
  badge: string;
  institutionCode: string;
  wardIds?: string[]; // For parents
  classId?: string; // For teachers or students
  department?: string;
}

export interface StudentRecord {
  id: string;
  enrollmentNo: string;
  name: string;
  grade: string;
  section: string;
  avatar: string;
  gender: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  attendanceStatus: 'present' | 'absent' | 'late' | 'excused';
  feeStatus: 'paid' | 'pending' | 'overdue';
  gpa: number;
  dob: string;
}

export interface FacultyRecord {
  id: string;
  employeeNo: string;
  name: string;
  subject: string;
  department: string;
  email: string;
  phone: string;
  avatar: string;
  monthlyAttendance: number; // percentage
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  payrollStatus: 'pending' | 'processing' | 'disbursed';
}

export interface ClassMaster {
  id: string;
  grade: string;
  section: string;
  capacity: number;
  enrolled: number;
  leadTeacherId: string;
  leadTeacherName: string;
  roomNo: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  remarks?: string;
}

export interface AssessmentRecord {
  id: string;
  studentId: string;
  studentName: string;
  subject: string;
  term: string;
  assessmentType: 'Quiz' | 'Midterm' | 'Final' | 'Assignment';
  score: number;
  maxScore: number;
  letterGrade: string;
  remarks: string;
}

export interface HomeworkTask {
  id: string;
  title: string;
  subject: string;
  classId: string;
  assignedBy: string;
  assignedDate: string;
  dueDate: string;
  instructions: string;
  attachments?: string[];
  status: 'pending' | 'submitted' | 'graded';
  submissionTimestamp?: string;
  submissionFileName?: string;
  feedback?: string;
  score?: number;
}

export interface FeeInvoice {
  id: string;
  studentId: string;
  studentName: string;
  grade: string;
  title: string;
  dueDate: string;
  tuitionFee: number;
  transportFee: number;
  activityFee: number;
  totalAmount: number;
  status: 'paid' | 'pending' | 'overdue';
  paidDate?: string;
  receiptNo?: string;
  paymentMethod?: string;
}

export interface BusTransitRoute {
  id: string;
  vehicleNo: string;
  routeName: string;
  driverName: string;
  driverPhone: string;
  capacity: number;
  passengersEnrolled: number;
  currentStop: string;
  nextStop: string;
  etaMinutes: number;
  status: 'on_schedule' | 'delayed' | 'completed';
  coordinates: { lat: number; lng: number };
}

export interface ParentTeacherMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'parent' | 'teacher' | 'admin';
  recipientId: string;
  studentId: string;
  timestamp: string;
  content: string;
  unread: boolean;
}

export interface ConductIncident {
  id: string;
  studentId: string;
  studentName: string;
  reportedBy: string;
  category: 'Academic' | 'Behavioral' | 'Punctuality' | 'Commendation';
  date: string;
  description: string;
}

export interface LeaveRequest {
  id: string;
  studentId: string;
  studentName: string;
  parentName: string;
  category: 'Medical' | 'Personal' | 'Family Emergency';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewedBy?: string;
}

export interface LibraryBook {
  id: string;
  isbn: string;
  title: string;
  author: string;
  category: string;
  coverImage?: string;
  availableCopies: number;
  totalCopies: number;
  isReserved?: boolean;
  isEbookAvailable: boolean;
}

export interface InstitutionNotification {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: 'low' | 'normal' | 'high';
  targetRoles: UserRole[];
}
