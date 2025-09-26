"use client";
import { motion } from "framer-motion";
import { useReportStore, getScoreColor, getScoreBgColor } from "../store";

export function ScoreBreakdownSection() {
  const { reportData } = useReportStore();

  if (!reportData?.partScores || reportData.partScores.length === 0) {
    return (
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
          <div className="text-center py-8">
            <p className="text-muted-foreground">No detailed score breakdown available.</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
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
          {reportData.partScores.map((item, index) => {
            const percentage = (item.score / item.maxScore) * 100;
            
            return (
              <motion.div
                key={`${item.section}-${index}`}
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
                      {item.section}
                    </motion.h3>
                    <motion.div 
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + (0.1 * index), duration: 0.4 }}
                    >
                      <span className={`text-lg font-bold ${getScoreColor(percentage)}`}>
                        {item.score}/{item.maxScore}
                      </span>
                      <motion.span 
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBgColor(percentage)} border`}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        {percentage.toFixed(1)}%
                      </motion.span>
                    </motion.div>
                  </div>
                  
                  {/* Enhanced Progress bar */}
                  <div className="relative">
                    <div className="w-full bg-muted/20 rounded-full h-3 overflow-hidden">
                      <motion.div
                        className="relative h-full rounded-full overflow-hidden"
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ 
                          duration: 1.5, 
                          delay: 0.6 + (0.15 * index),
                          ease: [0.22, 1, 0.36, 1]
                        }}
                        style={{
                          background: `linear-gradient(90deg, ${
                            percentage >= 90 ? '#10b981, #059669' :
                            percentage >= 80 ? '#3b82f6, #1d4ed8' :
                            percentage >= 70 ? '#f59e0b, #d97706' :
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
                        percentage >= 90 ? 'bg-green-500' :
                        percentage >= 80 ? 'bg-blue-500' :
                        percentage >= 70 ? 'bg-orange-500' :
                        'bg-red-500'
                      }`}
                      initial={{ left: 0 }}
                      animate={{ left: `calc(${percentage}% - 8px)` }}
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
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}