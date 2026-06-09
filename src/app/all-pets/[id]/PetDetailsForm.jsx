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
  
    const response = await fetch(`http://localhost:5000/adopt-requests`, {
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
    <div className="min-h-screen bg-[#f9f3eb] py-12 px-4 font-sans text-[#2d1e18]">
      <Toaster position="top-center" />
      <div className="max-w-7xl mx-auto">
        <Link href="/all-pets" className="text-xs font-black uppercase flex items-center gap-2 mb-8 hover:text-[#ff7660]">
          <ArrowLeft size={16} /> Back to listings
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Pet Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#fffdf9] border-3 border-[#2d1e18] rounded-[32px] overflow-hidden shadow-[6px_6px_0_0_#2d1e18]">
              <div className="w-full h-96 relative bg-[#f5ebe0] border-b-3 border-[#2d1e18]">
                <Image src={pet.imageUrl} alt={pet.petName} fill className="object-cover" />
              </div>
              <div className="p-8">
                <h1 className="text-4xl font-black uppercase">{pet.petName}</h1>
                <p className="font-black text-xs uppercase text-[#ff7660] mt-1">{pet.breed} &bull; {pet.species}</p>
                <div className="grid grid-cols-2 gap-4 mt-6 py-6 border-y-2 border-dashed border-[#2d1e18]/20">
                  <div className="flex items-center gap-2 text-xs font-bold"><Calendar size={16} className="text-[#ff7660]"/> Age: {pet.age}</div>
                  <div className="flex items-center gap-2 text-xs font-bold"><User size={16} className="text-[#ff7660]"/> Gender: {pet.gender}</div>
                  <div className="flex items-center gap-2 text-xs font-bold"><Stethoscope size={16} className="text-[#ff7660]"/> Health: {pet.healthStatus}</div>
                  <div className="flex items-center gap-2 text-xs font-bold"><ShieldCheck size={16} className="text-[#ff7660]"/> Vax: {pet.vaccinationStatus}</div>
                  <div className="flex items-center gap-2 text-xs font-bold col-span-2"><MapPin size={16} className="text-[#ff7660]"/> Location: {pet.location}</div>
                </div>
                <p className="text-sm font-bold mt-6 text-[#2d1e18]/80 leading-relaxed">{pet.description}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Conditional UI */}
          <div className="lg:col-span-5">
            {isSubmitted ? (
              // Success Card
              <div className="bg-[#fffdf9] border-3 border-[#2d1e18] rounded-[32px] p-8 text-center shadow-[6px_6px_0_0_#2d1e18]">
                <CheckCircle2 size={64} className="mx-auto text-[#ff7660] mb-4" />
                <h2 className="font-black text-2xl uppercase mb-2">Request Sent!</h2>
                <p className="text-sm font-bold mb-6 opacity-70">Your application for {pet.petName} is under review.</p>
                <Link 
                  href="/dashboard/my-requests" 
                  className="block w-full py-4 bg-[#ff7660] text-white font-black rounded-xl border-2 border-[#2d1e18] hover:bg-[#ff7660] transition-colors"
                >
                  View My Requests
                </Link>
              </div>
            ) : (
              // Adoption Form
              <form action={handleAction} className="bg-[#fffdf9] border-3 border-[#2d1e18] rounded-[32px] p-8 shadow-[6px_6px_0_0_#2d1e18]">
                <h2 className="font-black text-lg uppercase mb-6 flex items-center gap-2"><HeartHandshake /> Adoption Inquiry</h2>
                <div className="space-y-4">
                  <div><label className="text-[10px] font-black uppercase">Pet Name</label><input disabled defaultValue={pet.petName} className="w-full bg-[#f0eadd] border-2 border-[#2d1e18] rounded-xl px-4 h-11 font-bold mt-1 opacity-70" /></div>
                  <div><label className="text-[10px] font-black uppercase">User Name</label><input disabled defaultValue={user?.name || "Guest"} className="w-full bg-[#f0eadd] border-2 border-[#2d1e18] rounded-xl px-4 h-11 font-bold mt-1 opacity-70" /></div>
                  <div><label className="text-[10px] font-black uppercase">User Email</label><input disabled defaultValue={user?.email || "N/A"} className="w-full bg-[#f0eadd] border-2 border-[#2d1e18] rounded-xl px-4 h-11 font-bold mt-1 opacity-70" /></div>
                  <div><label className="text-[10px] font-black uppercase">Pickup Date</label><input type="date" name="pickupDate" required className="w-full  border-2 border-[#2d1e18] rounded-xl px-4 h-11 font-bold mt-1" /></div>
                  <div><label className="text-[10px] font-black uppercase">Message</label><textarea name="message" required rows="3" className="w-full  border-2 border-[#2d1e18] rounded-xl p-4 font-bold mt-1" /></div>
                  <button type="submit" className="w-full h-12 bg-[#ff7660] text-white font-black rounded-xl border-2 border-[#2d1e18] hover:bg-[#ff624a]">Submit Application 🐾</button>
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