export async function fetchReverseGeocode(latitude: number, longitude: number): Promise<string> {
  // Validate that coordinates are valid numbers
  if (typeof latitude !== 'number' || typeof longitude !== 'number' || 
      isNaN(latitude) || isNaN(longitude) || 
      latitude === undefined || longitude === undefined) {
    console.warn('Invalid coordinates provided to fetchReverseGeocode:', { latitude, longitude });
    return '';
  }
  
  const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
  const data = await res.json();
  return data.display_name ?? '';
} 