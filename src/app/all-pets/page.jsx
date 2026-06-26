"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Filter, ArrowUpDown, Eye, HeartHandshake } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function AllPetsDirectoryPage() {
  const router = useRouter();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const [totalPets, setTotalPets] = useState(0);

  // Filter conditions & management states
  const [searchText, setSearchText] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [brokenImages, setBrokenImages] = useState({});

  // Live Authentication Context Session Hook
  const { data: session } = authClient.useSession();
  const currentUser = session?.user;
  
  
  // Fetch collections automatically when parameter dependencies shift
  useEffect(() => {
  const fetchFilteredCatalogs = async () => {
    setLoading(true);

    try {
      const queryBuilder = new URLSearchParams();

      if (searchText) queryBuilder.append("search", searchText);
      if (selectedSpecies) queryBuilder.append("species", selectedSpecies);
      if (sortOrder) queryBuilder.append("sort", sortOrder);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/all-pets?${queryBuilder.toString()}&page=${page}&limit=9`,
        { cache: "no-store" }
      );
      console.log(res)

      if (!res.ok) throw new Error("Failed request");

      const data = await res.json();

      // IMPORTANT: backend returns { pets, totalPages }
    setPets(data.pets);
setTotalPages(data.totalPages);
setTotalPets(data.total);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const timeout = setTimeout(fetchFilteredCatalogs, 400);
  return () => clearTimeout(timeout);

}, [searchText, selectedSpecies, sortOrder, page]);
  
  // Integrated adoption validation handler linked directly with server business guard rules
 

  return (
    <div className="min-h-screen bg-canvas-bg py-12 px-4 sm:px-6 lg:px-8 font-sans text-berry-ink">
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="max-w-7xl mx-auto">
        
        {/* Banner Section Header Element Block */}
        <header className="mb-12 text-center max-w-2xl mx-auto space-y-3">
          <h1 className="text-5xl font-black tracking-tight uppercase">Adoption Showroom</h1>
          <p className="text-sm font-bold uppercase tracking-widest opacity-60">
            Find your perfect companion filtered by native database indexing matrix
          </p>
        </header>

        {/* 3D BRUTALIST ADVANCED FILTER CONTROL BOX TOOLBAR MODULE */}
        <fieldset className="bg-card-surface border-3 border-brutalist-outline p-5 rounded-[24px] shadow-[6px_6px_0_0_theme(colors.brutalist-outline)] mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          
          {/* Field 1: Fuzzy Text Name Search Match */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider opacity-80">
              <Search size={14} className="stroke-[2.5]" /> Search Companion Name
            </label>
            <input 
              type="text" 
              placeholder="Type a pet name (e.g. Max, Buddy)..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full h-11 px-4 rounded-xl border-2 border-brutalist-outline bg-canvas-bg font-bold text-sm placeholder-berry-ink/30 focus:outline-none"
            />
          </div>

          {/* Field 2: Species Element Array Dropdown Match */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider opacity-80">
              <Filter size={14} className="stroke-[2.5]" /> Species Category Class
            </label>
            <select 
              value={selectedSpecies}
              onChange={(e) => setSelectedSpecies(e.target.value)}
              className="w-full h-11 px-4 rounded-xl border-2 border-brutalist-outline bg-canvas-bg font-bold text-sm focus:outline-none appearance-none cursor-pointer"
            >
              <option value="">All Living Varieties</option>
              <option value="Dog">Dogs Only 🐶</option>
              <option value="Cat">Cats Only 🐱</option>
              <option value="Rabbit">Rabbits Only 🐰</option>
              <option value="Bird">Birds Only 🦜</option>
            </select>
          </div>

          {/* Field 3: Pricing Sorting Plan Pipeline Option Trigger */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider opacity-80">
              <ArrowUpDown size={14} className="stroke-[2.5]" /> Order Ranking Pipeline
            </label>
            <select 
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full h-11 px-4 rounded-xl border-2 border-brutalist-outline bg-canvas-bg font-bold text-sm focus:outline-none appearance-none cursor-pointer"
            >
              <option value="newest">Newly Listed Registers First</option>
              <option value="fee-low">Adoption Fee: Lowest to Highest</option>
              <option value="fee-high">Adoption Fee: Highest to Lowest</option>
            </select>
          </div>

        </fieldset>

        {/* METRICS COUNTER MATRIX STATUS INDICATOR STRIP */}
        {!loading && (
          <div className="flex items-center gap-2 mb-8 px-1 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <span className="inline-flex items-center justify-center bg-[var(--bg-card)]/50 text-[var(--text-main)] font-black text-xs uppercase tracking-wider px-4 py-1.5 rounded-full border-2 border-brutalist-outline shadow-[3px_3px_0_0_theme(colors.brutalist-outline)]">
              🐾 {totalPets} {totalPets === 1 ? "Pet" : "Pets"} Available Right Now
            </span>
            {searchText && (
              <span className="text-xs font-bold opacity-60 italic">
                matching &ldquo;{searchText}&rdquo;
              </span>
            )}
          </div>
        )}

        {/* Dynamic Cards Catalog Array Presenter View Grid */}
        {loading ? (
          <div className="text-center py-24 text-sm font-black uppercase tracking-widest animate-pulse opacity-60">
            Querying Live Database Matrix Array Files... 🐾
          </div>
        ) : pets.length === 0 ? (
          <div className="text-center py-20 bg-card-surface rounded-[32px] border-3 border-brutalist-outline shadow-[5px_5px_0_0_theme(colors.brutalist-outline)]">
            <p className="text-lg font-black opacity-50">
              No animal entries match your selected filter matrices parameters! 😿
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pets.map((pet) => {
              const currentId = pet._id?.$oid || pet._id;
              const isAdopted = pet.status === "adopted" || pet.adopted === true;
              const hasImageError = brokenImages[currentId];

              return (
                <div key={currentId} className="bg-card-surface rounded-[24px] border-3 border-brutalist-outline shadow-[5px_5px_0_0_theme(colors.brutalist-outline)] overflow-hidden flex flex-col p-4 transform hover:-translate-y-1 transition-all duration-200">
                  
                  {/* Image Block Content Wrapper Element */}
                  <div className="bg-canvas-bg rounded-[18px] border-2 border-brutalist-outline aspect-[16/11] overflow-hidden relative mb-4">
                    
                    <Image 
                      src={hasImageError || !pet.imageUrl ? "https://images.unsplash.com/photo-1543466835-00a7907e9de1" : pet.imageUrl} 
                      alt={pet.petName}
                      fill
                      unoptimized
                      className="w-full h-full object-cover"
                      onError={() => {
                        setBrokenImages(prev => ({ ...prev, [currentId]: true }));
                      }}
                    />
                    
                    {/* Adoption Fee / Solid Red Status Badge Ribbon Row Overlay */}
                    <div className={`absolute top-2 right-2 border-2 border-brutalist-outline px-3 py-1 rounded-full text-xs font-black shadow-[2px_2px_0_0_theme(colors.brutalist-outline)] z-10 ${
                      isAdopted ? "bg-red-500 text-white" : "bg-card-surface"
                    }`}>
                      {isAdopted ? "Adopted 🎉" : pet.adoptionFee > 0 ? `$${pet.adoptionFee}` : "Free"}
                    </div>
                  </div>

                  {/* Header Identification Block Information Fields */}
                  <div className="mb-3 flex justify-between items-baseline px-1">
                    <h3 className="text-2xl font-black tracking-tight text-[var(--text-main)]">{ pet.petName}</h3>
                    <span className="text-[10px] font-black uppercase bg-[var(--btn-primary)]/20 border border-brutalist-outline rounded-full px-2.5 py-0.5 tracking-wider text-[var(--text-main)]">
                      {pet.species}
                    </span>
                  </div>

                  {/* Summary Profile Bio Description Box Text Details */}
                  <p className="text-xs text-[var(--text-main)]/60 font-medium line-clamp-2 px-1 mb-6">
                    {pet.description || "No biography overview profiles filed yet for this registration matrix row details block."}
                  </p>

                  {/* ACTION FOOTER WORKFLOW SPLIT BUTTON WRAPPER ELEMENTS */}
                  <div className="grid grid-cols-2 gap-3 mt-auto pt-2">
                    
                    {/* Action 1: View Detailed Item File Row Mapping */}
                    <Link href={`/all-pets/${currentId}`} className="w-full">
                      <button className="w-full h-11 rounded-full border-2 border-brutalist-outline bg-card-surface hover:bg-amber-50/50 text-berry-ink font-black text-xs uppercase tracking-wider shadow-[0_3px_0_0_theme(colors.brutalist-outline)] active:translate-y-[1.5px] active:shadow-[0_1.5px_0_0_theme(colors.brutalist-outline)] transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                        <Eye size={14} className="stroke-[2.5]" /> View Details
                      </button>
                    </Link>

                    {/* Action 2: Trigger Adoption Application Request Block Logs */}
                    <Link href={`/all-pets/${currentId}`} className="w-full">
  <button
    disabled={isAdopted}
    className={`w-full h-11 rounded-full border-2 border-brutalist-outline font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
      isAdopted
        ? "bg-gray-300 text-gray-500 border-gray-400 shadow-none cursor-not-allowed"
        : "bg-[var(--btn-primary)]/20 hover:bg-[var(--btn-primary)]/30 text-[var(--text-main)] shadow-[0_3px_0_0_theme(colors.brutalist-outline)] active:translate-y-[1.5px] active:shadow-[0_1.5px_0_0_theme(colors.brutalist-outline)] cursor-pointer"
    }`}
  >
    <HeartHandshake size={14} className="stroke-[2.5]" />
    {isAdopted ? "Adopted" : "Adopt Now"}
  </button>
</Link>

                  </div>
                 
                </div>
              );
            })}
          </div>
        )}

      </div>
      {/* PAGINATION CONTROL BAR */}
{!loading && totalPages > 1 && (
  <div className="mt-12 flex flex-col items-center gap-4 text-berry-ink">
    <div className="flex items-center gap-2">
      <button 
        disabled={page === 1}
        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
        className="px-4 py-2 border-2 border-brutalist-outline rounded-full font-black text-xs uppercase disabled:opacity-30 bg-card-surface hover:bg-amber-50 cursor-pointer shadow-[2px_2px_0_0_theme(colors.brutalist-outline)] transition-all"
      >
        Previous
      </button>

      {/* Page Numbers */}
      {[...Array(totalPages)].map((_, i) => {
        const pageNum = i + 1;
        // Logic to show a limited range of page buttons
        if (Math.abs(pageNum - page) > 2 && pageNum !== 1 && pageNum !== totalPages) return null;
        
        return (
          <button
            key={pageNum}
            onClick={() => setPage(pageNum)}
            className={`w-10 h-10 rounded-full border-2 border-brutalist-outline font-black text-xs transition-all ${
              page === pageNum 
                ? "bg-[var(--btn-primary)] text-[var(--btn-text)] shadow-[2px_2px_0_0_theme(colors.brutalist-outline)]" 
                : "bg-card-surface hover:bg-amber-50"
            }`}
          >
            {pageNum}
          </button>
        );
      })}

      <button 
        disabled={page === totalPages}
        onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
        className="px-4 py-2 border-2 border-brutalist-outline rounded-full font-black text-xs uppercase disabled:opacity-30 bg-card-surface hover:bg-amber-50 cursor-pointer shadow-[2px_2px_0_0_theme(colors.brutalist-outline)] transition-all"
      >
        Next
      </button>
    </div>
    
    <p className="text-xs font-bold uppercase tracking-widest opacity-60">
      Page {page} of {totalPages} — {pets.length * totalPages} total pets
    </p>
  </div>
)}
    </div>
    
  );
}