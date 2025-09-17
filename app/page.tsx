"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen p-8 flex items-center justify-center">
      <div className="max-w-2xl mx-auto space-y-8">
        <motion.div 
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold">Welcome to AssignOwl</h1>
          <p className="text-muted-foreground text-lg">
            Your project is now set up with shadcn/ui, Radix UI, and Framer Motion!
          </p>
        </motion.div>

        <motion.div 
          className="grid gap-6 md:grid-cols-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>shadcn/ui Installed</CardTitle>
                <CardDescription>
                  Beautiful, accessible components built with Radix UI and Tailwind CSS
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Get Started</Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Framer Motion Ready</CardTitle>
                <CardDescription>
                  Production-ready motion library for React with smooth animations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div 
          className="flex gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="default">Primary Button</Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="secondary">Secondary</Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline">Outline</Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost">Ghost</Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}