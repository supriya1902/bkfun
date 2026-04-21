"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const loginWithEmail = async () => {
    if (!email) return alert("Enter your email first.");
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin + "/profile",
      },
    });

    setLoading(false);

    if (error) alert(error.message);
    else alert("Check your email for the login link.");
  };

  const loginWithGoogle = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/profile",
      },
    });

    setLoading(false);

    if (error) alert(error.message);
  };

  const continueAsGuest = () => router.push("/");

  return (
    <div className="app-root flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md glass p-6">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-black">
          <Sparkles size={26} />
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-black">
            Welcome to <span className="gradient-text">BKFUN</span>
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Real actions. Real proof. Real growth.
          </p>
        </div>

        <div className="mt-6 space-y-4">
          <input
            type="email"
            className="input-ui"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button onClick={loginWithEmail} className="primary-btn" disabled={loading}>
            {loading ? "Please wait..." : "Continue with Email"}
          </button>

          <button onClick={loginWithGoogle} className="secondary-btn" disabled={loading}>
            Continue with Google
          </button>

          <button onClick={continueAsGuest} className="secondary-btn">
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
}