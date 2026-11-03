import type { Career } from '@types';
import careerData from '../../data/careers.json';
import { parseJson } from './parseJson.ts';

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === 'string')
  );
}

export async function fetchCareers(): Promise<Career[]> {
  return careerData.map((career) => ({
    ...career,
    skills: parseJson(
      career.skills,
      `careers[${career.id}].skills`,
      isStringArray
    ),
  }));
}
