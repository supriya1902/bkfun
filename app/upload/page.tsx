"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AppShell from "@/components/appshell";
import AppHeader from "@/components/appheader";
import { challenges } from "@/lib/challenges";
import { supabase } from "@/lib/supabase";
import { ImagePlus, Sparkles } from "lucide-react";

export default function UploadPage() {
  const params = useSearchParams();
  const router = useRouter();

  const initialChallenge = Number(params.get("challenge")) || challenges[0].id;

  const [challengeId, setChallengeId] = useState(initialChallenge);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const previewUrl = useMemo(() => {
    if (!image) return null;
    return URL.createObjectURL(image);
  }, [image]);

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;

      if (!user) {
        router.push("/login");
        return;
      }

      setUserId(user.id);

      await supabase.from("profiles").upsert({
        id: user.id,
        username: user.email?.split("@")[0] || "user",
        avatar_url: user.user_metadata?.avatar_url || "",
        points: 0,
      });
    };

    loadUser();
  }, [router]);

  const handleUpload = async () => {
    if (!userId) return;
    if (!image) return alert("Please select an image.");
    if (!caption.trim()) return alert("Please write a caption.");

    const selectedChallenge = challenges.find((c) => c.id === challengeId);
    if (!selectedChallenge) return;

    setSaving(true);

    const fileExt = image.name.split(".").pop();
    const filePath = `${userId}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("proofs")
      .upload(filePath, image);

    if (uploadError) {
      setSaving(false);
      alert(uploadError.message);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("proofs")
      .getPublicUrl(filePath);

    const imageUrl = publicUrlData.publicUrl;

    const { error: postError } = await supabase.from("posts").insert({
      user_id: userId,
      challenge_id: selectedChallenge.id,
      challenge_title: selectedChallenge.title,
      caption,
      image_url: imageUrl,
      points_earned: selectedChallenge.points,
    });

    if (postError) {
      setSaving(false);
      alert(postError.message);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("points")
      .eq("id", userId)
      .single();

    const currentPoints = profile?.points || 0;

    await supabase
      .from("profiles")
      .update({ points: currentPoints + selectedChallenge.points })
      .eq("id", userId);

    setSaving(false);
    router.push("/feed");
  };

  return (
    <AppShell>
      <div className="page-space">
        <AppHeader
          chip={
            <div className="top-chip">
              <Sparkles size={14} />
              Upload your proof
            </div>
          }
          title="Post your real action"
          subtitle="Show what you did, add a caption, and earn points."
        />

        <div className="glass p-5">
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-300">
                Challenge
              </label>
              <select
                value={challengeId}
                onChange={(e) => setChallengeId(Number(e.target.value))}
                className="input-ui"
              >
                {challenges.map((challenge) => (
                  <option key={challenge.id} value={challenge.id}>
                    {challenge.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-300">
                Proof image
              </label>
              <div className="soft p-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                  className="w-full text-sm text-zinc-400"
                />

                <div className="mt-4">
                  {!previewUrl ? (
                    <div className="flex h-[220px] items-center justify-center rounded-2xl border border-dashed border-white/10 bg-black/20 text-zinc-500">
                      <div className="text-center">
                        <ImagePlus size={26} className="mx-auto" />
                        <p className="mt-2 text-sm">Preview will appear here</p>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="preview-image"
                    />
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-300">
                Caption
              </label>
              <textarea
                className="input-ui min-h-[130px]"
                placeholder="Write what happened, how you felt, or what you learned."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>

            <button onClick={handleUpload} className="primary-btn" disabled={saving}>
              {saving ? "Saving..." : "Save Proof"}
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}