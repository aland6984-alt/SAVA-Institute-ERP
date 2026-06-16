'use client';

import { useEffect, useState } from 'react';
import { Globe } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

export default function LanguageSelector() {
  const { language, setLanguage, loadTranslations } = useI18n();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLanguageChange = async (lang: 'en' | 'ku' | 'ar') => {
    await loadTranslations(lang);
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  if (!mounted) return null;

  return (
    <div className="flex items-center gap-2 p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
      <Globe className="w-4 h-4 text-white" />
      <select
        value={language}
        onChange={(e) => handleLanguageChange(e.target.value as 'en' | 'ku' | 'ar')}
        className="bg-transparent text-white text-sm focus:outline-none cursor-pointer"
      >
        <option value="en" className="bg-gray-800">English</option>
        <option value="ku" className="bg-gray-800">کوردی</option>
        <option value="ar" className="bg-gray-800">العربية</option>
      </select>
    </div>
  );
}
