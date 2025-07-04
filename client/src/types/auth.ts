export interface User {
  id: string;
  username: string;
  email: string;
  isVerified: boolean;
  createdAt?: string;
  updatedAt?: string;
  location?: {
    latitude: number;
    longitude: number;
    lastLocationUpdate: string;
  };
}

export interface AuthFormData {
  username?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  remember?: boolean;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

export interface RegisterResponse {
  message: string;
}

export interface AuthError {
  error: string;
  message?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  verifyEmail: (token: string) => Promise<{ message: string }>;
  resendVerification: (email: string) => Promise<{ message: string }>;
  setUser: (user: User | null) => void;
} 
