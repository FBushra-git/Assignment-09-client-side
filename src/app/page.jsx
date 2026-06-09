"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import PetCard from "@/components/PetCard";
import AdoptionInfo from "@/components/AdoptionInfo";
import PetCareTips from "@/components/PetCareTips";
import ReadyToAdopt from "@/components/ReadyToAdopt";

export default function HomePage() {
  const [featuredPets, setFeaturedPets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch pets data for the homepage display
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-pets`, { cache: "no-store" });
        if (!res.ok) throw new Error("Could not pull homepage dataset");
        const data = await res.json();
        
        // Take only the first 3 pets for a clean landing page showcase row
        setFeaturedPets(data.pets.slice(0, 3));
      } catch (error) {
        console.error("Error loading home view items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <main className="space-y-0 ">
      {/* 1. Hero Landing Block */}
      <Hero />

      {/* 2. Dynamic Featured Pets Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 font-sans text-[#2d1e18]">
        
        {/* Section Header Text and Links */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              Meet Our Newest Friends 🐾
            </h2>
            <p className="text-sm font-bold text-[#2d1e18]/60 mt-1">
              Some of our latest lovable arrivals looking for a home
            </p>
          </div>
          
          <Link 
            href="/all-pets" 
            className="group text-sm font-black uppercase tracking-widest text-[#ff7660] flex items-center gap-1.5 hover:text-[#ff624a] transition-colors"
          >
            See More Pets 
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Loading and Card Loop Layout */}
        {loading ? (
          <div className="text-center py-12 font-black text-[#2d1e18]/60">
            Fetching featured profiles... 🐾
          </div>
        ) : featuredPets.length === 0 ? (
          <div className="text-center py-16 bg-[#fffdf9] rounded-[24px] border-3 border-[#2d1e18] shadow-[4px_4px_0_0_#2d1e18]">
            <p className="font-black text-[#2d1e18]/50">No pets currently featured.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPets.map((item) => (
              <PetCard key={item._id?.$oid || item._id} pet={item} />
            ))}
          </div>
        )}
      </section>

      {/* 3. Info and Advice Content Components */}
      <AdoptionInfo />
      <PetCareTips />
      <ReadyToAdopt />
    </main>
  );
}