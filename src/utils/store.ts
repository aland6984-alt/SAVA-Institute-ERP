'use client';

import { create } from 'zustand';
import { Profile, UserRole } from '@/types';

interface AuthStore {
  user: any | null;
  profile: Profile | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  setUser: (user: any) => void;
  setProfile: (profile: Profile) => void;
  setRole: (role: UserRole) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  profile: null,
  role: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setProfile: (profile) => set({ profile }),
  setRole: (role) => set({ role }),
  logout: () => set({ user: null, profile: null, role: null, isAuthenticated: false }),
}));

interface ThemeStore {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: 'light',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  setTheme: (theme) => set({ theme }),
}));
