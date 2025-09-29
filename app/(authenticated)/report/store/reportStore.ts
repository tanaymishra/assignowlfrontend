import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Types
export interface PartScore {
  section: string;
  maxScore: number;
  score: number;
  feedback: string;
}

export interface ReportData {
  success: boolean;
  assignmentId: number;
  title: string;
  submissionUrls: string[];
  guidelinesUrls: string[];
  totalMarks: number;
  earnedMarks: string;
  percentage: string;
  feedback: string;
  partScores: PartScore[];
  status: string;
  gradedAt: string;
  isCompleted: boolean;
}

export interface ReportState {
  // Current report data
  reportData: ReportData | null;
  currentId: string | null;
  
  // Loading states  
  isLoading: boolean;
  isDownloading: boolean;
  
  // Error handling
  error: string | null;
  
  // UI states
  currentTab: 'overview' | 'breakdown' | 'feedback';
  
  // Actions
  setReportData: (data: ReportData) => void;
  setLoading: (loading: boolean) => void;
  setDownloading: (downloading: boolean) => void;
  setError: (error: string | null) => void;
  setCurrentTab: (tab: 'overview' | 'breakdown' | 'feedback') => void;
  fetchReportData: (id: string) => Promise<void>;
  downloadPDFReport: () => Promise<void>;
  clearReport: () => void;
  reset: () => void;
}

const initialState = {
  reportData: null,
  currentId: null,
  isLoading: false,
  isDownloading: false,
  error: null,
  currentTab: 'overview' as const,
};

export const useReportStore = create<ReportState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      setReportData: (data: ReportData) => {
        set({ reportData: data, error: null });
      },
      
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
      
      setDownloading: (downloading: boolean) => {
        set({ isDownloading: downloading });
      },
      
      setError: (error: string | null) => {
        set({ error, isLoading: false });
      },
      
      setCurrentTab: (tab: 'overview' | 'breakdown' | 'feedback') => {
        set({ currentTab: tab });
      },
      
      fetchReportData: async (id: string) => {
        const { setLoading, setError, setReportData } = get();
        
        // Clear previous data when fetching new ID
        set({ reportData: null, currentId: id });
        setLoading(true);
        setError(null);
        
        try {
          const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
          const response = await fetch(`${baseUrl}/grading/results/${id}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          if (!response.ok) {
            throw new Error(`Failed to fetch report: ${response.statusText}`);
          }
          
          const data: ReportData = await response.json();
          setReportData(data);
        } catch (error) {
          console.error('Error fetching report data:', error);
          setError(error instanceof Error ? error.message : 'Failed to fetch report data');
        } finally {
          setLoading(false);
        }
      },
      
      downloadPDFReport: async () => {
        const { setDownloading } = get();
        
        setDownloading(true);
        
        // Simulate download delay for now
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // TODO: Implement actual PDF download endpoint later
        console.log("PDF download functionality will be implemented later");
        
        setDownloading(false);
      },
      
      clearReport: () => {
        set({ reportData: null, currentId: null, error: null });
      },
      
      reset: () => {
        set(initialState);
      },
    }),
    {
      name: 'report-store',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        reportData: state.reportData,
        currentId: state.currentId,
        currentTab: state.currentTab,
      }),
    }
  )
);

// Helper functions for score colors and styling
export const getScoreColor = (score: number): string => {
  if (score >= 90) return 'text-green-500';
  if (score >= 80) return 'text-blue-500'; 
  if (score >= 70) return 'text-orange-500';
  return 'text-red-500';
};

export const getScoreBgColor = (score: number): string => {
  if (score >= 90) return 'bg-green-500/10 border-green-500/20 text-green-600';
  if (score >= 80) return 'bg-blue-500/10 border-blue-500/20 text-blue-600';
  if (score >= 70) return 'bg-orange-500/10 border-orange-500/20 text-orange-600';
  return 'bg-red-500/10 border-red-500/20 text-red-600';
};

export const getGradeFromScore = (score: number): string => {
  if (score >= 97) return 'A+';
  if (score >= 93) return 'A';
  if (score >= 90) return 'A-';
  if (score >= 87) return 'B+';
  if (score >= 83) return 'B';
  if (score >= 80) return 'B-';
  if (score >= 77) return 'C+';
  if (score >= 73) return 'C';
  if (score >= 70) return 'C-';
  if (score >= 67) return 'D+';
  if (score >= 65) return 'D';
  return 'F';
};