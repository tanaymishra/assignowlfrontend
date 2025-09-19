"use client";
import React from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// Custom toast component with glassy background and framer-motion
const CustomToast = ({
  message,
  type,
  onDismiss,
  visible = true
}: {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  onDismiss: () => void;
  visible?: boolean;
}) => {
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    warning: <AlertCircle className="w-5 h-5 text-orange-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />
  };

  const borderColors = {
    success: 'border-green-500/20',
    error: 'border-red-500/20',
    warning: 'border-orange-500/20',
    info: 'border-blue-500/20'
  };

  const iconColors = {
    success: 'bg-green-500/10',
    error: 'bg-red-500/10',
    warning: 'bg-orange-500/10',
    info: 'bg-blue-500/10'
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 100,
        scale: 0.8,
        rotateY: 15
      }}
      animate={{
        opacity: 1,
        x: 0,
        scale: 1,
        rotateY: 0
      }}
      exit={{
        opacity: 0,
        x: 100,
        scale: 0.9,
        rotateY: -15
      }}
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.4
      }}
      className={cn(
        "flex items-center gap-3 p-4 rounded-2xl shadow-2xl backdrop-blur-xl border",
        "bg-background/70 dark:bg-background/40",
        "border-border/30",
        borderColors[type],
        "min-w-[320px] max-w-[500px]",
        "relative overflow-hidden"
      )}
    >
      {/* Animated glassy overlay effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      />

      {/* Icon with animated glow effect */}
      <motion.div
        className={cn(
          "flex-shrink-0 p-2 rounded-full backdrop-blur-sm relative z-10",
          iconColors[type]
        )}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 300,
          delay: 0.1
        }}
        whileHover={{ scale: 1.1 }}
      >
        {icons[type]}
      </motion.div>

      {/* Message with slide-in animation */}
      <motion.div
        className="flex-1 text-sm font-medium text-foreground relative z-10"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        {message}
      </motion.div>

      {/* Close button with hover animations */}
      <motion.button
        onClick={onDismiss}
        className={cn(
          "flex-shrink-0 p-1.5 rounded-full relative z-10",
          "hover:bg-muted/30 hover:backdrop-blur-sm"
        )}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
        whileHover={{
          scale: 1.1,
          backgroundColor: "rgba(var(--muted) / 0.5)"
        }}
        whileTap={{ scale: 0.9 }}
      >
        <X className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
      </motion.button>
    </motion.div>
  );
};

// Custom toast functions with enhanced animations
export const customToast = {
  success: (message: string) => {
    toast.custom((t) => (
      <AnimatePresence mode="wait">
        {t.visible && (
          <CustomToast
            message={message}
            type="success"
            onDismiss={() => toast.dismiss(t.id)}
            visible={t.visible}
          />
        )}
      </AnimatePresence>
    ), {
      duration: 4000,
    });
  },

  error: (message: string) => {
    toast.custom((t) => (
      <AnimatePresence mode="wait">
        {t.visible && (
          <CustomToast
            message={message}
            type="error"
            onDismiss={() => toast.dismiss(t.id)}
            visible={t.visible}
          />
        )}
      </AnimatePresence>
    ), {
      duration: 5000,
    });
  },

  warning: (message: string) => {
    toast.custom((t) => (
      <AnimatePresence mode="wait">
        {t.visible && (
          <CustomToast
            message={message}
            type="warning"
            onDismiss={() => toast.dismiss(t.id)}
            visible={t.visible}
          />
        )}
      </AnimatePresence>
    ), {
      duration: 4000,
    });
  },

  info: (message: string) => {
    toast.custom((t) => (
      <AnimatePresence mode="wait">
        {t.visible && (
          <CustomToast
            message={message}
            type="info"
            onDismiss={() => toast.dismiss(t.id)}
            visible={t.visible}
          />
        )}
      </AnimatePresence>
    ), {
      duration: 4000,
    });
  },

  // Bonus: Loading toast with spinner
  loading: (message: string) => {
    return toast.custom((t) => (
      <AnimatePresence mode="wait">
        {t.visible && (
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={cn(
              "flex items-center gap-3 p-4 rounded-2xl shadow-2xl backdrop-blur-xl border",
              "bg-background/70 dark:bg-background/40",
              "border-border/30 border-blue-500/20",
              "min-w-[320px] max-w-[500px] relative overflow-hidden"
            )}
          >
            <motion.div
              className="flex-shrink-0 p-2 rounded-full backdrop-blur-sm bg-blue-500/10"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full" />
            </motion.div>
            <div className="flex-1 text-sm font-medium text-foreground">
              {message}
            </div>
            <motion.button
              onClick={() => toast.dismiss(t.id)}
              className="flex-shrink-0 p-1.5 rounded-full hover:bg-muted/30"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    ), {
      duration: Infinity, // Loading toasts don't auto-dismiss
    });
  },
};

// Enhanced Toaster component with framer-motion container
export const CustomToaster = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed top-5 right-5 z-[9999] pointer-events-none"
    >
      <Toaster
        position="top-right"
        gutter={12}
        containerStyle={{
          position: 'static',
          pointerEvents: 'auto',
        }}
        toastOptions={{
          duration: 4000,
          style: {
            background: 'transparent',
            boxShadow: 'none',
            padding: 0,
            margin: 0,
            pointerEvents: 'auto',
          },
        }}
      />
    </motion.div>
  );
};