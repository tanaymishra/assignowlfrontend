"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, FileText, Loader2, Download, CheckCircle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProcessStep {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  status: 'waiting' | 'active' | 'completed'
  duration: number
}

export function ProcessDemo() {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  const steps: ProcessStep[] = [
    {
      id: 1,
      title: "Upload Your Files",
      description: "Drop your assignment requirements",
      icon: <Upload className="w-6 h-6" />,
      status: 'waiting',
      duration: 2000
    },
    {
      id: 2,
      title: "AI Processing",
      description: "Our AI analyzes and generates content",
      icon: <Loader2 className="w-6 h-6 animate-spin" />,
      status: 'waiting',
      duration: 3000
    },
    {
      id: 3,
      title: "Generated in 2 Minutes",
      description: "High-quality assignment ready",
      icon: <CheckCircle className="w-6 h-6" />,
      status: 'waiting',
      duration: 2000
    },
    {
      id: 4,
      title: "Download Complete",
      description: "Your assignment is ready to submit",
      icon: <Download className="w-6 h-6" />,
      status: 'waiting',
      duration: 2000
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        const nextStep = (prev + 1) % steps.length
        if (nextStep === 0) {
          setProgress(0)
        }
        return nextStep
      })
    }, steps[currentStep]?.duration || 2000)

    return () => clearInterval(timer)
  }, [currentStep, steps])

  useEffect(() => {
    if (currentStep === 1) {
      const progressTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressTimer)
            return 100
          }
          return prev + 2
        })
      }, 60)

      return () => clearInterval(progressTimer)
    }
  }, [currentStep])

  return (
    <div className="relative w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-card/50 backdrop-blur-sm border border-border/40 rounded-2xl p-6 shadow-xl"
      >
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            See How It Works
          </h3>
          <p className="text-sm text-muted-foreground">
            From upload to download in minutes
          </p>
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className={cn(
                "flex items-center space-x-4 p-4 rounded-xl transition-all duration-500",
                index === currentStep
                  ? "bg-primary/10 border border-primary/20"
                  : index < currentStep
                  ? "bg-green-500/10 border border-green-500/20"
                  : "bg-muted/30 border border-border/20"
              )}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div
                className={cn(
                  "flex items-center justify-center w-12 h-12 rounded-full transition-all duration-500",
                  index === currentStep
                    ? "bg-primary text-primary-foreground"
                    : index < currentStep
                    ? "bg-green-500 text-white"
                    : "bg-muted text-muted-foreground"
                )}
              >
                <AnimatePresence mode="wait">
                  {index < currentStep ? (
                    <motion.div
                      key="completed"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <CheckCircle className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="icon"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      {step.icon}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex-1">
                <h4
                  className={cn(
                    "font-medium transition-colors duration-500",
                    index === currentStep
                      ? "text-primary"
                      : index < currentStep
                      ? "text-green-600 dark:text-green-400"
                      : "text-muted-foreground"
                  )}
                >
                  {step.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>

                {index === 1 && currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2"
                  >
                    <div className="w-full bg-muted rounded-full h-2">
                      <motion.div
                        className="bg-primary h-2 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.1 }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {progress}% complete
                    </p>
                  </motion.div>
                )}
              </div>

              {index === currentStep && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center text-primary"
                >
                  <Clock className="w-4 h-4" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {currentStep === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-4 p-3 bg-muted/50 rounded-lg border-2 border-dashed border-primary/30"
            >
              <div className="flex items-center justify-center space-x-2 text-primary">
                <FileText className="w-5 h-5" />
                <span className="text-sm font-medium">assignment-brief.pdf</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-4 p-3 bg-green-500/10 rounded-lg border border-green-500/20"
            >
              <div className="flex items-center justify-center space-x-2 text-green-600 dark:text-green-400">
                <FileText className="w-5 h-5" />
                <span className="text-sm font-medium">completed-assignment.docx</span>
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <Download className="w-4 h-4" />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary/30 rounded-full"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </div>
  )
}