"use client";

import { motion } from "framer-motion";
import { Brain } from "lucide-react";

interface AIThinkingAnimationProps {
  message: string;
  progress?: number;
}

export function AIThinkingAnimation({ message, progress = 0 }: AIThinkingAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="bg-background/20 backdrop-blur-xl border border-border/20 rounded-2xl p-8 shadow-2xl relative overflow-hidden text-center"
    >
      {/* Glassy overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/10 to-background/30 rounded-2xl" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-2xl" />
      
      {/* Subtle animated background particles */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            animate={{
              x: [0, Math.random() * 400],
              y: [0, Math.random() * 200],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10">
        {/* Sophisticated brain animation */}
        <motion.div
          className="mx-auto mb-8 relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            animate={{ 
              rotate: 360,
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
            className="relative p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full border border-primary/20"
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Brain className="h-12 w-12 text-primary" />
            </motion.div>
            
            {/* Orbital rings */}
            <motion.div
              className="absolute inset-0 border border-primary/10 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-2 border border-primary/5 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.h3
            className="text-xl font-semibold text-foreground mb-4"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            AI Processing
          </motion.h3>
          
          <p className="text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
            {message}
          </p>
        </motion.div>
        
        {/* Elegant progress indicator */}
        <motion.div
          className="flex justify-center items-center space-x-3 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="relative"
            >
              <motion.div
                className="w-2 h-2 bg-primary/30 rounded-full"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                  backgroundColor: [
                    "rgba(var(--primary), 0.3)",
                    "rgba(var(--primary), 1)",
                    "rgba(var(--primary), 0.3)"
                  ]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: [0.22, 1, 0.36, 1]
                }}
              />
              <motion.div
                className="absolute inset-0 w-2 h-2 bg-primary/20 rounded-full"
                animate={{ 
                  scale: [1, 2, 1],
                  opacity: [0, 0.3, 0]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeOut"
                }}
              />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Progress bar */}
        {progress > 0 && (
          <motion.div
            className="w-64 mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <div className="h-1 bg-muted/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary/50 to-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              {Math.round(progress)}% Complete
            </p>
          </motion.div>
        )}
        
        {/* Animated progress bar (when no specific progress) */}
        {progress === 0 && (
          <motion.div
            className="w-64 mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <div className="h-1 bg-muted/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary/50 to-primary rounded-full"
                animate={{ 
                  x: ["-100%", "100%"],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}