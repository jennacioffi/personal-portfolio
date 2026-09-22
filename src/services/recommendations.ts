import type { Recommendation } from '@components';
import { supabase } from './supabase.ts';

type RecommendationRow = {
  name: string;
  title: string;
  company: string;
  company_socials_url: string;
  contact_url: string;
  quote: string;
  original_data: string[];
};

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
