"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Upload, Loader2, Download, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export function ProcessDemo() {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    { 
      icon: Upload, 
      title: "Upload Guidelines", 
      description: "Analyzing requirements",
      color: "text-blue-500"
    },
    { 
      icon: Loader2, 
      title: "Generate References", 
      description: "Finding relevant sources",
      color: "text-orange-500"
    },
    { 
      icon: CheckCircle, 
      title: "Verify Relevance", 
      description: "Checking reference quality",
      color: "text-purple-500"
    },
    { 
      icon: Download, 
      title: "Generate Assignment", 
      description: "Creating final document",
      color: "text-green-500"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-80 h-80 mx-auto">
      {/* Central Circle with 0% */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm border border-primary/20 flex items-center justify-center relative">
          {/* Progress Ring */}
          <svg className="absolute inset-0 w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="58"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              className="text-muted/20"
            />
            <circle
              cx="64"
              cy="64"
              r="58"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              className="text-primary"
              strokeLinecap="round"
              strokeDasharray="364"
              strokeDashoffset="364"
            />
          </svg>

          {/* Center Content - Static 0% */}
          <div className="text-center z-10">
            <div className="text-3xl font-bold text-primary mb-1">
              0%
            </div>
          </div>
        </div>
      </div>

      {/* Orbiting Steps */}
      {steps.map((step, index) => {
        const angle = (index * 90) - (currentStep * 90)
        const radius = 120
        const x = Math.cos((angle * Math.PI) / 180) * radius
        const y = Math.sin((angle * Math.PI) / 180) * radius

        return (
          <motion.div
            key={index}
            className="absolute top-1/2 left-1/2 w-16 h-16"
            animate={{
              x: x - 32,
              y: y - 32,
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <motion.div
              className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500",
                index === currentStep
                  ? "bg-primary text-primary-foreground shadow-lg scale-110"
                  : index < currentStep
                  ? "bg-green-500/20 text-green-500 border border-green-500/30"
                  : "bg-muted/50 text-muted-foreground border border-border/30"
              )}
              whileHover={{ scale: 1.1 }}
            >
              {React.createElement(
                index < currentStep ? CheckCircle : step.icon,
                {
                  className: cn(
                    "w-6 h-6",
                    index === 1 && currentStep === 1 && "animate-spin"
                  )
                }
              )}
            </motion.div>

            {/* Step Label - Positioned based on angle */}
            <motion.div
              className="absolute text-center w-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentStep ? 1 : 0.6 }}
            >
              <p className="text-xs font-medium text-foreground">
                {step.title}
              </p>
            </motion.div>
          </motion.div>
        )
      })}

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/30 rounded-full"
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`
          }}
        />
      ))}
    </div>
  )
}