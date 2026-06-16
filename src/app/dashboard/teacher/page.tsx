'use client';

import { useRequireAuth } from '@/hooks/useAuth';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import TeacherDashboard from '@/components/dashboards/TeacherDashboard';

export default function TeacherDashboardPage() {
  const { user, profile, loading } = useRequireAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user || !profile) {
    return <LoadingSpinner />;
  }

  return <TeacherDashboard profile={profile} />;
}
