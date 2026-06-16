'use client';

import { useRequireAuth } from '@/hooks/useAuth';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import StudentDashboard from '@/components/dashboards/StudentDashboard';

export default function StudentDashboardPage() {
  const { user, profile, loading } = useRequireAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user || !profile) {
    return <LoadingSpinner />;
  }

  return <StudentDashboard profile={profile} />;
}
