"use client";
import { motion } from "framer-motion";
import { 
  Download, 
  FileText, 
  CheckCircle, 
  TrendingUp, 
  Clock, 
  Star
} from "lucide-react";
import { useReportStore, getScoreColor, getScoreBgColor, getGradeFromScore } from "../store";
import { useMemo } from "react";

export function ScoreOverviewSection() {
  const { reportData } = useReportStore();

  const processedData = useMemo(() => {
    if (!reportData) return null;

    const earnedMarks = parseFloat(reportData.earnedMarks);
    const percentage = parseFloat(reportData.percentage);
    const grade = getGradeFromScore(percentage);

    return {
      earnedMarks,
      percentage,
      grade,
      totalMarks: reportData.totalMarks,
      title: reportData.title,
      gradedAt: new Date(reportData.gradedAt).toLocaleDateString(),
      status: reportData.status,
    };
  }, [reportData]);

  if (!processedData) {
    return (
      <div className="bg-background/20 backdrop-blur-xl border border-border/20 rounded-2xl p-6 shadow-2xl">
        <div className="animate-pulse">
          <div className="h-8 bg-muted/20 rounded mb-4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 text-center">
              <div className="w-32 h-32 bg-muted/20 rounded-full mx-auto mb-4"></div>
              <div className="h-6 bg-muted/20 rounded mb-2"></div>
              <div className="h-4 bg-muted/20 rounded"></div>
            </div>
            <div className="lg:col-span-2 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="h-4 bg-muted/20 rounded"></div>
                  <div className="h-4 bg-muted/20 rounded"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-muted/20 rounded"></div>
                  <div className="h-4 bg-muted/20 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="bg-background/20 backdrop-blur-xl border border-border/20 rounded-2xl p-6 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/10 to-background/30 rounded-2xl" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-2xl" />
      
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-primary/5 to-transparent"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeInOut"
            }}
            style={{
              left: `${20 + i * 20}%`,
              top: `${10 + i * 15}%`,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Score */}
          <div className="lg:col-span-1 text-center">
            <motion.div
              className="relative inline-block mb-6"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                delay: 0.4, 
                duration: 1.2, 
                ease: [0.22, 1, 0.36, 1],
                type: "spring",
                stiffness: 100
              }}
            >
              {/* Outer glow ring */}
              <motion.div
                className={`absolute inset-0 w-36 h-36 rounded-full ${getScoreBgColor(processedData.percentage)} opacity-20`}
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Main score circle */}
              <motion.div
                className={`relative w-32 h-32 rounded-full border-4 ${getScoreBgColor(processedData.percentage)} flex items-center justify-center backdrop-blur-sm`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated progress ring */}
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-muted/20"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={getScoreColor(processedData.percentage)}
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: processedData.percentage / 100 }}
                    transition={{ duration: 2, delay: 0.8, ease: "easeOut" }}
                    style={{
                      pathLength: processedData.percentage / 100,
                      strokeDasharray: "283", // 2 * π * 45
                    }}
                  />
                </svg>
                
                <div className="text-center relative z-10">
                  <motion.div 
                    className={`text-3xl font-bold ${getScoreColor(processedData.percentage)}`}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5, duration: 0.3 }}
                    >
                      {processedData.earnedMarks}
                    </motion.span>
                  </motion.div>
                  <motion.div 
                    className="text-sm text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.7, duration: 0.3 }}
                  >
                    / {processedData.totalMarks}
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className={`text-2xl font-bold mb-4 ${getScoreColor(processedData.percentage)}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.5 }}
            >
              Grade: {processedData.grade}
            </motion.div>
            
            <motion.div 
              className="flex items-center justify-center space-x-2 text-sm text-muted-foreground"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2, duration: 0.4 }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <CheckCircle className="h-4 w-4 text-green-500" />
              </motion.div>
              <span>Scoring Complete</span>
            </motion.div>
          </div>

          {/* Assignment Details */}
          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">Assignment</span>
                </div>
                <p className="text-sm text-muted-foreground pl-6">{processedData.title}</p>
                
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">Status</span>
                </div>
                <p className="text-sm text-muted-foreground pl-6 capitalize">{processedData.status}</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">Percentage</span>
                </div>
                <p className="text-sm text-muted-foreground pl-6">{processedData.percentage}%</p>
                
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">Graded Date</span>
                </div>
                <p className="text-sm text-muted-foreground pl-6">{processedData.gradedAt}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}