import Navbar from "@/components/navbar";
import PostCard from "@/components/postcard";

const mockPosts = [
  {
    id: 1,
    username: "riya",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop",
    caption: "Started the conversation first today. Felt scary but good.",
    challengeTitle: "Say Hi First",
    points: 10,
  },
  {
    id: 2,
    username: "aarav",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
    caption: "Tried a new café alone. Actually felt peaceful.",
    challengeTitle: "Visit a New Place Nearby",
    points: 20,
  },
];

export default function FeedPage() {
  return (
    <main className="page-padding">
      <div className="mb-6">
        <h1 className="heading-lg text-main">Feed</h1>
        <p className="mt-2 text-sm text-muted">
          Real moments from users completing challenges.
        </p>
      </div>

      <div className="space-y-5">
        {mockPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <Navbar />
    </main>
  );
}