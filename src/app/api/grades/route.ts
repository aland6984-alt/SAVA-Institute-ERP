import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { studentId, subjectId, examId, score, examType } = await req.json();

    const { data, error } = await supabase
      .from('grades')
      .insert([
        {
          student_id: studentId,
          subject_id: subjectId,
          exam_id: examId,
          score,
          exam_type: examType,
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

    let query = supabase
      .from('grades')
      .select('*, subjects(name, code), exams(type, exam_date)');

    if (studentId) {
      query = query.eq('student_id', studentId);
    }

    if (subjectId) {
      query = query.eq('subject_id', subjectId);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { gradeId, score } = await req.json();

    const { data, error } = await supabase
      .from('grades')
      .update({ score })
      .eq('id', gradeId)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
