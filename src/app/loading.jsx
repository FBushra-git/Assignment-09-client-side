"use client";

import React from "react";

export default function GlobalLoadingSpinner() {
  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] flex flex-col items-center justify-center font-sans text-[var(--text-main)]">
      <div className="relative w-16 h-16 mb-4">
        {/* Custom Brutalist Outer Ring Spinner */}
        <div className="absolute inset-0 rounded-full border-4 border-[var(--outline-border)]/20"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-[var(--btn-primary)] border-r-transparent border-b-transparent border-l-transparent animate-spin stroke-[4]"></div>
      </div>
      <p className="text-sm font-black uppercase tracking-widest animate-pulse">
        Fetching Asset Log Frameworks... 🐾
      </p>
    </div>
  );
}