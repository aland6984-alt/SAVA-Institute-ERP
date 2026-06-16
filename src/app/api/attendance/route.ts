import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { userId, subjectId, status, remarks } = await req.json();

    const { data, error } = await supabase
      .from('attendance')
      .insert([
        {
          student_id: userId,
          subject_id: subjectId,
          date: new Date().toISOString().split('T')[0],
          status: status || 'present',
          remarks: remarks || null,
        },
      ])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const studentId = req.nextUrl.searchParams.get('studentId');
    const subjectId = req.nextUrl.searchParams.get('subjectId');

    let query = supabase.from('attendance').select('*');

    if (studentId) {
      query = query.eq('student_id', studentId);
    }

    if (subjectId) {
      query = query.eq('subject_id', subjectId);
    }

    const { data, error } = await query.order('date', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
