'use client';

import { useRequireAuth } from '@/hooks/useAuth';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import AdminDashboard from '@/components/dashboards/AdminDashboard';

export default function AdminDashboardPage() {
  const { user, profile, loading } = useRequireAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user || !profile) {
    return <LoadingSpinner />;
  }

  if (profile.role !== 'super_admin' && profile.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Access Denied</p>
      </div>
    );
  }

  return <AdminDashboard profile={profile} />;
}
