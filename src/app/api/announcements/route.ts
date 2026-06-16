import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { title, content, departmentId, targetRole, priority } = await req.json();
    const userId = req.headers.get('user-id');

    const { data, error } = await supabase
      .from('announcements')
      .insert([
        {
          title,
          content,
          created_by: userId,
          department_id: departmentId,
          target_role: targetRole,
          priority: priority || 'medium',
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
    const role = req.nextUrl.searchParams.get('role');
    const departmentId = req.nextUrl.searchParams.get('departmentId');

    let query = supabase
      .from('announcements')
      .select('*, profiles(full_name, avatar_url)')
      .order('is_pinned', { ascending: false })
      .order('created_at', { ascending: false });

    if (role) {
      query = query.or(`target_role.eq.${role},target_role.eq.all`);
    }

    if (departmentId) {
      query = query.or(`department_id.eq.${departmentId},department_id.is.null`);
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
