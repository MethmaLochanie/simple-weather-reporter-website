import { User } from '../models/User';
import { AuthResult } from './authService';
import { SearchHistory, ISearchEntry } from '../models/SearchHistory';

interface UserResult {
  success: boolean;
  message?: string;
  error?: string;
}

// Get user profile
export const getUserProfile = async (userId: string): Promise<AuthResult> => {
  try {
    const user = await User.findById(userId).select({
      _id: 1,
      username: 1,
      email: 1,
      isVerified: 1,
      location: 1
    });

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    return {
      success: true,
      user: {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
        location: user.location
      }
    };
  } catch (error) {
    console.error('AuthService getUserProfile error:', error);
    throw error;
  }
};

export const updateUserLocation = async (userId: string, latitude: number, longitude: number): Promise<UserResult> => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return { success: false, error: 'User not found' };
    }
    user.location = {
      latitude,
      longitude,
      lastLocationUpdate: new Date()
    };
    await user.save();
    return { success: true, message: 'Location updated successfully' };
  } catch (error) {
    console.error('UserService updateUserLocation error:', error);
    return { success: false, error: 'Failed to update location' };
  }
};

// Get a user's search history entry for a city
export const getUserSearchHistory = async (userId: string, city: string): Promise<ISearchEntry | null> => {
  const history = await SearchHistory.findOne({ userId });
  if (!history) return null;
  return history.searches.find(s => s.city.toLowerCase() === city.toLowerCase()) || null;
};

// Add a new search entry to user's history if not already present
export const addUserSearchHistory = async (userId: string, entry: ISearchEntry): Promise<void> => {
  let history = await SearchHistory.findOne({ userId });
  if (!history) {
    history = new SearchHistory({ userId, searches: [] });
  }
  const exists = history.searches.some(s =>
    s.city.toLowerCase() === entry.city.toLowerCase() &&
    s.country.toLowerCase() === entry.country.toLowerCase()
  );
  if (!exists) {
    history.searches.push(entry);
    await history.save();
  }
}; 