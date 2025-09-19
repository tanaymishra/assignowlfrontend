"use client";
import React, { createContext, useContext, useState, ReactNode, useRef } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Drawer from '../custom-Components/drawer/Drawer';
import { LoginFormCore } from '../auth/loginCore';
import { SignupFormCore } from '../auth/signUpCore';
import { OtpCore } from '../auth/otpCore';
import { customToast } from '../ui/custom-toast';
import './auth-transitions.css';

type AuthStep = 'login' | 'signup' | 'otp';

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
  const [userEmail, setUserEmail] = useState('');
  const [userData, setUserData] = useState<any>(null);
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
      setUserEmail('');
      setUserData(null);
    }, 300);
  };

  const switchToSignup = () => {
    setCurrentStep('signup');
  };

  const switchToLogin = () => {
    setCurrentStep('login');
  };

  const handleSignupSuccess = (email: string, data: any) => {
    setUserEmail(email);
    setUserData(data);
    setCurrentStep('otp');
  };

  const handleOtpVerify = (otp: string) => {
    // Handle successful verification
    customToast.success(`Welcome ${userData?.firstName}! Your account is ready.`);
    closeLogin();
  };

  const handleOtpBack = () => {
    setCurrentStep('signup');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'login':
        return <LoginFormCore onSwitchToSignup={switchToSignup} />;
      case 'signup':
        return (
          <SignupFormCore 
            onSwitchToLogin={switchToLogin}
            onSignupSuccess={handleSignupSuccess}
          />
        );
      case 'otp':
        return (
          <OtpCore 
            email={userEmail}
            onBack={handleOtpBack}
            onVerify={handleOtpVerify}
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