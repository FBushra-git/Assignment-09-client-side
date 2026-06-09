"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image"; // Added next/image
import { useRouter } from "next/navigation";
import { MapPin, ArrowUpRight, HeartHandshake } from "lucide-react";

const PetCard = ({ pet }) => {
  const router = useRouter();
  
  const { _id, petName, species, breed, age, location, adoptionFee, imageUrl } = pet;
  const petId = _id?.$oid || _id;

  const isUserLoggedIn = true; 

//   const handleAuthCheck = (e) => {
//     if (!isUserLoggedIn) {
//       e.preventDefault(); 
//       router.push("/login"); 
//     }
//   };

  const speciesLower = species?.toLowerCase();
  const innerCardBg = 
    speciesLower === "dog" ? "bg-accent/20" : 
    speciesLower === "cat" ? "bg-amber-400/20" : 
    speciesLower === "rabbit" ? "bg-pink-400/20" : "bg-teal-400/20";

  return (
    <div className="group bg-surface text-main border-3 border-outline rounded-[24px] shadow-[6px_6px_0_0_theme(colors.outline)] overflow-hidden flex flex-col transition-transform hover:-translate-y-1">
      
      <div className="p-4">
        <div className={`${innerCardBg} rounded-[18px] border-2 border-outline aspect-[4/3] relative overflow-hidden flex items-center justify-center transition-colors duration-200`}>
          
          <div className="absolute top-3 left-3 bg-surface border-2 border-outline rounded-full px-3 py-1 shadow-[2px_2px_0_0_theme(colors.outline)] z-10 transition-colors duration-200">
            <span className="text-[10px] font-black uppercase tracking-wider text-main">
              🐾 {species}
            </span>
          </div>

          <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface border-2 border-outline flex items-center justify-center shadow-[2px_2px_0_0_theme(colors.outline)] hover:bg-accent/20 text-main font-bold text-sm transition-all z-10">
            ♡
          </button>

          {/* Optimized Next/Image Component */}
          <Image
            src={imageUrl}
            alt={petName}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={false} // Set to true only if this card is in the LCP viewport
          />
        </div>
      </div>

      <div className="px-6 pb-6 pt-2 flex flex-col flex-grow justify-between">
        <div className="space-y-2">
          
          <div className="flex items-center text-main/70 text-xs font-black uppercase tracking-wider gap-1">
            <MapPin size={14} className="stroke-[2.5]" />
            {location}
          </div>

          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-black text-main tracking-tight mb-0.5">
                {petName}
              </h3>
              <p className="text-xs font-bold uppercase tracking-wider text-accent">
                {breed} • <span className="text-main/60 font-medium normal-case">{age}</span>
              </p>
            </div>
            
            <div className="text-right">
              <span className="text-2xl font-black text-main">
                {adoptionFee > 0 ? `$${adoptionFee}` : "Free"}
              </span>
              <span className="text-main/50 text-[10px] font-black uppercase block tracking-wider mt-0.5">
                /Fee
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-5">
          
          <Link href={`/all-pets/${petId}`} onClick={handleAuthCheck}>
            <button className="w-full h-11 rounded-full border-2 border-outline bg-surface text-main font-black text-[11px] uppercase tracking-widest shadow-[0_3px_0_0_theme(colors.outline)] hover:bg-accent/10 active:translate-y-[2px] active:shadow-[0_1px_0_0_theme(colors.outline)] transition-all flex items-center justify-center gap-1 cursor-pointer">
              Details <ArrowUpRight size={14} className="stroke-[2.5]" />
            </button>
          </Link>

          <Link href={`/all-pets/${petId}`} onClick={handleAuthCheck}>
            <button className="w-full h-11 rounded-full border-2 border-outline bg-accent text-btn-text font-black text-[11px] uppercase tracking-widest shadow-[0_3px_0_0_theme(colors.outline)] hover:opacity-90 active:translate-y-[2px] active:shadow-[0_1px_0_0_theme(colors.outline)] transition-all flex items-center justify-center gap-1.5 cursor-pointer">
              Adopt <HeartHandshake size={14} className="stroke-[2.5]" />
            </button>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default PetCard;