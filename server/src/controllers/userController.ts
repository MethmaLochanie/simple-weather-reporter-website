import { Response } from 'express';
import { getUserProfile, updateUserLocation } from '../services/userService';
import { AuthRequest } from '../middleware/auth';

// Get user profile
export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'User not authenticated' });
      return;
    }

    const result = await getUserProfile(userId);
    
    if (result.success) {
      res.json(result.user);
    } else {
      res.status(404).json({ error: result.error });
    }
  } catch (error) {
    console.error('Profile controller error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
}; 

export const updateLocation = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { latitude, longitude } = req.body;
    if (!userId) {
      res.status(401).json({ error: 'User not authenticated' });
      return;
    }
    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
      res.status(400).json({ error: 'Invalid latitude or longitude' });
      return;
    }
    const result = await updateUserLocation(userId, latitude, longitude);
    if (result.success) {
      res.json({ message: result.message });
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    console.error('Update location controller error:', error);
    res.status(500).json({ error: 'Failed to update location' });
  }
}; 