"use client";

import { Heart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

type Post = {
  id: number;
  caption: string;
  challenge_title: string;
  image_url: string;
  points_earned: number;
  username: string;
  avatar_url: string | null;
  liked: boolean;
  like_count: number;
  onToggleLike: (postId: number, liked: boolean) => void;
};

export default function PostCard({
  post,
}: {
  post: Post;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-4"
    >
      <div className="mb-4 flex items-center gap-3">
        <img
          src={post.avatar_url || "https://via.placeholder.com/80?text=U"}
          alt={post.username}
          className="h-11 w-11 rounded-full object-cover border border-white/10"
        />
        <div>
          <p className="text-sm font-bold">@{post.username}</p>
          <p className="text-xs text-zinc-500">Completed challenge</p>
        </div>
      </div>

      <img
        src={post.image_url}
        alt={post.challenge_title}
        className="feed-image"
      />

      <div className="mt-4 flex items-center justify-between gap-3">
        <h3 className="text-base font-extrabold">{post.challenge_title}</h3>
        <span className="top-chip">+{post.points_earned} pts</span>
      </div>

      <p className="mt-2 text-sm leading-6 text-zinc-400">{post.caption}</p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <button
          onClick={() => post.onToggleLike(post.id, post.liked)}
          className="secondary-btn flex items-center justify-center gap-2"
        >
          <Heart
            size={16}
            fill={post.liked ? "currentColor" : "none"}
          />
          {post.like_count} Like
        </button>

        <button className="primary-btn flex items-center justify-center gap-2">
          <Sparkles size={16} />
          Try this
        </button>
      </div>
    </motion.div>
  );
}