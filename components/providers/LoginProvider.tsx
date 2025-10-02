"use client";
import React, { createContext, useContext, useState, ReactNode, useRef } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Drawer from '../custom-Components/drawer/Drawer';
import { LoginFormCore } from '../auth/loginCore';
import { SignupFormCore } from '../auth/signUpCore';
import { customToast } from '../ui/custom-toast';
import './auth-transitions.css';

type AuthStep = 'login' | 'signup';

interface LoginContextType {
  isLoginOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
  switchToSignup: () => void;
  switchToLogin: () => void;
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
  const [currentStep, setCurrentStep] = useState<AuthStep>('login');
  const nodeRef = useRef(null);

  const openLogin = () => {
    setCurrentStep('login');
    setIsLoginOpen(true);
  };

  const closeLogin = () => {
    setIsLoginOpen(false);
    // Reset to login after closing
    setTimeout(() => {
      setCurrentStep('login');
    }, 300);
  };

  const switchToSignup = () => {
    setCurrentStep('signup');
  };

  const switchToLogin = () => {
    setCurrentStep('login');
  };

  const handleSignupSuccess = (email: string, data: any) => {
    // Signup success is now handled within SignupFormCore
    // No need to switch to OTP step
  };

  const handleLoginSuccess = () => {
    closeLogin();
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'login':
        return (
          <LoginFormCore 
            onSwitchToSignup={switchToSignup}
            onLoginSuccess={handleLoginSuccess}
          />
        );
      case 'signup':
        return (
          <SignupFormCore 
            onSwitchToLogin={switchToLogin}
            onSignupSuccess={handleSignupSuccess}
          />
        );
      default:
        return <LoginFormCore onSwitchToSignup={switchToSignup} />;
    }
  };

  return (
    <LoginContext.Provider value={{ 
      isLoginOpen, 
      openLogin, 
      closeLogin, 
      switchToSignup, 
      switchToLogin 
    }}>
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
          <SwitchTransition mode="out-in">
            <CSSTransition
              key={currentStep}
              timeout={300}
              classNames="auth-step"
              nodeRef={nodeRef}
            >
              <div ref={nodeRef} className="auth-step-container">
                {renderCurrentStep()}
              </div>
            </CSSTransition>
          </SwitchTransition>
        </div>
      </Drawer>


    </LoginContext.Provider>
  );
};