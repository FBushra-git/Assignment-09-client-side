"use client";

import React from "react";
import Link from "next/link";
import { ShieldAlert, Home } from "lucide-react";

export default function CustomNotFoundPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] flex items-center justify-center p-4 font-sans text-[var(--text-main)]">
      <div className="bg-[var(--bg-card)] border-4 border-[var(--outline-border)] max-w-md w-full rounded-[32px] p-8 shadow-[8px_8px_0_0_var(--outline-border)] text-center space-y-6">
        
        {/* Error Graphic Block Container */}
        <div className="inline-block bg-[var(--text-accent)]/20 border-2 border-[var(--outline-border)] p-4 rounded-2xl shadow-[3px_3px_0_0_var(--outline-border)] text-[var(--text-accent)]">
          <ShieldAlert size={48} className="stroke-[2.5]" />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tight uppercase">404 Error</h1>
          <h2 className="text-lg font-black text-[var(--text-main)]/70">Route Matrix Disconnected</h2>
          <p className="text-sm font-medium text-[var(--text-main)]/60 leading-relaxed pt-2">
            Oops! The adoption file directory path or configuration mapping you are looking for has been moved, cleared, or does not exist. 😿
          </p>
        </div>

        <div className="pt-2">
          <Link href="/">
            <button className="w-full h-12 rounded-full border-2 border-[var(--outline-border)] bg-[var(--btn-primary)] text-[var(--btn-text)] font-black text-xs uppercase tracking-widest shadow-[4px_4px_0_0_var(--outline-border)] hover:bg-[var(--btn-primary-hover)] active:translate-y-[2px] active:shadow-[2px_2px_0_0_var(--outline-border)] transition-all flex items-center justify-center gap-2">
              <Home size={14} className="stroke-[3]" /> Return Back to Safety
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}