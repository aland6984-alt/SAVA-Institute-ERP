import { StudentGrade } from '@/types';

export const calculateGPA = (grades: StudentGrade[]): number => {
  if (grades.length === 0) return 0;
  const totalGPA = grades.reduce((sum, g) => sum + g.gpa, 0);
  return Math.round((totalGPA / grades.length) * 100) / 100;
};

export const calculateFinalGrade = (
  theoryScore: number,
  practicalScore: number,
  theoryWeight: number = 0.6,
  practicalWeight: number = 0.4
): number => {
  return Math.round((theoryScore * theoryWeight + practicalScore * practicalWeight) * 100) / 100;
};

export const getGradeStatus = (score: number, passingScore: number = 50): 'pass' | 'fail' | 'pending' => {
  if (score === 0) return 'pending';
  return score >= passingScore ? 'pass' : 'fail';
};

export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const calculateAttendancePercentage = (
  presentCount: number,
  absentCount: number,
  lateCount: number
): number => {
  const totalClasses = presentCount + absentCount + lateCount;
  if (totalClasses === 0) return 0;
  return Math.round(((presentCount + lateCount * 0.5) / totalClasses) * 100);
};

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const generateCustomId = (role: string, number: number): string => {
  const prefix = role === 'student' ? 'STU' : role === 'teacher' ? 'TCH' : 'ADM';
  return `${prefix}${String(number).padStart(5, '0')}`;
};
