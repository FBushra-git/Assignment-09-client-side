"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  FolderHeart, BarChart3, ShieldCheck, HeartHandshake, 
  Eye, Edit3, Trash2, X, Calendar, Mail, User, MessageSquare 
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

// BetterAuth client-side utilities framework
import { authClient } from "@/lib/auth-client"; 

export default function MyListingsDashboard() {
  const router = useRouter();
  
  // --- BETTERAUTH SESSION INITIALIZATION ---
  const { data: session, isPending: isAuthLoading } = authClient.useSession();
  const currentUserEmail = session?.user?.email;

  // Core Data Storage States
  const [myPets, setMyPets] = useState([]);
  
  // Initialize to true so we never have to call setIsGridLoading(true) synchronously inside useEffect
  const [isGridLoading, setIsGridLoading] = useState(true);
  
  // Interaction Side Modal Drawer Windows UI States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePetRequests, setActivePetRequests] = useState([]);
  const [selectedPetName, setSelectedPetName] = useState("");

  // 1. Fetch Listings safely using the active authenticated context email
  useEffect(() => {
    // If BetterAuth is still resolving the session or no user is logged in, skip fetching
    if (!currentUserEmail) {
      return;
    }

    let isMounted = true;

    const fetchDashboardContent = async () => {
      try {
        // Safe time conversion extraction before embedding into string generation paths
        const timestamp = new Date().getTime();
         const {data:tokenData} = await authClient.token();
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/add-pet?t=${timestamp}`, { 
          method: "GET",
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache",
            "Expires": "0",
            authorization: `Bearer ${tokenData?.token}`
          },
        });
        
        if (!res.ok) throw new Error("Server communication break down reading asset tables data array");
        const catalogListings = await res.json();
        
        // Filter out records that belong to the logged in account profile
        const ownershipMatch = catalogListings.filter(
  pet =>
    pet.ownerEmail?.trim().toLowerCase() ===
    currentUserEmail?.trim().toLowerCase()
);
        
        if (isMounted) {
          setMyPets(ownershipMatch);
          setIsGridLoading(false);
        }
      } catch (err) {
        console.error("Failed fetching collection documents directly:", err);
        if (isMounted) setIsGridLoading(false);
      }
    };

    fetchDashboardContent();

    return () => {
      isMounted = false;
    };
  }, [currentUserEmail]);

  // 2. Fetch specific adoption application metadata blocks for target modal render
  const handleOpenRequestsModal = async (petId, petName) => {
  setSelectedPetName(petName);

  try {
    const {data:tokenData} = await authClient.token();
    const timestamp = new Date().getTime();
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/adopt-requests?t=${timestamp}`,
      {
        headers: {
        authorization: `Bearer ${tokenData?.token}`
      }
      }
    );

    const completeRequestsLogs = await res.json();

    const normalize = (id) => {
      if (!id) return "";
      return typeof id === "object" ? id.$oid : String(id);
    };

    const explicitMatches = completeRequestsLogs.filter((req) =>
      normalize(req.petId) === normalize(petId)
    );

    // console.log("PET ID:", petId);
    // console.log("ALL REQUESTS:", completeRequestsLogs);
    // console.log("MATCHED:", explicitMatches);

    setActivePetRequests(explicitMatches);
    setIsModalOpen(true);

  } catch (err) {
    console.error(err);
    toast.error("Failed loading requests");
  }
};

  // 3. Delete button execution request target pipe route trigger
  const handleTriggerDeletionPipeline = async (petId, petName) => {
    if (!confirm(`Are you completely sure you want to delete ${petName} permanently?`)) return;
    
    try {
      const {data:tokenData} = await authClient.token();
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/add-pet/${petId}`, {
        method: "DELETE",
        headers:{
          authorization: `Bearer ${tokenData?.token}`
        }
      });
      const dataResponseObj = await res.json();

      if (res.ok && dataResponseObj.success) {
        toast.success(`${petName} has been wiped cleanly! 🐾`);
       setMyPets(prev =>
  prev.filter(item =>
    String(item._id?.$oid || item._id) !== String(petId)
  )
);
      } else {
        throw new Error(dataResponseObj.error || "Server validation rejected operation parameters layout");
      }
    } catch (err) {
      console.error("Action handler crash drop execution failed:", err);
      toast.error("Could not remove data file registry at this moment.");
    }
  };

  // 4. Calculate Numerical Stat Performance Metric Badges Dynamically
  const totalListingsCount = myPets.length;
  const metricsAvailableCount = myPets.filter(
  item => item.status === "available"
).length;

const metricsAdoptedCount = myPets.filter(
  item => item.status === "adopted"
).length;

  // Render a fallback layout screen if BetterAuth is processing credentials tokens
  if (isAuthLoading || (!currentUserEmail && isGridLoading)) {
    return (
      <div className="min-h-screen  flex items-center justify-center font-sans font-black text-[var(--text-main)]">
        Verifying security clearance session... 🐾
      </div>
    );
  }

  // Handle unauthorized state gracefully if someone lands here without an account session
  if (!currentUserEmail) {
    return (
      <div className="min-h-screen  flex flex-col items-center justify-center font-sans text-[var(--text-main)] p-4">
        <p className="text-lg font-black mb-4">Please log in to manage your pet listings! 🔐</p>
        <button 
          onClick={() => router.push("/login")} 
          className="h-11 px-6 rounded-full border-2 border-[var(--outline-border)] bg-[var(--btn-primary)] text-[var(--btn-text)] font-black text-xs uppercase tracking-widest shadow-[3px_3px_0_0_var(--outline-border)]"
        >
          Go to Login
        </button>
      </div>
    );
  }
  

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans text-[var(--text-main)]">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-7xl mx-auto">
        
        {/* Title View Header Container Row Section */}
        <header className="mb-10 flex items-center gap-3">
          <div className="bg-[var(--btn-primary)] border-2 border-[var(--outline-border)] p-2.5 rounded-2xl shadow-[3px_3px_0_0_var(--outline-border)] text-[var(--btn-text)]">
            <FolderHeart size={28} className="stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-0.5 text-[var(--text-main)]">My Listings</h1>
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-main)]/60">
              Manage, monitor, and supervise your added pet profiles
            </p>
          </div>
        </header>

        {/* Stats Summary Panel Row Module Element Layouts */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-[var(--bg-card)] border-3 border-[var(--outline-border)] rounded-[24px] p-5 shadow-[4px_4px_0_0_var(--outline-border)] flex items-center justify-between">
            <div>
              <span className="block text-xs font-black uppercase tracking-wider text-[var(--text-main)]/60 mb-1">Total Listings</span>
              <span className="text-3xl font-black text-[var(--text-main)]">{totalListingsCount}</span>
            </div>
            <BarChart3 className="text-[var(--btn-primary)] stroke-[2.5] w-8 h-8 opacity-40" />
          </div>
          
          <div className="bg-[var(--bg-card)] border-3 border-[var(--outline-border)] rounded-[24px] p-5 shadow-[4px_4px_0_0_var(--outline-border)] flex items-center justify-between">
            <div>
              <span className="block text-xs font-black uppercase tracking-wider text-[var(--text-main)]/60 mb-1">Available Profiles</span>
              <span className="text-3xl font-black text-[var(--text-main)]">{metricsAvailableCount}</span>
            </div>
            <ShieldCheck className="text-teal-600 stroke-[2.5] w-8 h-8 opacity-50" />
          </div>

          <div className="bg-[var(--bg-card)] border-3 border-[var(--outline-border)] rounded-[24px] p-5 shadow-[4px_4px_0_0_var(--outline-border)] flex items-center justify-between">
            <div>
              <span className="block text-xs font-black uppercase tracking-wider text-[var(--text-main)]/60 mb-1">Adopted</span>
              <span className="text-3xl font-black text-[var(--text-main)]">{metricsAdoptedCount}</span>
            </div>
            <HeartHandshake className="text-[var(--btn-primary)] stroke-[2.5] w-8 h-8 opacity-50" />
          </div>
        </section>

        {/* Primary Data Grid Content Mapping Area */}
        {isGridLoading ? (
          <div className="text-center py-20 font-sans font-black text-[var(--text-main)]">
            Loading Dashboard Panel View... 🐾
          </div>
        ) : myPets.length === 0 ? (
          <div className="text-center py-20 bg-[var(--bg-card)] rounded-[32px] border-3 border-[var(--outline-border)] shadow-[5px_5px_0_0_var(--outline-border)]">
            <p className="text-lg font-black text-[var(--text-main)]/50 mb-4">You haven&apos;t listed any pets for adoption yet! 😿</p>
            <Link href="/add-pet">
              <button className="h-11 px-6 rounded-full border-2 border-[var(--outline-border)] bg-[var(--btn-primary)] text-[var(--btn-text)] font-black text-xs uppercase tracking-widest shadow-[3px_3px_0_0_var(--outline-border)] hover:bg-[var(--btn-primary-hover)] active:translate-y-[2px] transition-all">
                + Create Pet Entry Listing
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {myPets.map((pet) => {
              const targetIdentifierId = pet._id?.$oid || pet._id;
              
              return (
                <div key={targetIdentifierId} className="bg-[var(--bg-card)] rounded-[24px] border-3 border-[var(--outline-border)] shadow-[5px_5px_0_0_var(--outline-border)] overflow-hidden flex flex-col p-4">
                  
                  <div className="rounded-[18px] border-2 border-[var(--outline-border)] aspect-[16/10] overflow-hidden relative mb-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={pet.imageUrl} 
                      alt={pet.petName} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute top-2 right-2 bg-[var(--bg-card)] border-2 border-[var(--outline-border)] px-3 py-1 rounded-full text-xs font-black shadow-[2px_2px_0_0_var(--outline-border)] text-[var(--text-main)]">
                      {pet.adoptionFee > 0 ? `$${pet.adoptionFee}` : "Free"}
                    </div>
                  </div>

                  <div className="mb-4 px-1 flex justify-between items-baseline">
                    <h3 className="text-xl font-black tracking-tight text-[var(--text-main)]">{pet.petName}</h3>
                    <span className="text-[10px] font-black uppercase bg-[var(--btn-primary)]/20 border border-[var(--outline-border)] rounded-full px-2 py-0.5 tracking-wider text-[var(--text-main)]">
                      🐾 {pet.species}
                    </span>
                  </div>

                  <div className="space-y-2 mt-auto">
                    <button 
                      onClick={() => handleOpenRequestsModal(targetIdentifierId, pet.petName)}
                      className="w-full h-10 rounded-full border-2 border-[var(--outline-border)] bg-[var(--btn-primary)]/20 text-[var(--text-main)] font-black text-xs uppercase tracking-wider shadow-[0_2.5px_0_0_var(--outline-border)] hover:bg-[var(--btn-primary)]/30 active:translate-y-[1px] active:shadow-[0_1px_0_0_var(--outline-border)] transition-all flex items-center justify-center gap-1.5"
                    >
                      <HeartHandshake size={14} className="stroke-[2.5]" /> Requests Button
                    </button>

                    <div className="grid grid-cols-3 gap-2">
                      <Link href={`/all-pets/${targetIdentifierId}`} className="w-full">
                        <button className="w-full h-10 rounded-full border-2 border-[var(--outline-border)] bg-[var(--bg-card)] hover:bg-[var(--bg-card)]/80 font-black text-[var(--text-main)] flex items-center justify-center shadow-[0_2.5px_0_0_var(--outline-border)] active:translate-y-[1px] transition-all" title="View Button Details Page">
                          <Eye size={15} className="stroke-[2.5]" />
                        </button>
                      </Link>

                      <button 
                        onClick={() => router.push(`/dashboard/my-listings/update/${targetIdentifierId}`)}
                        className="w-full h-10 rounded-full border-2 border-[var(--outline-border)] bg-teal-500/20 hover:bg-teal-500/30 font-black text-teal-700 flex items-center justify-center shadow-[0_2.5px_0_0_var(--outline-border)] active:translate-y-[1px] transition-all" 
                        title="Edit Button Update Form Page"
                      >
                        <Edit3 size={15} className="stroke-[2.5]" />
                      </button>

                      <button 
                        onClick={() => handleTriggerDeletionPipeline(targetIdentifierId, pet.petName)}
                        className="w-full h-10 rounded-full border-2 border-[var(--outline-border)] bg-rose-50 hover:bg-rose-100 font-black text-rose-600 flex items-center justify-center shadow-[0_2.5px_0_0_var(--outline-border)] active:translate-y-[1px] transition-all" 
                        title="Delete Button Execution"
                      >
                        <Trash2 size={15} className="stroke-[2.5]" />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* 3D BRUTALIST FLOATING ADOPTION REQUEST PANEL MODAL CONTAINER BOX OVERLAY   */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[var(--text-main)]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[var(--bg-card)] border-4 border-[var(--outline-border)] w-full max-w-2xl rounded-[32px] shadow-[8px_8px_0_0_var(--outline-border)] overflow-hidden max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
            
            <div className="bg-[var(--btn-primary)] text-[var(--btn-text)] p-5 border-b-4 border-[var(--outline-border)] flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black tracking-tight uppercase">Applications: {selectedPetName}</h2>
                <p className="text-[10px] font-bold tracking-widest uppercase text-white/80">Adoption request review logs list</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[var(--bg-card)] border-2 border-[var(--outline-border)] text-[var(--text-main)] hover:bg-rose-50 font-bold flex items-center justify-center transition-all shadow-[2px_2px_0_0_var(--outline-border)]"
              >
                <X size={16} className="stroke-[3]" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 bg-[var(--bg-canvas)]">
              {activePetRequests.length === 0 ? (
                 <p className="text-center font-black text-[var(--text-main)]/60 py-10">
                  No requests for this pet 🐾
                   </p>
                   ) : (
               activePetRequests.map((req, index) => {
                    
                  const request = {
                      id: req._id?.$oid || req._id,
                      title: req.petName,
                      name: req.userName || req.petitionerEmail,
                      email: req.petitionerEmail,
                       pickupDate: req.pickupDate,
                       status: (req.status || "pending").toLowerCase()
                      };
                const requestId = req._id?.$oid || req._id || index;
                const currentStatus = (req.status || "pending").toString().trim().toLowerCase();

                const handleUpdateStatus = async (targetStatus) => {
                  try {
                    const {data:tokenData} = await authClient.token();
                    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/adopt-requests/${requestId}`, {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json",
                        authorization: `Bearer ${tokenData?.token}`
                       },
                      body: JSON.stringify({ status: targetStatus })
                    });
                    const data = await res.json();

                    if (res.ok && data.success) {
                      toast.success(`Application has been ${targetStatus}!`);
                      const {data:tokenData} = await authClient.token();
                      const refresh = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/add-pet?t=` + Date.now(),
                    {
                      headers: {
                        authorization: `Bearer ${tokenData?.token}`
                      }
                    });
                      const updatedPets = await refresh.json();

                      setMyPets(updatedPets);
                      setActivePetRequests(prev => 
                        prev.map(r => (r._id?.$oid || r._id || index) === requestId ? { ...r, status: targetStatus } : r)
                      );
                    } else {
                      throw new Error(data.error || "Status modifier failed");
                    }
                  } catch (err) {
                    console.error(err);
                    toast.error("Could not process choice decision.");
                  }
                };

                return (
                  <div key={requestId} className="bg-[var(--bg-card)] border-2 border-[var(--outline-border)] rounded-[20px] p-4 shadow-[3px_3px_0_0_var(--outline-border)] space-y-3">
                    
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-dashed border-[var(--outline-border)]/10 pb-2">
                      <div className="flex items-center gap-2 text-sm font-black text-[var(--text-main)]">
                        <User size={15} className="text-[var(--btn-primary)] stroke-[2.5]" />
                        {req.userName || req.petitionerEmail || "Anonymous User"}
                      </div>
                      <div className={`border border-[var(--outline-border)] text-xs font-black uppercase px-2.5 py-0.5 rounded-full ${
                        currentStatus === "approved" ? "bg-teal-100 text-teal-800" :
                        currentStatus === "rejected" ? "bg-rose-100 text-rose-800" : "bg-amber-100 text-amber-800"
                      }`}>
                        {currentStatus}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-[var(--text-main)]/80">
                      <div className="flex items-center gap-1.5 truncate">
                        <Mail size={13} className="text-[var(--text-main)]/60" />
                        {req.petitionerEmail}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-[var(--btn-primary)]" />
                        Target Pickup: <span className="font-black text-[var(--text-main)]">{req.pickupDate}</span>
                      </div>
                    </div>

                    {req.message && (
                      <div className="bg-[var(--bg-canvas)]/30 rounded-xl border border-[var(--outline-border)]/20 p-3 text-xs font-medium leading-relaxed flex gap-2">
                        <MessageSquare size={14} className="text-[var(--text-main)]/60 shrink-0 mt-0.5 stroke-[2.5]" />
                        <p className="text-[var(--text-main)]/90 italic">&ldquo;{req.message}&rdquo;</p>
                      </div>
                    )}

                    {currentStatus === "pending" && (
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <button 
                          onClick={() => handleUpdateStatus("approved")}
                          className="h-9 rounded-full border-2 border-[var(--outline-border)] bg-teal-100 hover:bg-teal-200 text-teal-900 font-black text-xs uppercase tracking-wider transition-all shadow-[1.5px_1.5px_0_0_var(--outline-border)]"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => handleUpdateStatus("rejected")}
                          className="h-9 rounded-full border-2 border-[var(--outline-border)] bg-rose-100 hover:bg-rose-200 text-rose-900 font-black text-xs uppercase tracking-wider transition-all shadow-[1.5px_1.5px_0_0_var(--outline-border)]"
                        >
                          Reject
                        </button>
                      </div>
                    )}

                  </div>
                );
              })
            )}
            </div>

            <div className="p-4 bg-[var(--bg-card)] border-t-2 border-[var(--outline-border)]/10 text-right">
              <button
                onClick={() => setIsModalOpen(false)}
                className="h-10 px-5 rounded-full border-2 border-[var(--outline-border)] bg-[var(--text-main)] text-[var(--btn-text)] font-black text-xs uppercase tracking-wider transition-all hover:bg-[var(--text-main)]/80"
              >
                Close Panel View
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}