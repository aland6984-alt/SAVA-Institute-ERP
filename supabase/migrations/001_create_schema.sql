-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create ENUM types
CREATE TYPE user_role AS ENUM ('student', 'teacher', 'admin', 'super_admin');
CREATE TYPE exam_type AS ENUM ('quiz', 'midterm', 'final', 'practical');
CREATE TYPE attendance_status AS ENUM ('present', 'absent', 'late');
CREATE TYPE payment_status AS ENUM ('paid', 'unpaid', 'partially_paid');
CREATE TYPE payment_method AS ENUM ('cash', 'card', 'bank_transfer', 'check');

-- Profiles table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  role user_role NOT NULL DEFAULT 'student',
  custom_id VARCHAR(50) NOT NULL UNIQUE,
  avatar_url TEXT,
  phone VARCHAR(20),
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Departments table
CREATE TABLE public.departments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL UNIQUE,
  code VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  head_id UUID REFERENCES public.profiles(id),
  background_image TEXT,
  theme_color VARCHAR(7) DEFAULT '#001F3F',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Students table
CREATE TABLE public.students (
  id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  department_id UUID NOT NULL REFERENCES public.departments(id),
  year INT NOT NULL CHECK (year >= 1 AND year <= 4),
  enrollment_number VARCHAR(100) NOT NULL UNIQUE,
  date_of_birth DATE,
  gender VARCHAR(20),
  guardian_name VARCHAR(255),
  guardian_phone VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Teachers table
CREATE TABLE public.teachers (
  id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  department_id UUID NOT NULL REFERENCES public.departments(id),
  specialization VARCHAR(255),
  salary DECIMAL(10, 2),
  employment_date DATE,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subjects table
CREATE TABLE public.subjects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50) NOT NULL UNIQUE,
  department_id UUID NOT NULL REFERENCES public.departments(id),
  year INT NOT NULL CHECK (year >= 1 AND year <= 4),
  theory_credits INT DEFAULT 0,
  practical_credits INT DEFAULT 0,
  teacher_id UUID NOT NULL REFERENCES public.teachers(id),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enrollments table
CREATE TABLE public.enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  department_id UUID NOT NULL REFERENCES public.departments(id),
  year INT NOT NULL,
  enrollment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(student_id, subject_id)
);

-- Exams table
CREATE TABLE public.exams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  type exam_type NOT NULL,
  exam_date TIMESTAMP WITH TIME ZONE,
  max_score INT DEFAULT 100,
  status VARCHAR(50) DEFAULT 'scheduled',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Grades table
CREATE TABLE public.grades (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES public.subjects(id),
  exam_id UUID NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
  exam_type exam_type NOT NULL,
  score INT NOT NULL DEFAULT 0 CHECK (score >= 0 AND score <= 100),
  max_score INT DEFAULT 100,
  weightage DECIMAL(3, 2) DEFAULT 1.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(student_id, exam_id)
);

-- Attendance table
CREATE TABLE public.attendance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES public.subjects(id),
  teacher_id UUID NOT NULL REFERENCES public.teachers(id),
  date DATE NOT NULL,
  status attendance_status NOT NULL DEFAULT 'present',
  remarks TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(student_id, subject_id, date)
);

-- Payments table
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  paid_amount DECIMAL(10, 2) DEFAULT 0,
  remaining_balance DECIMAL(10, 2) GENERATED ALWAYS AS (amount - paid_amount) STORED,
  payment_date TIMESTAMP WITH TIME ZONE,
  status payment_status DEFAULT 'unpaid',
  payment_method payment_method,
  receipt_number VARCHAR(100),
  remarks TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Timetable table
CREATE TABLE public.timetables (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  day_of_week INT NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  room_number VARCHAR(50),
  semester INT DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Announcements table
CREATE TABLE public.announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_by UUID NOT NULL REFERENCES public.profiles(id),
  department_id UUID REFERENCES public.departments(id),
  target_role user_role DEFAULT 'student',
  priority VARCHAR(50) DEFAULT 'medium',
  is_pinned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_students_department ON public.students(department_id);
CREATE INDEX idx_teachers_department ON public.teachers(department_id);
CREATE INDEX idx_subjects_department ON public.subjects(department_id);
CREATE INDEX idx_subjects_teacher ON public.subjects(teacher_id);
CREATE INDEX idx_enrollments_student ON public.enrollments(student_id);
CREATE INDEX idx_enrollments_subject ON public.enrollments(subject_id);
CREATE INDEX idx_grades_student ON public.grades(student_id);
CREATE INDEX idx_grades_subject ON public.grades(subject_id);
CREATE INDEX idx_attendance_student ON public.attendance(student_id);
CREATE INDEX idx_attendance_subject ON public.attendance(subject_id);
CREATE INDEX idx_payments_student ON public.payments(student_id);
CREATE INDEX idx_announcements_created_by ON public.announcements(created_by);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (auth.jwt() ->> 'role' IN ('admin', 'super_admin'));

-- RLS Policies for Students
CREATE POLICY "Students can view own profile" ON public.students
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Teachers can view students" ON public.students
  FOR SELECT USING (auth.jwt() ->> 'role' = 'teacher');

CREATE POLICY "Admins can view all students" ON public.students
  FOR SELECT USING (auth.jwt() ->> 'role' IN ('admin', 'super_admin'));

-- RLS Policies for Teachers
CREATE POLICY "Teachers can view own profile" ON public.teachers
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all teachers" ON public.teachers
  FOR SELECT USING (auth.jwt() ->> 'role' IN ('admin', 'super_admin'));

-- RLS Policies for Grades
CREATE POLICY "Students can view own grades" ON public.grades
  FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Teachers can manage grades" ON public.grades
  USING (EXISTS (
    SELECT 1 FROM public.subjects
    WHERE subjects.id = grades.subject_id
    AND subjects.teacher_id = auth.uid()
  ));

CREATE POLICY "Admins can manage all grades" ON public.grades
  USING (auth.jwt() ->> 'role' IN ('admin', 'super_admin'));

-- RLS Policies for Attendance
CREATE POLICY "Students can view own attendance" ON public.attendance
  FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Teachers can manage attendance" ON public.attendance
  USING (teacher_id = auth.uid());

CREATE POLICY "Admins can manage all attendance" ON public.attendance
  USING (auth.jwt() ->> 'role' IN ('admin', 'super_admin'));

-- RLS Policies for Payments
CREATE POLICY "Students can view own payments" ON public.payments
  FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Admins can manage all payments" ON public.payments
  USING (auth.jwt() ->> 'role' IN ('admin', 'super_admin'));
