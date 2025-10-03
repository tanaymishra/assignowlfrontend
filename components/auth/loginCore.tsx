"use client";
import React, { useState, useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGoogle } from "@tabler/icons-react";
import { useAuth } from "@/lib/store";
import { customToast } from "../ui/custom-toast";
import { AuthError } from "@/lib/auth";

// Declare Google types
declare global {
  interface Window {
    google: any;
  }
}

interface LoginFormCoreProps {
  onSwitchToSignup?: () => void;
  onLoginSuccess?: () => void;
}

export function LoginFormCore({ onSwitchToSignup, onLoginSuccess }: LoginFormCoreProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const { login, loginWithGoogle, isLoading } = useAuth();

  // Load Google Sign-In script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      customToast.error("Please fill in all fields");
      return;
    }

    try {
      await login({
        email: formData.email,
        password: formData.password,
      });
      
      customToast.success("Welcome back! Login successful.");
      onLoginSuccess?.();
    } catch (error) {
      if (error instanceof AuthError) {
        if (error.status === 401) {
          customToast.error("Invalid email or password. Please try again.");
        } else {
          customToast.error(error.message);
        }
      } else {
        customToast.error("Login failed. Please try again.");
      }
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    
    if (!clientId) {
      customToast.error("Google Sign-In is not configured");
      return;
    }

    if (typeof window !== 'undefined' && window.google) {
      // Create a temporary container for the button
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.top = '-9999px';
      document.body.appendChild(tempDiv);

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleGoogleCallback,
        ux_mode: 'popup', // Force popup mode
      });
      
      // Render a button and trigger it immediately
      window.google.accounts.id.renderButton(tempDiv, {
        type: 'standard',
        theme: 'outline',
        size: 'large',
      });
      
      // Trigger click on the rendered button
      setTimeout(() => {
        const googleButton = tempDiv.querySelector('div[role="button"]') as HTMLElement;
        if (googleButton) {
          googleButton.click();
        }
        // Clean up
        setTimeout(() => document.body.removeChild(tempDiv), 100);
      }, 100);
    } else {
      customToast.error("Google Sign-In is loading. Please try again.");
    }
  };

  const handleGoogleCallback = async (response: any) => {
    try {
      await loginWithGoogle(response.credential);
      
      customToast.success("Successfully signed in with Google!");
      onLoginSuccess?.();
    } catch (error) {
      if (error instanceof AuthError) {
        customToast.error(error.message);
      } else {
        customToast.error("Failed to authenticate with Google. Please try again.");
      }
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-none bg-background p-4 md:rounded-2xl md:p-8">
      <h2 className="text-xl font-bold text-foreground">
        Welcome Back
      </h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Sign in to your AI Assignment Writer account to continue creating amazing assignments.
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input 
            id="email" 
            name="email"
            placeholder="student@university.edu" 
            type="email" 
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-6">
          <Label htmlFor="password">Password</Label>
          <Input 
            id="password" 
            name="password"
            placeholder="••••••••" 
            type="password" 
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </LabelInputContainer>

        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleChange}
              disabled={isLoading}
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-muted-foreground">
              Remember me
            </label>
          </div>
          <button
            type="button"
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            Forgot password?
          </button>
        </div>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-primary font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Signing In..." : "Sign In"}
          <BottomGradient />
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-border to-transparent" />

        <button
          className="group/btn shadow-sm relative flex h-10 w-full items-center justify-center space-x-2 rounded-md bg-secondary hover:bg-secondary/80 px-4 font-medium text-secondary-foreground transition-colors disabled:opacity-50"
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
        >
          <IconBrandGoogle className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">Continue with Google</span>
          <BottomGradient />
        </button>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <button
              type="button"
              className="text-primary hover:text-primary/80 transition-colors font-medium"
              onClick={onSwitchToSignup}
            >
              Sign up here
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};