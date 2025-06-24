export async function fetchReverseGeocode(lat: number, lon: number): Promise<string> {
  const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
  const data = await res.json();
  return data.display_name ?? '';
} 