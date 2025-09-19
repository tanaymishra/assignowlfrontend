"use client";
import React from 'react';
import { SignInButton } from '../ui/signin-button';
import { Button } from '../ui/button';
import { useLogin } from '../providers/LoginProvider';

export const LoginExample: React.FC = () => {
  const { isLoginOpen, openLogin, closeLogin } = useLogin();

  return (
    <div className="p-6 bg-card border border-border rounded-lg max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-4">Login Demo</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Click the button below to open the login drawer:
      </p>
      
      <div className="space-y-3">
        {/* Default Sign In Button */}
        <SignInButton />
        
        {/* Custom Sign In Button */}
        <SignInButton variant="outline" size="sm">
          Custom Sign In
        </SignInButton>
        
        {/* Manual control */}
        <div className="flex gap-2">
          <Button onClick={openLogin} variant="secondary" size="sm">
            Open Login
          </Button>
          <Button onClick={closeLogin} variant="ghost" size="sm">
            Close Login
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground">
          Login drawer is currently: {isLoginOpen ? 'Open' : 'Closed'}
        </p>
      </div>
    </div>
  );
};