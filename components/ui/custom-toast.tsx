"use client";
import React from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import './toast-animations.css';

// Custom toast component with glassy background
const CustomToast = ({ 
  message, 
  type, 
  onDismiss 
}: { 
  message: string; 
  type: 'success' | 'error' | 'warning' | 'info'; 
  onDismiss: () => void;
}) => {
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500 toast-icon-success" />,
    error: <XCircle className="w-5 h-5 text-red-500 toast-icon-error" />,
    warning: <AlertCircle className="w-5 h-5 text-orange-500 toast-icon-warning" />,
    info: <Info className="w-5 h-5 text-blue-500 toast-icon-info" />
  };

  const borderColors = {
    success: 'border-green-500/20',
    error: 'border-red-500/20',
    warning: 'border-orange-500/20',
    info: 'border-blue-500/20'
  };

  return (
    <div className={cn(
      "flex items-center gap-3 p-4 rounded-2xl shadow-2xl backdrop-blur-xl border toast-glass",
      borderColors[type],
      "min-w-[320px] max-w-[500px]",
      "relative overflow-hidden toast-enter"
    )}>
      {/* Glassy overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent pointer-events-none" />
      
      {/* Icon with glow effect */}
      <div className={cn(
        "flex-shrink-0 p-2 rounded-full backdrop-blur-sm",
        type === 'success' && "bg-green-500/10",
        type === 'error' && "bg-red-500/10",
        type === 'warning' && "bg-orange-500/10",
        type === 'info' && "bg-blue-500/10"
      )}>
        {icons[type]}
      </div>
      
      {/* Message */}
      <div className="flex-1 text-sm font-medium text-foreground relative z-10">
        {message}
      </div>
      
      {/* Close button */}
      <button
        onClick={onDismiss}
        className={cn(
          "flex-shrink-0 p-1.5 rounded-full transition-all duration-200",
          "hover:bg-muted/30 hover:backdrop-blur-sm",
          "active:scale-95 relative z-10"
        )}
      >
        <X className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
      </button>
    </div>
  );
};

// Custom toast functions
export const customToast = {
  success: (message: string) => {
    toast.custom((t) => (
      <CustomToast 
        message={message} 
        type="success" 
        onDismiss={() => toast.dismiss(t.id)} 
      />
    ), {
      duration: 4000,
    });
  },
  
  error: (message: string) => {
    toast.custom((t) => (
      <CustomToast 
        message={message} 
        type="error" 
        onDismiss={() => toast.dismiss(t.id)} 
      />
    ), {
      duration: 5000,
    });
  },
  
  warning: (message: string) => {
    toast.custom((t) => (
      <CustomToast 
        message={message} 
        type="warning" 
        onDismiss={() => toast.dismiss(t.id)} 
      />
    ), {
      duration: 4000,
    });
  },
  
  info: (message: string) => {
    toast.custom((t) => (
      <CustomToast 
        message={message} 
        type="info" 
        onDismiss={() => toast.dismiss(t.id)} 
      />
    ), {
      duration: 4000,
    });
  },
};

// Enhanced Toaster component
export const CustomToaster = () => {
  return (
    <Toaster
      position="top-right"
      gutter={12}
      containerStyle={{
        top: 20,
        right: 20,
      }}
      toastOptions={{
        duration: 4000,
        style: {
          background: 'transparent',
          boxShadow: 'none',
          padding: 0,
          margin: 0,
        },
      }}
    />
  );
};