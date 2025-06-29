import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { sendVerificationEmail } from './emailService';

export interface AuthResult {
  success: boolean;
  message?: string;
  error?: string;
  token?: string;
  user?: any;
}

// Register new user
export const registerUser = async (username: string, email: string, password: string): Promise<AuthResult> => {
  try {
    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username }]
    });

    if (existingUser) {
      if (existingUser.email === email.toLowerCase()) {
        return { success: false, error: 'This email is already registered.' };
      }
      if (existingUser.username === username) {
        return { success: false, error: 'This username is already taken.' };
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');

    const user = new User({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      verificationToken,
      isVerified: false
    });
    await user.save();
    const verificationLink = `${process.env.FRONTEND_URL}/verify?token=${verificationToken}`;
    
    await sendVerificationEmail(user.email, verificationLink);

    return { 
      success: true, 
      message: 'User registered. Please check your email to verify your account.' 
    };
  } catch (error: any) {
    console.error('AuthService registerUser error:', error);
    throw error;
  }
};

// Verify email with token
export const verifyEmail = async (token: string): Promise<AuthResult> => {
  try {
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return { success: false, error: 'Invalid or expired verification token. Please try registering again.' };
    }

    if (user.isVerified) {
      return { success: true, message: 'Your email has already been verified. You can now log in.' };
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    return { success: true, message: 'Email verified successfully! You can now log in.' };
  } catch (error) {
    throw new Error('An unexpected error occurred during email verification.');
  }
};

// Login user
export const loginUser = async (email: string, password: string): Promise<AuthResult> => {
  try {
    const user = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { username: email }
      ]
    });

    if (!user) {
      return { success: false, error: 'Invalid credentials' };
    }

    if (!user.isVerified) {
      return { success: false, error: 'Please verify your email before logging in.' };
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return { success: false, error: 'Invalid credentials' };
    }

    const token = jwt.sign(
      { userId: user._id.toString(), username: user.username },
      process.env.JWT_SECRET as string,
      { expiresIn: '24h' }
    );

    return {
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id.toString(),
        username: user.username,
        email: user.email
      }
    };
  } catch (error) {
    console.error('AuthService loginUser error:', error);
    throw error;
  }
};

// Generate JWT token
export const generateToken = (userId: string, username: string): string => {
  return jwt.sign(
    { userId, username },
    process.env.JWT_SECRET as string,
    { expiresIn: '24h' }
  );
};

// Verify JWT token
export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (error) {
    return null;
  }
}; 