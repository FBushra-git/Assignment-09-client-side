"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const RegisterPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    if (user.password !== user.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const { data,error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.fullName,
      image: user.photoURL,
    });
    

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Welcome to the pack!");
      router.push("/");
    }
  };
  
  const isMinLength = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const isMatching = password.length > 0 && password === confirmPassword;

  // Shortened height to h-12 to save vertical space
  const inputClasses = "w-full h-12 px-4 bg-[var(--btn-secondary)] rounded-full border-[2px] border-[var(--outline-border)] text-[var(--text-main)] font-semibold text-sm placeholder-[var(--text-main)]/60 focus:outline-none focus:border-[var(--btn-primary)] transition-colors shadow-none appearance-none";
  const labelClasses = "block text-[10px] font-black text-[var(--text-main)] tracking-wider mb-1 ml-2";
   

  const handleGoogle = async () => {
      await authClient.signIn.social({
        provider: "google",
      });
    };
  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] flex items-center justify-center p-4">
      <Toaster />
      
      {/* Expanded max-w to 600px to sit comfortably as a two-column grid */}
      <div className="w-full max-w-[600px] bg-[var(--bg-card)] rounded-[32px] border-[3px] border-[var(--outline-border)] p-8 shadow-[8px_8px_0px_0px_var(--outline-border)]">
        
        <div className="text-center mb-6">
          <h1 className="text-3xl font-black text-[var(--text-main)] mb-1">Join the pack 🐾</h1>
          <p className="text-[var(--text-main)]/70 text-sm font-medium">A few quick details, then meet pets.</p>
        </div>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          
          {/* Two-column layout grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClasses}>FULL NAME</label>
              <input 
                type="text"
                name="fullName" 
                placeholder="Your full name"
                required
                className={inputClasses}
              />
            </div>
            
            <div>
              <label className={labelClasses}>EMAIL</label>
              <input 
                type="email"
                name="email" 
                placeholder="Your email address"
                required
                className={inputClasses}
              />
            </div>

            <div className="sm:col-span-2">
              <label className={labelClasses}>PHOTO URL</label>
              <input 
                type="url"
                name="photoURL" 
                placeholder="Paste an avatar image link"
                className={inputClasses}
              />
            </div>
            
            <div>
              <label className={labelClasses}>PASSWORD</label>
              <input 
                type="password"
                name="password" 
                placeholder="Create password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClasses}
              />
            </div>
            
            <div>
              <label className={labelClasses}>CONFIRM PASSWORD</label>
              <input 
                type="password"
                name="confirmPassword" 
                placeholder="Repeat password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={inputClasses}
              />
            </div>
          </div>

          {/* Compact Validation Checklist Box */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[10px] font-bold bg-[var(--bg-card)]/50 px-4 py-2.5 rounded-xl border border-[var(--outline-border)]/10 mt-1">
            <span className={isMinLength ? "text-green-600" : "text-[var(--text-main)]/60"}>
              {isMinLength ? "✓" : "○"} Min 6 characters
            </span>
            <span className={hasUppercase ? "text-green-600" : "text-[var(--text-main)]/60"}>
              {hasUppercase ? "✓" : "○"} One uppercase
            </span>
            <span className={hasLowercase ? "text-green-600" : "text-[var(--text-main)]/60"}>
              {hasLowercase ? "✓" : "○"} One lowercase
            </span>
            <span className={isMatching ? "text-green-600" : "text-[var(--text-main)]/60"}>
              {isMatching ? "✓" : "○"} Passwords match
            </span>
          </div>

          <button 
            type="submit" 
            className="w-full h-12 bg-[var(--btn-primary)] hover:bg-[var(--btn-primary-hover)] text-[var(--btn-text)] font-black text-base rounded-full border-[2px] border-[var(--outline-border)] shadow-[4px_4px_0px_0px_var(--outline-border)] transition-all transform active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_var(--outline-border)] cursor-pointer mt-1"
          >
            Create account 🐾
          </button>
           <button
            type="button"
            onClick={handleGoogle}
            className="w-full h-12 bg-[var(--btn-secondary)] hover:bg-[var(--btn-secondary-hover)] text-[var(--text-main)] font-black text-sm rounded-full border-[2px] border-[var(--outline-border)] shadow-[4px_4px_0px_0px_var(--outline-border)] transition-all transform active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_var(--outline-border)] cursor-pointer flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.227C18.241 1.485 15.42 0 12.24 0 5.58 0 0 5.58 0 12.24s5.58 12.24 12.24 12.24c6.96 0 11.57-4.894 11.57-11.79 0-.795-.085-1.4-.195-2.015H12.24z"/>
            </svg>
            Continue with Google
          </button>
        </form>

        <p className="text-center mt-5 text-[var(--text-main)] font-semibold text-xs">
          Already a friend?{" "}
          <Link href="/login" className="text-[var(--btn-primary)] font-black underline hover:text-[var(--btn-primary-hover)] transition-colors">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
