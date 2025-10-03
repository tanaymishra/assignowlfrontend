import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">About Assignowl</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your trusted companion for assignment evaluation and feedback
          </p>
        </div>

        <Separator />

        {/* Main Content */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                At Assignowl, we're dedicated to helping students improve their academic work through 
                intelligent assignment analysis and comprehensive feedback. Our platform provides accurate 
                grading and detailed insights to help you achieve academic excellence.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What We Do</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                We analyze your assignments against university guidelines and rubrics, providing:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Comprehensive grading with 90% accuracy</li>
                <li>Section-wise marks breakdown</li>
                <li>Detailed feedback and improvement suggestions</li>
                <li>Downloadable reports for easy sharing</li>
                <li>Quality assessment of content and structure</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">1. Upload Your Documents</h4>
                  <p className="text-muted-foreground text-sm">
                    Upload your assignment, university guidelines, and rubrics for comprehensive analysis.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">2. Get Your Report</h4>
                  <p className="text-muted-foreground text-sm">
                    Receive detailed grading with marks per section and actionable feedback.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">3. Improve & Validate</h4>
                  <p className="text-muted-foreground text-sm">
                    Work on the feedback, share with peers and professors, and refine your assignment.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Our Commitment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We are committed to maintaining the highest standards of accuracy and providing valuable 
                insights that help students learn and grow. Our platform is designed to support your 
                academic journey while respecting academic integrity.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Company Info */}
        <div className="text-center pt-8">
          <p className="text-sm text-muted-foreground">
            Powered by <span className="font-semibold">Greenguide Solutions Pvt Limited</span>
          </p>
        </div>
      </div>
    </div>
  );
}
