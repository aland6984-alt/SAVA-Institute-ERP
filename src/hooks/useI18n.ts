'use client';

import { create } from 'zustand';

type Language = 'en' | 'ku' | 'ar';

interface I18nStore {
  language: Language;
  translations: Record<string, string>;
  setLanguage: (lang: Language) => void;
  loadTranslations: (lang: Language) => Promise<void>;
}

export const useI18n = create<I18nStore>((set) => ({
  language: 'en',
  translations: {},
  setLanguage: (lang: Language) => set({ language: lang }),
  loadTranslations: async (lang: Language) => {
    try {
      const response = await fetch(`/api/i18n?lang=${lang}`);
      const data = await response.json();
      set({ language: lang, translations: data.messages });
    } catch (error) {
      console.error('Error loading translations:', error);
    }
  },
}));

export const t = (key: string): string => {
  const store = useI18n();
  return store.translations[key] || key;
};
