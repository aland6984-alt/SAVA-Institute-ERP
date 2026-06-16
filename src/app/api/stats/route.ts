import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  try {
    const { data: students, error: studentsError } = await supabase
      .from('students')
      .select('id, full_name, custom_id, email');

    if (studentsError) {
      return NextResponse.json({ error: studentsError.message }, { status: 400 });
    }

    const { data: teachers, error: teachersError } = await supabase
      .from('teachers')
      .select('id, full_name, custom_id, email');

    if (teachersError) {
      return NextResponse.json({ error: teachersError.message }, { status: 400 });
    }

    const totalStudents = students?.length || 0;
    const totalTeachers = teachers?.length || 0;

    return NextResponse.json(
      {
        stats: {
          total_students: totalStudents,
          total_teachers: totalTeachers,
          total_users: totalStudents + totalTeachers,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
