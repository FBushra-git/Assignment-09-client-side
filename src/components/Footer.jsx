"use client";

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full px-6 pb-8 pt-12 flex justify-center mt-auto">
      {/* Main Footer Container */}
      <div className="w-full max-w-7xl rounded-[32px] border-3 border-outline shadow-[0_8px_0_0_theme(colors.outline)] px-8 py-10 md:p-12 flex flex-col gap-10 bg-card-surface transition-colors duration-300">
        
        {/* Top Grid Layer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start pb-8 border-b-2 border-dashed border-outline/20">
          
          {/* Brand/Logo Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 select-none">
              <div className="w-9 h-9 bg-accent rounded-full flex items-center justify-center border-2 border-outline shadow-[0_2px_0_0_theme(colors.outline)]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                  <path d="M12 14c-1.66 0-3 1.34-3 3 0 2 2 3.5 3 3.5s3-1.5 3-3.5c0-1.66-1.34-3-3-3zm-4.5-2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm9 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-6.75-3.5c.97 0 1.75-.78 1.75-1.75S10.97 5 10 5s-1.75.78-1.75 1.75S9.03 8.5 10 8.5zm4 0c.97 0 1.75-.78 1.75-1.75S14.97 5 14 5s-1.75.78-1.75 1.75S13.03 8.5 14 8.5z"/>
                </svg>
              </div>
              <span className="font-black text-2xl text-main tracking-tight">PetNest</span>
            </div>
            <p className="text-main/70 font-medium text-sm max-w-xs leading-relaxed">
              Connecting lovable pets with their forever families through simple, friendly, secure adoptions.
            </p>
          </div>

          {/* Contact Information Column */}
          <div className="space-y-3">
            <h4 className="font-black text-base text-main tracking-wide uppercase">Get in Touch</h4>
            <ul className="space-y-2 text-sm font-bold text-main/80">
              <li><a href="mailto:hello@petnest.com" className="hover:text-accent transition-colors">hello@petnest.com</a></li>
              <li><a href="tel:+1234567890" className="hover:text-accent transition-colors">+1 (234) 567-890</a></li>
            </ul>
          </div>

          {/* Social Links Column */}
          <div className="space-y-4 md:text-right">
            <h4 className="font-black text-base text-main tracking-wide uppercase mb-3">Follow the Pack</h4>
            <div className="flex gap-3 justify-start md:justify-end">
              {['𝕏', '📸', '👥'].map((icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-canvas-bg border-2 border-outline rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-all shadow-[0_3px_0_0_theme(colors.outline)] active:translate-y-[2px] active:shadow-none">
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Layer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-main/60">
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
            <Link href="/privacy" className="hover:text-main transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-main transition-colors">Terms of Service</Link>
          </div>
          <p className="font-medium">&copy; {currentYear} PetNest.</p>
        </div>
      </div>
    </footer>
  );
}