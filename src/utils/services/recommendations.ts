import type { Recommendation } from '@types';
import recommendationData from '../../data/recommendations.json';
import { parseJson } from './parseJson.ts';

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === 'string')
  );
}

export async function fetchRecommendations(): Promise<
  Record<string, Recommendation>
> {
  return Object.fromEntries(
    recommendationData.map((row) => [
      row.name,
      {
        id: row.id,
        title: row.title,
        company: row.company,
        CompanySocialsURL: row.company_socials_url,
        contactURL: row.contact_url,
        quote: row.quote,
        originalData: parseJson(
          row.original_data,
          `recommendations[${row.id}].original_data`,
          isStringArray
        ),
      },
    ])
  );
}
