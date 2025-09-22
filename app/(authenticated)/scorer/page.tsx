"use client";
import { motion } from "framer-motion";
import { Upload, FileText, Download, Eye, Trash2, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useState } from "react";

export default function AssignmentScorer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [rubricText, setRubricText] = useState("");

  // Mock data for previous scores
  const previousScores = [
    {
      id: 1,
      fileName: "React_Component_Analysis.pdf",
      uploadDate: "2024-01-15",
      score: 85,
      maxScore: 100,
      status: "Completed",
      feedback: "Excellent understanding of React concepts...",
    },
    {
      id: 2,
      fileName: "Database_Design_Project.docx",
      uploadDate: "2024-01-12",
      score: 92,
      maxScore: 100,
      status: "Completed",
      feedback: "Outstanding database normalization...",
    },
    {
      id: 3,
      fileName: "API_Documentation.pdf",
      uploadDate: "2024-01-10",
      score: 78,
      maxScore: 100,
      status: "Completed",
      feedback: "Good documentation structure...",
    },
    {
      id: 4,
      fileName: "UI_UX_Research.pdf",
      uploadDate: "2024-01-08",
      score: 88,
      maxScore: 100,
      status: "Processing",
      feedback: "Analysis in progress...",
    },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleScore = () => {
    if (!selectedFile || !rubricText.trim()) {
      alert("Please upload a file and provide rubric guidelines.");
      return;
    }
    // Here you would integrate with your scoring API
    console.log("Scoring assignment:", selectedFile.name, "with rubric:", rubricText);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="px-1"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Assignment Scorer</h1>
        <p className="text-muted-foreground mt-2 text-sm sm:text-base">
          Upload assignments and get AI-powered scoring with detailed feedback
        </p>
      </motion.div>

      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-background/20 backdrop-blur-xl border border-border/20 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden"
      >
        {/* Glassy overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/10 to-background/30 rounded-2xl" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-2xl" />
        <div className="relative z-10">
        <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Upload Assignment</h2>
        
        {/* File Upload */}
        <div className="space-y-4">
          <div className="border-2 border-dashed border-border/30 rounded-xl p-4 sm:p-8 text-center hover:border-primary/50 hover:bg-background/20 backdrop-blur-sm transition-all duration-300 tap-target">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileUpload}
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center space-y-3 sm:space-y-4 tap-target"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 sm:p-4 bg-primary/10 rounded-full"
              >
                <Upload className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </motion.div>
              <div>
                <p className="text-base sm:text-lg font-medium text-foreground break-words">
                  {selectedFile ? selectedFile.name : "Click to upload assignment"}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Supports PDF, DOC, DOCX, TXT files up to 10MB
                </p>
              </div>
            </label>
          </div>

          {selectedFile && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center space-x-3 p-3 bg-background/30 backdrop-blur-sm rounded-xl border border-border/20"
            >
              <FileText className="h-5 w-5 text-primary flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedFile(null)}
                className="tap-target flex-shrink-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </div>
        </div>
      </motion.div>

      {/* Rubric Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-background/20 backdrop-blur-xl border border-border/20 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden"
      >
        {/* Glassy overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/10 to-background/30 rounded-2xl" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-2xl" />
        <div className="relative z-10">
        <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Scoring Rubric</h2>
        <textarea
          value={rubricText}
          onChange={(e) => setRubricText(e.target.value)}
          placeholder="Enter your scoring rubric and guidelines here...

Example:
- Content Quality (40 points): Accuracy, depth, and relevance of information
- Structure & Organization (20 points): Clear introduction, body, and conclusion
- Writing Quality (20 points): Grammar, spelling, and clarity
- Citations & References (20 points): Proper formatting and credible sources

Total: 100 points"
          className="w-full h-40 sm:h-48 p-3 sm:p-4 bg-background/30 backdrop-blur-sm border border-border/30 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all text-sm placeholder:text-muted-foreground/70 mobile-scroll"
        />
        
        <div className="flex justify-end mt-4">
          <Button
            onClick={handleScore}
            disabled={!selectedFile || !rubricText.trim()}
            className="bg-primary hover:bg-primary/90 tap-target w-full sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Score Assignment
          </Button>
        </div>
        </div>
      </motion.div>

      {/* Previous Scores Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-background/20 backdrop-blur-xl border border-border/20 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden"
      >
        {/* Glassy overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/10 to-background/30 rounded-2xl" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-2xl" />
        <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground">Previous Scores</h2>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search assignments..."
                className="w-full sm:w-auto pl-10 pr-4 py-2 bg-background/30 backdrop-blur-sm border border-border/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all placeholder:text-muted-foreground/70"
              />
            </div>
            <Button variant="outline" size="sm" className="tap-target">
              Export All
            </Button>
          </div>
        </div>

        {/* Mobile-friendly table */}
        <div className="rounded-xl border border-border/30 bg-background/20 backdrop-blur-sm overflow-hidden">
          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto mobile-scroll">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File Name</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {previousScores.map((score, index) => (
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
                        <span className="truncate max-w-[200px]">{score.fileName}</span>
                      </div>
                    </TableCell>
                    <TableCell>{score.uploadDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className={`font-semibold ${
                          score.score >= 90 ? 'text-green-500' :
                          score.score >= 80 ? 'text-blue-500' :
                          score.score >= 70 ? 'text-orange-500' :
                          'text-red-500'
                        }`}>
                          {score.score}
                        </span>
                        <span className="text-muted-foreground">/ {score.maxScore}</span>
                      </div>
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
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm" className="tap-target">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="tap-target">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive tap-target">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile cards */}
          <div className="sm:hidden space-y-3 p-3">
            {previousScores.map((score, index) => (
              <motion.div
                key={score.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                className="bg-background/30 backdrop-blur-sm border border-border/20 rounded-xl p-4 space-y-3"
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
                  <div className="flex items-center space-x-2">
                    <span className={`font-semibold ${
                      score.score >= 90 ? 'text-green-500' :
                      score.score >= 80 ? 'text-blue-500' :
                      score.score >= 70 ? 'text-orange-500' :
                      'text-red-500'
                    }`}>
                      {score.score}
                    </span>
                    <span className="text-muted-foreground">/ {score.maxScore}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm" className="tap-target">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="tap-target">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive tap-target">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {previousScores.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-sm sm:text-base">No assignments scored yet</p>
          </div>
        )}
        </div>
      </motion.div>
    </div>
  );
}