"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useScorer } from "./store/scorerStore";
import { analyzeAssignment, scoreAssignment } from "./logic";
import { useSocket } from "@/lib/socket";
import { 
  ProgressSteps, 
  FileUploadSection, 
  AIThinkingAnimation, 
  RubricSection, 
  CompletionSection 
} from "./sections";

export default function AssignmentScorer() {
  const router = useRouter();
  const { socket } = useSocket();
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

  // Check for existing assignment ID in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const assignmentId = urlParams.get('id');
    if (assignmentId) {
      console.log('Found existing assignment ID:', assignmentId);
      // You could fetch assignment status or handle accordingly
    }
  }, []);

  // Effect to handle automatic redirects and cleanup  
  useEffect(() => {
    if (currentStep === 'complete') {
      const timer = setTimeout(() => {
        router.push('/report');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, router]);

  // Effect to handle socket events for grading
  useEffect(() => {
    if (!socket) return;
    
    // Success response - assignment grading triggered
    const handleGradingTriggered = (response: any) => {
      console.log('Grading triggered:', response);
      if (response.success && response.assignmentId) {
        // Update URL with assignment ID
        const url = new URL(window.location.href);
        url.searchParams.set('id', response.assignmentId.toString());
        window.history.replaceState({}, '', url.toString());
        
        // Continue with analysis progress
        setProgress(50);
        // You can add more progress updates or transition to next step here
        setTimeout(() => {
          setCurrentStep('rubric');
          setProcessing(false);
        }, 2000); // Simulate some processing time
      }
    };
    
    // Failure response - grading failed
    const handleGradingFailed = (error: any) => {
      console.error('Grading failed:', error);
      setError(error.error || 'Failed to start grading process');
      setCurrentStep('upload');
      setProcessing(false);
    };
    
    // Register event listeners
    socket.on('assignment:grading-triggered', handleGradingTriggered);
    socket.on('assignment:grading-failed', handleGradingFailed);
    
    // Cleanup event listeners
    return () => {
      socket.off('assignment:grading-triggered', handleGradingTriggered);
      socket.off('assignment:grading-failed', handleGradingFailed);
    };
  }, [socket, setError, setCurrentStep, setProcessing, setProgress]);

  const startAnalysis = async () => {
    if (!assignmentFile || !assignmentFile.uploaded || !assignmentFile.savedAs) return;
    
    if (!socket) {
      setError('Socket connection not available. Please refresh the page.');
      return;
    }
    
    try {
      setProcessing(true);
      setError(null);
      
      // Build the URLs using NEXT_PUBLIC_UPLOAD_URL and savedAs filenames
      const uploadBaseUrl = process.env.NEXT_PUBLIC_UPLOAD_URL || '';
      const assignmentUrl = [`${uploadBaseUrl}/assignments/${assignmentFile.savedAs}`];
      
      // Build guidelines URLs - include both guidelines text and rubric file if available
      const guidelinesUrl: string[] = [];
      if (rubricFile?.uploaded && rubricFile.savedAs) {
        guidelinesUrl.push(`${uploadBaseUrl}/rubrics/${rubricFile.savedAs}`);
      }
      if (guidelines?.trim()) {
        // For text guidelines, we could create a temporary file or pass as metadata
        // For now, we'll need to handle this in the socket payload
      }
      
      // Ensure we have at least something for guidelines
      if (guidelinesUrl.length === 0 && !guidelines?.trim()) {
        guidelinesUrl.push(''); // Backend expects at least one URL, even if empty
      }
      
      // Trigger grading via socket
      socket.emit('assignment:trigger-grading', {
        assignmentUrl,
        guidelinesUrl,
        title: `Assignment Scoring - ${assignmentFile.name}`,
        guidelines: guidelines || undefined // Pass text guidelines as metadata
      });
      
      setCurrentStep('analyzing');
      setProgress(25);
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to start grading');
      setProcessing(false);
    }
  };

  const proceedWithScoring = async () => {
    if (!assignmentFile || !assignmentFile.uploaded || !assignmentFile.savedAs) return;
    
    try {
      setProcessing(true);
      setCurrentStep('scoring');
      setProgress(75);
      
      // Score the already uploaded assignment
      const scoringResult = await scoreAssignment({
        assignmentFileName: assignmentFile.savedAs,
        rubricFileName: rubricFile?.uploaded ? rubricFile.savedAs : undefined,
        guidelines: guidelines || undefined,
        customRubric: customRubric || undefined,
      });
      
      setScoringResult(scoringResult);
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