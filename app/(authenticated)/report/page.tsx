"use client";
import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, AlertCircle } from "lucide-react";
import { useReportStore } from "./store";
import {
  HeaderSection,
  ScoreOverviewSection,
  ScoreBreakdownSection,
  FeedbackSection,
  DownloadSection
} from "./sections";

function ReportContent() {
  const searchParams = useSearchParams();
  const { reportData, currentId, isLoading, error, fetchReportData } = useReportStore();

  useEffect(() => {
    const id = searchParams?.get('id');
    console.log('Report page - ID from URL:', id);
    console.log('Current stored ID:', currentId);
    
    // Fetch data if:
    // 1. There's an ID in the URL
    // 2. AND either no current ID or the ID has changed
    if (id && (!currentId || currentId !== id)) {
      console.log('Fetching report data for ID:', id);
      fetchReportData(id);
    }
  }, [searchParams, currentId, fetchReportData]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="mb-4"
          >
            <Loader2 className="h-8 w-8 text-primary mx-auto" />
          </motion.div>
          <p className="text-muted-foreground">Loading assignment report...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center bg-background/20 backdrop-blur-xl border border-border/20 rounded-2xl p-8 max-w-md"
        >
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Error Loading Report</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button
            onClick={() => {
              const id = searchParams?.get('id');
              if (id) fetchReportData(id);
            }}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <p className="text-muted-foreground">No report data available.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <HeaderSection />

      {/* Score Overview */}
      <ScoreOverviewSection />

      {/* Score Breakdown */}
      <ScoreBreakdownSection />

      {/* Detailed Feedback */}
      <FeedbackSection />

      {/* PDF Download Section */}
      <DownloadSection />
    </div>
  );
}

export default function AssignmentReport() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="mb-4"
            >
              <Loader2 className="h-8 w-8 text-primary mx-auto" />
            </motion.div>
            <p className="text-muted-foreground">Loading assignment report...</p>
          </motion.div>
        </div>
      }
    >
      <ReportContent />
    </Suspense>
  );
}