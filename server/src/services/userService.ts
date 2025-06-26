import { User, IUser } from '../models/User';

// Cache for user profiles
const userCache = new Map<string, { data: IUser; expires: number }>();
const CACHE_TTL_MS = 1000 * 60 * 10; // 10 minutes cache

// Get user profile with caching
export const getUserProfile = async (userId: string): Promise<{ success: boolean; user?: IUser; error?: string }> => {
  try {
    const now = Date.now();
    const cacheKey = `profile_${userId}`;
    
    // Check cache first
    const cached = userCache.get(cacheKey);
    if (cached && cached.expires > now) {
      return { success: true, user: cached.data };
    }

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return { success: false, error: 'User not found' };
    }

    // Cache the result
    userCache.set(cacheKey, {
      data: user,
      expires: now + CACHE_TTL_MS
    });

    return { success: true, user };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return { success: false, error: 'Failed to fetch user profile' };
  }
};

// Update user location with cache invalidation
export const updateUserLocation = async (userId: string, latitude: number, longitude: number): Promise<{ success: boolean; error?: string }> => {
  try {
    const result = await User.findByIdAndUpdate(
      userId,
      {
        location: {
          latitude,
          longitude,
          lastLocationUpdate: new Date().toISOString()
        }
      },
      { new: true }
    );

    if (!result) {
      return { success: false, error: 'User not found' };
    }

    // Invalidate user cache
    const cacheKey = `profile_${userId}`;
    userCache.delete(cacheKey);

    return { success: true };
  } catch (error) {
    console.error('Error updating user location:', error);
    return { success: false, error: 'Failed to update location' };
  }
}; 