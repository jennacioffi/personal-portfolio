import type { Career } from '@types';
import { supabase } from './supabase.ts';

export async function fetchCareers() {
  const { data, error } = await supabase
    .from('careers')
    .select('id,company,title,start_date,end_date,description,link,skills');

  if (error) {
    throw error;
  }

  return data as Career[];
}
