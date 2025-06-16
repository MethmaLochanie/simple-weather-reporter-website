import { sanitizeCity } from '../utils/sanitize';

export const validateCity = (raw: string | undefined): { error?: string; cleaned?: string } => {
  if (!raw || raw.trim() === '') {
    return { error: 'Query parameter "city" is required' };
  }

  const cleaned = sanitizeCity(raw);

  if (cleaned.length < 2) {
    return { error: 'City name is too short or invalid' };
  }

  return { cleaned };
};
