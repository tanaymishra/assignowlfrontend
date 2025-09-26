"use client";

import { motion } from "framer-motion";
import { FileText, Trash2, SkipForward, Sparkles, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScorer } from "../store/scorerStore";
import { validateRubricFile, formatFileSize, getFileTypeDisplay } from "../logic";
import { useState } from "react";

interface RubricSectionProps {
  onProceedWithScoring: () => void;
  onSkipRubric: () => void;
}

export function RubricSection({ onProceedWithScoring, onSkipRubric }: RubricSectionProps) {
  const { 
    rubricFile, 
    setRubricFile, 
    guidelines,
    setGuidelines,
    customRubric,
    setCustomRubric,
    error,
    setError 
  } = useScorer();

  // Check for upload-specific errors
  const displayError = error || rubricFile?.uploadError;

  const [activeTab, setActiveTab] = useState<'upload' | 'custom' | 'guidelines'>('upload');

  const handleRubricUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validation = validateRubricFile(file);
    if (!validation.valid) {
      setError(validation.error || 'Invalid rubric file');
      return;
    }

    setRubricFile(file);
    setError(null);
  };

  const removeRubricFile = () => {
    setRubricFile(null);
    setError(null);
  };

  const canProceed = rubricFile || customRubric.trim() || guidelines.trim();

  return (
    <motion.div
      key="rubric"
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
            Scoring Rubric (Optional)
          </h2>
          <p className="text-muted-foreground text-sm">
            Provide a rubric for more accurate and customized scoring
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center">
          <div className="bg-background/30 backdrop-blur-sm border border-border/20 rounded-lg p-1 flex space-x-1">
            {[
              { id: 'upload', label: 'Upload File', icon: FileText },
              { id: 'custom', label: 'Custom Rubric', icon: Sparkles },
              { id: 'guidelines', label: 'Guidelines', icon: FileText },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-4">
          {/* Upload File Tab */}
          {activeTab === 'upload' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {!rubricFile ? (
                <div className="border-2 border-dashed border-border/30 rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    id="rubric-upload"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt,.rtf"
                    onChange={handleRubricUpload}
                  />
                  <label
                    htmlFor="rubric-upload"
                    className="cursor-pointer flex flex-col items-center space-y-3"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 bg-primary/10 rounded-full"
                    >
                      <FileText className="h-6 w-6 text-primary" />
                    </motion.div>
                    <div>
                      <p className="font-medium text-foreground">
                        Upload Rubric File
                      </p>
                      <p className="text-sm text-muted-foreground">
                        PDF, DOC, DOCX, TXT, RTF (max 10MB)
                      </p>
                    </div>
                  </label>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-background/30 backdrop-blur-sm border border-border/20 rounded-xl p-4"
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate">
                        {rubricFile.name}
                      </h3>
                      <div className="flex items-center space-x-3 mt-1 text-sm text-muted-foreground">
                        <span>{getFileTypeDisplay(rubricFile.type)}</span>
                        <span>•</span>
                        <span>{formatFileSize(rubricFile.size)}</span>
                        {rubricFile.uploaded && (
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
                      onClick={removeRubricFile}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Custom Rubric Tab */}
          {activeTab === 'custom' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <textarea
                value={customRubric}
                onChange={(e) => setCustomRubric(e.target.value)}
                placeholder="Enter your custom rubric criteria here...

Example:
• Content Quality (30 points): Demonstrates understanding, accuracy, depth
• Organization (25 points): Clear structure, logical flow, transitions
• Writing Quality (25 points): Grammar, style, clarity
• Citations (20 points): Proper format, credible sources, integration"
                className="w-full h-48 p-4 bg-background/50 backdrop-blur-sm border border-border/20 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Provide detailed scoring criteria to help the AI understand your expectations
              </p>
            </motion.div>
          )}

          {/* Guidelines Tab */}
          {activeTab === 'guidelines' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <textarea
                value={guidelines}
                onChange={(e) => setGuidelines(e.target.value)}
                placeholder="Enter additional scoring guidelines...

Example:
• Focus on critical thinking and analysis
• Penalize for lack of supporting evidence
• Reward creative solutions and original insights
• Consider formatting and presentation
• Emphasize clarity and conciseness"
                className="w-full h-48 p-4 bg-background/50 backdrop-blur-sm border border-border/20 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Additional instructions to guide the AI scoring process
              </p>
            </motion.div>
          )}

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

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 pt-4">
          <Button
            onClick={onSkipRubric}
            variant="outline"
            className="px-6"
          >
            <SkipForward className="h-4 w-4 mr-2" />
            Skip Rubric
          </Button>
          <Button
            onClick={onProceedWithScoring}
            disabled={!canProceed}
            className="bg-primary hover:bg-primary/90 px-6"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {canProceed ? 'Score Assignment' : 'Add Rubric First'}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}