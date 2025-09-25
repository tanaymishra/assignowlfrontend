"use client";

import React, { createContext, useContext, useEffect, useRef } from 'react';
import { useAuth } from '@/lib/store';
import { useSocket } from './socket';

// Socket Provider Context (optional, for additional context if needed)
interface SocketContextType {
  isReady: boolean;
}

const SocketContext = createContext<SocketContextType>({
  isReady: false,
});

interface SocketProviderProps {
  children: React.ReactNode;
}

export function SocketProvider({ children }: SocketProviderProps) {
  const { isAuthenticated, isHydrated } = useAuth();
  const { socket, isConnected, isConnecting, connect, disconnect, error } = useSocket();
  const hasInitialized = useRef(false);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize socket connection when user is authenticated
  useEffect(() => {
    // Wait for hydration to complete before initializing socket
    if (!isHydrated) {
      return;
    }

    if (isAuthenticated && !hasInitialized.current) {
      console.log('🚀 User authenticated, initializing socket connection');
      hasInitialized.current = true;
      connect();
    } else if (!isAuthenticated && hasInitialized.current) {
      console.log('🔒 User not authenticated, disconnecting socket');
      hasInitialized.current = false;
      disconnect();
    }

    return () => {
      // Cleanup on unmount
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [isAuthenticated, isHydrated, connect, disconnect]);

  // Handle connection errors with retry logic
  useEffect(() => {
    if (error && isAuthenticated && isHydrated) {
      console.log('🔄 Socket error detected, attempting reconnection in 5 seconds');
      
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }

      reconnectTimeoutRef.current = setTimeout(() => {
        if (isAuthenticated && !isConnected && !isConnecting) {
          console.log('🔄 Attempting to reconnect socket');
          connect();
        }
      }, 5000); // Retry after 5 seconds
    }

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [error, isAuthenticated, isHydrated, isConnected, isConnecting, connect]);

  // Cleanup on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (socket) {
        socket.disconnect();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  // Debug logging
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🔌 Socket Status:', {
        isAuthenticated,
        isHydrated,
        isConnected,
        isConnecting,
        hasSocket: !!socket,
        error,
      });
    }
  }, [isAuthenticated, isHydrated, isConnected, isConnecting, socket, error]);

  const contextValue: SocketContextType = {
    isReady: isAuthenticated && isConnected,
  };

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
}

// Hook to use socket context (optional)
export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocketContext must be used within a SocketProvider');
  }
  return context;
};

// Export for easier imports
export default SocketProvider;