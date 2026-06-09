"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HeroBanner() {
//   const cardRef = useRef(null);
//   const x = useMotionValue(0);
//   const y = useMotionValue(0);

//   const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { stiffness: 150, damping: 20 });
//   const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { stiffness: 150, damping: 20 });

//   const handleMouseMove = (e) => {
//     if (!cardRef.current) return;
//     const rect = cardRef.current.getBoundingClientRect();
//     const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
//     const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
//     x.set(mouseX);
//     y.set(mouseY);
//   };

//   const handleMouseLeave = () => {
//     x.set(0);
//     y.set(0);
//   };

  const router = useRouter();

  return (
    <section className="w-full min-h-[85vh] flex items-center justify-center p-6 md:p-12 relative overflow-hidden">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full max-w-7xl bg-surface rounded-[40px] border-3 border-outline shadow-[0_12px_0_0_theme(colors.outline)] px-8 py-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 transition-shadow duration-300 hover:shadow-[0_20px_0_0_theme(colors.outline)]"
      >
        
        {/* Left Column */}
        <div style={{ transform: "translateZ(30px)" }} className="flex-1 space-y-8 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-accent/20 border-2 border-outline px-4 py-1.5 rounded-full font-bold text-xs md:text-sm text-main">
            <span>✨</span> 1,200+ happy adoptions
          </div>

          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl font-black text-main leading-tight tracking-tight">
              Find Your
            </h1>
            <h2 className="text-5xl md:text-7xl font-black text-accent leading-none tracking-tight">
              Forever Friend
            </h2>
          </div>

          <p className="text-lg text-main/70 font-medium max-w-md leading-relaxed">
            Every wag, every purr, every little hop is waiting for a home. 
            Meet the pets ready to love you back — twice as hard.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button onClick={() => router.push("/all-pets")} className="bg-accent text-btn-text font-bold text-lg px-8 py-3.5 rounded-full border-2 border-outline shadow-[0_5px_0_0_theme(colors.outline)] flex items-center gap-2 active:translate-y-[5px] active:shadow-none transition-all">
              Adopt Now 💛
            </button>
            <button onClick={() => router.push("/dashboard/add-pet")} className="bg-transparent hover:bg-main/5 text-main font-bold text-lg px-8 py-3.5 rounded-full border-2 border-outline transition-colors">
              List a Pet
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-dashed border-outline/20 max-w-md">
            {[ { val: "1.2k+", lbl: "Adoptions" }, { val: "320", lbl: "Available" }, { val: "98%", lbl: "Happy homes" } ].map((stat, i) => (
              <div key={i}>
                <p className="text-3xl font-black text-main">{stat.val}</p>
                <p className="text-xs font-semibold text-main/60 mt-0.5">{stat.lbl}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div style={{ transform: "translateZ(50px)" }} className="flex-1 w-full flex justify-center items-center relative">
          <div className="relative max-w-md md:max-w-xl w-full aspect-[4/3] rounded-2xl flex items-center justify-center">
            <Image
              src="/assets/hero.png"
              alt="Cute girl hugging pets illustration" 
              width={500} height={500}
              className="w-full h-full object-contain pointer-events-none"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}