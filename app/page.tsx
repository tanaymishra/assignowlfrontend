"use client";
import { motion } from "framer-motion";
import HeroSection from "@/components/sections/home/hero";
export default function Home() {
  return (
    <div className="pt-16">
      {/* Home Section */}
     <HeroSection/>

      {/* Features Section */}
      <section id="features" className="flex items-center justify-center bg-muted/30 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold">Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the powerful features that make AssignOwl the best choice for your academic writing needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="flex items-center justify-center py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold">About</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn more about our mission to revolutionize academic writing with AI technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="flex items-center justify-center bg-muted/30 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold">Pricing</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan for your academic writing needs.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}