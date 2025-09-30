import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Types for the grading history API
export interface HistoryAssignment {
  id: number;
  name: string;
  grade: string | null;
  status: 'graded' | 'pending' | 'processing';
  date: string;
}

export interface HistoryResponse {
  success: boolean;
  assignments: HistoryAssignment[];
}

export interface HistoryState {
  assignments: HistoryAssignment[];
  isLoading: boolean;
  isDownloading: boolean;
  error: string | null;
  fetchHistory: () => Promise<void>;
  downloadReport: (id: number) => Promise<void>;
  clearHistory: () => void;
  reset: () => void;
}

const initialState = {
  assignments: [],
  isLoading: false,
  isDownloading: false,
  error: null,
};

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      fetchHistory: async () => {
        set({ isLoading: true, error: null });
        
        try {
          const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
          const response = await fetch(`${baseUrl}/users/grading-history`, {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          if (!response.ok) {
            throw new Error(`Failed to fetch history: ${response.statusText}`);
          }
          
          const data: HistoryResponse = await response.json();
          
          if (data.success) {
            set({ assignments: data.assignments, error: null });
          } else {
            throw new Error('Failed to fetch grading history');
          }
        } catch (error) {
          console.error('Error fetching grading history:', error);
          set({ error: error instanceof Error ? error.message : 'Failed to fetch grading history' });
        } finally {
          set({ isLoading: false });
        }
      },
      
      downloadReport: async (id: number) => {
        set({ isDownloading: true });
        
        try {
          const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
          const downloadUrl = `${baseUrl}/users/getReport/${id}`;
          
          // Fetch the report with credentials
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
          
          // Create a temporary link to trigger download
          const link = document.createElement('a');
          link.href = url;
          link.download = `assignment-report-${id}.pdf`;
          link.style.display = 'none';
          
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          // Clean up the object URL
          window.URL.revokeObjectURL(url);
          
        } catch (error) {
          console.error('Error downloading report:', error);
          set({ error: error instanceof Error ? error.message : 'Failed to download report' });
        } finally {
          set({ isDownloading: false });
        }
      },
      
      clearHistory: () => {
        set({ assignments: [], error: null });
      },
      
      reset: () => {
        set(initialState);
      },
    }),
    {
      name: 'history-store',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        assignments: state.assignments,
      }),
    }
  )
);

// Helper function to get grade from score
export const getGradeFromHistoryScore = (grade: string | null): string => {
  if (!grade) return 'Pending';
  
  const score = parseFloat(grade);
  if (isNaN(score)) return 'Unknown';
  
  if (score >= 70) return 'Distinction';
  if (score >= 60) return 'Merit';
  if (score >= 50) return 'Just Pass';
  return 'Fail';
};

// Helper function to format date
export const formatHistoryDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
};

// Helper function to extract subject from filename
export const extractSubjectFromFileName = (fileName: string): string => {
  // Remove "Assignment Scoring - " prefix if present
  const cleanName = fileName.replace(/^Assignment Scoring - /, '');
  
  // Try to determine subject based on filename patterns
  const lowerName = cleanName.toLowerCase();
  
  if (lowerName.includes('dissertation') || lowerName.includes('thesis')) {
    return 'Research';
  } else if (lowerName.includes('case') || lowerName.includes('study')) {
    return 'Case Study';
  } else if (lowerName.includes('report')) {
    return 'Report';
  } else if (lowerName.includes('essay')) {
    return 'Essay';
  } else if (lowerName.includes('assignment')) {
    return 'Assignment';
  }
  
  return 'General';
};