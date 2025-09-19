"use client";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandApple,
} from "@tabler/icons-react";

export function LoginFormCore() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login form submitted");
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
          <Input id="email" placeholder="student@university.edu" type="email" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-6">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>

        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-muted-foreground">
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
          className="group/btn relative block h-10 w-full rounded-md bg-primary font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
          type="submit"
        >
          Sign In
          <BottomGradient />
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="flex flex-col space-y-4">
          <button
            className="group/btn shadow-sm relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-secondary hover:bg-secondary/80 px-4 font-medium text-secondary-foreground transition-colors"
            type="button"
          >
            <IconBrandGoogle className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Continue with Google</span>
            <BottomGradient />
          </button>
          <button
            className="group/btn shadow-sm relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-secondary hover:bg-secondary/80 px-4 font-medium text-secondary-foreground transition-colors"
            type="button"
          >
            <IconBrandGithub className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Continue with GitHub</span>
            <BottomGradient />
          </button>
          <button
            className="group/btn shadow-sm relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-secondary hover:bg-secondary/80 px-4 font-medium text-secondary-foreground transition-colors"
            type="button"
          >
            <IconBrandApple className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Continue with Apple</span>
            <BottomGradient />
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <button
              type="button"
              className="text-primary hover:text-primary/80 transition-colors font-medium"
              onClick={() => {
                // TODO: Add signup drawer functionality
                console.log("Switch to signup");
              }}
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