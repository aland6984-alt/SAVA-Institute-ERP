import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { studentId, amount, paymentMethod, remarks } = await req.json();

    const { data, error } = await supabase
      .from('payments')
      .insert([
        {
          student_id: studentId,
          amount,
          paid_amount: amount,
          status: 'paid',
          payment_method: paymentMethod,
          payment_date: new Date().toISOString(),
          remarks,
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
    const status = req.nextUrl.searchParams.get('status');

    let query = supabase.from('payments').select('*');

    if (studentId) {
      query = query.eq('student_id', studentId);
    }

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
