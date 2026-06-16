'use client';

import { useEffect, useState } from 'react';
import { Profile, Teacher } from '@/types';
import { getTeacherProfile, getTeacherSubjects, getStudentsBySubject } from '@/lib/db';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Users, BookOpen, Clock, TrendingUp } from 'lucide-react';

export default function TeacherDashboard({ profile }: { profile: Profile }) {
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [subjects, setSubjects] = useState([]);
  const [studentsBySubject, setStudentsBySubject] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const teacherData = await getTeacherProfile(profile.id);
        const subjectsData = await getTeacherSubjects(profile.id);
        setTeacher(teacherData);
        setSubjects(subjectsData || []);

        // Load students for each subject
        const studentData: Record<string, any[]> = {};
        for (const subject of subjectsData || []) {
          const students = await getStudentsBySubject(subject.id);
          studentData[subject.id] = students || [];
        }
        setStudentsBySubject(studentData);
      } catch (error) {
        console.error('Error loading dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [profile.id]);

  const stats = [
    { icon: BookOpen, label: 'Assigned Subjects', value: subjects.length, color: 'blue' },
    { icon: Users, label: 'Total Students', value: Object.values(studentsBySubject).flat().length, color: 'green' },
    { icon: Clock, label: 'Classes This Week', value: '12', color: 'purple' },
    { icon: TrendingUp, label: 'Avg Class Performance', value: '82%', color: 'orange' },
  ];

  return (
    <DashboardLayout profile={profile}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome, {profile.full_name}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your classes and students</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <Icon className={`w-8 h-8 text-${stat.color}-500`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Subjects */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Your Subjects</h2>
          <div className="space-y-4">
            {subjects.length > 0 ? (
              subjects.map((subject: any) => (
                <div key={subject.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{subject.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Code: {subject.code}</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                      {studentsBySubject[subject.id]?.length || 0} students
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">No subjects assigned yet</p>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
