"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, Trash2, Brain, Sparkles, CheckCircle, SkipForward, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

type ScoringStep = 'upload' | 'analyzing' | 'rubric' | 'scoring' | 'complete';

export default function AssignmentScorer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [rubricFile, setRubricFile] = useState<File | null>(null);
  const [currentStep, setCurrentStep] = useState<ScoringStep>('upload');
  const [guidelines, setGuidelines] = useState("");
  const router = useRouter();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleRubricUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setRubricFile(file);
    }
  };

  const startAnalysis = () => {
    if (!selectedFile) return;
    setCurrentStep('analyzing');
    
    // Simulate AI analysis
    setTimeout(() => {
      setCurrentStep('rubric');
    }, 3000);
  };

  const proceedWithScoring = () => {
    setCurrentStep('scoring');
    
    // Simulate AI scoring
    setTimeout(() => {
      setCurrentStep('complete');
      // Redirect to report page after a brief moment
      setTimeout(() => {
        router.push('/report');
      }, 1500);
    }, 4000);
  };

  const skipRubric = () => {
    proceedWithScoring();
  };

  const AIThinkingAnimation = ({ message }: { message: string }) => (
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
          className="flex justify-center items-center space-x-3"
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
        <motion.div
          className="mt-8 w-64 mx-auto"
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
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="px-1 text-center"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Assignment Scorer</h1>
        <p className="text-muted-foreground mt-2 text-sm sm:text-base">
          Upload your assignment and get AI-powered scoring with detailed feedback
        </p>
      </motion.div>

      {/* Progress Steps */}
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
            {[
              { step: 'upload', label: 'Upload', icon: Upload },
              { step: 'analyzing', label: 'Analyzing', icon: Brain },
              { step: 'rubric', label: 'Rubric', icon: FileText },
              { step: 'scoring', label: 'Scoring', icon: Sparkles },
              { step: 'complete', label: 'Complete', icon: CheckCircle }
            ].map((item, index) => {
              const stepIndex = ['upload', 'analyzing', 'rubric', 'scoring', 'complete'].indexOf(currentStep);
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
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeOut"
                        }}
                      />
                    )}
                    
                    <motion.div
                      animate={{
                        rotate: isActive ? [0, 5, -5, 0] : 0,
                      }}
                      transition={{
                        duration: 2,
                        repeat: isActive ? Infinity : 0,
                        ease: "easeInOut"
                      }}
                    >
                      <item.icon className="h-5 w-5" />
                    </motion.div>
                  </motion.div>
                  
                  <motion.span 
                    className={`mt-3 text-sm font-medium transition-colors duration-300 ${
                      isCompleted || isActive ? 'text-foreground' : 'text-muted-foreground'
                    }`}
                    animate={{
                      y: isActive ? [0, -2, 0] : 0,
                    }}
                    transition={{
                      duration: 2,
                      repeat: isActive ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                  >
                    {item.label}
                  </motion.span>
                  
                  {/* Progress line segment */}
                  {index < 4 && (
                    <motion.div
                      className="absolute top-1/2 left-full w-8 h-0.5 -translate-y-1/2 rounded-full"
                      initial={{ scaleX: 0, backgroundColor: "rgb(var(--muted))" }}
                      animate={{
                        scaleX: isCompleted ? 1 : 0,
                        backgroundColor: isCompleted ? "rgb(var(--primary))" : "rgb(var(--muted))"
                      }}
                      transition={{ duration: 0.5, delay: isCompleted ? 0.3 : 0 }}
                      style={{ originX: 0 }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {/* Step 1: Upload Assignment */}
        {currentStep === 'upload' && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-background/20 backdrop-blur-xl border border-border/20 rounded-2xl p-6 shadow-2xl relative overflow-hidden"
          >
            {/* Glassy overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/10 to-background/30 rounded-2xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-2xl" />
            
            <div className="relative z-10">
              <h2 className="text-xl font-semibold text-foreground mb-6 text-center">Upload Your Assignment</h2>
              
              {/* File Upload */}
              <div className="space-y-6">
                <div className="border-2 border-dashed border-border/30 rounded-xl p-8 text-center hover:border-primary/50 hover:bg-background/20 backdrop-blur-sm transition-all duration-300">
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileUpload}
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center space-y-4"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-4 bg-primary/10 rounded-full"
                    >
                      <Upload className="h-8 w-8 text-primary" />
                    </motion.div>
                    <div>
                      <p className="text-lg font-medium text-foreground">
                        {selectedFile ? selectedFile.name : "Click to upload assignment"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Supports PDF, DOC, DOCX, TXT files up to 10MB
                      </p>
                    </div>
                  </label>
                </div>

                {selectedFile && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center space-x-3 p-4 bg-background/30 backdrop-blur-sm rounded-xl border border-border/20"
                  >
                    <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{selectedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedFile(null)}
                      className="flex-shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </motion.div>
                )}

                {/* Guidelines */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">
                    Scoring Guidelines (Optional)
                  </label>
                  <textarea
                    value={guidelines}
                    onChange={(e) => setGuidelines(e.target.value)}
                    placeholder="Enter any specific guidelines or criteria for scoring this assignment..."
                    className="w-full h-32 p-4 bg-background/30 backdrop-blur-sm border border-border/30 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all text-sm placeholder:text-muted-foreground/70"
                  />
                </div>
                
                <div className="flex justify-center">
                  <Button
                    onClick={startAnalysis}
                    disabled={!selectedFile}
                    className="bg-primary hover:bg-primary/90 px-8 py-3 text-lg"
                  >
                    <Brain className="h-5 w-5 mr-2" />
                    Start AI Analysis
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: AI Analyzing */}
        {currentStep === 'analyzing' && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <AIThinkingAnimation message="Analyzing your assignment content, structure, and quality..." />
          </motion.div>
        )}

        {/* Step 3: Rubric Option */}
        {currentStep === 'rubric' && (
          <motion.div
            key="rubric"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-background/20 backdrop-blur-xl border border-border/20 rounded-2xl p-6 shadow-2xl relative overflow-hidden"
          >
            {/* Glassy overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/10 to-background/30 rounded-2xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-2xl" />
            
            <div className="relative z-10 text-center">
              <h2 className="text-xl font-semibold text-foreground mb-4">Do you have a rubric file?</h2>
              <p className="text-muted-foreground mb-8">
                Upload a rubric file for more accurate scoring, or skip to use AI's general assessment
              </p>
              
              {/* Rubric Upload */}
              <div className="space-y-6">
                <div className="border-2 border-dashed border-border/30 rounded-xl p-6 hover:border-primary/50 hover:bg-background/20 backdrop-blur-sm transition-all duration-300">
                  <input
                    type="file"
                    id="rubric-upload"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleRubricUpload}
                  />
                  <label
                    htmlFor="rubric-upload"
                    className="cursor-pointer flex flex-col items-center space-y-3"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 bg-primary/10 rounded-full"
                    >
                      <FileText className="h-6 w-6 text-primary" />
                    </motion.div>
                    <div>
                      <p className="font-medium text-foreground">
                        {rubricFile ? rubricFile.name : "Upload Rubric File"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        PDF, DOC, DOCX, TXT
                      </p>
                    </div>
                  </label>
                </div>

                {rubricFile && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center justify-center space-x-3 p-3 bg-background/30 backdrop-blur-sm rounded-xl border border-border/20"
                  >
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="font-medium text-foreground">{rubricFile.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setRubricFile(null)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </motion.div>
                )}
                
                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={skipRubric}
                    variant="outline"
                    className="px-6"
                  >
                    <SkipForward className="h-4 w-4 mr-2" />
                    Skip Rubric
                  </Button>
                  <Button
                    onClick={proceedWithScoring}
                    disabled={!rubricFile}
                    className="bg-primary hover:bg-primary/90 px-6"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Score with Rubric
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 4: AI Scoring */}
        {currentStep === 'scoring' && (
          <motion.div
            key="scoring"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <AIThinkingAnimation message="Scoring your assignment and generating detailed feedback report..." />
          </motion.div>
        )}

        {/* Step 5: Complete */}
        {currentStep === 'complete' && (
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
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto mb-6 p-4 bg-green-500/10 rounded-full w-fit"
              >
                <CheckCircle className="h-12 w-12 text-green-500" />
              </motion.div>
              
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Scoring Complete!
              </h3>
              
              <p className="text-muted-foreground mb-6">
                Your assignment has been scored and a detailed report has been generated.
              </p>
              
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-sm text-muted-foreground"
              >
                Redirecting to your report...
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}