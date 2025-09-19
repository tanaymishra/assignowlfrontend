"use client";
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ArrowLeft, Mail } from "lucide-react";
import { customToast } from "../ui/custom-toast";

interface OtpCoreProps {
  email: string;
  onBack: () => void;
  onVerify: (otp: string) => void;
}

export function OtpCore({ email, onBack, onVerify }: OtpCoreProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = [...otp];
    
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newOtp[i] = pastedData[i];
      }
    }
    
    setOtp(newOtp);
    
    // Focus the next empty input or the last input
    const nextEmptyIndex = newOtp.findIndex(digit => digit === "");
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join("");
    
    if (otpString.length !== 6) {
      customToast.error("Please enter all 6 digits");
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (otpString === "123456") {
        customToast.success("Account verified successfully!");
        onVerify(otpString);
      } else {
        customToast.error("Invalid OTP. Please try again.");
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      customToast.error("Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      // Simulate resend API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      customToast.success("OTP sent successfully!");
    } catch (error) {
      customToast.error("Failed to resend OTP");
    }
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <div className="mx-auto w-full max-w-md rounded-none bg-background p-4 md:rounded-2xl md:p-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="mb-4 flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to signup
        </button>
        
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full">
          <Mail className="w-8 h-8 text-primary" />
        </div>
        
        <h2 className="text-xl font-bold text-foreground text-center">
          Verify Your Email
        </h2>
        <p className="mt-2 text-sm text-muted-foreground text-center">
          We've sent a 6-digit code to{" "}
          <span className="font-medium text-foreground">{email}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* OTP Input */}
        <div className="flex justify-center gap-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className={cn(
                "w-12 h-12 text-center text-lg font-semibold border rounded-lg",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
                "bg-background border-border text-foreground",
                digit && "border-primary"
              )}
              disabled={isLoading}
            />
          ))}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full mb-4"
          disabled={isLoading || otp.some(digit => !digit)}
        >
          {isLoading ? "Verifying..." : "Verify Email"}
        </Button>

        {/* Resend */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Didn't receive the code?
          </p>
          <button
            type="button"
            onClick={handleResend}
            className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
          >
            Resend Code
          </button>
        </div>
      </form>

      {/* Demo Note */}
      <div className="mt-6 p-3 bg-muted/50 rounded-lg">
        <p className="text-xs text-muted-foreground text-center">
          <strong>Demo:</strong> Use code <code className="bg-background px-1 rounded">123456</code> to verify
        </p>
      </div>
    </div>
  );
}