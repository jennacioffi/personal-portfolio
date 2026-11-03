import type { Profile } from '@types';
import profileData from '../../data/profile.json';
import { parseJson } from './parseJson.ts';

function isSocials(value: unknown): value is Profile['socials'] {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const socials = value as Record<string, unknown>;

  return (
    typeof socials.github === 'string' && typeof socials.linkedin === 'string'
  );
}

export async function fetchProfile(): Promise<Profile> {
  return {
    ...profileData[0],
    profile_image: `${import.meta.env.BASE_URL}${profileData[0].profile_image.replace(/^\/+/, '')}`,
    socials: parseJson(profileData[0].socials, 'profile.socials', isSocials),
  };
}
