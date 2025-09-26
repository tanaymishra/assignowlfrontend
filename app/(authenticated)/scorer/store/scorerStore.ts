import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Types
export type ScoringStep = 'upload' | 'analyzing' | 'rubric' | 'scoring' | 'complete';

export interface ScoringFile {
  file: File;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
  // Upload metadata (populated after successful upload)
  savedAs?: string;
  serverPath?: string;
  uploaded?: boolean;
  uploadError?: string;
}

export interface ScoringResult {
  overallScore: number;
  maxScore: number;
  percentage: number;
  feedback: string;
  criteria: {
    name: string;
    score: number;
    maxScore: number;
    feedback: string;
  }[];
  suggestions: string[];
  strengths: string[];
  weaknesses: string[];
  generatedAt: Date;
}

export interface ScorerState {
  // File management
  assignmentFile: ScoringFile | null;
  rubricFile: ScoringFile | null;
  
  // Scoring process
  currentStep: ScoringStep;
  isProcessing: boolean;
  
  // Guidelines and rubric
  guidelines: string;
  customRubric: string;
  
  // Results
  scoringResult: ScoringResult | null;
  
  // UI state
  error: string | null;
  progress: number;
  
  // Actions
  setAssignmentFile: (file: File | null) => void;
  setRubricFile: (file: File | null) => void;
  setCurrentStep: (step: ScoringStep) => void;
  setProcessing: (processing: boolean) => void;
  setGuidelines: (guidelines: string) => void;
  setCustomRubric: (rubric: string) => void;
  setScoringResult: (result: ScoringResult | null) => void;
  setError: (error: string | null) => void;
  setProgress: (progress: number) => void;
  
  // Upload status actions
  markAssignmentUploaded: (savedAs: string, serverPath: string) => void;
  markRubricUploaded: (savedAs: string, serverPath: string) => void;
  setAssignmentUploadError: (error: string) => void;
  setRubricUploadError: (error: string) => void;
  
  // Complex actions
  resetScorer: () => void;
  startNewScoring: () => void;
  clearFiles: () => void;
}

// Initial state
const initialState = {
  assignmentFile: null,
  rubricFile: null,
  currentStep: 'upload' as ScoringStep,
  isProcessing: false,
  guidelines: '',
  customRubric: '',
  scoringResult: null,
  error: null,
  progress: 0,
};

// Create the scorer store
export const useScorerStore = create<ScorerState>()(
  persist(
    (set, get) => ({
      ...initialState,

      // File setters
      setAssignmentFile: (file) => {
        if (file) {
          const scoringFile: ScoringFile = {
            file,
            name: file.name,
            size: file.size,
            type: file.type,
            uploadedAt: new Date(),
            uploaded: false,
          };
          set({ assignmentFile: scoringFile, error: null });
        } else {
          set({ assignmentFile: null });
        }
      },

      setRubricFile: (file) => {
        if (file) {
          const scoringFile: ScoringFile = {
            file,
            name: file.name,
            size: file.size,
            type: file.type,
            uploadedAt: new Date(),
            uploaded: false,
          };
          set({ rubricFile: scoringFile, error: null });
        } else {
          set({ rubricFile: null });
        }
      },

      // State setters
      setCurrentStep: (step) => set({ currentStep: step }),
      setProcessing: (processing) => set({ isProcessing: processing }),
      setGuidelines: (guidelines) => set({ guidelines }),
      setCustomRubric: (rubric) => set({ customRubric: rubric }),
      setScoringResult: (result) => set({ scoringResult: result }),
      setError: (error) => set({ error }),
      setProgress: (progress) => set({ progress }),

      // Upload status actions
      markAssignmentUploaded: (savedAs, serverPath) => {
        const current = get().assignmentFile;
        if (current) {
          set({
            assignmentFile: {
              ...current,
              savedAs,
              serverPath,
              uploaded: true,
              uploadError: undefined,
            }
          });
        }
      },

      markRubricUploaded: (savedAs, serverPath) => {
        const current = get().rubricFile;
        if (current) {
          set({
            rubricFile: {
              ...current,
              savedAs,
              serverPath,
              uploaded: true,
              uploadError: undefined,
            }
          });
        }
      },

      setAssignmentUploadError: (error) => {
        const current = get().assignmentFile;
        if (current) {
          set({
            assignmentFile: {
              ...current,
              uploaded: false,
              uploadError: error,
            }
          });
        }
      },

      setRubricUploadError: (error) => {
        const current = get().rubricFile;
        if (current) {
          set({
            rubricFile: {
              ...current,
              uploaded: false,
              uploadError: error,
            }
          });
        }
      },

      // Complex actions
      resetScorer: () => {
        set({
          ...initialState,
          // Keep guidelines and custom rubric as they might be reused
          guidelines: get().guidelines,
          customRubric: get().customRubric,
        });
      },

      startNewScoring: () => {
        set({
          ...initialState,
          guidelines: get().guidelines,
          customRubric: get().customRubric,
        });
      },

      clearFiles: () => {
        set({
          assignmentFile: null,
          rubricFile: null,
          error: null,
        });
      },
    }),
    {
      name: 'scorer-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Only persist certain fields (not files or processing state)
        guidelines: state.guidelines,
        customRubric: state.customRubric,
        // Don't persist files, processing state, or results
      }),
    }
  )
);

// Enhanced useScorer hook
export const useScorer = () => {
  const store = useScorerStore();
  
  return {
    // State
    assignmentFile: store.assignmentFile,
    rubricFile: store.rubricFile,
    currentStep: store.currentStep,
    isProcessing: store.isProcessing,
    guidelines: store.guidelines,
    customRubric: store.customRubric,
    scoringResult: store.scoringResult,
    error: store.error,
    progress: store.progress,
    
    // Computed state
    hasAssignmentFile: !!store.assignmentFile,
    hasRubricFile: !!store.rubricFile,
    canProceed: !!store.assignmentFile && !store.isProcessing,
    
    // Actions
    setAssignmentFile: store.setAssignmentFile,
    setRubricFile: store.setRubricFile,
    setCurrentStep: store.setCurrentStep,
    setProcessing: store.setProcessing,
    setGuidelines: store.setGuidelines,
    setCustomRubric: store.setCustomRubric,
    setScoringResult: store.setScoringResult,
    setError: store.setError,
    setProgress: store.setProgress,
    
    // Upload actions
    markAssignmentUploaded: store.markAssignmentUploaded,
    markRubricUploaded: store.markRubricUploaded,
    setAssignmentUploadError: store.setAssignmentUploadError,
    setRubricUploadError: store.setRubricUploadError,
    
    // Complex actions
    resetScorer: store.resetScorer,
    startNewScoring: store.startNewScoring,
    clearFiles: store.clearFiles,
  };
};

// Actions-only hook
export const useScorerActions = () => {
  const store = useScorerStore();
  return {
    setAssignmentFile: store.setAssignmentFile,
    setRubricFile: store.setRubricFile,
    setCurrentStep: store.setCurrentStep,
    setProcessing: store.setProcessing,
    setGuidelines: store.setGuidelines,
    setCustomRubric: store.setCustomRubric,
    setScoringResult: store.setScoringResult,
    setError: store.setError,
    setProgress: store.setProgress,
    resetScorer: store.resetScorer,
    startNewScoring: store.startNewScoring,
    clearFiles: store.clearFiles,
  };
};