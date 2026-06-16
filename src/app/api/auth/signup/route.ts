import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { email, password, fullName, customId, role } = await req.json();

    // Sign up user
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      return NextResponse.json({ error: signUpError.message }, { status: 400 });
    }

    if (!authData.user) {
      return NextResponse.json({ error: 'User creation failed' }, { status: 400 });
    }

    // Create profile
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: authData.user.id,
          email,
          full_name: fullName,
          custom_id: customId,
          role: role || 'student',
        },
      ]);

    if (profileError) {
      return NextResponse.json({ error: profileError.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: 'User created successfully', user: authData.user },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
