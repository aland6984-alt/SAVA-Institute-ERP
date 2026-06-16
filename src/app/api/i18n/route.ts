import { NextRequest, NextResponse } from 'next/server';

const translations = {
  en: {
    login: 'Login',
    email: 'Email',
    password: 'Password',
    submit: 'Submit',
    welcome: 'Welcome',
    dashboard: 'Dashboard',
    logout: 'Logout',
    grades: 'Grades',
    attendance: 'Attendance',
    payments: 'Payments',
    students: 'Students',
    teachers: 'Teachers',
    settings: 'Settings',
  },
  ku: {
    login: 'چوونەژوورەوە',
    email: 'ئیمەیل',
    password: 'وشەی تێپەڕبوون',
    submit: 'ناردن',
    welcome: 'بەخێربێیت',
    dashboard: 'دەسكەی کاری',
    logout: 'دەرچوون',
    grades: 'نمرەکان',
    attendance: 'بەشداری',
    payments: 'پارەدانەكان',
    students: 'قوتابیان',
    teachers: 'مامۆستایان',
    settings: 'ڕێكخستنەکان',
  },
  ar: {
    login: 'تسجيل الدخول',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    submit: 'إرسال',
    welcome: 'أهلا وسهلا',
    dashboard: 'لوحة التحكم',
    logout: 'تسجيل الخروج',
    grades: 'الدرجات',
    attendance: 'الحضور',
    payments: 'المدفوعات',
    students: 'الطلاب',
    teachers: 'المعلمون',
    settings: 'الإعدادات',
  },
};

export async function GET(req: NextRequest) {
  try {
    const lang = (req.nextUrl.searchParams.get('lang') || 'en') as keyof typeof translations;

    const messages = translations[lang] || translations.en;

    return NextResponse.json({ messages }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
