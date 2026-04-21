"use client";

import Navbar from "@/components/navbar";
import { challenges } from "@/lib/challenges";
import { useEffect, useState } from "react";
import { ImagePlus, Sparkles } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import { motion } from "framer-motion";

export default function UploadPage() {
  const [caption, setCaption] = useState("");
  const [challengeId, setChallengeId] = useState(challenges[0].id);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!image) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [image]);

  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image.");
      return;
    }

    const selectedChallenge = challenges.find((c) => c.id === challengeId);

    const formData = {
      challenge: selectedChallenge?.title,
      caption,
      imageName: image.name,
      timestamp: new Date().toISOString(),
    };

    console.log("Saved:", formData);
    alert("Proof uploaded successfully!");
  };

  return (
    <PageWrapper>
      <main className="page-padding">
        <div className="mb-6">
          <div className="top-chip">
            <Sparkles size={14} />
            Upload your proof
          </div>

          <h1 className="mt-4 text-3xl font-black">Post your action</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Keep it simple. Show what you actually did.
          </p>
        </div>

        <div className="glass-card p-4">
          <label className="mb-4 block">
            <span className="mb-2 block text-sm font-medium text-zinc-300">
              Challenge
            </span>
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
          </label>

          <label className="mb-4 block">
            <span className="mb-2 block text-sm font-medium text-zinc-300">
              Proof Image
            </span>

            <div className="rounded-[24px] border border-dashed border-white/10 bg-black/20 p-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="mb-3 w-full text-sm text-zinc-400"
              />

              {!previewUrl ? (
                <div className="flex h-44 flex-col items-center justify-center rounded-2xl bg-zinc-900/70 text-zinc-500">
                  <ImagePlus size={26} />
                  <p className="mt-2 text-sm">Preview will appear here</p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="image-frame"
                >
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="h-56 w-full object-cover"
                  />
                </motion.div>
              )}
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-zinc-300">
              Caption
            </span>
            <textarea
              placeholder="Write a short caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="input-ui min-h-[120px]"
            />
          </label>

          <button onClick={handleUpload} className="primary-btn mt-4">
            Save Proof
          </button>
        </div>

        <Navbar />
      </main>
    </PageWrapper>
  );
}