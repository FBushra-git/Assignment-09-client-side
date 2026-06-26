"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Edit3, ArrowLeft } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdatePetProfilePage() {
  const router = useRouter();
  const params = useParams();
  const petId = params.id;

  const [formData, setFormData] = useState({
    petName: "",
    species: "",
    imageUrl: "",
    adoptionFee: 0,
    description: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!petId) return;

    const fetchPet = async () => {
      try {
         const {data:tokenData} = await authClient.token();
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/add-pet/${petId}`,{
          headers:{

            authorization: `Bearer ${tokenData.token}`
          }
        }
          
        );
        if (!res.ok) throw new Error("Could not find pet");
        const data = await res.json();
        
        setFormData({
          petName: data.petName || "",
          species: data.species || "",
          imageUrl: data.imageUrl || "",
          adoptionFee: data.adoptionFee || 0,
          description: data.description || ""
        });
        setLoading(false);
      } catch (err) {
        toast.error("Failed to load pet data.");
        router.push("/dashboard/my-listings");
      }
    };

    fetchPet();
  }, [petId, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "adoptionFee" ? parseFloat(value) || 0 : value
    }));
  };

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    try {
      const {data:tokenData} = await authClient.token()
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/add-pet/${petId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json",
          authorization: `Bearer ${tokenData?.token}`
         },
        body: JSON.stringify(formData)
      });
      const outputData = await res.json();

      if (res.ok && outputData.success) {
        toast.success("Pet listing updated successfully! 🐾");
        setTimeout(() => router.push("/dashboard/my-listings"), 1200);
      } else {
        throw new Error(outputData.error || "Update failed");
      }
    } catch (err) {
      toast.error("Could not modify values.");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center font-black">Loading...</div>;

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] py-12 px-4 font-sans text-[var(--text-main)]">
      <Toaster position="top-center" />
      <div className="max-w-2xl mx-auto">
        <button onClick={() => router.push("/dashboard/my-listings")} className="mb-6 flex items-center gap-1.5 text-xs font-black uppercase tracking-wider hover:text-[var(--btn-primary)]">
          <ArrowLeft size={14} /> Back to Dashboard
        </button>
        <div className="bg-[var(--bg-card)] border-4 border-[var(--outline-border)] rounded-[32px] p-6">
          <h1 className="text-2xl font-black uppercase mb-6 text-[var(--text-main)]">Update Profile</h1>
          <form onSubmit={handleFormSubmission} className="space-y-4">
            <input name="petName" value={formData.petName} onChange={handleInputChange} className="w-full h-11 px-4 border-2 border-[var(--outline-border)] rounded-xl bg-[var(--bg-canvas)] text-[var(--text-main)]" placeholder="Pet Name" />
            <input name="species" value={formData.species} onChange={handleInputChange} className="w-full h-11 px-4 border-2 border-[var(--outline-border)] rounded-xl bg-[var(--bg-canvas)] text-[var(--text-main)]" placeholder="Species" />
            <input name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} className="w-full h-11 px-4 border-2 border-[var(--outline-border)] rounded-xl bg-[var(--bg-canvas)] text-[var(--text-main)]" placeholder="Image URL" />
            <input type="number" name="adoptionFee" value={formData.adoptionFee} onChange={handleInputChange} className="w-full h-11 px-4 border-2 border-[var(--outline-border)] rounded-xl bg-[var(--bg-canvas)] text-[var(--text-main)]" />
            <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full p-4 border-2 border-[var(--outline-border)] rounded-xl bg-[var(--bg-canvas)] text-[var(--text-main)]" rows="4"></textarea>
            <button type="submit" className="w-full h-12 rounded-xl bg-[var(--btn-primary)] text-[var(--btn-text)] font-black uppercase">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
}