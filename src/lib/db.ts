import { supabase } from './supabase';
import { Student, Teacher, Subject, Grade, Attendance, Payment, Announcement } from '@/types';

// STUDENT FUNCTIONS
export const getStudentProfile = async (studentId: string): Promise<Student | null> => {
  try {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('id', studentId)
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching student profile:', error);
    return null;
  }
};

export const getStudentGrades = async (studentId: string) => {
  try {
    const { data, error } = await supabase
      .from('grades')
      .select(`
        *,
        exams(*),
        subjects(name, code)
      `)
      .eq('student_id', studentId);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching student grades:', error);
    return [];
  }
};

export const getStudentAttendance = async (studentId: string) => {
  try {
    const { data, error } = await supabase
      .from('attendance')
      .select(`
        *,
        subjects(name, code)
      `)
      .eq('student_id', studentId)
      .order('date', { ascending: false });
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching attendance:', error);
    return [];
  }
};

export const getStudentPayments = async (studentId: string) => {
  try {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('student_id', studentId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching payments:', error);
    return [];
  }
};

export const getStudentTimetable = async (studentId: string) => {
  try {
    const { data: student } = await supabase
      .from('students')
      .select('year, department_id')
      .eq('id', studentId)
      .single();

    if (!student) return [];

    const { data, error } = await supabase
      .from('timetables')
      .select(`
        *,
        subjects(name, code, teacher_id, teachers(full_name))
      `)
      .eq('year', student.year);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching timetable:', error);
    return [];
  }
};

// TEACHER FUNCTIONS
export const getTeacherProfile = async (teacherId: string): Promise<Teacher | null> => {
  try {
    const { data, error } = await supabase
      .from('teachers')
      .select('*')
      .eq('id', teacherId)
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching teacher profile:', error);
    return null;
  }
};

export const getTeacherSubjects = async (teacherId: string) => {
  try {
    const { data, error } = await supabase
      .from('subjects')
      .select('*')
      .eq('teacher_id', teacherId);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching teacher subjects:', error);
    return [];
  }
};

export const getStudentsBySubject = async (subjectId: string) => {
  try {
    const { data, error } = await supabase
      .from('enrollments')
      .select(`
        *,
        students(id, full_name, custom_id, avatar_url)
      `)
      .eq('subject_id', subjectId);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching students by subject:', error);
    return [];
  }
};

export const markAttendance = async (attendance: Partial<Attendance>) => {
  try {
    const { data, error } = await supabase
      .from('attendance')
      .insert([attendance]);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error marking attendance:', error);
    return null;
  }
};

export const updateGrade = async (gradeId: string, gradeData: Partial<Grade>) => {
  try {
    const { data, error } = await supabase
      .from('grades')
      .update(gradeData)
      .eq('id', gradeId);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating grade:', error);
    return null;
  }
};

// ADMIN FUNCTIONS
export const getAllStudents = async () => {
  try {
    const { data, error } = await supabase
      .from('students')
      .select(`
        *,
        departments(name)
      `)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching all students:', error);
    return [];
  }
};

export const getAllTeachers = async () => {
  try {
    const { data, error } = await supabase
      .from('teachers')
      .select(`
        *,
        departments(name)
      `)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching all teachers:', error);
    return [];
  }
};

export const createStudent = async (studentData: Partial<Student>) => {
  try {
    const { data, error } = await supabase
      .from('students')
      .insert([studentData]);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating student:', error);
    return null;
  }
};

export const createTeacher = async (teacherData: Partial<Teacher>) => {
  try {
    const { data, error } = await supabase
      .from('teachers')
      .insert([teacherData]);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating teacher:', error);
    return null;
  }
};

export const updatePayment = async (paymentId: string, paymentData: Partial<Payment>) => {
  try {
    const { data, error } = await supabase
      .from('payments')
      .update(paymentData)
      .eq('id', paymentId);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating payment:', error);
    return null;
  }
};

export const getAnnouncements = async (role?: string, departmentId?: string) => {
  try {
    let query = supabase
      .from('announcements')
      .select(`
        *,
        profiles(full_name, avatar_url)
      `)
      .order('is_pinned', { ascending: false })
      .order('created_at', { ascending: false });

    if (role) {
      query = query.or(`target_role.eq.${role},target_role.eq.all`);
    }

    if (departmentId) {
      query = query.or(`department_id.eq.${departmentId},department_id.is.null`);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching announcements:', error);
    return [];
  }
};

export const createAnnouncement = async (announcementData: Partial<Announcement>) => {
  try {
    const { data, error } = await supabase
      .from('announcements')
      .insert([announcementData]);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating announcement:', error);
    return null;
  }
};
