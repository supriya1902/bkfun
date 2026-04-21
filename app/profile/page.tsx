"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/appshell";
import AppHeader from "@/components/appheader";
import { supabase } from "@/lib/supabase";
import { getLevel } from "@/lib/levels";
import { Flame, Trophy, Target, Sparkles } from "lucide-react";

type Profile = {
  id: string;
  username: string;
  avatar_url: string | null;
  points: number;
};

type UserPost = {
  id: number;
  challenge_title: string;
  caption: string;
  image_url: string;
  created_at: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<UserPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;

      if (!user) {
        router.push("/login");
        return;
      }

      await supabase.from("profiles").upsert({
        id: user.id,
        username: user.email?.split("@")[0] || "user",
        avatar_url: user.user_metadata?.avatar_url || "",
        points: 0,
      });

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      const { data: postData } = await supabase
        .from("posts")
        .select("id, challenge_title, caption, image_url, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setProfile(profileData);
      setPosts(postData || []);
      setLoading(false);
    };

    loadProfile();
  }, [router]);

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return (
      <AppShell>
        <div className="glass p-5">Loading profile...</div>
      </AppShell>
    );
  }

  const points = profile?.points || 0;
  const level = getLevel(points);

  return (
    <AppShell>
      <div className="page-space">
        <AppHeader
          chip={
            <div className="top-chip">
              <Sparkles size={14} />
              Your profile
            </div>
          }
          title={profile?.username || "User"}
          subtitle="Your real story, points, and completed challenges."
        />

        <div className="hero p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <img
                src={profile?.avatar_url || "https://via.placeholder.com/100?text=U"}
                alt="Profile"
                className="h-20 w-20 rounded-full object-cover border border-white/10"
              />

              <div>
                <h2 className="text-2xl font-black">{profile?.username}</h2>
                <p className="mt-1 text-sm text-zinc-400">{points} total points</p>
                <span className="mt-2 inline-block top-chip">{level}</span>
              </div>
            </div>

            <div className="w-full sm:w-[180px]">
              <button onClick={signOut} className="secondary-btn">
                Sign out
              </button>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="soft p-3 text-center">
              <Trophy size={18} className="mx-auto mb-2" />
              <p className="text-xs text-zinc-500">Level</p>
              <p className="mt-1 text-sm font-black">{level}</p>
            </div>

            <div className="soft p-3 text-center">
              <Target size={18} className="mx-auto mb-2" />
              <p className="text-xs text-zinc-500">Done</p>
              <p className="mt-1 text-sm font-black">{posts.length}</p>
            </div>

            <div className="soft p-3 text-center">
              <Flame size={18} className="mx-auto mb-2" />
              <p className="text-xs text-zinc-500">Points</p>
              <p className="mt-1 text-sm font-black">{points}</p>
            </div>
          </div>
        </div>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="section-title">Completed challenges</h2>
            <span className="muted text-sm">{posts.length} total</span>
          </div>

          {posts.length === 0 ? (
            <div className="glass p-5">
              <p className="text-lg font-bold">No proof uploaded yet</p>
              <p className="mt-2 text-sm text-zinc-400">
                Complete a challenge and upload it to start building your profile.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {posts.map((post) => (
                <div key={post.id} className="glass p-4">
                  <img
                    src={post.image_url}
                    alt={post.challenge_title}
                    className="preview-image"
                  />
                  <h3 className="mt-4 text-base font-extrabold">
                    {post.challenge_title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-400">{post.caption}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}