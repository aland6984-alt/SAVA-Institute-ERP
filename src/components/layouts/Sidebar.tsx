'use client';

import { Profile } from '@/types';
import { LogOut, Home, BookOpen, Users, BarChart3, Settings, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface SidebarProps {
  isOpen: boolean;
  profile: Profile;
  isAdmin?: boolean;
  onLogout: () => void;
}

export default function Sidebar({ isOpen, profile, isAdmin, onLogout }: SidebarProps) {
  const pathname = usePathname();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const getRoleMenuItems = () => {
    if (isAdmin) {
      return [
        { icon: Home, label: 'Overview', href: '/dashboard/admin' },
        { icon: Users, label: 'Students', href: '/dashboard/admin#students' },
        { icon: Users, label: 'Teachers', href: '/dashboard/admin#teachers' },
        { icon: BarChart3, label: 'Reports', href: '/dashboard/admin#payments' },
        { icon: Settings, label: 'Settings', href: '/dashboard/admin#settings' },
      ];
    }

    if (profile.role === 'teacher') {
      return [
        { icon: Home, label: 'Dashboard', href: '/dashboard/teacher' },
        { icon: BookOpen, label: 'My Subjects', href: '/dashboard/teacher#subjects' },
        { icon: Users, label: 'My Students', href: '/dashboard/teacher#students' },
        { icon: BarChart3, label: 'Grades', href: '/dashboard/teacher#grades' },
      ];
    }

    return [
      { icon: Home, label: 'Dashboard', href: '/dashboard/student' },
      { icon: BookOpen, label: 'My Subjects', href: '/dashboard/student#subjects' },
      { icon: BarChart3, label: 'Grades', href: '/dashboard/student#grades' },
      { icon: Users, label: 'Timetable', href: '/dashboard/student#timetable' },
    ];
  };

  const menuItems = getRoleMenuItems();
  const isActive = (href: string) => pathname === href || pathname.startsWith(href);

  return (
    <aside
      className={`${
        isOpen ? 'w-64' : 'w-20'
      } bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 flex flex-col`}
    >
      {/* Logo */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-sava-primary to-sava-secondary rounded-full flex items-center justify-center">
            <span className="text-white font-bold">S</span>
          </div>
          {isOpen && <span className="font-bold text-sava-primary dark:text-white">SAVA</span>}
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        {isOpen && (
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{profile.full_name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{profile.role}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive(item.href)
                  ? 'bg-sava-primary text-white'
                  : 'text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              title={item.label}
            >
              <Icon className="w-5 h-5" />
              {isOpen && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
          {isOpen && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
