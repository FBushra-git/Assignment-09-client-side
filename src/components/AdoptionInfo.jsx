"use client";

import React from "react";

export default function AdoptionInfo() {
  const whyAdoptFeatures = [
    {
      icon: (
        <div className="w-12 h-12 rounded-full bg-accent/20 border-2 border-outline flex items-center justify-center text-accent">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ),
      title: "Save a life",
      description: "Every adoption opens a shelter spot for another pet in need."
    },
    {
      icon: (
        <div className="w-12 h-12 rounded-full bg-accent/20 border-2 border-outline flex items-center justify-center text-accent">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
        </div>
      ),
      title: "Gain a family",
      description: "Pets bring routine, joy, and the kind of love only paws can give."
    },
    {
      icon: (
        <div className="w-12 h-12 rounded-full bg-accent/20 border-2 border-outline flex items-center justify-center text-accent">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
          </svg>
        </div>
      ),
      title: "Health-checked",
      description: "All our pets come vaccinated, vet-checked, and ready to thrive."
    }
  ];

  const adoptionSteps = [
    { step: "Step 1", emoji: "👀", title: "Browse", desc: "Scroll cute faces." },
    { step: "Step 2", emoji: "📝", title: "Apply", desc: "Tell us about you." },
    { step: "Step 3", emoji: "🤝", title: "Meet", desc: "Schedule a visit." },
    { step: "Step 4", emoji: "🏡", title: "Welcome home", desc: "Snuggles begin." }
  ];

  const testimonials = [
    { emoji: "🐶", quote: "Buddy filled our home with joy from day one.", author: "The Patel family", meta: "Adopted Buddy" },
    { emoji: "🐱", quote: "I adopted Mochi during a tough year. She purrs me to sleep.", author: "Maya & Mochi", meta: "Adopted Mochi" },
    { emoji: "🐰", quote: "Luna binkies every morning. The whole apartment is happier.", author: "The Tanaka's", meta: "Adopted Luna" }
  ];

  return (
    // Explicitly set bg-canvas to use the CSS variable and ensure it covers the screen
    <div className="w-full min-h-screen py-16 px-4 md:px-8 bg-canvas transition-colors duration-400">
      <div className="max-w-5xl mx-auto space-y-16">
        
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-black tracking-tight flex items-center justify-center gap-1.5 text-main">
              Why adopt? <span className="inline-block text-accent">🐾</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyAdoptFeatures.map((feat, idx) => (
              <div key={idx} className="bg-surface p-6 rounded-[24px] border-2 border-outline shadow-[4px_4px_0_0_theme(colors.outline)] flex flex-col items-start gap-4 transition-colors">
                {feat.icon}
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-main">{feat.title}</h3>
                  <p className="text-xs font-bold text-main/70 leading-relaxed">{feat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-black tracking-tight text-main">How adoption works</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {adoptionSteps.map((item, idx) => (
              <div key={idx} className="bg-surface p-5 rounded-[20px] border-2 border-outline shadow-[4px_4px_0_0_theme(colors.outline)] flex flex-col items-center text-center gap-1.5">
                <span className="text-2xl">{item.emoji}</span>
                <div className="space-y-0.5">
                  <span className="block text-[9px] font-black uppercase tracking-wider text-main/50">{item.step}</span>
                  <h4 className="text-sm font-black text-main">{item.title}</h4>
                  <p className="text-[11px] font-bold text-main/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-black tracking-tight text-main">Happy families ★</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((test, idx) => (
              <div key={idx} className="bg-surface p-6 rounded-[24px] border-2 border-outline shadow-[4px_4px_0_0_theme(colors.outline)] flex flex-col justify-between gap-4">
                <div className="space-y-2">
                  <span className="text-xl">{test.emoji}</span>
                  <p className="text-xs font-bold text-main leading-relaxed">{`"${test.quote}"`}</p>
                </div>
                <div className="space-y-0.5">
                  <h5 className="text-xs font-black text-main">{test.author}</h5>
                  <span className="block text-[11px] font-bold text-main/60">{test.meta}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}