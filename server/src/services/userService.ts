import { User } from '../models/User';
import { AuthResult } from './authService';

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