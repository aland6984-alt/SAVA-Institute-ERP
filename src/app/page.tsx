'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import LandingPage from '@/components/landing/LandingPage';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          // User is logged in, redirect to appropriate dashboard
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

          if (profile) {
            const dashboardRoutes: Record<string, string> = {
              student: '/dashboard/student',
              teacher: '/dashboard/teacher',
              super_admin: '/dashboard/admin',
              admin: '/dashboard/admin',
            };
            router.push(dashboardRoutes[profile.role] || '/dashboard/student');
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <LandingPage />;
}
