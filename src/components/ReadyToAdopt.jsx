"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function ReadyToAdopt() {
  const router = useRouter();

  return (
    <div 
      className="w-full py-12 px-4 md:px-8 font-sans text-main selection:bg-accent/30 transition-colors duration-200"
      style={{
        backgroundColor: "var(--bg-canvas)",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='currentColor' fill-opacity='0.03'%3E%3Cpath d='M12 20c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm3-5c.8 0 1.5-.7 1.5-1.5S15.8 12 15 12s-1.5.7-1.5 1.5.7 1.5 1.5 1.5zm-6 0c.8 0 1.5-.7 1.5-1.5S9.8 12 9 12s-1.5.7-1.5 1.5.7 1.5 1.5 1.5zm3 9.5c2.5 0 4.5-1.5 4.5-3.5s-2-3-4.5-3-4.5 1-4.5 3 2 3.5 4.5 3.5zM42 50c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm3-5c.8 0 1.5-.7 1.5-1.5S45.8 42 45 42s-1.5.7-1.5 1.5.7 1.5 1.5 1.5zm-6 0c.8 0 1.5-.7 1.5-1.5S39.8 42 39 42s-1.5.7-1.5 1.5.7 1.5 1.5 1.5zm3 9.5c2.5 0 4.5-1.5 4.5-3.5s-2-3-4.5-3-4.5 1-4.5 3 2 3.5 4.5 3.5z'/%3E%3C/g%3E%3C/svg%3E")`,
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Main Banner Container */}
        <div className="w-full bg-surface rounded-[32px] border-3 border-outline shadow-[0_12px_0_0_theme(colors.outline)] p-8 md:p-14 text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[320px] transition-colors duration-200">
          
          {/* Decorative Elements */}
          <div className="absolute top-8 left-8 text-lg opacity-80 hidden sm:block pointer-events-none rotate-[-15deg]">🐾</div>
          <div className="absolute top-1/3 left-16 text-xl hidden md:block pointer-events-none filter drop-shadow-[2px_2px_0_theme(colors.outline)]">💛</div>
          <div className="absolute bottom-28 left-[42%] text-base opacity-80 hidden sm:block pointer-events-none rotate-[25deg]">🐾</div>
          <div className="absolute top-12 right-24 text-lg opacity-80 hidden sm:block pointer-events-none rotate-[35deg]">🐾</div>
          <div className="absolute bottom-1/3 right-12 text-xl hidden md:block pointer-events-none">✨</div>

          {/* Center Content */}
          <div className="relative z-10 max-w-2xl mx-auto space-y-5 flex flex-col items-center">
            
            <div className="text-main opacity-90">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            </div>

            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-main leading-tight">
              Ready to meet your new best friend?
            </h2>

            <p className="text-main/70 font-bold text-xs md:text-sm max-w-lg leading-relaxed">
              Adoption is free of judgment — and full of tail wags. Take the first step today.
            </p>

            <div className="pt-2">
              <button 
                onClick={() => router.push("/all-pets")} 
                className="bg-accent hover:opacity-90 text-btn-text font-black text-sm px-6 py-3.5 rounded-full border-3 border-outline shadow-[0_4px_0_0_theme(colors.outline)] transition-all active:translate-y-[2px] active:shadow-[0_2px_0_0_theme(colors.outline)] flex items-center gap-2 group cursor-pointer"
              >
                Browse all pets 
                <span className="inline-block transition-transform group-hover:translate-x-0.5">🐾</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}