import type { Profile } from '@types';
import { supabase } from './supabase.ts';

export async function fetchProfile() {
  const { data, error } = await supabase
    .from('profile')
    .select('bio, name, profile_image, socials, title')
    .single();

  if (error) {
    throw error;
  }

  return data as Profile;
}
