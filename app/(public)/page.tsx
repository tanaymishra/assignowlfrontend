"use client";
import HeroSection from "@/components/sections/home/hero";
import { FeatureSection } from "@/components/sections/home/features";
import About from "@/components/sections/home/about";
import Reviews from "@/components/sections/home/movingCards";
import Footer from "@/components/sections/home/footer";
import BuildWithUs from "@/components/sections/home/buildWithUs";

export default function Home() {
  return (
    <div>
      {/* Home Section */}
      <HeroSection />

      {/* Features Section */}
      <FeatureSection />

      {/* About Section */}
      <About />
      {/* Reviews Section */}
      <Reviews />
      {/* Build with Us */}
      <BuildWithUs/>
      {/* Footer */}
      <Footer />
    </div>
  );
}