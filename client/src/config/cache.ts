/* eslint-disable @typescript-eslint/no-explicit-any */
type CacheEntry = {
  data: any;
  expiresAt: number;
};

export const cache = new Map<string, CacheEntry>();
export const CACHE_TTL = 1000 * 60 * 5; // 5 minutes
