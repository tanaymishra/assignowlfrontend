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
      >
        <h1 className="text-3xl font-bold text-foreground">Assignment Scorer</h1>
        <p className="text-muted-foreground mt-2">
          Upload assignments and get AI-powered scoring with detailed feedback
        </p>
      </motion.div>

      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-background/80 backdrop-blur-md border border-border/40 rounded-xl p-6 shadow-lg"
      >
        <h2 className="text-xl font-semibold text-foreground mb-4">Upload Assignment</h2>
        
        {/* File Upload */}
        <div className="space-y-4">
          <div className="border-2 border-dashed border-border/40 rounded-lg p-8 text-center hover:border-primary/40 transition-colors">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileUpload}
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center space-y-4"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="p-4 bg-primary/10 rounded-full"
              >
                <Upload className="h-8 w-8 text-primary" />
              </motion.div>
              <div>
                <p className="text-lg font-medium text-foreground">
                  {selectedFile ? selectedFile.name : "Click to upload assignment"}
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports PDF, DOC, DOCX, TXT files up to 10MB
                </p>
              </div>
            </label>
          </div>

          {selectedFile && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center space-x-3 p-3 bg-accent/20 rounded-lg"
            >
              <FileText className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="font-medium text-foreground">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedFile(null)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Rubric Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-background/80 backdrop-blur-md border border-border/40 rounded-xl p-6 shadow-lg"
      >
        <h2 className="text-xl font-semibold text-foreground mb-4">Scoring Rubric</h2>
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
          className="w-full h-48 p-4 bg-background/50 backdrop-blur-sm border border-border/40 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all text-sm"
        />
        
        <div className="flex justify-end mt-4">
          <Button
            onClick={handleScore}
            disabled={!selectedFile || !rubricText.trim()}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Score Assignment
          </Button>
        </div>
      </motion.div>

      {/* Previous Scores Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-background/80 backdrop-blur-md border border-border/40 rounded-xl p-6 shadow-lg"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Previous Scores</h2>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search assignments..."
                className="pl-10 pr-4 py-2 bg-background/50 backdrop-blur-sm border border-border/40 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
              />
            </div>
            <Button variant="outline" size="sm">
              Export All
            </Button>
          </div>
        </div>

        <div className="rounded-lg border border-border/40 bg-background/50 backdrop-blur-sm">
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
                  className="border-b transition-colors hover:bg-muted/50"
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <span>{score.fileName}</span>
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
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>

        {previousScores.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No assignments scored yet</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}