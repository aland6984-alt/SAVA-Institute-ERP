// User & Authentication Types
export type UserRole = 'student' | 'teacher' | 'super_admin' | 'admin';

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  custom_id: string;
  avatar_url: string | null;
  phone: string | null;
  address: string | null;
  created_at: string;
  updated_at: string;
}

// Student Types
export interface Student extends Profile {
  department_id: string;
  year: number;
  enrollment_number: string;
  date_of_birth: string | null;
  gender: 'male' | 'female' | 'other';
  guardian_name: string | null;
  guardian_phone: string | null;
}

// Teacher Types
export interface Teacher extends Profile {
  department_id: string;
  specialization: string;
  salary: number;
  employment_date: string;
  status: 'active' | 'inactive' | 'on_leave';
}

// Academic Types
export interface Department {
  id: string;
  name: string;
  code: string;
  description: string | null;
  head_id: string | null;
  background_image: string | null;
  theme_color: string;
  created_at: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  department_id: string;
  year: number;
  theory_credits: number;
  practical_credits: number;
  teacher_id: string;
  description: string | null;
  created_at: string;
}

export interface Enrollment {
  id: string;
  student_id: string;
  subject_id: string;
  department_id: string;
  year: number;
  enrollment_date: string;
  status: 'active' | 'dropped' | 'completed';
  created_at: string;
}

// Exam & Grades Types
export type ExamType = 'quiz' | 'midterm' | 'final' | 'practical';

export interface Exam {
  id: string;
  subject_id: string;
  type: ExamType;
  exam_date: string;
  max_score: 100;
  status: 'scheduled' | 'completed' | 'graded' | 'published';
  created_at: string;
}

export interface Grade {
  id: string;
  student_id: string;
  subject_id: string;
  exam_id: string;
  exam_type: ExamType;
  score: number;
  max_score: 100;
  weightage: number;
  created_at: string;
  updated_at: string;
}

export interface StudentGrade {
  subject_id: string;
  subject_name: string;
  theory_score: number;
  practical_score: number;
  final_grade: number;
  status: 'pass' | 'fail' | 'pending';
  gpa: number;
}

// Attendance Types
export type AttendanceStatus = 'present' | 'absent' | 'late';

export interface Attendance {
  id: string;
  student_id: string;
  subject_id: string;
  teacher_id: string;
  date: string;
  status: AttendanceStatus;
  remarks: string | null;
  created_at: string;
}

export interface AttendanceReport {
  student_id: string;
  subject_id: string;
  total_classes: number;
  present_count: number;
  absent_count: number;
  late_count: number;
  attendance_percentage: number;
}

// Payment Types
export interface Payment {
  id: string;
  student_id: string;
  amount: number;
  paid_amount: number;
  remaining_balance: number;
  payment_date: string | null;
  status: 'paid' | 'unpaid' | 'partially_paid';
  payment_method: 'cash' | 'card' | 'bank_transfer' | 'check';
  receipt_number: string | null;
  remarks: string | null;
  created_at: string;
  updated_at: string;
}

// Timetable Types
export interface Timetable {
  id: string;
  subject_id: string;
  day_of_week: number; // 0-6
  start_time: string; // HH:MM
  end_time: string; // HH:MM
  room_number: string;
  semester: number;
  created_at: string;
}

// Announcement Types
export interface Announcement {
  id: string;
  title: string;
  content: string;
  created_by: string;
  department_id: string | null;
  target_role: UserRole | 'all';
  priority: 'low' | 'medium' | 'high';
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
}

// Dashboard Stats
export interface DashboardStats {
  total_students: number;
  total_teachers: number;
  total_departments: number;
  total_subjects: number;
  active_enrollments: number;
  pending_payments: number;
  attendance_rate: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
