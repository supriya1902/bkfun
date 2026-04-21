"use client";

import { supabase } from "@/lib/supabase";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  const loginWithEmail = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) alert(error.message);
    else alert("Check your email for login link.");
  };

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) alert(error.message);
  };

  return (
    <main className="page-padding flex min-h-screen items-center">
      <section className="w-full">
        <div className="mb-6 text-center">
          <h1 className="heading-lg text-main">Welcome to BKFUN</h1>
          <p className="mt-2 text-sm leading-6 text-muted">
            Real actions. Real proof. Real growth.
          </p>
        </div>

        <div className="main-card p-5">
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-ui"
            />

            <button onClick={loginWithEmail} className="primary-btn">
              Continue with Email
            </button>

            <button onClick={loginWithGoogle} className="secondary-btn">
              Continue with Google
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}