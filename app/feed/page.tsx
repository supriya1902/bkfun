"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/appshell";
import AppHeader from "@/components/appheader";
import PostCard from "@/components/postcard";
import { supabase } from "@/lib/supabase";
import { Sparkles } from "lucide-react";

type RawPost = {
  id: number;
  user_id: string;
  challenge_title: string;
  caption: string;
  image_url: string;
  points_earned: number;
};

type Profile = {
  id: string;
  username: string;
  avatar_url: string | null;
};

type FeedPost = RawPost & {
  username: string;
  avatar_url: string | null;
  liked: boolean;
  like_count: number;
};

export default function FeedPage() {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadFeed = async () => {
    setLoading(true);

    const { data: sessionData } = await supabase.auth.getUser();
    const currentUserId = sessionData.user?.id || null;
    setUserId(currentUserId);

    const { data: postData, error: postError } = await supabase
      .from("posts")
      .select("id, user_id, challenge_title, caption, image_url, points_earned")
      .order("created_at", { ascending: false });

    if (postError) {
      console.error(postError.message);
      setLoading(false);
      return;
    }

    const userIds = [...new Set((postData || []).map((p) => p.user_id))];

    const { data: profileData } = await supabase
      .from("profiles")
      .select("id, username, avatar_url")
      .in("id", userIds);

    const profileMap = new Map<string, Profile>();
    (profileData || []).forEach((p) => profileMap.set(p.id, p));

    const { data: likesData } = await supabase
      .from("likes")
      .select("post_id, user_id");

    const finalPosts: FeedPost[] = (postData || []).map((post) => {
      const profile = profileMap.get(post.user_id);

      const postLikes = (likesData || []).filter((l) => l.post_id === post.id);
      const liked = !!postLikes.find((l) => l.user_id === currentUserId);

      return {
        ...post,
        username: profile?.username || "user",
        avatar_url: profile?.avatar_url || null,
        like_count: postLikes.length,
        liked,
      };
    });

    setPosts(finalPosts);
    setLoading(false);
  };

  useEffect(() => {
    loadFeed();
  }, []);

  const toggleLike = async (postId: number, liked: boolean) => {
    if (!userId) {
      alert("Please log in to like posts.");
      return;
    }

    if (liked) {
      await supabase
        .from("likes")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", userId);
    } else {
      await supabase.from("likes").insert({
        post_id: postId,
        user_id: userId,
      });
    }

    loadFeed();
  };

  return (
    <AppShell>
      <div className="page-space">
        <AppHeader
          chip={
            <div className="top-chip">
              <Sparkles size={14} />
              Community feed
            </div>
          }
          title="Real moments from real users"
          subtitle="See proofs, feel motivated, and try the challenge yourself."
        />

        {loading ? (
          <div className="glass p-5">Loading feed...</div>
        ) : posts.length === 0 ? (
          <div className="glass p-5">
            <p className="text-lg font-bold">No posts yet</p>
            <p className="mt-2 text-sm text-zinc-400">
              Be the first person to upload proof.
            </p>
          </div>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={{
                ...post,
                onToggleLike: toggleLike,
              }}
            />
          ))
        )}
      </div>
    </AppShell>
  );
}