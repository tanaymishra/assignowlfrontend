import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';

// Socket state interface
interface SocketState {
  // State
  socket: Socket | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;

  // Actions
  connect: () => void;
  disconnect: () => void;
  clearError: () => void;
  setConnected: (connected: boolean) => void;
  setError: (error: string | null) => void;
}

// Get socket URL from environment variables
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;

if (!SOCKET_URL) {
  console.warn('NEXT_PUBLIC_SOCKET_URL environment variable is not set');
}

// Create the socket store
export const useSocketStore = create<SocketState>((set, get) => ({
  // Initial state
  socket: null,
  isConnected: false,
  isConnecting: false,
  error: null,

  // Connect action
  connect: () => {
    const { socket: currentSocket, isConnected, isConnecting } = get();
    
    // Prevent multiple connections
    if (isConnected || isConnecting || currentSocket) {
      console.log('Socket already connected or connecting');
      return;
    }

    if (!SOCKET_URL) {
      const errorMsg = 'Socket URL not configured';
      console.error(errorMsg);
      set({ error: errorMsg });
      return;
    }

    try {
      set({ isConnecting: true, error: null });
      console.log('🔌 Connecting to socket:', SOCKET_URL);

      const newSocket = io(SOCKET_URL, {
        withCredentials: true, // Include httpOnly cookies
        transports: ['websocket', 'polling'],
        autoConnect: true,
      });

      // Connection successful
      newSocket.on('connect', () => {
        console.log('✅ Socket connected successfully');
        set({ 
          socket: newSocket, 
          isConnected: true, 
          isConnecting: false, 
          error: null 
        });
      });

      // Connection error
      newSocket.on('connect_error', (error: Error) => {
        console.error('❌ Socket connection error:', error);
        set({ 
          isConnected: false, 
          isConnecting: false, 
          error: error.message || 'Connection failed' 
        });
      });

      // Disconnection
      newSocket.on('disconnect', (reason: string) => {
        console.log('🔌 Socket disconnected:', reason);
        set({ 
          isConnected: false, 
          error: reason === 'io server disconnect' ? 'Server disconnected' : null 
        });
      });

      // Reconnection attempt
      newSocket.on('reconnect_attempt', (attempt: number) => {
        console.log(`🔄 Socket reconnection attempt ${attempt}`);
        set({ isConnecting: true });
      });

      // Reconnection successful
      newSocket.on('reconnect', (attempt: number) => {
        console.log(`✅ Socket reconnected after ${attempt} attempts`);
        set({ 
          isConnected: true, 
          isConnecting: false, 
          error: null 
        });
      });

      // Reconnection failed
      newSocket.on('reconnect_failed', () => {
        console.error('❌ Socket reconnection failed');
        set({ 
          isConnecting: false, 
          error: 'Reconnection failed' 
        });
      });

      set({ socket: newSocket });

    } catch (error) {
      console.error('Socket initialization error:', error);
      set({ 
        isConnecting: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  },

  // Disconnect action
  disconnect: () => {
    const { socket } = get();
    
    if (socket) {
      console.log('🔌 Disconnecting socket');
      socket.disconnect();
      set({ 
        socket: null, 
        isConnected: false, 
        isConnecting: false,
        error: null 
      });
    }
  },

  // Clear error action
  clearError: () => {
    set({ error: null });
  },

  // Set connected status (for manual control if needed)
  setConnected: (connected: boolean) => {
    set({ isConnected: connected });
  },

  // Set error (for manual error handling if needed)
  setError: (error: string | null) => {
    set({ error });
  },
}));

// Enhanced useSocket hook
export const useSocket = () => {
  const store = useSocketStore();
  
  return {
    // Socket instance
    socket: store.socket,
    
    // Connection status
    isConnected: store.isConnected,
    isConnecting: store.isConnecting,
    
    // Error handling
    error: store.error,
    
    // Actions
    connect: store.connect,
    disconnect: store.disconnect,
    clearError: store.clearError,
  };
};

// Helper hook for socket actions only
export const useSocketActions = () => {
  const store = useSocketStore();
  return {
    connect: store.connect,
    disconnect: store.disconnect,
    clearError: store.clearError,
  };
};