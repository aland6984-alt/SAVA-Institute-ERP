'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useTheme } from '@/hooks/useTheme';

export default function Providers({ children }: { children: ReactNode }) {
  const { theme, mounted } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !mounted) {
    return <>{children}</>;
  }

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: theme === 'dark' ? '#1f2937' : '#ffffff',
            color: theme === 'dark' ? '#f3f4f6' : '#111827',
            border: theme === 'dark' ? '1px solid #374151' : '1px solid #e5e7eb',
            borderRadius: '8px',
          },
        }}
      />
      {children}
    </>
  );
}
