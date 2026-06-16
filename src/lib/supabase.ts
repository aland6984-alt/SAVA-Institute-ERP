import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase credentials. Please set environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const uploadProfileImage = async (
  file: File,
  userId: string,
  role: string
): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${role}/${userId}/${Date.now()}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('profiles')
      .upload(fileName, file, { upsert: true });

    if (error) {
      console.error('Upload error:', error);
      return null;
    }

    const { data: urlData } = supabase.storage
      .from('profiles')
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  } catch (error) {
    console.error('Error uploading profile image:', error);
    return null;
  }
};

export const deleteProfileImage = async (path: string): Promise<boolean> => {
  try {
    const { error } = await supabase.storage
      .from('profiles')
      .remove([path]);

    return !error;
  } catch (error) {
    console.error('Error deleting profile image:', error);
    return false;
  }
};
