import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { 
  loginUser, 
  signupUser,
  signupWithGoogle as signupWithGoogleAPI,
  type User, 
  type LoginRequest, 
  type SignupRequest,
  AuthError 
} from './auth';

// Auth state interface
interface AuthState {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  _hasHydrated: boolean;

  // Actions
  login: (credentials: LoginRequest) => Promise<void>;
  signup: (userData: SignupRequest) => Promise<{ requiresVerification: boolean }>;
  signupWithGoogle: (googleToken: string) => Promise<{ requiresVerification: boolean }>;
  logout: () => void;
  clearError: () => void;
  setUser: (user: User) => void;
  setHasHydrated: (hasHydrated: boolean) => void;
}

// Create the auth store with persistence
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      _hasHydrated: false,

      // Login action
      login: async (credentials: LoginRequest) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await loginUser(credentials);
          
          set({
            user: response.user,
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
          
          // Store the user data from signup response
          set({
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          return { requiresVerification: response.requiresVerification };
        } catch (error) {
          const errorMessage = error instanceof AuthError 
            ? error.message 
            : 'Signup failed. Please try again.';
          
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: errorMessage,
          });
          
          throw error; // Re-throw for component handling
        }
      },

      // Google Signup action
      signupWithGoogle: async (googleToken: string) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await signupWithGoogleAPI(googleToken);
          
          // Store the user data from signup response
          set({
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          return { requiresVerification: response.requiresVerification };
        } catch (error) {
          const errorMessage = error instanceof AuthError 
            ? error.message 
            : 'Google signup failed. Please try again.';
          
          set({
            user: null,
            isAuthenticated: false,
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

      // Set hydration status
      setHasHydrated: (hasHydrated: boolean) => {
        set({ _hasHydrated: hasHydrated });
      },
    }),
    {
      name: 'auth-storage', // Storage key
      storage: createJSONStorage(() => localStorage), // Use localStorage
      partialize: (state) => ({
        // Only persist these fields
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

// Enhanced useAuth hook with hydration checking
export const useAuth = () => {
  const store = useAuthStore();
  
  return {
    // User data
    user: store.user,
    isAuthenticated: store.isAuthenticated && store._hasHydrated,
    
    // Loading states
    isLoading: store.isLoading,
    isHydrated: store._hasHydrated,
    
    // Error handling
    error: store.error,
    
    // Actions
    login: store.login,
    signup: store.signup,
    signupWithGoogle: store.signupWithGoogle,
    logout: store.logout,
    clearError: store.clearError,
    setUser: store.setUser,
  };
};

// Separate actions hook (optional, for cleaner separation)
export const useAuthActions = () => {
  const store = useAuthStore();
  return {
    login: store.login,
    signup: store.signup,
    signupWithGoogle: store.signupWithGoogle,
    logout: store.logout,
    clearError: store.clearError,
    setUser: store.setUser,
  };
};