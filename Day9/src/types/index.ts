export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  avatar?: string;
  department?: string;
  semester?: number;
  permissions?: string[];
}

export interface Student extends User {
  role: 'student';
  rollNumber: string;
  department: string;
  semester: number;
  cgpa?: number;
  totalCredits?: number;
}

export interface Teacher extends User {
  role: 'teacher';
  department: string;
  subjects?: string[];
  experience?: number;
}

export interface Admin extends User {
  role: 'admin';
  permissions: string[];
  level: 'super' | 'department' | 'general';
}

// Assignment Types
export interface Assignment {
  id: string;
  title: string;
  description: string;
  subject: string;
  teacherId: string;
  dueDate: Date;
  maxMarks: number;
  files: AssignmentFile[];
  submissions?: AssignmentSubmission[];
  createdAt: Date;
  status: 'draft' | 'published' | 'closed';
}

export interface AssignmentFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  files: AssignmentFile[];
  submittedAt: Date;
  grade?: number;
  feedback?: string;
  status: 'submitted' | 'graded' | 'late';
}

// Attendance Types
export interface AttendanceRecord {
  id: string;
  studentId: string;
  subjectId: string;
  teacherId: string;
  date: Date;
  status: 'present' | 'absent' | 'late' | 'excused';
  remarks?: string;
}

export interface AttendanceSession {
  id: string;
  subjectId: string;
  teacherId: string;
  date: Date;
  startTime: string;
  endTime: string;
  totalStudents: number;
  presentStudents: number;
  records: AttendanceRecord[];
}

// Timetable Types
export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';
  subject: string;
  teacherId: string;
  room: string;
  department: string;
  semester: number;
}

export interface Timetable {
  id: string;
  department: string;
  semester: number;
  academicYear: string;
  slots: TimeSlot[];
  createdAt: Date;
  updatedAt: Date;
}

// Leave Application Types
export interface LeaveApplication {
  id: string;
  applicantId: string;
  applicantType: 'student' | 'teacher';
  startDate: Date;
  endDate: Date;
  reason: string;
  type: 'sick' | 'personal' | 'emergency' | 'academic' | 'other';
  status: 'pending' | 'approved' | 'rejected';
  documents?: AssignmentFile[];
  reviewedBy?: string;
  reviewedAt?: Date;
  reviewComments?: string;
  createdAt: Date;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  category: 'assignment' | 'attendance' | 'grade' | 'announcement' | 'system';
  read: boolean;
  actionUrl?: string;
  createdAt: Date;
}

// Dashboard Analytics Types
export interface DashboardStats {
  totalStudents?: number;
  totalTeachers?: number;
  totalCourses?: number;
  averageAttendance?: number;
  pendingAssignments?: number;
  upcomingExams?: number;
  notifications?: number;
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export interface ActivityData {
  id: string;
  user: string;
  action: string;
  timestamp: Date;
  type: 'create' | 'update' | 'delete' | 'login' | 'assignment' | 'attendance';
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'date' | 'select' | 'textarea' | 'file';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: RegExp;
    message?: string;
  };
}

export interface FormStep {
  title: string;
  description?: string;
  fields: FormField[];
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// File Upload Types
export interface FileUploadProgress {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
}

export interface MockApiConfig {
  baseURL: string;
  timeout: number;
  retryCount: number;
  mockDelay: number;
}

// Theme Types
export type Theme = 'light' | 'dark';

export interface ThemeConfig {
  theme: Theme;
  primaryColor: string;
  secondaryColor: string;
  animations: boolean;
}
