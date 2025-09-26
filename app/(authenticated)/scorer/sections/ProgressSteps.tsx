"use client";

import { motion } from "framer-motion";
import { Upload, Brain, FileText, Sparkles, CheckCircle } from "lucide-react";
import { ScoringStep } from "../store/scorerStore";

interface ProgressStepsProps {
  currentStep: ScoringStep;
}

export function ProgressSteps({ currentStep }: ProgressStepsProps) {
  const steps = [
    { step: 'upload' as const, label: 'Upload', icon: Upload },
    { step: 'analyzing' as const, label: 'Analyzing', icon: Brain },
    { step: 'rubric' as const, label: 'Rubric', icon: FileText },
    { step: 'scoring' as const, label: 'Scoring', icon: Sparkles },
    { step: 'complete' as const, label: 'Complete', icon: CheckCircle }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex justify-center"
    >
      <div className="relative bg-background/20 backdrop-blur-xl border border-border/20 rounded-2xl p-6 shadow-lg">
        {/* Progress line background */}
        <div className="absolute top-1/2 left-6 right-6 h-0.5 bg-muted/30 -translate-y-1/2 rounded-full" />
        
        <div className="relative flex items-center justify-between space-x-8">
          {steps.map((item, index) => {
            const stepIndex = steps.findIndex(s => s.step === currentStep);
            const isActive = currentStep === item.step;
            const isCompleted = stepIndex > index;
            const isUpcoming = stepIndex < index;
            
            return (
              <motion.div 
                key={item.step} 
                className="flex flex-col items-center relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (index * 0.1), duration: 0.5 }}
              >
                <motion.div
                  className={`relative p-3 rounded-full border-2 transition-all duration-500 ${
                    isCompleted 
                      ? 'bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/25' 
                      : isActive 
                      ? 'bg-primary/10 border-primary text-primary shadow-lg shadow-primary/10' 
                      : 'bg-background border-muted text-muted-foreground'
                  }`}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    rotateY: isActive ? [0, 360] : 0,
                  }}
                  transition={{
                    scale: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                    rotateY: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
                  }}
                >
                  {/* Pulse effect for active step */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-primary"
                      animate={{
                        scale: [1, 1.5],
                        opacity: [0.5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut"
                      }}
                    />
                  )}
                  
                  <item.icon className="h-5 w-5" />
                </motion.div>
                
                <motion.p
                  className={`mt-2 text-xs font-medium transition-colors duration-300 ${
                    isCompleted || isActive 
                      ? 'text-foreground' 
                      : 'text-muted-foreground'
                  }`}
                  animate={{
                    scale: isActive ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {item.label}
                </motion.p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}