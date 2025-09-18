"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "../../ui/infinite-moving-cards";

export default function Reviews() {
  return (
    <div className="h-[20rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "This service was a complete game-changer for my final dissertation. The AI helped me structure my research and generate a solid outline, saving me countless hours. My supervisor was impressed!",
    name: "Emily Johnson",
    title: "MSc Accounting",
  },
  {
    quote:
      "I was struggling with writer's block for my philosophy essay. The suggestions were insightful and allowed me to explore complex arguments I hadn't considered. Truly a lifesaver for my finals.",
    name: "David Smith",
    title: "PhD Philosophy Candidate",
  },
  {
    quote: "My go-to tool for every lab report. It's like having a personal tutor available 24/7. My grades have seen a significant improvement since I started using it for my weekly submissions.",
    name: "Sophia Garcia",
    title: "B.S. in Biomedical Science",
  },
  {
    quote:
      "As a student juggling a part-time job, deadlines can be overwhelming. This platform helped me manage my workload efficiently without compromising on the quality of my assignments. Highly recommended!",
    name: "Liam O'Connor",
    title: "International Business Student",
  },
  {
    quote:
      "The best part for me was the accuracy of the technical projects. The code was clean, well-commented, and helped me understand difficult algorithms much faster than just reading textbooks.",
    name: "Olivia Chen",
    title: "Masters in Computer Science",
  },
];