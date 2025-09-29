// Generic file upload utility
const UPLOAD_URL = process.env.NEXT_PUBLIC_UPLOAD_URL;

if (!UPLOAD_URL) {
  console.warn('NEXT_PUBLIC_UPLOAD_URL environment variable is not set');
}

// Types for upload API
export interface UploadRequest {
  folder: string;
  files: File[];
}

export interface UploadedFile {
  originalName: string;
  savedAs: string;
  folder: string;
  path: string;
  size: number;
  mimetype: string;
  s3Location: string | null;
  s3Uploaded: boolean;
}

export interface UploadResponse {
  success: boolean;
  totalFiles: number;
  successfulUploads: number;
  failedUploads: number;
  files: UploadedFile[];
  errors: string[];
}

export class UploadError extends Error {
  constructor(
    message: string,
    public status: number = 0,
    public response?: unknown
  ) {
    super(message);
    this.name = 'UploadError';
  }
}

/**
 * Generic file upload function
 * @param folder - The folder where files should be uploaded
 * @param files - Array of files to upload
 * @returns Promise<UploadResponse>
 */
export async function uploadFiles(
  folder: string, 
  files: File[]
): Promise<UploadResponse> {
  if (!UPLOAD_URL) {
    throw new UploadError('Upload URL not configured', 0);
  }

  if (!files || files.length === 0) {
    throw new UploadError('No files provided for upload', 400);
  }

  // Validate files
  for (const file of files) {
    if (!file || !(file instanceof File)) {
      throw new UploadError('Invalid file provided', 400);
    }
  }

  try {
    // Create FormData
    const formData = new FormData();
    
    // Add folder to form data
    formData.append('folder', folder);
    
    // Add all files to form data
    files.forEach((file, index) => {
      formData.append('files', file);
    });

    // Make the upload request
    const response = await fetch(UPLOAD_URL, {
      method: 'POST',
      credentials: 'include', // Include httpOnly cookies
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new UploadError(
        errorData.message || `Upload failed with status: ${response.status}`,
        response.status,
        errorData
      );
    }

    const result: UploadResponse = await response.json();
    
    // Validate the response structure
    if (!result.hasOwnProperty('success') || !Array.isArray(result.files)) {
      throw new UploadError('Invalid response format from upload server', 0, result);
    }

    return result;
  } catch (error) {
    if (error instanceof UploadError) {
      throw error;
    }
    
    // Handle network errors or other issues
    throw new UploadError(
      error instanceof Error ? error.message : 'Upload failed due to network error',
      0
    );
  }
}

/**
 * Upload a single file
 * @param folder - The folder where file should be uploaded
 * @param file - File to upload
 * @returns Promise<UploadedFile>
 */
export async function uploadFile(
  folder: string, 
  file: File
): Promise<UploadedFile> {
  const result = await uploadFiles(folder, [file]);
  
  if (result.files.length === 0) {
    throw new UploadError('No files were uploaded successfully', 0, result);
  }
  
  return result.files[0];
}

/**
 * Get file extension from filename
 */
export function getFileExtension(filename: string): string {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
}

/**
 * Get MIME type category
 */
export function getMimeTypeCategory(mimetype: string): string {
  if (mimetype.startsWith('image/')) return 'image';
  if (mimetype.startsWith('video/')) return 'video';
  if (mimetype.startsWith('audio/')) return 'audio';
  if (mimetype.includes('pdf')) return 'pdf';
  if (mimetype.includes('word') || mimetype.includes('document')) return 'document';
  if (mimetype.includes('text')) return 'text';
  return 'other';
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Validate file before upload
 */
export function validateFileForUpload(
  file: File,
  maxSizeBytes: number = 10 * 1024 * 1024, // 10MB default
  allowedTypes: string[] = []
): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: 'No file provided' };
  }

  if (file.size > maxSizeBytes) {
    return { 
      valid: false, 
      error: `File size (${formatFileSize(file.size)}) exceeds maximum allowed size (${formatFileSize(maxSizeBytes)})` 
    };
  }

  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    return { 
      valid: false, 
      error: `File type ${file.type} is not allowed. Allowed types: ${allowedTypes.join(', ')}` 
    };
  }

  return { valid: true };
}