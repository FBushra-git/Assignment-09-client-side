"use client";

import React from "react";
import Image from "next/image"; 

export default function PetCareTips() {
//   const tips = [
//     { emoji: "🥣", text: "Keep meals consistent for the first 2 weeks" },
//     { emoji: "🧸", text: "Create a quiet, cozy corner just for them" },
//     { emoji: "🦺", text: "Short, calm outings — no overwhelming crowds" },
//     { emoji: "🩺", text: "Book a vet wellness visit within 7 days" },
//   ];

  return (
    <div 
      className="w-full min-h-screen py-16 px-4 md:px-8 font-sans text-main bg-canvas transition-colors duration-200"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='currentColor' fill-opacity='0.03'%3E%3Cpath d='M12 20c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm3-5c.8 0 1.5-.7 1.5-1.5S15.8 12 15 12s-1.5.7-1.5 1.5.7 1.5 1.5 1.5zm-6 0c.8 0 1.5-.7 1.5-1.5S9.8 12 9 12s-1.5.7-1.5 1.5.7 1.5 1.5 1.5zm3 9.5c2.5 0 4.5-1.5 4.5-3.5s-2-3-4.5-3-4.5 1-4.5 3 2 3.5 4.5 3.5zM42 50c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm3-5c.8 0 1.5-.7 1.5-1.5S45.8 42 45 42s-1.5.7-1.5 1.5.7 1.5 1.5 1.5zm-6 0c.8 0 1.5-.7 1.5-1.5S39.8 42 39 42s-1.5.7-1.5 1.5.7 1.5 1.5 1.5zm3 9.5c2.5 0 4.5-1.5 4.5-3.5s-2-3-4.5-3-4.5 1-4.5 3 2 3.5 4.5 3.5z'/%3E%3C/g%3E%3C/svg%3E")`,
      }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="w-full bg-surface rounded-[32px] border-3 border-outline shadow-[0_12px_0_0_theme(colors.outline)] p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center min-h-[500px] transition-colors duration-200">
          
          {/* Left Panel */}
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-1.5 bg-accent/20 border-2 border-outline px-3 py-1 rounded-full text-xs font-black text-main">
              <span>📋</span> Care guide
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-black tracking-tight flex items-center gap-2 text-main">
                Pet care tips <span>🩺</span>
              </h2>
              <p className="text-main/70 font-bold text-sm md:text-base leading-snug">
                First weeks at home matter. Our gentle checklist makes settling in easy.
              </p>
            </div>

            <ul className="space-y-3.5 pt-2">
              {tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3 text-sm font-bold leading-relaxed text-main">
                  <span className="text-sm shrink-0 mt-0.5">{tip.emoji}</span>
                  <span>{tip.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Panel: Quad Illustration Grid */}
          <div className="flex-1 w-full grid grid-cols-2 gap-4">
            {[
              { src: "/assets/dog.png", alt: "Golden Retriever Puppy" },
              { src: "/assets/cat.png", alt: "Orange Cat" },
              { src: "/assets/bunny.png", alt: "White Bunny Rabbit" },
              { src: "/assets/dog2.png", alt: "Corgi Puppy" }
            ].map((img, idx) => (
              <div key={idx} className="aspect-square bg-surface border-3 border-outline rounded-[24px] shadow-[4px_4px_0_0_theme(colors.outline)] relative overflow-hidden group flex items-center justify-center transition-colors">
                <Image 
                  src={img.src}
                  alt={img.alt}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}