"use client";
import { motion } from "framer-motion";
import { ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useReportStore } from "../store";

export function HeaderSection() {
  const router = useRouter();
  const { reportData } = useReportStore();

  return (
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
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Assignment Report
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            {reportData?.title || "Loading assignment details..."}
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" className="tap-target">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </div>
    </motion.div>
  );
}