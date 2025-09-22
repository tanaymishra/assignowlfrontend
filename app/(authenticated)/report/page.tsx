"use client";
import { motion } from "framer-motion";
import { 
  Download, 
  FileText, 
  CheckCircle, 
  TrendingUp, 
  Clock, 
  Star,
  ArrowLeft,
  Share2,
  Printer
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AssignmentReport() {
  const router = useRouter();
  const [isDownloading, setIsDownloading] = useState(false);

  // Mock report data - in real app this would come from API/props
  const reportData = {
    fileName: "React_Component_Analysis.pdf",
    subject: "Computer Science",
    submissionDate: "2024-01-20",
    scoringDate: "2024-01-20",
    totalScore: 87,
    maxScore: 100,
    grade: "A-",
    timeSpent: "2 minutes",
    rubricUsed: false,
    breakdown: [
      {
        category: "Content Quality",
        score: 38,
        maxScore: 40,
        percentage: 95,
        feedback: "Excellent understanding of React concepts. Clear explanations of component lifecycle and hooks usage."
      },
      {
        category: "Structure & Organization",
        score: 17,
        maxScore: 20,
        percentage: 85,
        feedback: "Well-organized content with logical flow. Could benefit from clearer section headings."
      },
      {
        category: "Technical Accuracy",
        score: 18,
        maxScore: 20,
        percentage: 90,
        feedback: "Code examples are accurate and demonstrate good practices. Minor syntax improvements suggested."
      },
      {
        category: "Writing Quality",
        score: 14,
        maxScore: 20,
        percentage: 70,
        feedback: "Generally clear writing. Some grammatical errors and could use more concise explanations."
      }
    ],
    overallFeedback: "This is a strong assignment that demonstrates a solid understanding of React components and their lifecycle. The technical content is accurate and well-researched. The code examples provided are practical and show good programming practices. To improve further, focus on writing clarity and organization. Consider adding more detailed explanations for complex concepts and ensure consistent formatting throughout the document.",
    strengths: [
      "Comprehensive coverage of React concepts",
      "Practical code examples",
      "Good use of technical terminology",
      "Clear understanding of component lifecycle"
    ],
    improvements: [
      "Improve writing clarity and grammar",
      "Add more detailed section headings",
      "Include more real-world examples",
      "Consistent code formatting"
    ]
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    // Simulate download delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsDownloading(false);
    
    // In real app, this would trigger actual PDF download
    console.log("Downloading PDF report...");
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-500";
    if (percentage >= 80) return "text-blue-500";
    if (percentage >= 70) return "text-orange-500";
    return "text-red-500";
  };

  const getScoreBgColor = (percentage: number) => {
    if (percentage >= 90) return "bg-green-500/10 border-green-500/20";
    if (percentage >= 80) return "bg-blue-500/10 border-blue-500/20";
    if (percentage >= 70) return "bg-orange-500/10 border-orange-500/20";
    return "bg-red-500/10 border-red-500/20";
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0"
      >
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="tap-target"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Assignment Report</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Detailed scoring and feedback for {reportData.fileName}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="tap-target">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm" className="tap-target">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>
      </motion.div>

      {/* Score Overview */}
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
                  className={`absolute inset-0 w-36 h-36 rounded-full ${getScoreBgColor(reportData.totalScore)} opacity-20`}
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
                  className={`relative w-32 h-32 rounded-full border-4 ${getScoreBgColor(reportData.totalScore)} flex items-center justify-center backdrop-blur-sm`}
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
                      className={getScoreColor(reportData.totalScore)}
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: reportData.totalScore / 100 }}
                      transition={{ duration: 2, delay: 0.8, ease: "easeOut" }}
                      style={{
                        pathLength: reportData.totalScore / 100,
                        strokeDasharray: "283", // 2 * π * 45
                      }}
                    />
                  </svg>
                  
                  <div className="text-center relative z-10">
                    <motion.div 
                      className={`text-3xl font-bold ${getScoreColor(reportData.totalScore)}`}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 0.3 }}
                      >
                        {reportData.totalScore}
                      </motion.span>
                    </motion.div>
                    <motion.div 
                      className="text-sm text-muted-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.7, duration: 0.3 }}
                    >
                      / {reportData.maxScore}
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className={`text-2xl font-bold mb-4 ${getScoreColor(reportData.totalScore)}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.5 }}
              >
                Grade: {reportData.grade}
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
                  <p className="text-sm text-muted-foreground pl-6">{reportData.fileName}</p>
                  
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Subject</span>
                  </div>
                  <p className="text-sm text-muted-foreground pl-6">{reportData.subject}</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Scoring Time</span>
                  </div>
                  <p className="text-sm text-muted-foreground pl-6">{reportData.timeSpent}</p>
                  
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Submission Date</span>
                  </div>
                  <p className="text-sm text-muted-foreground pl-6">{reportData.submissionDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Score Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-background/20 backdrop-blur-xl border border-border/20 rounded-2xl p-6 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/10 to-background/30 rounded-2xl" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-2xl" />
        
        <div className="relative z-10">
          <h2 className="text-xl font-semibold text-foreground mb-6">Score Breakdown</h2>
          
          <div className="space-y-6">
            {reportData.breakdown.map((item, index) => (
              <motion.div
                key={item.category}
                initial={{ opacity: 0, x: -30, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.2 * index,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className="group bg-background/30 backdrop-blur-sm border border-border/20 rounded-xl p-5 hover:border-border/40 transition-all duration-300"
              >
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between">
                    <motion.h3 
                      className="font-semibold text-foreground text-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + (0.1 * index) }}
                    >
                      {item.category}
                    </motion.h3>
                    <motion.div 
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + (0.1 * index), duration: 0.4 }}
                    >
                      <span className={`text-lg font-bold ${getScoreColor(item.percentage)}`}>
                        {item.score}/{item.maxScore}
                      </span>
                      <motion.span 
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBgColor(item.percentage)} border`}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.percentage}%
                      </motion.span>
                    </motion.div>
                  </div>
                  
                  {/* Enhanced Progress bar */}
                  <div className="relative">
                    <div className="w-full bg-muted/20 rounded-full h-3 overflow-hidden">
                      <motion.div
                        className="relative h-full rounded-full overflow-hidden"
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percentage}%` }}
                        transition={{ 
                          duration: 1.5, 
                          delay: 0.6 + (0.15 * index),
                          ease: [0.22, 1, 0.36, 1]
                        }}
                        style={{
                          background: `linear-gradient(90deg, ${
                            item.percentage >= 90 ? '#10b981, #059669' :
                            item.percentage >= 80 ? '#3b82f6, #1d4ed8' :
                            item.percentage >= 70 ? '#f59e0b, #d97706' :
                            '#ef4444, #dc2626'
                          })`
                        }}
                      >
                        {/* Shimmer effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          animate={{
                            x: ["-100%", "100%"],
                          }}
                          transition={{
                            duration: 2,
                            delay: 1 + (0.15 * index),
                            ease: "easeInOut"
                          }}
                        />
                      </motion.div>
                    </div>
                    
                    {/* Progress indicator dot */}
                    <motion.div
                      className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-background shadow-lg ${
                        item.percentage >= 90 ? 'bg-green-500' :
                        item.percentage >= 80 ? 'bg-blue-500' :
                        item.percentage >= 70 ? 'bg-orange-500' :
                        'bg-red-500'
                      }`}
                      initial={{ left: 0 }}
                      animate={{ left: `calc(${item.percentage}% - 8px)` }}
                      transition={{ 
                        duration: 1.5, 
                        delay: 0.6 + (0.15 * index),
                        ease: [0.22, 1, 0.36, 1]
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 rounded-full bg-current"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>
                  </div>
                  
                  <motion.p 
                    className="text-sm text-muted-foreground leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + (0.1 * index), duration: 0.4 }}
                  >
                    {item.feedback}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Detailed Feedback */}
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
            <h3 className="text-lg font-semibold text-foreground mb-4">Overall Feedback</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {reportData.overallFeedback}
            </p>
          </div>
        </motion.div>

        {/* Strengths & Improvements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-6"
        >
          {/* Strengths */}
          <div className="bg-background/20 backdrop-blur-xl border border-border/20 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/10 to-background/30 rounded-2xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent rounded-2xl" />
            
            <div className="relative z-10">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                Strengths
              </h3>
              <ul className="space-y-2">
                {reportData.strengths.map((strength, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Areas for Improvement */}
          <div className="bg-background/20 backdrop-blur-xl border border-border/20 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/10 to-background/30 rounded-2xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent rounded-2xl" />
            
            <div className="relative z-10">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 text-orange-500 mr-2" />
                Areas for Improvement
              </h3>
              <ul className="space-y-2">
                {reportData.improvements.map((improvement, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    {improvement}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* PDF Download Section */}
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
                      Generating PDF...
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
                className="aspect-[3/4] bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-xl flex items-center justify-center relative overflow-hidden"
                whileHover={{ shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                transition={{ duration: 0.3 }}
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
                  <p className="text-sm text-gray-500 mt-2">
                    {reportData.fileName}
                  </p>
                  <motion.p 
                    className={`text-lg font-bold mt-2 ${getScoreColor(reportData.totalScore)}`}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    Grade: {reportData.grade}
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
    </div>
  );
}