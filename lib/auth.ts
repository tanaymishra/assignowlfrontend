// Authentication API functions
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

if (!BASE_URL) {
  throw new Error('NEXT_PUBLIC_BASE_URL environment variable is not set');
}

// Types for API requests and responses
export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface GoogleSignupRequest {
  googleToken: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: string;
}

export interface LoginResponse {
  message: string;
  user: User;
  timestamp: string;
}

export interface SignupResponse {
  message: string;
  user: User;
  requiresVerification: boolean;
  timestamp: string;
}

export interface ErrorResponse {
  error: string;
  message: string;
  timestamp: string;
}

// Custom error class for API errors
export class AuthError extends Error {
  constructor(
    message: string,
    public status: number,
    public error?: string,
    public timestamp?: string
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include', // This is crucial for httpOnly cookies
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      const errorData = data as ErrorResponse;
      throw new AuthError(
        errorData.message || 'An error occurred',
        response.status,
        errorData.error,
        errorData.timestamp
      );
    }

    return data as T;
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }
    
    // Handle network errors or other issues
    throw new AuthError(
      'Network error. Please check your connection and try again.',
      0
    );
  }
}

// Login function
export async function loginUser(credentials: LoginRequest): Promise<LoginResponse> {
  return apiRequest<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

// Signup function
export async function signupUser(userData: SignupRequest): Promise<SignupResponse> {
  return apiRequest<SignupResponse>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
}

// Google signup function
export async function signupWithGoogle(googleToken: string): Promise<SignupResponse> {
  return apiRequest<SignupResponse>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ googleToken }),
  });
}

// Verify email function (for future use)
export async function verifyEmail(token: string): Promise<{ message: string }> {
  return apiRequest<{ message: string }>(`/auth/verify-email?token=${token}`, {
    method: 'GET',
  });
}

// Resend verification email function (for future use)
export async function resendVerificationEmail(email: string): Promise<{ message: string }> {
  return apiRequest<{ message: string }>('/auth/resend-verification', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

// Logout function (for future use)
export async function logoutUser(): Promise<{ message: string }> {
  return apiRequest<{ message: string }>('/auth/logout', {
    method: 'POST',
  });
}

// Get current user function (works with httpOnly cookies)
export async function getCurrentUser(): Promise<User> {
  return apiRequest<User>('/auth/me', {
    method: 'GET',
  });
}

// Check if user is authenticated (test the httpOnly cookie)
export async function checkAuthStatus(): Promise<boolean> {
  try {
    await getCurrentUser();
    return true;
  } catch (error) {
    return false;
  }
}