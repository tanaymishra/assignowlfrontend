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

  // Note: Redirect is now handled by grading-complete socket event

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
        
        // Continue with analysis progress - wait for rubric analysis
        setProgress(50);
      }
    };
    
    // Failure response - grading failed
    const handleGradingFailed = (error: any) => {
      console.error('Grading failed:', error);
      setError(error.error || 'Failed to start grading process');
      setCurrentStep('upload');
      setProcessing(false);
    };

    // Rubric found automatically - proceed to scoring
    const handleRubricFound = (response: any) => {
      console.log('Rubric found automatically:', response);
      setProgress(75);
      // Skip rubric step since rubric was found automatically - go straight to scoring
      setCurrentStep('scoring');
      // Wait for grading-complete event instead of simulating
    };

    // Rubric required - user needs to provide rubric or skip
    const handleRubricRequired = (response: any) => {
      console.log('Rubric required:', response);
      setProgress(60);
      // Show rubric section for user to provide rubric or skip
      setCurrentStep('rubric');
      setProcessing(false);
    };

    // Rubric submitted successfully
    const handleRubricSubmitted = (response: any) => {
      console.log('Rubric submitted successfully:', response);
      setProcessing(true);
      setCurrentStep('scoring');
      setProgress(75);
      // Wait for grading-complete event instead of simulating
    };

    // Rubric submission failed
    const handleRubricSubmitFailed = (error: any) => {
      console.error('Rubric submission failed:', error);
      setError(error.error || 'Failed to submit rubric');
      setProcessing(false);
      // Stay on rubric step for user to retry
    };

    // Grading completed - redirect to results
    const handleGradingComplete = (result: any) => {
      console.log('Grading completed for assignment:', result.assignmentId);
      setProgress(100);
      setCurrentStep('complete');
      setProcessing(false);
      
      // Redirect to results page after showing completion
      setTimeout(() => {
        router.push(`/results/${result.assignmentId}`);
      }, 2000); // Show completion for 2 seconds before redirect
    };

    // Final grading failed
    const handleFinalGradingFailed = (error: any) => {
      console.error('Final grading failed:', error);
      setError(error.error || 'Failed to complete grading process');
      setCurrentStep('rubric'); // Go back to rubric step to allow retry
      setProcessing(false);
    };
    
    // Register event listeners
    socket.on('assignment:grading-triggered', handleGradingTriggered);
    socket.on('assignment:grading-failed', handleGradingFailed);
    socket.on('assignment:rubric-found', handleRubricFound);
    socket.on('assignment:rubric-required', handleRubricRequired);
    socket.on('assignment:rubric-submitted', handleRubricSubmitted);
    socket.on('assignment:rubric-submit-failed', handleRubricSubmitFailed);
    socket.on('assignment:grading-complete', handleGradingComplete);
    socket.on('assignment:grading-failed', handleFinalGradingFailed);
    
    // Cleanup event listeners
    return () => {
      socket.off('assignment:grading-triggered', handleGradingTriggered);
      socket.off('assignment:grading-failed', handleGradingFailed);
      socket.off('assignment:rubric-found', handleRubricFound);
      socket.off('assignment:rubric-required', handleRubricRequired);
      socket.off('assignment:rubric-submitted', handleRubricSubmitted);
      socket.off('assignment:rubric-submit-failed', handleRubricSubmitFailed);
      socket.off('assignment:grading-complete', handleGradingComplete);
      socket.off('assignment:grading-failed', handleFinalGradingFailed);
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
    if (!socket) {
      setError('Socket connection not available. Please refresh the page.');
      return;
    }

    // Get assignment ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const assignmentId = urlParams.get('id');
    
    if (!assignmentId) {
      setError('Assignment ID not found. Please restart the process.');
      return;
    }
    
    try {
      setProcessing(true);
      setError(null);
      
      // Check if user provided a rubric file
      if (rubricFile?.uploaded && rubricFile.savedAs) {
        // User provided a rubric file - submit it
        const uploadBaseUrl = process.env.NEXT_PUBLIC_UPLOAD_URL || '';
        const rubricUrl = `${uploadBaseUrl}/rubrics/${rubricFile.savedAs}`;
        
        socket.emit('assignment:submit-rubric', {
          assignmentId: assignmentId,
          action: 'provide',
          rubricUrl: rubricUrl
        });
      } else {
        // No rubric file provided - skip rubric
        socket.emit('assignment:submit-rubric', {
          assignmentId: assignmentId,
          action: 'skip'
        });
      }
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to submit rubric');
      setProcessing(false);
    }
  };

  const skipRubric = async () => {
    if (!socket) {
      setError('Socket connection not available. Please refresh the page.');
      return;
    }

    // Get assignment ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const assignmentId = urlParams.get('id');
    
    if (!assignmentId) {
      setError('Assignment ID not found. Please restart the process.');
      return;
    }
    
    try {
      setProcessing(true);
      setError(null);
      
      // Skip rubric - no rubric file needed
      socket.emit('assignment:submit-rubric', {
        assignmentId: assignmentId,
        action: 'skip'
      });
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to skip rubric');
      setProcessing(false);
    }
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
            message="Analyzing your assignment and detecting rubric requirements..." 
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