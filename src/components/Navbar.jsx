"use client";

import React, { useRef, useState, useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from "next-themes";
import { Menu, X, Moon, Sun, LayoutDashboard, LogOut, ChevronDown } from "lucide-react";
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';

export default function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  
  
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const isMounted = useSyncExternalStore(() => () => {}, () => true, () => false);
  const dropdownRef = useRef(null);

useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

  const handleLogout = async () => {
    await authClient.signOut({ 
      fetchOptions: { 
        onSuccess: () => { 
          setIsDropdownOpen(false);
          setIsMobileMenuOpen(false);
          window.location.href = "/login"; 
        } 
      } 
    });
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Pets", href: "/all-pets" },
  ];

  

  return (
    <div className="w-full px-4 sm:px-6 py-6 flex justify-center relative z-50">
      <nav className="w-full max-w-7xl bg-surface border-3 border-outline shadow-[0_6px_0_0_theme(colors.outline)] flex items-center justify-between px-4 md:px-6 py-2.5 transition-colors duration-200 rounded-[32px]">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 md:gap-3 select-none hover:opacity-90 transition-opacity">
          <div className="w-9 h-9 md:w-10 md:h-10 bg-accent rounded-full flex items-center justify-center border-2 border-outline shadow-[1.5px_1.5px_0_0_theme(colors.outline)]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5">
              <path d="M12 14c-1.66 0-3 1.34-3 3 0 2 2 3.5 3 3.5s3-1.5 3-3.5c0-1.66-1.34-3-3-3zm-4.5-2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm9 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-6.75-3.5c.97 0 1.75-.78 1.75-1.75S10.97 5 10 5s-1.75.78-1.75 1.75S9.03 8.5 10 8.5zm4 0c.97 0 1.75-.78 1.75-1.75S14.97 5 14 5s-1.75.78-1.75 1.75S13.03 8.5 14 8.5z"/>
            </svg>
          </div>
          <span className="font-black text-xl md:text-2xl text-main tracking-tight hidden sm:block">PetNest</span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-2 font-black text-sm uppercase tracking-wider text-main">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={`px-5 py-2 rounded-full border-2 transition-all active:scale-95 ${pathname === link.href ? "bg-accent text-btn-text border-outline shadow-[2px_2px_0_0_theme(colors.outline)]" : "border-transparent hover:text-accent"}`}>
              {link.name}
            </Link>
          ))}
        </div>

        {/* CONTROLS */}
        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-outline bg-surface hover:bg-accent/10 transition-all shadow-[2px_2px_0_0_theme(colors.outline)]"
            aria-label="Toggle Theme"
          >
            {isMounted ? (
              resolvedTheme === "dark" ? <Sun size={18} className="text-main" /> : <Moon size={18} className="text-main" />
            ) : (
              <span className="h-[18px] w-[18px]" aria-hidden="true" />
            )}
          </button>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-1 bg-surface border-2 border-transparent hover:border-outline py-1 px-1 rounded-full transition-all group select-none">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-outline bg-accent flex items-center justify-center text-btn-text font-black text-sm overflow-hidden shadow-[1.5px_1.5px_0_0_theme(colors.outline)]">
                  {user.image && !imgError ? <Image src={user.image} alt="User" width={40} height={40} unoptimized className="w-full h-full object-cover" onError={() => setImgError(true)} /> : <span>{(user.name || "U").charAt(0).toUpperCase()}</span>}
                </div>
                <ChevronDown size={14} className={`text-main/50 transition-transform group-hover:text-main ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-surface border-3 border-outline rounded-[24px] shadow-[5px_5px_0_0_theme(colors.outline)] py-1.5 overflow-hidden font-sans text-main">
                  <Link href="/dashboard/my-requests" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-2.5 px-4 py-3 text-xs font-black uppercase tracking-wider hover:bg-accent/10 border-b-2 border-dashed border-outline/20">
                    <LayoutDashboard size={16} className="text-accent" /> Dashboard
                  </Link>
                  <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-4 py-3 text-xs font-black uppercase tracking-wider hover:bg-rose-50 text-rose-500 text-left">
                    <LogOut size={16} /> Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="hidden md:inline-block bg-outline text-white font-black text-sm uppercase tracking-wider px-6 py-2.5 rounded-full border-2 border-outline hover:opacity-90 transition-all shadow-[2.5px_2.5px_0_0_theme(colors.outline)]">
              Login
            </Link>
          )}

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden w-10 h-10 bg-surface border-2 border-outline rounded-full flex items-center justify-center hover:bg-accent/10 transition-all text-main">
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="absolute top-[90px] left-4 right-4 bg-surface border-3 border-outline rounded-[24px] shadow-[0_8px_0_0_theme(colors.outline)] p-5 flex flex-col gap-3 md:hidden">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="w-full py-3 px-5 rounded-xl border-2 border-outline text-center font-black uppercase tracking-wider text-sm text-main shadow-[2px_2px_0_0_theme(colors.outline)]">
              {link.name}
            </Link>
          ))}
          <hr className="border-t-2 border-dashed border-outline/20" />
          {user ? (
            <>
              <Link href="/dashboard/my-requests" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-3 rounded-xl border-2 border-outline text-center font-black uppercase tracking-wider text-sm text-main">Dashboard</Link>
              <button onClick={handleLogout} className="w-full py-3 rounded-xl bg-outline text-white text-center font-black uppercase tracking-wider text-sm">Log Out</button>
            </>
          ) : (
            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-3 rounded-xl bg-outline text-white text-center font-black uppercase tracking-wider text-sm">Login</Link>
          )}
        </div>
      )}
    </div>
  );
}