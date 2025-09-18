"use client";
import { motion } from "framer-motion";
import HeroSection from "@/components/sections/home/hero";
import { FeatureSection } from "@/components/sections/home/features";
import About from "@/components/sections/home/about";
import Reviews from "@/components/sections/home/movingCards";
import Footer from "@/components/sections/home/footer";
export default function Home() {
  return (
    <div className="pt-16">
      {/* Home Section */}
      <HeroSection />

      {/* Features Section */}
      <FeatureSection />

      {/* About Section */}
      <About />
      {/* Reviews Section */}
      <Reviews />
      {/* Footer */}
      <Footer/>
    </div>
  );
}