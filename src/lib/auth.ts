import { supabase } from './supabase';
import { Profile, UserRole } from '@/types';

export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  return { data, error };
};

export const getUserProfile = async (userId: string): Promise<Profile | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

export const authenticateByCustomId = async (customId: string, password: string) => {
  try {
    // First, get the email associated with this custom_id
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('email')
      .eq('custom_id', customId)
      .single();

    if (profileError || !profileData) {
      return { data: null, error: 'User not found' };
    }

    // Then authenticate with email and password
    return signIn(profileData.email, password);
  } catch (error) {
    return { data: null, error: 'Authentication failed' };
  }
};

export const getUserRole = async (userId: string): Promise<UserRole | null> => {
  const profile = await getUserProfile(userId);
  return profile?.role || null;
};
