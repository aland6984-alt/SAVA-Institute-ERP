'use client';

import { Student } from '@/types';
import { User } from 'lucide-react';

interface StudentProfileCardProps {
  student: Student | null;
}

export default function StudentProfileCard({ student }: StudentProfileCardProps) {
  if (!student) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 animate-pulse">
        <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 bg-gradient-to-br from-sava-primary to-sava-secondary rounded-lg flex items-center justify-center text-white text-3xl font-bold">
          {student.full_name.charAt(0)}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{student.full_name}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Student ID: {student.custom_id}</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{student.enrollment_number}</p>
        </div>
      </div>
    </div>
  );
}
