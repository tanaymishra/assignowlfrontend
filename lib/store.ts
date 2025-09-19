import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { 
  loginUser, 
  signupUser, 
  type User, 
  type LoginRequest, 
  type SignupRequest,
  AuthError 
} from './auth';

// Auth state interface
interface AuthState {
  // State
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (credentials: LoginRequest) => Promise<void>;
  signup: (userData: SignupRequest) => Promise<{ requiresVerification: boolean }>;
  logout: () => void;
  clearError: () => void;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
}

// Create the auth store with persistence
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Login action
      login: async (credentials: LoginRequest) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await loginUser(credentials);
          
          set({
            user: response.user,
            token: response.token || null,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          const errorMessage = error instanceof AuthError 
            ? error.message 
            : 'Login failed. Please try again.';
          
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: errorMessage,
          });
          
          throw error; // Re-throw for component handling
        }
      },

      // Signup action
      signup: async (userData: SignupRequest) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await signupUser(userData);
          
          // For signup, we don't automatically log the user in
          // They need to verify their email first
          set({
            isLoading: false,
            error: null,
          });

          return { requiresVerification: response.requiresVerification };
        } catch (error) {
          const errorMessage = error instanceof AuthError 
            ? error.message 
            : 'Signup failed. Please try again.';
          
          set({
            isLoading: false,
            error: errorMessage,
          });
          
          throw error; // Re-throw for component handling
        }
      },

      // Logout action
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      },

      // Clear error action
      clearError: () => {
        set({ error: null });
      },

      // Set user action (for when user data is updated)
      setUser: (user: User) => {
        set({ user, isAuthenticated: true });
      },

      // Set token action (for when token is refreshed)
      setToken: (token: string) => {
        set({ token });
      },
    }),
    {
      name: 'auth-storage', // Storage key
      storage: createJSONStorage(() => localStorage), // Use localStorage
      partialize: (state) => ({
        // Only persist these fields
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Selector hooks for easier usage
export const useAuth = () => {
  const store = useAuthStore();
  return {
    user: store.user,
    token: store.token,
    isAuthenticated: store.isAuthenticated,
    isLoading: store.isLoading,
    error: store.error,
  };
};

export const useAuthActions = () => {
  const store = useAuthStore();
  return {
    login: store.login,
    signup: store.signup,
    logout: store.logout,
    clearError: store.clearError,
    setUser: store.setUser,
    setToken: store.setToken,
  };
};