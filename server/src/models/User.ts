import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  verificationToken?: string;
  createdAt: Date;
  updatedAt: Date;
  location?: {
    latitude: number;
    longitude: number;
    lastLocationUpdate: Date;
  };
  lastVerificationEmailSentAt?: Date;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: {
    type: String
  },
  location: {
    latitude: { type: Number },
    longitude: { type: Number },
    lastLocationUpdate: { type: Date }
  },
  lastVerificationEmailSentAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Create index only for verificationToken since email and username already have unique indexes
userSchema.index({ verificationToken: 1 });

export const User = mongoose.model<IUser>('User', userSchema); 