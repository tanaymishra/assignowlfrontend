"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface CompletionSectionProps {
  onRedirectToReport?: () => void;
}

export function CompletionSection({ onRedirectToReport }: CompletionSectionProps) {
  return (
    <motion.div
      key="complete"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="bg-background/20 backdrop-blur-xl border border-border/20 rounded-2xl p-8 shadow-2xl relative overflow-hidden text-center"
    >
      {/* Glassy overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/10 to-background/30 rounded-2xl" />
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent rounded-2xl" />
      
      {/* Celebration particles */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-green-500/30 rounded-full"
            animate={{
              x: [0, Math.random() * 400 - 200],
              y: [0, Math.random() * 400 - 200],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeOut"
            }}
            style={{
              left: '50%',
              top: '50%',
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            delay: 0.2, 
            type: "spring", 
            stiffness: 200,
            damping: 10 
          }}
          className="mx-auto mb-6 relative"
        >
          {/* Pulsing rings */}
          {[1, 2, 3].map((ring) => (
            <motion.div
              key={ring}
              className="absolute inset-0 rounded-full border-2 border-green-500/20"
              animate={{
                scale: [1, 1.5 + ring * 0.2],
                opacity: [0.6, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: ring * 0.3,
                ease: "easeOut"
              }}
              style={{
                width: '80px',
                height: '80px',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}
          
          <div className="relative p-4 bg-green-500/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            Scoring Complete!
          </h3>
          
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Your assignment has been successfully analyzed and scored. 
            A detailed report with feedback has been generated.
          </p>
        </motion.div>
        
        {/* Success metrics animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex justify-center space-x-8 mb-8"
        >
          {[
            { label: 'Analysis', value: '100%' },
            { label: 'Feedback', value: 'Generated' },
            { label: 'Report', value: 'Ready' },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                delay: 0.8 + index * 0.1, 
                type: "spring",
                stiffness: 200 
              }}
              className="text-center"
            >
              <div className="text-lg font-semibold text-green-500">
                {item.value}
              </div>
              <div className="text-xs text-muted-foreground">
                {item.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Redirect message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ 
            delay: 1,
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-sm text-muted-foreground"
        >
          Redirecting to your detailed report...
        </motion.div>

        {/* Progress dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex justify-center items-center space-x-2 mt-4"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-green-500/50 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}