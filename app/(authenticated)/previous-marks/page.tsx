"use client";
import { motion } from "framer-motion";
import { FileText, Download, Search, Filter, Calendar, TrendingUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useState, useEffect, useMemo } from "react";
import { 
  useHistoryStore, 
  getGradeFromHistoryScore, 
  formatHistoryDate, 
  extractSubjectFromFileName 
} from "./store";

export default function PreviousMarks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  
  const { 
    assignments, 
    isLoading, 
    isDownloading, 
    error, 
    fetchHistory, 
    downloadReport 
  } = useHistoryStore();

  // Fetch history data on component mount
  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // Process assignments data for display
  const processedScores = useMemo(() => {
    return assignments.map(assignment => ({
      id: assignment.id,
      fileName: assignment.name.replace(/^Assignment Scoring - /, ''),
      subject: extractSubjectFromFileName(assignment.name),
      uploadDate: formatHistoryDate(assignment.date),
      score: assignment.grade ? parseFloat(assignment.grade) : null,
      maxScore: 100,
      status: assignment.status === 'graded' ? 'Completed' : 
              assignment.status === 'pending' ? 'Pending' : 'Processing',
      grade: getGradeFromHistoryScore(assignment.grade),
      rawGrade: assignment.grade
    }));
  }, [assignments]);

  const filteredScores = processedScores.filter(score => {
    const matchesSearch = score.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         score.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || score.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const completedScores = processedScores.filter(score => score.score !== null);
  const averageScore = completedScores.length > 0 
    ? Math.round(completedScores.reduce((sum, score) => sum + (score.score || 0), 0) / completedScores.length)
    : 0;
  const totalAssignments = processedScores.length;
  const completedAssignments = processedScores.filter(score => score.status === "Completed").length;

  const handleDownload = async (id: number) => {
    await downloadReport(id);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6 sm:space-y-8">
        <div className="px-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Previous Marks
          </h1>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            View and manage your assignment scores and feedback
          </p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="text-muted-foreground">The owl is gathering your assignment history...</span>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6 sm:space-y-8">
        <div className="px-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Previous Marks
          </h1>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            View and manage your assignment scores and feedback
          </p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={fetchHistory} variant="outline">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="px-1"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Previous Marks</h1>
        <p className="text-muted-foreground mt-2 text-sm sm:text-base">
          View and manage your assignment scores and feedback
        </p>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6"
      >
        <div className="bg-background/20 backdrop-blur-xl border border-border/20 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/10 to-background/30 rounded-2xl" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent rounded-2xl" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              <span className="text-xs text-muted-foreground">Average</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{averageScore}%</p>
            <p className="text-sm text-muted-foreground">Overall Score</p>
          </div>
        </div>

        <div className="bg-background/20 backdrop-blur-xl border border-border/20 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/10 to-background/30 rounded-2xl" />
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent rounded-2xl" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <FileText className="h-5 w-5 text-green-500" />
              <span className="text-xs text-muted-foreground">Total</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{totalAssignments}</p>
            <p className="text-sm text-muted-foreground">Assignments</p>
          </div>
        </div>

        <div className="bg-background/20 backdrop-blur-xl border border-border/20 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/10 to-background/30 rounded-2xl" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent rounded-2xl" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="h-5 w-5 text-purple-500" />
              <span className="text-xs text-muted-foreground">Completed</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{completedAssignments}</p>
            <p className="text-sm text-muted-foreground">This Month</p>
          </div>
        </div>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-background/20 backdrop-blur-xl border border-border/20 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/10 to-background/30 rounded-2xl" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-2xl" />
        
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 flex-1">
              <div className="relative flex-1 sm:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search assignments or subjects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background/30 backdrop-blur-sm border border-border/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all placeholder:text-muted-foreground/70"
                />
              </div>
              
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-10 pr-8 py-2 bg-background/30 backdrop-blur-sm border border-border/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all appearance-none cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="processing">Processing</option>
                </select>
              </div>
            </div>
            
            <Button variant="outline" size="sm" className="tap-target">
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Assignments Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-background/20 backdrop-blur-xl border border-border/20 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/10 to-background/30 rounded-2xl" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-2xl" />
        
        <div className="relative z-10">
          <div className="rounded-xl border border-border/30 bg-background/20 backdrop-blur-sm overflow-hidden">
            {/* Desktop table */}
            <div className="hidden lg:block overflow-x-auto mobile-scroll">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredScores.map((score, index) => (
                    <motion.tr
                      key={score.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className="border-b border-border/20 transition-colors hover:bg-background/30 hover:backdrop-blur-sm"
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-primary flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="truncate max-w-[200px]">{score.fileName}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="px-2 py-1 bg-muted/50 rounded-full text-xs font-medium">
                          {score.subject}
                        </span>
                      </TableCell>
                      <TableCell>{score.uploadDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className={`font-semibold ${
                            !score.score ? 'text-muted-foreground' :
                            score.score >= 70 ? 'text-green-500' :  // Distinction
                            score.score >= 60 ? 'text-blue-500' :   // Merit
                            score.score >= 50 ? 'text-orange-500' : // Just pass
                            'text-red-500'  // Fail
                          }`}>
                            {score.score || 'N/A'}
                          </span>
                          <span className="text-muted-foreground">/ {score.maxScore}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          score.grade === 'Distinction' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                          score.grade === 'Merit' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                          score.grade === 'Just Pass' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' :
                          'bg-red-500/10 text-red-500 border border-red-500/20'
                        }`}>
                          {score.grade}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          score.status === 'Completed' 
                            ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                            : 'bg-orange-500/10 text-orange-500 border border-orange-500/20'
                        }`}>
                          {score.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="tap-target"
                            onClick={() => handleDownload(score.id)}
                            disabled={isDownloading || score.status !== 'Completed'}
                          >
                            {isDownloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                          </Button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile/Tablet cards */}
            <div className="lg:hidden space-y-4 p-4">
              {filteredScores.map((score, index) => (
                <motion.div
                  key={score.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="bg-background/30 backdrop-blur-sm border border-border/20 rounded-xl p-4 space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                      <FileText className="h-4 w-4 text-primary flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-foreground truncate">{score.fileName}</p>
                        <p className="text-sm text-muted-foreground">{score.uploadDate}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ml-2 ${
                      score.status === 'Completed' 
                        ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                        : 'bg-orange-500/10 text-orange-500 border border-orange-500/20'
                    }`}>
                      {score.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <span className="px-2 py-1 bg-muted/50 rounded-full text-xs font-medium">
                          {score.subject}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`font-semibold ${
                          !score.score ? 'text-muted-foreground' :
                          score.score >= 70 ? 'text-green-500' :  // Distinction
                          score.score >= 60 ? 'text-blue-500' :   // Merit
                          score.score >= 50 ? 'text-orange-500' : // Just pass
                          'text-red-500'  // Fail
                        }`}>
                          {score.score ? `${score.score}%` : 'N/A'}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          score.grade === 'Distinction' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                          score.grade === 'Merit' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                          score.grade === 'Just Pass' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' :
                          'bg-red-500/10 text-red-500 border border-red-500/20'
                        }`}>
                          {score.grade}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="tap-target"
                        onClick={() => handleDownload(score.id)}
                        disabled={isDownloading || score.status !== 'Completed'}
                      >
                        {isDownloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  {/* Status indicator */}
                  <div className="pt-2 border-t border-border/20">
                    <p className="text-xs text-muted-foreground">
                      {score.status === 'Completed' ? 'Grading completed' : 
                       score.status === 'Pending' ? 'Awaiting grading' : 
                       'Processing...'}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {filteredScores.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-sm sm:text-base">
                {searchTerm || filterStatus !== "all" ? "No assignments match your search criteria" : "No assignments scored yet"}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}