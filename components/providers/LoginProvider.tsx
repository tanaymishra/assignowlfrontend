"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';
import Drawer from '../custom-Components/drawer/Drawer';
import { LoginFormCore } from '../auth/loginCore';

interface LoginContextType {
  isLoginOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const useLogin = () => {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error('useLogin must be used within a LoginProvider');
  }
  return context;
};

interface LoginProviderProps {
  children: ReactNode;
}

export const LoginProvider: React.FC<LoginProviderProps> = ({ children }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  return (
    <LoginContext.Provider value={{ isLoginOpen, openLogin, closeLogin }}>
      {children}
      <Drawer
        isOpen={isLoginOpen}
        onClose={closeLogin}
        width="400px"
        height="100%"
        position="right"
        className=""
      >
        <div className="p-4 h-full overflow-y-auto">
          <LoginFormCore />
        </div>
      </Drawer>
    </LoginContext.Provider>
  );
};