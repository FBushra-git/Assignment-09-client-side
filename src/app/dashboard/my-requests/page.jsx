"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { HeartHandshake, Eye, Trash2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const MyRequestsPage =  () => {

  const [requestsList, setRequestsList] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: session } = authClient.useSession();
  const currentUserEmail = session?.user?.email;

  useEffect(() => {
    if (!currentUserEmail) return;
    let isMounted = true;

    const fetchUserApplications = async () => {
      try {
        const {data:tokenData} = await authClient.token();
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/adopt-requests`, { 
          cache: "no-store",
        headers: {
        Authorization: `Bearer ${tokenData.token}`,
          }
         });
        if (!res.ok) throw new Error("Could not load registry matrix data dataframes");
        const allApplications = await res.json();
        
        const matchingApplications = allApplications.filter(
          req => req.petitionerEmail === currentUserEmail
        );
        
        if (isMounted) {
          setRequestsList(matchingApplications);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          toast.error("Failed loading your adoption logs records.");
          setLoading(false);
        }
      }
    };

    fetchUserApplications();
    return () => { isMounted = false; };
  }, [currentUserEmail]);

  const handleCancelRequest = async (requestId, petName) => {
    if (!confirm(`Are you sure you want to retract and cancel your adoption application for ${petName}?`)) return;

    try {
       const { data: tokenData } = await authClient.token();
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/adopt-requests/${requestId}`, {
        method: "DELETE",
         headers: {
          Authorization: `Bearer ${tokenData.token}`,
        },
      });
      const responseData = await res.json();

      if (res.ok && responseData.success) {
        toast.success(`Application for ${petName} retracted successfully.`);
        setRequestsList(prev => prev.filter(req => (req._id?.$oid || req._id) !== requestId));
      } else {
        throw new Error(responseData.error || "Server validation drop failure");
      }
    } catch (err) {
      console.error(err);
      toast.error("Could not cancel this request application pipeline entry.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-canvas-bg flex items-center justify-center font-sans font-black text-berry-ink">
        Compiling Request Frameworks Logs... 🐾
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas-bg py-12 px-4 sm:px-6 lg:px-8 font-sans text-berry-ink">
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 flex items-center gap-3">
          <div className="bg-brutalist-outline border-2 border-brutalist-outline p-2.5 rounded-2xl shadow-[3px_3px_0_0_theme(colors.brutalist-outline)] text-canvas-bg">
            <HeartHandshake size={28} className="stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-0.5">My Adoption Requests</h1>
            <p className="text-xs font-bold uppercase tracking-wider text-berry-ink/60">
              Track, inspect, and monitor adoption files you submitted to owners
            </p>
          </div>
        </header>

        {requestsList.length === 0 ? (
          <div className="text-center py-20 bg-card-surface rounded-[32px] border-3 border-brutalist-outline shadow-[5px_5px_0_0_theme(colors.brutalist-outline)]">
            <p className="text-lg font-black text-berry-ink/50 mb-4">You have not submitted any adoption forms yet! 🐾</p>
            <Link href="/all-pets">
              <button className="h-11 px-6 rounded-full border-2 border-brutalist-outline bg-brutalist-outline text-canvas-bg font-black text-xs uppercase tracking-widest shadow-[3px_3px_0_0_theme(colors.brutalist-outline)] hover:opacity-80 transition-all">
                Browse Animals Directory
              </button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto bg-card-surface border-3 border-brutalist-outline rounded-[24px] shadow-[4px_4px_0_0_theme(colors.brutalist-outline)]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-3 border-brutalist-outline">
                  <th className="p-4 font-black uppercase text-xs">Pet Name</th>
                  <th className="p-4 font-black uppercase text-xs">Request Date</th>
                  <th className="p-4 font-black uppercase text-xs">Pickup Date</th>
                  <th className="p-4 font-black uppercase text-xs">Status</th>
                  <th className="p-4 font-black uppercase text-xs">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requestsList.map((req, index) => {
                  const requestId = req._id?.$oid || req._id || index;
                  return (
                    <tr key={requestId} className="border-b border-brutalist-outline/10 hover:bg-brutalist-outline/5">
                      <td className="p-4 font-bold text-sm">{req.petName}</td>
                      <td className="p-4 text-xs">{req.requestDate || "Not Available"}</td>
                      <td className="p-4 text-xs">{req.pickupDate || "Not Selected"}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase border border-brutalist-outline ${
                          req.status === "approved" ? "bg-teal-500 text-white" : "bg-amber-500 text-white"
                        }`}>
                          {req.status || "pending"}
                        </span>
                      </td>
                      <td className="p-4 flex gap-2">
                        <Link href={`/all-pets/${req.petId}`}>
                          <button className="flex items-center gap-1 text-xs font-black hover:opacity-70">
                            <Eye size={14} /> View
                          </button>
                        </Link>
                        <button 
                          onClick={() => handleCancelRequest(requestId, req.petName)}
                          className="flex items-center gap-1 text-xs font-black text-rose-500 hover:text-rose-700"
                        >
                          <Trash2 size={14} /> Cancel
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRequestsPage;