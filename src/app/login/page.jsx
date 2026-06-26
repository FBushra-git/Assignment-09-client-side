"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = Object.fromEntries(new FormData(e.currentTarget));

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    if (data) {
      router.push("/");
    }

    if (error) {
      alert(error.message || "Login failed");
    }
  };

  const handleGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  // Shared Neo-brutalist design tokens
  const inputClasses = "w-full h-12 px-4 bg-[var(--btn-secondary)] rounded-full border-[2px] border-[var(--outline-border)] text-[var(--text-main)] font-semibold text-sm placeholder-[var(--text-main)]/60 focus:outline-none focus:border-[var(--btn-primary)] transition-colors shadow-none appearance-none";
  const labelClasses = "block text-[10px] font-black text-[var(--text-main)] tracking-wider mb-1 ml-2";

  // Reusable styling for grid image cells
  const gridImageClasses = "w-full h-full object-cover bg-[var(--bg-card)] rounded-2xl border-[2px] border-[var(--outline-border)] shadow-[3px_3px_0px_0px_var(--outline-border)] animate-fade-in";

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] flex items-center justify-center p-4">
      
      {/* Outer Card Wrapper */}
      <div className="w-full max-w-[850px] bg-[var(--bg-card)] rounded-[32px] border-[3px] border-[var(--outline-border)] flex overflow-hidden shadow-[8px_8px_0px_0px_var(--outline-border)]">
        
        {/* Left Side: 2x2 Photo Grid */}
        <div className="hidden md:grid w-1/2 grid-cols-2 grid-rows-2 gap-4 bg-[var(--bg-card)] p-6 border-r-[3px] border-[var(--outline-border)] items-center justify-center content-center">
          <div className="aspect-square relative">
            <Image 
              src="/assets/dog.png" 
              alt="Pet friend 1"
              fill
              className={gridImageClasses}
              priority
            />
          </div>
          <div className="aspect-square relative">
            <Image 
              src="/assets/dog2.png" 
              alt="Pet friend 2"
              fill
              className={gridImageClasses}
            />
          </div>
          <div className="aspect-square relative">
            <Image 
              src="/assets/cat.png" 
              alt="Pet friend 3"
              fill
              className={gridImageClasses}
            />
          </div>
          <div className="aspect-square relative">
            <Image 
              src="/assets/bunny.png" 
              alt="Pet friend 4"
              fill
              className={gridImageClasses}
            />
          </div>
        </div>

        {/* Right Side: Form Layout Inputs */}
        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
          <div className="mb-6">
            <h1 className="text-3xl font-black text-[var(--text-main)] mb-1">Welcome back! 🐾</h1>
            <p className="text-[var(--text-main)]/70 text-sm font-medium">Your furry friends missed you.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            {/* Email Field */}
            <div>
              <label className={labelClasses}>EMAIL</label>
              <input
                required
                name="email"
                type="email"
                placeholder="you@pawfect.app"
                className={inputClasses}
              />
            </div>

            {/* Password Field */}
            <div>
              <label className={labelClasses}>PASSWORD</label>
              <input
                required
                name="password"
                type="password"
                placeholder="••••••••"
                className={inputClasses}
              />
            </div>

            {/* Classic Login Neo-Button */}
            <button
              type="submit"
              className="w-full h-12 bg-[var(--btn-primary)] hover:bg-[var(--btn-primary-hover)] text-[var(--btn-text)] font-black text-base rounded-full border-[2px] border-[var(--outline-border)] shadow-[4px_4px_0px_0px_var(--outline-border)] transition-all transform active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_var(--outline-border)] cursor-pointer mt-2"
            >
              Log in 🐾
            </button>
          </form>

          {/* Separation Divider */}
          <div className="relative my-5 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-[2px] border-dashed border-[var(--outline-border)]/20"></div>
            </div>
            <span className="relative bg-[var(--bg-card)] px-3 text-xs font-bold text-[var(--text-main)]/60 uppercase">or</span>
          </div>

          {/* Google SSO Button */}
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

          <p className="text-center mt-5 text-[var(--text-main)] font-semibold text-xs">
            New here?{" "}
            <Link href="/register" className="text-[var(--btn-primary)] font-black underline hover:text-[var(--btn-primary-hover)] transition-colors">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
