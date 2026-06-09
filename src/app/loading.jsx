"use client";

import React from "react";

export default function GlobalLoadingSpinner() {
  return (
    <div className="min-h-screen bg-[#f9f3eb] flex flex-col items-center justify-center font-sans text-[#2d1e18]">
      <div className="relative w-16 h-16 mb-4">
        {/* Custom Brutalist Outer Ring Spinner */}
        <div className="absolute inset-0 rounded-full border-4 border-[#2d1e18]/20"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-[#ff7660] border-r-transparent border-b-transparent border-l-transparent animate-spin stroke-[4]"></div>
      </div>
      <p className="text-sm font-black uppercase tracking-widest animate-pulse">
        Fetching Asset Log Frameworks... 🐾
      </p>
    </div>
  );
}