"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useScorer } from "./store/scorerStore";
import { uploadAndAnalyzeAssignment, uploadAndScoreAssignment } from "./logic";
import { 
  ProgressSteps, 
  FileUploadSection, 
  AIThinkingAnimation, 
  RubricSection, 
  CompletionSection 
} from "./sections";

export default function AssignmentScorer() {
  const router = useRouter();
  const {
    currentStep,
    setCurrentStep,
    setProcessing,
    isProcessing,
    assignmentFile,
    rubricFile,
    guidelines,
    customRubric,
    setScoringResult,
    setError,
    setProgress,
    progress,
  } = useScorer();

  // Effect to handle automatic redirects and cleanup
  useEffect(() => {
    if (currentStep === 'complete') {
      const timer = setTimeout(() => {
        router.push('/report');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, router]);

  const startAnalysis = async () => {
    if (!assignmentFile) return;
    
    try {
      setProcessing(true);
      setCurrentStep('analyzing');
      setProgress(25);
      
      // Upload and analyze assignment
      await uploadAndAnalyzeAssignment(
        assignmentFile.file,
        guidelines || undefined,
        (progress) => setProgress(25 + (progress * 0.25)) // Progress from 25% to 50%
      );
      
      setProgress(50);
      setCurrentStep('rubric');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Analysis failed');
      setCurrentStep('upload');
    } finally {
      setProcessing(false);
    }
  };

  const proceedWithScoring = async () => {
    if (!assignmentFile) return;
    
    try {
      setProcessing(true);
      setCurrentStep('scoring');
      setProgress(75);
      
      // Upload and score assignment
      const result = await uploadAndScoreAssignment(
        assignmentFile.file,
        rubricFile?.file,
        guidelines || undefined,
        customRubric || undefined,
        (progress) => setProgress(75 + (progress * 0.25)) // Progress from 75% to 100%
      );
      
      setScoringResult(result.scoringResult);
      setProgress(100);
      setCurrentStep('complete');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Scoring failed');
      setCurrentStep('rubric');
    } finally {
      setProcessing(false);
    }
  };

  const skipRubric = () => {
    proceedWithScoring();
  };

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
      <ProgressSteps currentStep={currentStep} />

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {/* Step 1: Upload Assignment */}
        {currentStep === 'upload' && (
          <FileUploadSection onStartAnalysis={startAnalysis} />
        )}

        {/* Step 2: AI Analyzing */}
        {currentStep === 'analyzing' && (
          <AIThinkingAnimation 
            message="Analyzing your assignment content, structure, and quality..." 
            progress={progress}
          />
        )}

        {/* Step 3: Rubric Option */}
        {currentStep === 'rubric' && (
          <RubricSection 
            onProceedWithScoring={proceedWithScoring}
            onSkipRubric={skipRubric}
          />
        )}

        {/* Step 4: AI Scoring */}
        {currentStep === 'scoring' && (
          <AIThinkingAnimation 
            message="Scoring your assignment and generating detailed feedback report..." 
            progress={progress}
          />
        )}

        {/* Step 5: Complete */}
        {currentStep === 'complete' && (
          <CompletionSection />
        )}
      </AnimatePresence>
    </div>
  );
}