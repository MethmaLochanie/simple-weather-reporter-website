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

// Helper to generate verification token, save, and send email
async function setVerificationTokenAndSendEmail(user: typeof User.prototype, frontendUrl: string) {
  const verificationToken = crypto.randomBytes(32).toString('hex');
  user.verificationToken = verificationToken;
  await user.save();
  const verificationLink = `${frontendUrl}/verify?token=${verificationToken}`;
  await sendVerificationEmail(user.email, verificationLink);
}

// Register new user
export const registerUser = async (username: string, email: string, password: string): Promise<AuthResult> => {
  try {
    // Check username first
    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return { success: false, error: 'This username is already taken.' };
    }

    // Then check email
    const existingUserByEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingUserByEmail) {
      if (!existingUserByEmail.isVerified) {
        return { success: false, error: 'This email is registered but not yet verified.' };
      }
      return { success: false, error: 'This email is already registered.' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      isVerified: false
    });
    await setVerificationTokenAndSendEmail(user, process.env.FRONTEND_URL!);
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

// Resend verification email
export const resendVerificationEmail = async (email: string): Promise<AuthResult> => {
  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return { success: false, error: 'No account found with this email address.' };
    }

    if (user.isVerified) {
      return { success: false, error: 'This email is already verified. You can log in.' };
    }

    // Rate limit: only allow resending every 5 minutes
    const MINUTES_BETWEEN_RESENDS = 5;
    const now = new Date();
    if (user.lastVerificationEmailSentAt) {
      const diffMs = now.getTime() - user.lastVerificationEmailSentAt.getTime();
      const diffMinutes = diffMs / (1000 * 60);
      if (diffMinutes < MINUTES_BETWEEN_RESENDS) {
        return {
          success: false,
          error: `You can only resend a verification email every ${MINUTES_BETWEEN_RESENDS} minutes. Please try again later.`
        };
      }
    }

    user.lastVerificationEmailSentAt = now;
    await setVerificationTokenAndSendEmail(user, process.env.FRONTEND_URL!);

    return { 
      success: true, 
      message: 'Verification email has been resent. Please check your inbox.' 
    };
  } catch (error: any) {
    console.error('AuthService resendVerificationEmail error:', error);
    throw error;
  }
}; 