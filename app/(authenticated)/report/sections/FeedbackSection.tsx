"use client";
import { motion } from "framer-motion";
import { CheckCircle, TrendingUp, MessageSquare } from "lucide-react";
import { useReportStore } from "../store";
import { useMemo } from "react";

export function FeedbackSection() {
  const { reportData } = useReportStore();

  const parsedFeedback = useMemo(() => {
    if (!reportData?.feedback) return null;

    try {
      // Try to parse the feedback as JSON first
      const parsed = JSON.parse(reportData.feedback);
      return {
        feedback: parsed.feedback || "",
        suggestions: parsed.suggestions || "",
        strengths: [], // You can add logic to extract strengths if available
        improvements: [], // You can add logic to extract improvements if available
      };
    } catch {
      // If not JSON, treat as plain text
      return {
        feedback: reportData.feedback,
        suggestions: "",
        strengths: [],
        improvements: [],
      };
    }
  }, [reportData?.feedback]);

  if (!parsedFeedback) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-background/20 backdrop-blur-xl border border-border/20 rounded-2xl p-6 shadow-2xl relative overflow-hidden"
        >
          <div className="animate-pulse">
            <div className="h-6 bg-muted/20 rounded mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-muted/20 rounded"></div>
              <div className="h-4 bg-muted/20 rounded"></div>
              <div className="h-4 bg-muted/20 rounded w-3/4"></div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Overall Feedback */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-background/20 backdrop-blur-xl border border-border/20 rounded-2xl p-6 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/10 to-background/30 rounded-2xl" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-2xl" />
        
        <div className="relative z-10">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <MessageSquare className="h-5 w-5 text-primary mr-2" />
            Overall Feedback
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {parsedFeedback.feedback}
          </p>
        </div>
      </motion.div>

      {/* Suggestions */}
      {parsedFeedback.suggestions && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-background/20 backdrop-blur-xl border border-border/20 rounded-2xl p-6 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/10 to-background/30 rounded-2xl" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent rounded-2xl" />
          
          <div className="relative z-10">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
              Suggestions for Improvement
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {parsedFeedback.suggestions}
            </p>
          </div>
        </motion.div>
      )}

      {/* Strengths - if available */}
      {parsedFeedback.strengths && parsedFeedback.strengths.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-background/20 backdrop-blur-xl border border-border/20 rounded-2xl p-6 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/10 to-background/30 rounded-2xl" />
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent rounded-2xl" />
          
          <div className="relative z-10">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              Strengths
            </h3>
            <ul className="space-y-2">
              {parsedFeedback.strengths.map((strength, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                  {strength}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* Areas for Improvement - if available */}
      {parsedFeedback.improvements && parsedFeedback.improvements.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-background/20 backdrop-blur-xl border border-border/20 rounded-2xl p-6 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/10 to-background/30 rounded-2xl" />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent rounded-2xl" />
          
          <div className="relative z-10">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 text-orange-500 mr-2" />
              Areas for Improvement
            </h3>
            <ul className="space-y-2">
              {parsedFeedback.improvements.map((improvement, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                  {improvement}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
}