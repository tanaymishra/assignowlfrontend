"use client";
import React, { useState, useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGoogle } from "@tabler/icons-react";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import { customToast } from "../ui/custom-toast";
import { useAuth } from "@/lib/store";
import { AuthError } from "@/lib/auth";
import { useRouter } from "next/navigation";

interface SignupFormCoreProps {
  onSwitchToLogin?: () => void;
  onSignupSuccess?: (email: string, userData: any) => void;
}

export function SignupFormCore({ onSwitchToLogin, onSignupSuccess }: SignupFormCoreProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const router = useRouter();

  const { signup, isLoading } = useAuth();

  // Countdown timer effect
  useEffect(() => {
    if (showSuccess && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (showSuccess && countdown === 0) {
      router.push('/scorer');
    }
  }, [showSuccess, countdown, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      customToast.error("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      customToast.error("Passwords don't match");
      return;
    }

    if (formData.password.length < 6) {
      customToast.error("Password must be at least 6 characters");
      return;
    }

    try {
      const result = await signup({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
      });
      
      if (result.requiresVerification) {
        customToast.success("Account created! Please check your email to verify your account.");
        setShowSuccess(true);
        setCountdown(3);
      }
    } catch (error) {
      if (error instanceof AuthError) {
        customToast.error(error.message);
      } else {
        customToast.error("Failed to create account. Please try again.");
      }
    }
  };
  
  // Show success screen with countdown
  if (showSuccess) {
    return (
      <div className="mx-auto w-full max-w-md rounded-none bg-background p-4 md:rounded-2xl md:p-8">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-green-500/10 p-4">
              <Mail className="h-12 w-12 text-green-500" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-500" />
              Account Created!
            </h2>
            <p className="text-muted-foreground">
              Please check your email <span className="font-semibold text-foreground">{formData.email}</span> and click the verification link to activate your account.
            </p>
          </div>

          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <p className="text-sm text-muted-foreground">
              Redirecting to scorer in
            </p>
            <p className="text-4xl font-bold text-primary">
              {countdown}
            </p>
            <p className="text-xs text-muted-foreground">
              You can start using the platform while waiting for email verification
            </p>
          </div>

          <button
            onClick={() => router.push('/scorer')}
            className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
          >
            Go to scorer now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-none bg-background p-4 md:rounded-2xl md:p-8">
      {/* Header */}
      <div className="mb-8">
        {onSwitchToLogin && (
          <button
            onClick={onSwitchToLogin}
            className="mb-4 flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to login
          </button>
        )}
        
        <h2 className="text-xl font-bold text-foreground">
          Join AI Assignment Writer
        </h2>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Create your account to start generating high-quality assignments with AI assistance.
        </p>
      </div>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="firstName">First name</Label>
            <Input 
              id="firstName" 
              name="firstName"
              placeholder="John" 
              type="text" 
              value={formData.firstName}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastName">Last name</Label>
            <Input 
              id="lastName" 
              name="lastName"
              placeholder="Doe" 
              type="text" 
              value={formData.lastName}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </LabelInputContainer>
        </div>
        
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input 
            id="email" 
            name="email"
            placeholder="student@university.edu" 
            type="email" 
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
        </LabelInputContainer>
        
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input 
            id="password" 
            name="password"
            placeholder="••••••••" 
            type="password" 
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
        </LabelInputContainer>
        
        <LabelInputContainer className="mb-6">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input 
            id="confirmPassword" 
            name="confirmPassword"
            placeholder="••••••••" 
            type="password" 
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-primary font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "Create Account"}
          <BottomGradient />
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-border to-transparent" />

        <button
          className="group/btn shadow-sm relative flex h-10 w-full items-center justify-center space-x-2 rounded-md bg-secondary hover:bg-secondary/80 px-4 font-medium text-secondary-foreground transition-colors"
          type="button"
        >
          <IconBrandGoogle className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">Continue with Google</span>
          <BottomGradient />
        </button>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <button
              type="button"
              className="text-primary hover:text-primary/80 transition-colors font-medium"
              onClick={onSwitchToLogin}
            >
              Sign in here
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
