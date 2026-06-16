'use client';

import { ReactNode, useState } from 'react';
import { Profile } from '@/types';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/layouts/Sidebar';
import TopBar from '@/components/layouts/TopBar';
import toast from 'react-hot-toast';

interface DashboardLayoutProps {
  children: ReactNode;
  profile: Profile;
  isAdmin?: boolean;
}

export default function DashboardLayout({ children, profile, isAdmin = false }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Logged out successfully');
      router.push('/');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        profile={profile}
        isAdmin={isAdmin}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar
          profile={profile}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          onLogout={handleLogout}
        />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
