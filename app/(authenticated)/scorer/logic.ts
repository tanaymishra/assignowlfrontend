import { ScoringResult } from './store/scorerStore';

// API endpoints
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

if (!BASE_URL) {
  throw new Error('NEXT_PUBLIC_BASE_URL environment variable is not set');
}

// Types for API requests
export interface AnalyzeAssignmentRequest {
  assignmentFile: File;
  guidelines?: string;
}

export interface ScoreAssignmentRequest {
  assignmentFile: File;
  rubricFile?: File;
  guidelines?: string;
  customRubric?: string;
}

export interface AnalysisResult {
  extractedText: string;
  wordCount: number;
  pageCount: number;
  detectedLanguage: string;
  complexity: 'low' | 'medium' | 'high';
  topics: string[];
  summary: string;
}

// Custom error class
export class ScorerError extends Error {
  constructor(
    message: string,
    public status: number = 0,
    public code?: string
  ) {
    super(message);
    this.name = 'ScorerError';
  }
}

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    credentials: 'include', // Include httpOnly cookies
    ...options,
    headers: {
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ScorerError(
        errorData.message || `HTTP error! status: ${response.status}`,
        response.status,
        errorData.code
      );
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    if (error instanceof ScorerError) {
      throw error;
    }
    
    // Handle network errors or other issues
    throw new ScorerError(
      'Network error. Please check your connection and try again.',
      0
    );
  }
}

// Create FormData for file uploads
function createFormData(data: Record<string, any>): FormData {
  const formData = new FormData();
  
  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });
  
  return formData;
}

// API functions

/**
 * Analyze assignment file to extract content and metadata
 */
export async function analyzeAssignment(
  request: AnalyzeAssignmentRequest
): Promise<AnalysisResult> {
  const formData = createFormData({
    assignment: request.assignmentFile,
    guidelines: request.guidelines,
  });

  return apiRequest<AnalysisResult>('/api/scorer/analyze', {
    method: 'POST',
    body: formData,
  });
}

/**
 * Score assignment with optional rubric
 */
export async function scoreAssignment(
  request: ScoreAssignmentRequest
): Promise<ScoringResult> {
  const formData = createFormData({
    assignment: request.assignmentFile,
    rubric: request.rubricFile,
    guidelines: request.guidelines,
    customRubric: request.customRubric,
  });

  const result = await apiRequest<any>('/api/scorer/score', {
    method: 'POST',
    body: formData,
  });

  // Transform API result to match our ScoringResult interface
  return {
    overallScore: result.overallScore,
    maxScore: result.maxScore,
    percentage: result.percentage,
    feedback: result.feedback,
    criteria: result.criteria || [],
    suggestions: result.suggestions || [],
    strengths: result.strengths || [],
    weaknesses: result.weaknesses || [],
    generatedAt: new Date(result.generatedAt || Date.now()),
  };
}

/**
 * Get scoring history for the current user
 */
export async function getScoringHistory(): Promise<ScoringResult[]> {
  const results = await apiRequest<any[]>('/api/scorer/history', {
    method: 'GET',
  });

  return results.map(result => ({
    overallScore: result.overallScore,
    maxScore: result.maxScore,
    percentage: result.percentage,
    feedback: result.feedback,
    criteria: result.criteria || [],
    suggestions: result.suggestions || [],
    strengths: result.strengths || [],
    weaknesses: result.weaknesses || [],
    generatedAt: new Date(result.generatedAt),
  }));
}

/**
 * Save scoring result
 */
export async function saveScoringResult(
  result: ScoringResult,
  assignmentName: string
): Promise<{ id: string; message: string }> {
  return apiRequest<{ id: string; message: string }>('/api/scorer/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      result,
      assignmentName,
    }),
  });
}

/**
 * Delete a saved scoring result
 */
export async function deleteScoringResult(id: string): Promise<{ message: string }> {
  return apiRequest<{ message: string }>(`/api/scorer/delete/${id}`, {
    method: 'DELETE',
  });
}

// Utility functions

/**
 * Validate file type for assignment
 */
export function validateAssignmentFile(file: File): { valid: boolean; error?: string } {
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'text/rtf',
  ];

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Please upload a PDF, DOC, DOCX, TXT, or RTF file.',
    };
  }

  // Check file size (max 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'File size must be less than 10MB.',
    };
  }

  return { valid: true };
}

/**
 * Validate file type for rubric
 */
export function validateRubricFile(file: File): { valid: boolean; error?: string } {
  // Same validation as assignment file for now
  return validateAssignmentFile(file);
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Get file type display name
 */
export function getFileTypeDisplay(type: string): string {
  const typeMap: Record<string, string> = {
    'application/pdf': 'PDF',
    'application/msword': 'Word Document',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Word Document',
    'text/plain': 'Text File',
    'text/rtf': 'Rich Text Document',
  };

  return typeMap[type] || 'Document';
}

/**
 * Calculate scoring progress based on current step
 */
export function calculateProgress(step: string): number {
  const stepProgress: Record<string, number> = {
    upload: 0,
    analyzing: 25,
    rubric: 50,
    scoring: 75,
    complete: 100,
  };

  return stepProgress[step] || 0;
}

/**
 * Simulate processing delay (for development/demo)
 */
export function simulateProcessing(minMs: number = 1000, maxMs: number = 3000): Promise<void> {
  const delay = Math.random() * (maxMs - minMs) + minMs;
  return new Promise(resolve => setTimeout(resolve, delay));
}