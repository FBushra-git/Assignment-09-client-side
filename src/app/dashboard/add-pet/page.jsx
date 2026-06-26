"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  FieldError, 
  Input, 
  Label, 
  TextArea, 
  TextField, 
  Button 
} from "@heroui/react";
import { TrashIcon, DocumentCheckIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { authClient } from "@/lib/auth-client";

const AddPetPage = () => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="w-full flex items-center justify-center p-12 font-sans">
        <div className="text-sm font-black uppercase tracking-wider text-berry-ink animate-pulse">
          Verifying authorization... 🐾
        </div>
      </div>
    );
  }

  return (
    <>
      {session?.user ? (
        <AddPetForm user={session.user} />
      ) : (
        <AccessDeniedState />
      )}
    </>
  );
};

const AddPetForm = ({ user }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const formData = new FormData(e.currentTarget);
      const petData = Object.fromEntries(formData.entries());

      const payload = {
        ...petData,
        adoptionFee: parseFloat(petData.adoptionFee) || 0,
        ownerEmail: user.email, 
        createdAt: new Date(),
        status: "available"
      };
       const {data:tokenData} = await authClient.token();
       
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/add-pet`, {
        method: "POST",
        headers: { "Content-Type": "application/json" ,
          authorization: `Bearer ${tokenData?.token}`
        },
        body: JSON.stringify(payload),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add pet listing");

      setMessage({
        type: "success",
        text: "🐾 Pet added successfully! Redirecting to your listings...",
      });

      e.target.reset();
      
      // Forces transition router pipeline swap straight into the listings tab view
      setTimeout(() => {
        router.push("/dashboard/my-listings");
        router.refresh();
      }, 1500);

    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full font-sans text-berry-ink">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-black text-berry-ink uppercase tracking-tight mb-6">
          Add Pet <span className="text-[var(--btn-primary)]">Listing</span> 🐾
        </h1>

        {message.text && (
          <div className={`mb-6 p-4 rounded-2xl border-2 border-brutalist-outline font-black text-xs uppercase tracking-wide shadow-[2.5px_2.5px_0_0_theme(colors.brutalist-outline)] ${
            message.type === "success" ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
          }`}>
            <span className="mr-2">{message.type === "success" ? "✨" : "⚠️"}</span>
            {message.text}
          </div>
        )}

        <div className=" p-6 md:p-8 rounded-[24px] border-2 border-brutalist-outline shadow-[3px_3px_0_0_theme(colors.brutalist-outline)]">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              
              <TextField name="petName" isRequired className="flex flex-col gap-1">
                <Label className="font-black text-[10px] uppercase tracking-wider text-berry-ink/70">Pet Name</Label>
                <Input placeholder="Mocha" className="w-full  border-2 border-brutalist-outline rounded-xl px-4 py-2 font-bold text-xs outline-none focus:bg-white" />
                <FieldError className="text-[10px] font-bold text-rose-600 mt-0.5" />
              </TextField>

              <div className="flex flex-col gap-1">
                <label className="font-black text-[10px] uppercase tracking-wider text-berry-ink/70">Species</label>
                <div className="relative">
                  <select name="species" required className="w-full  border-2 border-brutalist-outline rounded-xl px-4 h-[38px] font-bold text-xs outline-none appearance-none cursor-pointer focus:bg-white">
                    <option value="">Select Species</option>
                    <option value="Dog">Dog 🐶</option>
                    <option value="Cat">Cat 🐱</option>
                    <option value="Bird">Bird 🦜</option>
                    <option value="Rabbit">Rabbit 🐰</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-berry-ink font-bold text-[10px]">▼</div>
                </div>
              </div>

              <TextField name="breed" isRequired className="flex flex-col gap-1">
                <Label className="font-black text-[10px] uppercase tracking-wider text-berry-ink/70">Breed</Label>
                <Input placeholder="Golden Retriever" className="w-full  border-2 border-brutalist-outline rounded-xl px-4 py-2 font-bold text-xs outline-none focus:bg-white" />
                <FieldError className="text-[10px] font-bold text-rose-600 mt-0.5" />
              </TextField>

              <TextField name="age" isRequired className="flex flex-col gap-1">
                <Label className="font-black text-[10px] uppercase tracking-wider text-berry-ink/70">Age</Label>
                <Input placeholder="2 Years" className="w-full border-2 border-brutalist-outline rounded-xl px-4 py-2 font-bold text-xs outline-none focus:bg-white" />
                <FieldError className="text-[10px] font-bold text-rose-600 mt-0.5" />
              </TextField>

              <div className="flex flex-col gap-1">
                <label className="font-black text-[10px] uppercase tracking-wider text-berry-ink/70">Gender</label>
                <div className="relative">
                  <select name="gender" required className="w-full  border-2 border-brutalist-outline rounded-xl px-4 h-[38px] font-bold text-xs outline-none appearance-none cursor-pointer focus:bg-white">
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-berry-ink font-bold text-[10px]">▼</div>
                </div>
              </div>

              <TextField name="adoptionFee" type="number" isRequired className="flex flex-col gap-1">
                <Label className="font-black text-[10px] uppercase tracking-wider text-berry-ink/70">Adoption Fee (USD)</Label>
                <Input type="number" placeholder="100" className="w-full  border-2 border-brutalist-outline rounded-xl px-4 py-2 font-bold text-xs outline-none focus:bg-white" />
                <FieldError className="text-[10px] font-bold text-rose-600 mt-0.5" />
              </TextField>

              <div className="md:col-span-2">
                <TextField name="imageUrl" isRequired className="flex flex-col gap-1">
                  <Label className="font-black text-[10px] uppercase tracking-wider text-berry-ink/70">Image URL</Label>
                  <Input type="url" placeholder="https://images.unsplash.com/photo-example" className="w-full  border-2 border-brutalist-outline rounded-xl px-4 py-2 font-bold text-xs outline-none focus:bg-white" />
                  <FieldError className="text-[10px] font-bold text-rose-600 mt-0.5" />
                </TextField>
              </div>

              <TextField name="healthStatus" isRequired className="flex flex-col gap-1">
                <Label className="font-black text-[10px] uppercase tracking-wider text-berry-ink/70">Health Status</Label>
                <Input placeholder="Healthy, energetic" className="w-full  border-2 border-brutalist-outline rounded-xl px-4 py-2 font-bold text-xs outline-none focus:bg-white" />
                <FieldError className="text-[10px] font-bold text-rose-600 mt-0.5" />
              </TextField>

              <TextField name="vaccinationStatus" isRequired className="flex flex-col gap-1">
                <Label className="font-black text-[10px] uppercase tracking-wider text-berry-ink/70">Vaccination Status</Label>
                <Input placeholder="Fully Vaccinated" className="w-full  border-2 border-brutalist-outline rounded-xl px-4 py-2 font-bold text-xs outline-none focus:bg-white" />
                <FieldError className="text-[10px] font-bold text-rose-600 mt-0.5" />
              </TextField>

              <div className="md:col-span-2">
                <TextField name="location" isRequired className="flex flex-col gap-1">
                  <Label className="font-black text-[10px] uppercase tracking-wider text-berry-ink/70">Location</Label>
                  <Input placeholder="Dhaka, Bangladesh" className="w-full  border-2 border-brutalist-outline rounded-xl px-4 py-2 font-bold text-xs outline-none focus:bg-white" />
                  <FieldError className="text-[10px] font-bold text-rose-600 mt-0.5" />
                </TextField>
              </div>

              <div className="md:col-span-2">
                <TextField name="description" isRequired className="flex flex-col gap-1">
                  <Label className="font-black text-[10px] uppercase tracking-wider text-berry-ink/70">Description</Label>
                  <TextArea placeholder="Describe personality, friendly behavior, training history..." className="w-full border-2 border-brutalist-outline rounded-2xl p-3 font-bold text-xs min-h-[100px] outline-none focus:bg-white resize-none" />
                  <FieldError className="text-[10px] font-bold text-rose-600 mt-0.5" />
                </TextField>
              </div>

              <div className="md:col-span-2">
                <div className="flex flex-col gap-1">
                  <span className="font-black text-[10px] uppercase tracking-wider text-berry-ink/50">Owner Account Context</span>
                  <div className="w-full bg-[var(--bg-canvas)] border-2 border-dashed border-brutalist-outline/20 rounded-xl px-4 py-2 text-xs font-bold text-[var(--text-main)]/60 select-none">
                    {user.email}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-dashed border-brutalist-outline/10">
              <Button type="reset" className="h-10 px-5 rounded-full border-2 border-brutalist-outline bg-rose-50 text-rose-700 font-black text-xs uppercase tracking-wider shadow-[2px_2px_0_0_theme(colors.brutalist-outline)] active:scale-95 cursor-pointer flex items-center justify-center gap-1.5">
                <TrashIcon className="w-3.5 h-3.5 stroke-[2.5]" /> Clear Form
              </Button>
              <Button type="submit" disabled={loading} className="h-10 px-6 rounded-full border-2 border-brutalist-outline bg-[var(--btn-primary)] text-[var(--btn-text)] font-black text-xs uppercase tracking-wider shadow-[2px_2px_0_0_theme(colors.brutalist-outline)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 cursor-pointer">
                <DocumentCheckIcon className="w-4 h-4 stroke-[2.5]" /> {loading ? "Publishing..." : "Add Pet Listing"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const AccessDeniedState = () => {
  const router = useRouter();
  return (
    <div className="w-full flex items-center justify-center py-12 font-sans text-[var(--text-main)]">
      <div className="max-w-sm w-full bg-[var(--bg-card)] p-6 text-center border-2 border-brutalist-outline rounded-[24px] shadow-[4px_4px_0_0_theme(colors.brutalist-outline)]">
        <div className="w-12 h-12 bg-rose-100 rounded-full border-2 border-brutalist-outline flex items-center justify-center mx-auto mb-4">
          <LockClosedIcon className="w-6 h-6 text-rose-600 stroke-[2.5]" />
        </div>
        <h2 className="text-xl font-black uppercase mb-1 text-[var(--text-main)]">Members Only! 🔒</h2>
        <p className="text-xs font-bold text-[var(--text-main)]/60 mb-5 leading-relaxed">
          You need to be logged into an active pet caretaker account to list a pet for adoption.
        </p>
        <div className="flex flex-col gap-2">
          <Button onClick={() => router.push("/login")} className="w-full h-10 rounded-full border-2 border-brutalist-outline bg-[var(--btn-primary)] text-[var(--btn-text)] font-black text-xs uppercase tracking-wider shadow-[2px_2px_0_0_theme(colors.brutalist-outline)] cursor-pointer">
            Log In to Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddPetPage;