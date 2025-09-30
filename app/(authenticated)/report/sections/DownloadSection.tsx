"use client";
import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReportStore, getScoreColor, getGradeFromScore } from "../store";
import { useSearchParams } from "next/navigation";

export function DownloadSection() {
  const { reportData, isDownloading, downloadPDFReport } = useReportStore();
  const searchParams = useSearchParams();

  const handleDownloadPDF = async () => {
    await downloadPDFReport();
  };

  if (!reportData) return null;

  const percentage = parseFloat(reportData.percentage);
  const grade = getGradeFromScore(percentage);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="bg-background/20 backdrop-blur-xl border border-border/20 rounded-2xl p-8 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/10 to-background/30 rounded-2xl" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-2xl" />
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "easeInOut"
            }}
            style={{
              left: `${30 + i * 20}%`,
              top: `${20 + i * 10}%`,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 text-center">
        <motion.h3 
          className="text-xl font-semibold text-foreground mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          Download Detailed Report
        </motion.h3>
        
        <motion.p 
          className="text-muted-foreground mb-8 text-sm max-w-md mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          Get a comprehensive PDF report with all scoring details, feedback, and recommendations.
        </motion.p>
        
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="bg-primary hover:bg-primary/90 px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isDownloading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="mr-3"
                  >
                    <Download className="h-5 w-5" />
                  </motion.div>
                  <motion.span
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    The owl is crafting your PDF...
                  </motion.span>
                </>
              ) : (
                <>
                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Download className="h-5 w-5 mr-3" />
                  </motion.div>
                  Download PDF Report
                </>
              )}
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Enhanced PDF preview */}
        <motion.div 
          className="relative max-w-sm mx-auto"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <div className="p-4 bg-background/40 backdrop-blur-sm border border-border/30 rounded-xl shadow-lg">
            <motion.div 
              className="aspect-[3/4] bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-xl flex items-center justify-center relative overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Paper texture */}
              <div className="absolute inset-0 opacity-5">
                <div className="w-full h-full bg-gradient-to-br from-gray-200 via-transparent to-gray-100" />
              </div>
              
              {/* Content preview lines */}
              <div className="absolute top-6 left-6 right-6 space-y-2">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-1 bg-gray-300 rounded"
                    style={{ width: `${Math.random() * 40 + 60}%` }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.2 + (i * 0.1), duration: 0.3 }}
                  />
                ))}
              </div>
              
              <div className="text-center text-gray-600 relative z-10">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <FileText className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                </motion.div>
                <p className="font-semibold text-gray-700">Assignment Report</p>
                <p className="text-sm text-gray-500 mt-2 truncate max-w-[120px]">
                  {reportData.title}
                </p>
                <motion.p 
                  className={`text-lg font-bold mt-2 ${getScoreColor(percentage)}`}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  Grade: {grade}
                </motion.p>
              </div>
            </motion.div>
            
            <motion.p 
              className="text-xs text-muted-foreground mt-3 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              PDF Report Preview - Click download to get the full detailed report
            </motion.p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}