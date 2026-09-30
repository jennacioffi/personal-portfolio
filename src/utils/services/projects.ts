import type { Project } from '@types';
import { supabase } from './supabase.ts';

export async function fetchProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select(
      'id, name, description, start_date, end_date, career_id, link, skills'
    );

  if (error) {
    throw error;
  }

  return data as Project[];
}
