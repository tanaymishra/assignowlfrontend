"use client";

import { motion } from "framer-motion";
import { Upload, FileText, Trash2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScorer } from "../store/scorerStore";
import { validateAssignmentFile, formatFileSize, getFileTypeDisplay } from "../logic";
import { uploadFile } from "@/lib/upload";
import { useState } from "react";

interface FileUploadSectionProps {
  onStartAnalysis: () => void;
}

export function FileUploadSection({ onStartAnalysis }: FileUploadSectionProps) {
  const { 
    assignmentFile, 
    setAssignmentFile, 
    error, 
    setError,
    canProceed,
    markAssignmentUploaded,
    setAssignmentUploadError,
    guidelines,
    setGuidelines
  } = useScorer();

  const [isUploading, setIsUploading] = useState(false);

  // Check for upload-specific errors
  const displayError = error || assignmentFile?.uploadError;

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file
    const validation = validateAssignmentFile(file);
    if (!validation.valid) {
      setError(validation.error || 'Invalid file');
      return;
    }

    // Add file to state first
    setAssignmentFile(file);
    setError(null);
    setAssignmentUploadError(null);

    // Upload immediately
    setIsUploading(true);
    try {
      const uploadedFile = await uploadFile('assignments', file);
      markAssignmentUploaded(uploadedFile.savedAs);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      setAssignmentUploadError(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = () => {
    setAssignmentFile(null);
    setError(null);
  };

  return (
    <motion.div
      key="upload"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="bg-background/20 backdrop-blur-xl border border-border/20 rounded-2xl p-8 shadow-2xl relative overflow-hidden"
    >
      {/* Glassy overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/10 to-background/30 rounded-2xl" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-2xl" />
      
      <div className="relative z-10 space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Upload Assignment & Guidelines
          </h2>
          <p className="text-muted-foreground text-sm">
            Upload your assignment file and provide any specific guidelines for AI-powered scoring
          </p>
        </div>

        {/* File Upload Area */}
        <div className="space-y-4">
          {!assignmentFile ? (
            <div className="border-2 border-dashed border-border/30 rounded-xl p-8 text-center hover:border-primary/50 transition-colors">
              <input
                type="file"
                id="assignment-upload"
                className="hidden"
                accept=".pdf,.doc,.docx,.txt,.rtf"
                onChange={handleFileUpload}
              />
              <label
                htmlFor="assignment-upload"
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
                  <p className="font-medium text-foreground mb-1">
                    Click to upload assignment
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Supports PDF, DOC, DOCX, TXT, RTF files (max 10MB)
                  </p>
                </div>
              </label>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-background/30 backdrop-blur-sm border border-border/20 rounded-xl p-6"
            >
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground truncate">
                    {assignmentFile.name}
                  </h3>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                    <span>{getFileTypeDisplay(assignmentFile.type)}</span>
                    <span>•</span>
                    <span>{formatFileSize(assignmentFile.size)}</span>
                    <span>•</span>
                    <span>Added {assignmentFile.uploadedAt.toLocaleTimeString()}</span>
                    {isUploading && (
                      <>
                        <span>•</span>
                        <span className="text-blue-600 dark:text-blue-400 flex items-center space-x-1">
                          <Loader2 className="h-3 w-3 animate-spin" />
                          <span>Uploading...</span>
                        </span>
                      </>
                    )}
                    {!isUploading && assignmentFile.uploaded && (
                      <>
                        <span>•</span>
                        <span className="text-green-600 dark:text-green-400">Uploaded to server</span>
                      </>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={removeFile}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Guidelines Section */}
          <div className="space-y-3">
            <label htmlFor="guidelines" className="block text-sm font-medium text-foreground">
              Guidelines (Optional)
            </label>
            <textarea
              id="guidelines"
              value={guidelines}
              onChange={(e) => setGuidelines(e.target.value)}
              placeholder="Enter any specific guidelines or criteria for scoring this assignment...

Examples:
• Focus on critical thinking and analysis
• Penalize for lack of supporting evidence
• Reward creative solutions and original insights
• Consider formatting and presentation
• Emphasize clarity and conciseness"
              className="w-full h-32 p-3 bg-background/50 backdrop-blur-sm border border-border/20 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Provide specific instructions to guide the AI scoring process
            </p>
          </div>

          {/* Error Display */}
          {displayError && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-2 text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-3"
            >
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <p className="text-sm">{displayError}</p>
            </motion.div>
          )}
        </div>

        {/* Action Button */}
        <div className="flex justify-center pt-4">
          <Button
            onClick={onStartAnalysis}
            disabled={!assignmentFile?.uploaded || isUploading}
            className="bg-primary hover:bg-primary/90 px-8 py-2"
            size="lg"
          >
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Upload className="h-4 w-4" />
              <span>Start Analysis</span>
            </motion.div>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}