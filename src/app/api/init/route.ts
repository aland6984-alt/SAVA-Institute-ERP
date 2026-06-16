import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    // Add 9 departments
    const departments = [
      {
        name: 'Nursing',
        code: 'NUR',
        description: 'Bachelor of Science in Nursing',
        theme_color: '#FF6B9D',
      },
      {
        name: 'Pharmacy',
        code: 'PHARM',
        description: 'Bachelor of Science in Pharmacy',
        theme_color: '#00C9A7',
      },
      {
        name: 'Medical Laboratory Technology',
        code: 'MLT',
        description: 'Diploma in Medical Laboratory Technology',
        theme_color: '#845EC2',
      },
      {
        name: 'Dental Technology',
        code: 'DENT',
        description: 'Diploma in Dental Technology',
        theme_color: '#0094D8',
      },
      {
        name: 'Aesthetic Clinic',
        code: 'AEST',
        description: 'Aesthetic and Cosmetology Studies',
        theme_color: '#FF9671',
      },
      {
        name: 'English',
        code: 'ENG',
        description: 'English Language Studies',
        theme_color: '#FFB347',
      },
      {
        name: 'Hospital Administration',
        code: 'ADMIN',
        description: 'Health Administration Program',
        theme_color: '#8E7CC3',
      },
      {
        name: 'Marketing',
        code: 'MKT',
        description: 'Marketing Management',
        theme_color: '#C4C4FF',
      },
      {
        name: 'Network Services',
        code: 'NET',
        description: 'IT Network Services',
        theme_color: '#00D9FF',
      },
    ];

    const { error: deptError } = await supabase
      .from('departments')
      .insert(departments);

    if (deptError && !deptError.message.includes('duplicate')) {
      return NextResponse.json({ error: deptError.message }, { status: 400 });
    }

    // Get departments to link to test users
    const { data: depts } = await supabase.from('departments').select('id');
    const nursing = depts?.[0]?.id;

    return NextResponse.json(
      {
        message: 'Sample data initialized',
        departments_created: 9,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
