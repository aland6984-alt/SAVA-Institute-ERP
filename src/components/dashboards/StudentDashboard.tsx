'use client';

import { useEffect, useState } from 'react';
import { Profile, Student } from '@/types';
import { getStudentProfile, getStudentGrades, getStudentAttendance, getStudentPayments } from '@/lib/db';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { BarChart3, BookOpen, Clock, CreditCard, GraduationCap } from 'lucide-react';
import StudentProfileCard from '@/components/dashboard-components/StudentProfileCard';
import GradesCard from '@/components/dashboard-components/GradesCard';
import AttendanceCard from '@/components/dashboard-components/AttendanceCard';
import PaymentCard from '@/components/dashboard-components/PaymentCard';

export default function StudentDashboard({ profile }: { profile: Profile }) {
  const [student, setStudent] = useState<Student | null>(null);
  const [grades, setGrades] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [studentData, gradesData, attendanceData, paymentsData] = await Promise.all([
          getStudentProfile(profile.id),
          getStudentGrades(profile.id),
          getStudentAttendance(profile.id),
          getStudentPayments(profile.id),
        ]);

        setStudent(studentData);
        setGrades(gradesData || []);
        setAttendance(attendanceData || []);
        setPayments(paymentsData || []);
      } catch (error) {
        console.error('Error loading dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [profile.id]);

  const stats = [
    { icon: GraduationCap, label: 'GPA', value: '3.8', color: 'blue' },
    { icon: BookOpen, label: 'Enrolled Subjects', value: '6', color: 'green' },
    { icon: Clock, label: 'Attendance', value: '94%', color: 'purple' },
    { icon: CreditCard, label: 'Pending Payment', value: '$500', color: 'orange' },
  ];

  return (
    <DashboardLayout profile={profile}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {profile.full_name}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Here's your academic overview</p>
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

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <StudentProfileCard student={student} />
            <GradesCard grades={grades} />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <AttendanceCard attendance={attendance} />
            <PaymentCard payments={payments} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
