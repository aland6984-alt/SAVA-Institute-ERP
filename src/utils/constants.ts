export const DEPARTMENTS = [
  {
    id: 'nursing',
    name: 'Nursing',
    code: 'NUR',
    color: '#FF6B9D',
    theme: 'hospital',
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy',
    code: 'PHARM',
    color: '#00C9A7',
    theme: 'pharmacy',
  },
  {
    id: 'med-lab',
    name: 'Medical Laboratory Technology',
    code: 'MLT',
    color: '#845EC2',
    theme: 'lab',
  },
  {
    id: 'dental',
    name: 'Dental Technology',
    code: 'DENT',
    color: '#0094D8',
    theme: 'dental',
  },
  {
    id: 'aesthetic',
    name: 'Aesthetic Clinic',
    code: 'AEST',
    color: '#FF9671',
    theme: 'aesthetic',
  },
  {
    id: 'english',
    name: 'English',
    code: 'ENG',
    color: '#FFB347',
    theme: 'academic',
  },
  {
    id: 'admin',
    name: 'Hospital Administration',
    code: 'ADMIN',
    color: '#8E7CC3',
    theme: 'admin',
  },
  {
    id: 'marketing',
    name: 'Marketing',
    code: 'MKT',
    color: '#C4C4FF',
    theme: 'marketing',
  },
  {
    id: 'network',
    name: 'Network Services',
    code: 'NET',
    color: '#00D9FF',
    theme: 'network',
  },
];

export const EXAM_TYPES = [
  { value: 'quiz', label: 'Quiz' },
  { value: 'midterm', label: 'Midterm Exam' },
  { value: 'final', label: 'Final Exam' },
  { value: 'practical', label: 'Practical Exam' },
];

export const ATTENDANCE_STATUS = [
  { value: 'present', label: 'Present', color: '#10B981' },
  { value: 'absent', label: 'Absent', color: '#EF4444' },
  { value: 'late', label: 'Late', color: '#F59E0B' },
];

export const PAYMENT_STATUS = [
  { value: 'paid', label: 'Paid', color: '#10B981' },
  { value: 'unpaid', label: 'Unpaid', color: '#EF4444' },
  { value: 'partially_paid', label: 'Partially Paid', color: '#F59E0B' },
];

export const PAYMENT_METHODS = [
  { value: 'cash', label: 'Cash' },
  { value: 'card', label: 'Credit/Debit Card' },
  { value: 'bank_transfer', label: 'Bank Transfer' },
  { value: 'check', label: 'Check' },
];

export const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
