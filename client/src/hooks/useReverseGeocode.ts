// Cache for reverse geocoding results
const geocodeCache = new Map<string, { data: string; expires: number }>();
const geocodeInFlight = new Map<string, Promise<string>>();
const CACHE_TTL_MS = 1000 * 60 * 30; // 30 minutes cache

export async function fetchReverseGeocode(lat: number, lon: number): Promise<string> {
  // Create cache key from coordinates (rounded to 4 decimal places for reasonable grouping)
  const cacheKey = `${lat.toFixed(4)},${lon.toFixed(4)}`;
  const now = Date.now();

  // Check cache first
  const cached = geocodeCache.get(cacheKey);
  if (cached && cached.expires > now) {
    return cached.data;
  }

  // Check if a request is already in flight
  if (geocodeInFlight.has(cacheKey)) {
    return geocodeInFlight.get(cacheKey)!;
  }

  // Make the API call and store the promise
  const promise = fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
    .then(res => res.json())
    .then(data => {
      const result = data.display_name ?? '';
      geocodeCache.set(cacheKey, { data: result, expires: now + CACHE_TTL_MS });
      geocodeInFlight.delete(cacheKey);
      return result;
    })
    .catch(err => {
      geocodeInFlight.delete(cacheKey);
      throw err;
    });

  geocodeInFlight.set(cacheKey, promise);
  return promise;
} 