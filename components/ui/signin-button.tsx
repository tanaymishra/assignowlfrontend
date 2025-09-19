"use client";
import React from 'react';
import { Button } from './button';
import { useLogin } from '../providers/LoginProvider';
import { LogIn } from 'lucide-react';

interface SignInButtonProps {
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  children?: React.ReactNode;
}

export const SignInButton: React.FC<SignInButtonProps> = ({
  variant = 'default',
  size = 'default',
  className,
  children
}) => {
  const { openLogin } = useLogin();

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={openLogin}
    >
      {children || (
        <>
          <LogIn className="w-4 h-4 mr-2" />
          Sign In
        </>
      )}
    </Button>
  );
};