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
          const response = await fetch(`${baseUrl}/users/results/${id}`, {
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
        const { setDownloading, currentId } = get();
        
        if (!currentId) {
          console.error('No report ID available for download');
          return;
        }
        
        setDownloading(true);
        
        try {
          const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
          const downloadUrl = `${baseUrl}/users/getReport/${currentId}`;
          
          // Create a temporary link to trigger download
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = `assignment-report-${currentId}.pdf`;
          link.style.display = 'none';
          
          // Add credentials for authenticated request
          const response = await fetch(downloadUrl, {
            method: 'GET',
            credentials: 'include',
          });
          
          if (!response.ok) {
            throw new Error(`Download failed: ${response.statusText}`);
          }
          
          // Get the blob and create download link
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          link.href = url;
          
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          // Clean up the object URL
          window.URL.revokeObjectURL(url);
          
        } catch (error) {
          console.error('Error downloading report:', error);
        } finally {
          setDownloading(false);
        }
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
  if (score >= 70) return 'text-green-500'; // Distinction
  if (score >= 60) return 'text-blue-500';  // Merit
  if (score >= 50) return 'text-orange-500'; // Just pass
  return 'text-red-500'; // Fail
};

export const getScoreBgColor = (score: number): string => {
  if (score >= 70) return 'bg-green-500/10 border-green-500/20 text-green-600'; // Distinction
  if (score >= 60) return 'bg-blue-500/10 border-blue-500/20 text-blue-600';   // Merit
  if (score >= 50) return 'bg-orange-500/10 border-orange-500/20 text-orange-600'; // Just pass
  return 'bg-red-500/10 border-red-500/20 text-red-600'; // Fail
};

export const getGradeFromScore = (score: number): string => {
  if (score >= 70) return 'Distinction';
  if (score >= 60) return 'Merit';
  if (score >= 50) return 'Just Pass';
  return 'Fail';
};