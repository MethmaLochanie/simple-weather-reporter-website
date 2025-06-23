import { Response } from 'express';
import { getUserProfile, updateUserLocation, getUserSearchHistory, addUserSearchHistory } from '../services/userService';
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
    if (latitude < -90 || latitude > 90) {
      res.status(400).json({ error: 'Latitude must be between -90 and 90' });
      return;
    }
    if (longitude < -180 || longitude > 180) {
      res.status(400).json({ error: 'Longitude must be between -180 and 180' });
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

// Get user search history for a city
export const getSearchHistory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { city } = req.query;
    if (!userId) {
      res.status(401).json({ error: 'User not authenticated' });
      return;
    }
    if (!city || typeof city !== 'string') {
      res.status(400).json({ error: 'City is required' });
      return;
    }
    const entry = await getUserSearchHistory(userId, city);
    if (entry) {
      res.json(entry);
    } else {
      res.status(404).json({ error: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to get search history' });
  }
};

// Add to user search history
export const addSearchHistory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { city, country, lat, lng } = req.body;
    if (!userId) {
      res.status(401).json({ error: 'User not authenticated' });
      return;
    }
    if (!city || !country || typeof lat !== 'number' || typeof lng !== 'number') {
      res.status(400).json({ error: 'city, country, lat, and lng are required' });
      return;
    }
    await addUserSearchHistory(userId, { city, country, lat, lng, searchedAt: new Date() });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add search history' });
  }
}; 