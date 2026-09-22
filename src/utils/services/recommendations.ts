import type { Recommendation, RecommendationRow } from '@types';
import { supabase } from './supabase.ts';

export async function fetchRecommendations() {
  const { data, error } = await supabase
    .from('recommendations')
    .select(
      'name, title, company, company_socials_url, contact_url, quote, original_data'
    );

  if (error) {
    throw error;
  }

  return Object.fromEntries(
    (data as RecommendationRow[]).map((row) => [
      row.name,
      {
        title: row.title,
        company: row.company,
        CompanySocialsURL: row.company_socials_url,
        contactURL: row.contact_url,
        quote: row.quote,
        originalData: row.original_data,
      },
    ])
  ) as Record<string, Recommendation>;
}
