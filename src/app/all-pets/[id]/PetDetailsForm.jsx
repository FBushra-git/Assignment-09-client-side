"use client";

import { ArrowLeft, HeartHandshake, MapPin, Calendar, User, ShieldCheck, Stethoscope, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const PetDetailsForm = ({ pet, user }) => {
  // We use a query parameter to track submission status without hooks
  const searchParams = useSearchParams();
  const isSubmitted = searchParams.get("submitted") === "true";
  const handleAction = async (formData) => {
    const rawData = Object.fromEntries(formData);
     
    const {data:tokenData} = await authClient.token();
  
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/adopt-requests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" ,
       authorization: `Bearer ${tokenData?.token}` 
      },
      body: JSON.stringify({
        petId: pet._id?.$oid || pet._id,
        petName: pet.petName,
        userName: user?.name || user?.email || "Anonymous",
        
        petitionerEmail: user?.email,
        ownerEmail: pet.ownerEmail,
        pickupDate: rawData.pickupDate,
        message: rawData.message,
        status: "pending"
      })
    });

    const result = await response.json();

    if (response.ok) {
      toast.success("Request submitted successfully! 🐾");
      // Add query param to trigger UI change
      window.location.search = "?submitted=true";
    } else {
      toast.error(result.error || "Submission failed.");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] py-12 px-4 font-sans text-[var(--text-main)]">
      <Toaster position="top-center" />
      <div className="max-w-7xl mx-auto">
        <Link href="/all-pets" className="text-xs font-black uppercase flex items-center gap-2 mb-8 hover:text-[var(--btn-primary)]">
          <ArrowLeft size={16} /> Back to listings
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Pet Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[var(--bg-card)] border-3 border-[var(--outline-border)] rounded-[32px] overflow-hidden shadow-[6px_6px_0_0_var(--outline-border)]">
              <div className="w-full h-96 relative bg-[var(--bg-card)] border-b-3 border-[var(--outline-border)]">
                <Image src={pet.imageUrl} alt={pet.petName} fill className="object-cover" />
              </div>
              <div className="p-8">
                <h1 className="text-4xl font-black uppercase text-[var(--text-main)]">{pet.petName}</h1>
                <p className="font-black text-xs uppercase text-[var(--btn-primary)] mt-1">{pet.breed} &bull; {pet.species}</p>
                <div className="grid grid-cols-2 gap-4 mt-6 py-6 border-y-2 border-dashed border-[var(--outline-border)]/20">
                  <div className="flex items-center gap-2 text-xs font-bold"><Calendar size={16} className="text-[var(--btn-primary)]"/> Age: {pet.age}</div>
                  <div className="flex items-center gap-2 text-xs font-bold"><User size={16} className="text-[var(--btn-primary)]"/> Gender: {pet.gender}</div>
                  <div className="flex items-center gap-2 text-xs font-bold"><Stethoscope size={16} className="text-[var(--btn-primary)]"/> Health: {pet.healthStatus}</div>
                  <div className="flex items-center gap-2 text-xs font-bold"><ShieldCheck size={16} className="text-[var(--btn-primary)]"/> Vax: {pet.vaccinationStatus}</div>
                  <div className="flex items-center gap-2 text-xs font-bold col-span-2"><MapPin size={16} className="text-[var(--btn-primary)]"/> Location: {pet.location}</div>
                </div>
                <p className="text-sm font-bold mt-6 text-[var(--text-main)]/80 leading-relaxed">{pet.description}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Conditional UI */}
          <div className="lg:col-span-5">
            {isSubmitted ? (
              // Success Card
              <div className="bg-[var(--bg-card)] border-3 border-[var(--outline-border)] rounded-[32px] p-8 text-center shadow-[6px_6px_0_0_var(--outline-border)]">
                <CheckCircle2 size={64} className="mx-auto text-[var(--btn-primary)] mb-4" />
                <h2 className="font-black text-2xl uppercase mb-2 text-[var(--text-main)]">Request Sent!</h2>
                <p className="text-sm font-bold mb-6 opacity-70">Your application for {pet.petName} is under review.</p>
                <Link 
                  href="/dashboard/my-requests" 
                  className="block w-full py-4 bg-[var(--btn-primary)] text-[var(--btn-text)] font-black rounded-xl border-2 border-[var(--outline-border)] hover:bg-[var(--btn-primary-hover)] transition-colors"
                >
                  View My Requests
                </Link>
              </div>
            ) : (
              // Adoption Form
              <form action={handleAction} className="bg-[var(--bg-card)] border-3 border-[var(--outline-border)] rounded-[32px] p-8 shadow-[6px_6px_0_0_var(--outline-border)]">
                <h2 className="font-black text-lg uppercase mb-6 flex items-center gap-2 text-[var(--text-main)]"><HeartHandshake /> Adoption Inquiry</h2>
                <div className="space-y-4">
                  <div><label className="text-[10px] font-black uppercase text-[var(--text-main)]">Pet Name</label><input disabled defaultValue={pet.petName} className="w-full bg-[var(--bg-canvas)]/30 border-2 border-[var(--outline-border)] rounded-xl px-4 h-11 font-bold mt-1 opacity-70 text-[var(--text-main)]" /></div>
                  <div><label className="text-[10px] font-black uppercase text-[var(--text-main)]">User Name</label><input disabled defaultValue={user?.name || "Guest"} className="w-full bg-[var(--bg-canvas)]/30 border-2 border-[var(--outline-border)] rounded-xl px-4 h-11 font-bold mt-1 opacity-70 text-[var(--text-main)]" /></div>
                  <div><label className="text-[10px] font-black uppercase text-[var(--text-main)]">User Email</label><input disabled defaultValue={user?.email || "N/A"} className="w-full bg-[var(--bg-canvas)]/30 border-2 border-[var(--outline-border)] rounded-xl px-4 h-11 font-bold mt-1 opacity-70 text-[var(--text-main)]" /></div>
                  <div><label className="text-[10px] font-black uppercase text-[var(--text-main)]">Pickup Date</label><input type="date" name="pickupDate" required className="w-full border-2 border-[var(--outline-border)] rounded-xl px-4 h-11 font-bold mt-1 bg-[var(--bg-canvas)] text-[var(--text-main)]" /></div>
                  <div><label className="text-[10px] font-black uppercase text-[var(--text-main)]">Message</label><textarea name="message" required rows="3" className="w-full border-2 border-[var(--outline-border)] rounded-xl p-4 font-bold mt-1 bg-[var(--bg-canvas)] text-[var(--text-main)]" /></div>
                  <button type="submit" className="w-full h-12 bg-[var(--btn-primary)] text-[var(--btn-text)] font-black rounded-xl border-2 border-[var(--outline-border)] hover:bg-[var(--btn-primary-hover)]">Submit Application 🐾</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetailsForm;