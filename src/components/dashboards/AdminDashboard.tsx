'use client';

import { useEffect, useState } from 'react';
import { Profile } from '@/types';
import { getAllStudents, getAllTeachers } from '@/lib/db';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Users, UserCheck, BookOpen, TrendingUp } from 'lucide-react';
import AdminUserManagement from '@/components/dashboard-components/AdminUserManagement';
import AdminPaymentManagement from '@/components/dashboard-components/AdminPaymentManagement';

export default function AdminDashboard({ profile }: { profile: Profile }) {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'teachers' | 'payments'>('overview');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [studentsData, teachersData] = await Promise.all([
          getAllStudents(),
          getAllTeachers(),
        ]);
        setStudents(studentsData || []);
        setTeachers(teachersData || []);
      } catch (error) {
        console.error('Error loading admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const stats = [
    { icon: Users, label: 'Total Students', value: students.length, color: 'blue' },
    { icon: UserCheck, label: 'Total Teachers', value: teachers.length, color: 'green' },
    { icon: BookOpen, label: 'Active Departments', value: '9', color: 'purple' },
    { icon: TrendingUp, label: 'System Health', value: '98%', color: 'orange' },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'students', label: 'Students' },
    { id: 'teachers', label: 'Teachers' },
    { id: 'payments', label: 'Payments' },
  ] as const;

  return (
    <DashboardLayout profile={profile} isAdmin>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Admin Control Panel
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Manage all institute operations</p>
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

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 border-b border-gray-200 dark:border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium transition-all ${
                activeTab === tab.id
                  ? 'text-sava-primary dark:text-sava-accent border-b-2 border-sava-primary dark:border-sava-accent'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recent Students</h3>
                <div className="space-y-3">
                  {students.slice(0, 5).map((student: any) => (
                    <div key={student.id} className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{student.full_name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{student.custom_id}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recent Teachers</h3>
                <div className="space-y-3">
                  {teachers.slice(0, 5).map((teacher: any) => (
                    <div key={teacher.id} className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{teacher.full_name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{teacher.custom_id}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'students' && <AdminUserManagement userType="student" users={students} />}
          {activeTab === 'teachers' && <AdminUserManagement userType="teacher" users={teachers} />}
          {activeTab === 'payments' && <AdminPaymentManagement />}
        </div>
      </div>
    </DashboardLayout>
  );
}
