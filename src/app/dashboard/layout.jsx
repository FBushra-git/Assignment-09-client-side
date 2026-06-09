"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FolderHeart, LayoutDashboard, PlusCircle } from "lucide-react";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  const sidebarLinks = [
    { name: "My Requests", href: "/dashboard/my-requests", icon: LayoutDashboard },
    { name: "Add Pet", href: "/dashboard/add-pet", icon: PlusCircle },
    { name: "My Listings", href: "/dashboard/my-listings", icon: FolderHeart },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row gap-6 mt-2 font-sans text-main">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 shrink-0 bg-surface border-3 border-outline rounded-[32px] shadow-[4px_4px_0_0_theme(colors.outline)] p-5 flex flex-col md:min-h-[55vh] h-full md:sticky top-6 transition-colors">
        <div className="px-3 mb-5 select-none">
          <p className="text-xs font-black uppercase tracking-widest text-main/40">Workspace Menu</p>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2 font-black uppercase tracking-wider text-xs transition-all active:scale-95 ${
                  isActive
                    ? "bg-accent text-btn-text border-outline shadow-[2.5px_2.5px_0_0_theme(colors.outline)]"
                    : "bg-surface text-main border-transparent hover:border-outline/40 hover:bg-main/5"
                }`}
              >
                <Icon size={16} className="stroke-[2.5]" />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Dynamic Content Container */}
      <main className="flex-1 min-w-0 bg-surface border-3 border-outline rounded-[32px] shadow-[4px_4px_0_0_theme(colors.outline)] p-6 md:p-8 min-h-[55vh] transition-colors">
        {children}
      </main>
    </div>
  );
}